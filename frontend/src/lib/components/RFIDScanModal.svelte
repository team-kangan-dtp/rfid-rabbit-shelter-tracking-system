<script lang="ts">
  import { supabase } from "$lib/supabaseClient.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandItem,
  } from "$lib/components/ui/command/index.js";
  import { toast } from "svelte-sonner";

  const {
    userID,
    animalData,
    rfidTag,
    scanData,
    dialogOpen,
    onClose,
  }: {
    userID: string | null;
    animalData: any;
    rfidTag: string | null;
    scanData: any;
    dialogOpen: boolean;
    onClose: () => void;
  } = $props();

  let editing = $state(false);
  let newNote = $state(false);
  let newNoteData = $state("");
  let newNoteType = $state("General");
  let saving = $state(false);
  let errorMsg: string | null = $state(null);

  // Local copies of prop data that can be modified
  let localAnimalData = $state(animalData);
  let localRfidTag = $state(rfidTag);
  let hasLocalChanges = $state(false); // Track if we've made local changes

  // Sync local state with props when they change (but only if no local changes)
  $effect(() => {
    if (!hasLocalChanges) {
      localAnimalData = animalData;
    }
  });

  $effect(() => {
    if (!hasLocalChanges) {
      localRfidTag = rfidTag;
    }
  });

  // Local state for dialog open/close handling
  let localDialogOpen = $state(false);

  // Sync local dialog state with prop
  $effect(() => {
    localDialogOpen = dialogOpen;
    // Reset local changes flag when dialog opens/closes
    if (!dialogOpen) {
      hasLocalChanges = false;
    }
  });

  // Animal selection / assignment state
  let animals = $state<any[]>([]); // start empty, now always lazy-loaded
  let loadingAnimals = $state(false);
  let selectedAnimalId = $state<string | null>(null);
  let assigning = $state(false);
  let assignError: string | null = $state(null);
  let assignSuccess = $state(false);
  let popoverOpen = $state(false);

  const formatDateTime = (v?: string) =>
    v ? new Date(v).toLocaleString() : "N/A";
  const formatDate = (v?: string) =>
    v ? new Date(v).toLocaleDateString() : "N/A";
  const formatWeight = (w?: number) => (w ? `${w} kg` : "N/A");

  const adoptionStatusVariant = (status?: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("adopted")) return "secondary";
    if (s.includes("pending")) return "outline";
    if (s.includes("medical")) return "destructive";
    // available / default
    return "default";
  };

  async function submitUpdate(e: Event) {
    e.preventDefault();
    errorMsg = null;
    if (!localAnimalData) return;
    saving = true;
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    fd.set("id", localAnimalData.id);
    try {
      // use new partial update action
      const res = await fetch("/animals?/put", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const t = await res.text();
        errorMsg = t || "Update failed";
      } else {
        // Optimistically update local localAnimalData object
        localAnimalData.name = fd.get("name");
        localAnimalData.species = fd.get("species");
        localAnimalData.breed = fd.get("breed");
        localAnimalData.fur_colour = fd.get("fur_colour");
        localAnimalData.weight_kg = fd.get("weight_kg")
          ? parseFloat(fd.get("weight_kg") as string)
          : null;
        localAnimalData.date_of_birth = fd.get("date_of_birth");
        localAnimalData.arrival_date = fd.get("arrival_date");
        localAnimalData.adoption_status = fd.get("adoption_status");
        localAnimalData.special_needs = fd.get("special_needs");
        localAnimalData.description = fd.get("description");
        toast.success(`${localAnimalData.name} updated via RFID scan`);
        editing = false;
      }
    } catch (err: any) {
      errorMsg = err?.message || "Unexpected error";
    } finally {
      saving = false;
    }
  }

  const noteTypes = [
    { value: "General", label: "General" },
    { value: "Behavioral", label: "Behavioral" },
    { value: "Medical", label: "Medical" },
    { value: "Feeding", label: "Feeding" },
    { value: "Exercise", label: "Exercise" },
    { value: "Grooming", label: "Grooming" },
    { value: "Training", label: "Training" },
  ];

  let value = $state("");

  const triggerContent = $derived(
    noteTypes.find((f) => f.value === value)?.label ?? "Select a note type"
  );

  // Create a new note
  async function createNewNote(noteData: string, noteType: string) {
    try {
      // Insert a new entry note
      const { error } = await supabase.from("animal_note").insert([
        {
          animal_id: localAnimalData.id,
          user_id: userID,
          note_content: noteData,
          note_type: noteType,
        },
      ]);

      const { data: dbNoteData, error: fetchError } = await supabase
        .from("animal_note")
        .select("id")
        .eq("animal_id", localAnimalData.id)
        .eq("user_id", userID)
        .eq("note_content", noteData)
        .eq("note_type", noteType)
        .single();

      console.log("Fetched note data:", dbNoteData[0].id);

      // Update the RFID log entry to link it to this note
      if (dbNoteData && dbNoteData[0].id && scanData && scanData.id) {
        const noteId = dbNoteData[0].id;
        const { error: updateError } = await supabase
          .from("rfid_log")
          .update({ animal_note: noteId })
          .eq("id", scanData.id);

        if (updateError) {
          console.error("Error linking note to RFID log:", updateError);
        } else {
          console.log("Successfully linked note to RFID log");
        }
      }

      toast.success(`Note added for ${localAnimalData.name}`);

      newNoteData = "";
      newNoteType = "General";
      onClose();
    } catch (error: any) {
      console.log("There was an error while creating the note:", error);
      toast.error("Failed to create note: " + (error?.message || "Unknown error"));
    }
  }

  type DropdownAnimal = {
    id: string;
    name: string;
    uuid: string;
    species?: string;
  };

  async function loadAnimalsIfNeeded() {
    if (animals.length || loadingAnimals) return;
    loadingAnimals = true;
    try {
      const { data, error } = await supabase.from("animal").select("*");

      console.log("Fetched animals:", data);

      // Check if it's a SvelteKit action response
      if (data) {
        animals = data;
      } else {
        console.warn("Animals fetch failed:", error);
      }
    } catch (e) {
      console.warn("Failed to fetch animals list for RFID assignment", e);
    } finally {
      loadingAnimals = false;
    }
  }

  async function assignRFID() {
    assignError = null;
    assignSuccess = false;
    if (!selectedAnimalId || !localRfidTag) {
      assignError = "Select an animal first.";
      return;
    }
    assigning = true;
    try {
      const { error } = await supabase
        .from("animal")
        .update({ rfid_tag: localRfidTag })
        .eq("id", selectedAnimalId);
      if (error) {
        assignError = error.message || "Failed to assign tag";
      } else {
        assignSuccess = true;
        // Use the selected animal from the local animals array and update with the new RFID tag
        const selectedAnimal = animals.find((a) => a.id === selectedAnimalId);
        if (selectedAnimal) {
          localAnimalData = { ...selectedAnimal, rfid_tag: localRfidTag };
          toast.success(`RFID tag assigned to ${selectedAnimal.name}`);
          // Clear localRfidTag to transition to details view
          localRfidTag = null;
          // Mark that we've made local changes
          hasLocalChanges = true;
        } else {
          assignError = "Selected animal not found in local data.";
        }
      }
    } catch (err: any) {
      assignError = err?.message || "Unexpected error";
    } finally {
      assigning = false;
      if (assignSuccess) {
        // optional: close popover
        popoverOpen = false;
      }
    }
  }
</script>

<Dialog.Root
  bind:open={localDialogOpen}
  onOpenChange={(open) => {
    if (!open) {
      onClose();
    }
  }}
>
  <Dialog.Content
    class="max-w-lg w-full rounded-xl border bg-white dark:bg-neutral-900 shadow-lg overflow-hidden"
  >
    <Dialog.Header class="px-6 pt-5 pb-4">
      <div class="flex items-start gap-3">
        <div
          class="shrink-0 p-2 rounded-md bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300"
        >
          <svg
            viewBox="0 0 24 24"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 8a8 8 0 0 1 8-8m0 16a8 8 0 0 0 8-8M9 8a3 3 0 1 1 6 0 8 8 0 0 1-8 8"
            />
          </svg>
        </div>
        <div class="flex-1 space-y-1">
          <Dialog.Title class="text-base font-semibold">
            RFID Scan Detected
          </Dialog.Title>
          <Dialog.Description
            class="text-sm text-neutral-500 dark:text-neutral-400 leading-snug"
          >
            {#if localAnimalData}
              Animal scan detected for <span
                class="font-medium text-neutral-900 dark:text-neutral-100"
                >{localAnimalData.name}</span
              >
            {:else}
              A new RFID scan has been detected.
            {/if}
          </Dialog.Description>
        </div>
        {#if localAnimalData}
          <Button
            variant="ghost"
            size="sm"
            class="mt-1"
            onclick={() => (editing = !editing)}
          >
            {editing ? "Cancel" : "Edit"}
          </Button>
        {/if}
      </div>
    </Dialog.Header>

    <Separator />

    <ScrollArea class="max-h-[60vh]">
      <div class="px-6 py-5 space-y-8">
        <!-- If there is any scan data - Generic info -->
        {#if scanData}
          <section class="space-y-3">
            <h3
              class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"
            >
              <span class="h-3 w-0.5 rounded bg-indigo-500"></span> Scan Details
            </h3>
            <ul class="space-y-1 text-sm">
              <li
                class="flex justify-between gap-4 rounded-md px-3 py-2 bg-neutral-50 dark:bg-neutral-800/60"
              >
                <span class="text-neutral-600 dark:text-neutral-300"
                  >Scan Time</span
                >
                <span class="font-mono text-neutral-900 dark:text-neutral-100"
                  >{formatDateTime(scanData.scan_time)}</span
                >
              </li>
              <li
                class="flex justify-between gap-4 rounded-md px-3 py-2 bg-neutral-50 dark:bg-neutral-800/60"
              >
                <span class="text-neutral-600 dark:text-neutral-300"
                  >User Scan</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{scanData.user_id ? "Yes" : "No"}</span
                >
              </li>
            </ul>
          </section>
        {/if}

        <!-- If this scan has animal data and is viewing only -->
        {#if localAnimalData && !editing}
          <section class="space-y-3">
            <h3
              class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"
            >
              <span class="h-3 w-0.5 rounded bg-indigo-500"></span> Animal Details
            </h3>
            <div class="grid gap-2">
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400">Name</span>
                <span class="font-medium text-neutral-900 dark:text-neutral-100"
                  >{localAnimalData.name}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Species</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{localAnimalData.species}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400">Breed</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{localAnimalData.breed || "N/A"}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Fur Colour</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{localAnimalData.fur_colour || "N/A"}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Weight</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{formatWeight(localAnimalData.weight_kg)}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Date of Birth</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{formatDate(localAnimalData.date_of_birth)}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Arrival Date</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{formatDate(localAnimalData.arrival_date)}</span
                >
              </div>
              <div class="flex items-center justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Status</span
                >
                <Badge
                  variant={adoptionStatusVariant(
                    localAnimalData.adoption_status
                  )}
                  class="capitalize"
                >
                  {localAnimalData.adoption_status || "Unknown"}
                </Badge>
              </div>
              {#if localAnimalData.special_needs}
                <div
                  class="mt-2 rounded-md border bg-rose-50 dark:bg-rose-500/10 dark:border-rose-500/30 p-3"
                >
                  <p
                    class="text-xs font-medium text-rose-700 dark:text-rose-300 mb-1"
                  >
                    Special Needs
                  </p>
                  <p
                    class="text-xs text-rose-800 dark:text-rose-200 leading-snug"
                  >
                    {localAnimalData.special_needs}
                  </p>
                </div>
              {/if}

              {#if localAnimalData.description}
                <div class="mt-2 rounded-md border dark:border-gray-500/30 p-3">
                  <p
                    class="text-xs font-medium text-neutral-900 dark:text-neutral-100 mb-1"
                  >
                    Description
                  </p>
                  <p
                    class="text-xs text-neutral-800 dark:text-neutral-200 leading-snug"
                  >
                    {localAnimalData.description}
                  </p>
                </div>
              {/if}
            </div>
          </section>
        {/if}

        <!-- If this scan has animal data and is editing -->
        {#if localAnimalData && editing}
          <form class="space-y-5" onsubmit={submitUpdate}>
            <h3
              class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"
            >
              <span class="h-3 w-0.5 rounded bg-indigo-500"></span> Edit Animal
            </h3>

            <div class="grid gap-4">
              <div class="grid gap-1.5">
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={localAnimalData.name}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="species">Species</Label>
                <Input
                  id="species"
                  name="species"
                  required
                  value={localAnimalData.species}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="breed">Breed</Label>
                <Input
                  id="breed"
                  name="breed"
                  value={localAnimalData.breed || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="fur_colour">Fur Colour</Label>
                <Input
                  id="fur_colour"
                  name="fur_colour"
                  value={localAnimalData.fur_colour || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="weight_kg">Weight (kg)</Label>
                <Input
                  id="weight_kg"
                  name="weight_kg"
                  type="number"
                  step="0.01"
                  value={localAnimalData.weight_kg || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={localAnimalData.date_of_birth || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="arrival_date">Arrival Date</Label>
                <Input
                  id="arrival_date"
                  name="arrival_date"
                  type="date"
                  value={localAnimalData.arrival_date || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="adoption_status">Adoption Status</Label>
                <Select.Root
                  type="single"
                  name="adoptionStatus"
                  bind:value={localAnimalData.adoption_status}
                >
                  <Select.Trigger class="w-[180px]">
                    {localAnimalData.adoption_status ||
                      "Select adoption status"}
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Adoption Status</Select.Label>
                      <Select.Item value="Available">Available</Select.Item>
                      <Select.Item value="Pending">Pending</Select.Item>
                      <Select.Item value="Adopted">Adopted</Select.Item>
                      <Select.Item value="Hold">Hold</Select.Item>
                      <Select.Item value="Medical Hold"
                        >Medical Hold</Select.Item
                      >
                      <Select.Item value="Not Available"
                        >Not Available</Select.Item
                      >
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
                <input
                  type="hidden"
                  name="adoption_status"
                  value={localAnimalData.adoption_status || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="special_needs">Special Needs</Label>
                <Input
                  id="special_needs"
                  name="special_needs"
                  value={localAnimalData.special_needs || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={localAnimalData.description || ""}
                />
              </div>

              {#if errorMsg}
                <p class="text-sm text-rose-600 dark:text-rose-400">
                  {errorMsg}
                </p>
              {/if}

              <div class="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onclick={() => (editing = false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </form>
        {/if}

        <!-- If this scan has no animal data associated with the RFID tag, offer to assign it to an existing animal -->
        {#if !localAnimalData && localRfidTag}
          <section class="space-y-4">
            <h3
              class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"
            >
              <span class="h-3 w-0.5 rounded bg-indigo-500"></span> Assign RFID Tag
            </h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Tag <code
                class="font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800"
                >{localRfidTag}</code
              > is unassigned. Select an animal to associate it.
            </p>

            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <Popover.Root bind:open={popoverOpen}>
                  <Popover.Trigger>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={popoverOpen}
                      class="w-72 justify-between"
                      onclick={loadAnimalsIfNeeded}
                    >
                      {#if selectedAnimalId}
                        {#key selectedAnimalId}
                          {animals.find((a) => a.id === selectedAnimalId)
                            ?.name || "Select animal"}
                        {/key}
                      {:else if loadingAnimals}
                        Loading animals...
                      {:else}
                        Select animal
                      {/if}
                      <svg
                        class="ml-2 h-4 w-4 opacity-60"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M6 8l4 4 4-4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content class="w-72 p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search animals..." />
                      <CommandList>
                        <CommandEmpty>No animals found.</CommandEmpty>
                        {#each animals as a (a.id)}
                          <CommandItem
                            value={a.name}
                            onSelect={() => {
                              selectedAnimalId = a.id;
                              popoverOpen = false;
                            }}
                          >
                            <span class="truncate">{a.name} ({a.species})</span>
                            {#if selectedAnimalId === a.id}
                              <svg
                                class="ml-auto h-4 w-4 text-indigo-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  d="M5 12l5 5L20 7"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            {/if}
                          </CommandItem>
                        {/each}
                      </CommandList>
                    </Command>
                  </Popover.Content>
                </Popover.Root>

                {#if selectedAnimalId}
                  <Badge variant="outline" class="max-w-[140px] truncate">
                    {animals.find((a) => a.uuid === selectedAnimalId)?.species}
                  </Badge>
                {/if}
              </div>

              <div class="flex gap-2">
                <Button
                  onclick={assignRFID}
                  disabled={!selectedAnimalId || assigning}
                >
                  {assigning ? "Assigning..." : "Assign Tag"}
                </Button>
                {#if assignSuccess}
                  <Badge variant="secondary">Assigned</Badge>
                {/if}
              </div>

              {#if assignError}
                <p class="text-xs text-rose-600 dark:text-rose-400">
                  {assignError}
                </p>
              {/if}
            </div>
          </section>
        {/if}

        <!-- Add animal note -->
        {#if animalData && newNote}{/if}
      </div>
    </ScrollArea>

    <Separator />

    <Dialog.Footer class="px-6 py-4 flex justify-end gap-2">
      {#if localAnimalData}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="outline">Add Note</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Add a note for this animal</Dialog.Title>
            <Dialog.Description>
              <Textarea id="note" class="mb-3" bind:value={newNoteData} />
              <Select.Root
                type="single"
                name="noteType"
                bind:value={newNoteType}
              >
                <Select.Trigger class="w-[180px]">
                  {triggerContent}
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Note Types</Select.Label>
                    {#each noteTypes as noteType (noteType.value)}
                      <Select.Item
                        value={noteType.value}
                        label={noteType.label}
                      >
                        {noteType.label}
                      </Select.Item>
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Dialog.Description>

            <Dialog.Footer>
              <Button
                variant="outline"
                onclick={() => {
                  createNewNote(newNoteData, newNoteType);
                }}>Create note</Button
              >
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      {/if}
      <Button variant="outline" onclick={onClose}>Close</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
