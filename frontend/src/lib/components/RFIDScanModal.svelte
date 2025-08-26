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

  // Local state for dialog open/close handling
  let localDialogOpen = $state(false);

  // Sync local dialog state with prop
  $effect(() => {
    localDialogOpen = dialogOpen;
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
    if (!animalData) return;
    saving = true;
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    fd.set("id", animalData.id);
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
        // Optimistically update local animalData object
        animalData.name = fd.get("name");
        animalData.species = fd.get("species");
        animalData.breed = fd.get("breed");
        animalData.fur_colour = fd.get("fur_colour");
        animalData.weight_kg = fd.get("weight_kg")
          ? parseFloat(fd.get("weight_kg") as string)
          : null;
        animalData.date_of_birth = fd.get("date_of_birth");
        animalData.arrival_date = fd.get("arrival_date");
        animalData.adoption_status = fd.get("adoption_status");
        animalData.special_needs = fd.get("special_needs");
        animalData.description = fd.get("description");
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

  async function createNewNote(noteData: string, noteType: string) {
    const { data, error } = await supabase
      .from("animal_note")
      .insert([
        {
          animal_id: animalData.id,
          user_id: userID,
          note_content: noteData,
          note_type: noteType,
        },
      ])
      .select();

    if (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note");
    } else {
      console.log("Note created successfully:", data);
      alert("Note created successfully");
    }

    newNoteData = "";
    newNoteType = "General";
    onClose();
  }

  type DropdownAnimal = {
    id: number;
    name: string;
    uuid: string;
  };

  function convertToAnimalArray(data: any[]): DropdownAnimal[] {
    const result: DropdownAnimal[] = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      if (
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "name" in item
      ) {
        const id = item.id;
        const nameId = item.name;

        const uuid = data[i + 1];
        const name = data[i + 2];

        if (typeof uuid === "string" && typeof name === "string") {
          result.push({
            id,
            name,
            uuid,
          });
          i += 2; // Skip the next two items since we've consumed them
        }
      }
    }

    return result;
  }

  async function loadAnimalsIfNeeded() {
    if (animals.length || loadingAnimals) return;
    loadingAnimals = true;
    try {
      const fd = new FormData();
      fd.set("dbFields", "*"); // minimal fields
      const res = await fetch("/animals?/get", { method: "POST", body: fd });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
        // SvelteKit action JSON has shape { type, status, data: { animals } }
        const raw = json.data;
        let animalArray: any[] = [];

        if (typeof raw === "string") {
          try {
            animalArray = JSON.parse(raw);
          } catch (err) {
            try {
              // try to sanitize common escaping/double-encoding issues
              animalArray = JSON.parse(raw.replace(/\\+/g, ""));
            } catch (err2) {
              console.warn("Failed to parse animals string:", err2);
              animalArray = [];
            }
          }
        } else if (Array.isArray(raw)) {
          animalArray = raw;
        } else {
          animalArray = [];
        }

        animals = convertToAnimalArray(animalArray);
        console.debug("Loaded animals:", animals);
      } else {
        console.warn("Animals fetch failed:", res.status);
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
    if (!selectedAnimalId || !rfidTag) {
      assignError = "Select an animal first.";
      return;
    }
    assigning = true;
    const fd = new FormData();
    fd.set("id", selectedAnimalId);
    fd.set("rfid_tag", rfidTag);
    try {
      const res = await fetch("/animals?/put", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        assignError = (await res.text()) || "Failed to assign tag";
      } else {
        assignSuccess = true;
        // Promote chosen animal to animalData so details view appears
        const chosen = animals.find((a) => a.id === selectedAnimalId);
        if (chosen) {
          chosen.rfid_tag = rfidTag;
          // mutate original reference if possible
          animalData ? Object.assign(animalData, chosen) : null;
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
            {#if animalData}
              Animal scan detected for <span
                class="font-medium text-neutral-900 dark:text-neutral-100"
                >{animalData.name}</span
              >
            {:else}
              A new RFID scan has been detected.
            {/if}
          </Dialog.Description>
        </div>
        {#if animalData}
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
        {#if animalData && !editing}
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
                  >{animalData.name}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Species</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{animalData.species}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400">Breed</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{animalData.breed || "N/A"}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Fur Colour</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{animalData.fur_colour || "N/A"}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Weight</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{formatWeight(animalData.weight_kg)}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Date of Birth</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{formatDate(animalData.date_of_birth)}</span
                >
              </div>
              <div class="flex justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Arrival Date</span
                >
                <span class="text-neutral-900 dark:text-neutral-100"
                  >{formatDate(animalData.arrival_date)}</span
                >
              </div>
              <div class="flex items-center justify-between text-sm px-2 py-1">
                <span class="text-neutral-500 dark:text-neutral-400"
                  >Status</span
                >
                <Badge
                  variant={adoptionStatusVariant(animalData.adoption_status)}
                  class="capitalize"
                >
                  {animalData.adoption_status || "Unknown"}
                </Badge>
              </div>
              {#if animalData.special_needs}
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
                    {animalData.special_needs}
                  </p>
                </div>
              {/if}

              {#if animalData.description}
                <div class="mt-2 rounded-md border dark:border-gray-500/30 p-3">
                  <p
                    class="text-xs font-medium text-neutral-900 dark:text-neutral-100 mb-1"
                  >
                    Description
                  </p>
                  <p
                    class="text-xs text-neutral-800 dark:text-neutral-200 leading-snug"
                  >
                    {animalData.description}
                  </p>
                </div>
              {/if}
            </div>
          </section>
        {/if}

        <!-- If this scan has animal data and is editing -->
        {#if animalData && editing}
          <form class="space-y-5" onsubmit={submitUpdate}>
            <h3
              class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"
            >
              <span class="h-3 w-0.5 rounded bg-indigo-500"></span> Edit Animal
            </h3>

            <div class="grid gap-4">
              <div class="grid gap-1.5">
                <Label for="name">Name</Label>
                <Input id="name" name="name" required value={animalData.name} />
              </div>
              <div class="grid gap-1.5">
                <Label for="species">Species</Label>
                <Input
                  id="species"
                  name="species"
                  required
                  value={animalData.species}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="breed">Breed</Label>
                <Input id="breed" name="breed" value={animalData.breed || ""} />
              </div>
              <div class="grid gap-1.5">
                <Label for="fur_colour">Fur Colour</Label>
                <Input
                  id="fur_colour"
                  name="fur_colour"
                  value={animalData.fur_colour || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="weight_kg">Weight (kg)</Label>
                <Input
                  id="weight_kg"
                  name="weight_kg"
                  type="number"
                  step="0.01"
                  value={animalData.weight_kg || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={animalData.date_of_birth || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="arrival_date">Arrival Date</Label>
                <Input
                  id="arrival_date"
                  name="arrival_date"
                  type="date"
                  value={animalData.arrival_date || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="adoption_status">Adoption Status</Label>
                <Input
                  id="adoption_status"
                  name="adoption_status"
                  value={animalData.adoption_status || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="special_needs">Special Needs</Label>
                <Input
                  id="special_needs"
                  name="special_needs"
                  value={animalData.special_needs || ""}
                />
              </div>
              <div class="grid gap-1.5">
                <Label for="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  type="textarea"
                  value={animalData.description || ""}
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
        {#if !animalData && rfidTag}
          <section class="space-y-4">
            <h3
              class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"
            >
              <span class="h-3 w-0.5 rounded bg-indigo-500"></span> Assign RFID Tag
            </h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Tag <code
                class="font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800"
                >{rfidTag}</code
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
                          {animals.find((a) => a.uuid === selectedAnimalId)
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
                        {#each animals as a (a.uuid)}
                          <CommandItem
                            value={a.name}
                            onSelect={() => {
                              selectedAnimalId = a.uuid;
                              popoverOpen = false;
                            }}
                          >
                            <span class="truncate">{a.name}</span>
                            {#if selectedAnimalId === a.uuid}
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
                    {animals.find((a) => a.id === selectedAnimalId)?.species}
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
              name="favoriteFruit"
              bind:value={newNoteType}
            >
              <Select.Trigger class="w-[180px]">
                {triggerContent}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Note Types</Select.Label>
                  {#each noteTypes as noteType (noteType.value)}
                    <Select.Item value={noteType.value} label={noteType.label}>
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
      <Button variant="outline" onclick={onClose}>Close</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
