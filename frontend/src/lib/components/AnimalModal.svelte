<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import AnimalViewDetails from "$lib/components/AnimalViewDetails.svelte";
  import AnimalEditForm from "$lib/components/AnimalEditForm.svelte";
  import type { Animal, AnimalModalMode } from "$lib/types";

  export let animal: Animal | null = null;
  export let open: boolean = false;
  export let mode: AnimalModalMode = "view";
  export let allAnimals: Animal[] = [];

  // Create a local copy for editing
  let editingAnimal: Animal | null = null;
  
  // Update local copy when animal prop changes
  $: if (animal && mode === "edit") {
    editingAnimal = { ...animal };
  } else if (!animal) {
    editingAnimal = null;
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="max-w-2xl max-h-[90vh] flex flex-col">
    <Dialog.Header>
      <Dialog.Title>
        {animal ? animal.name : "Animal Details"}
      </Dialog.Title>
      <Dialog.Description>
        {mode === "edit" ? "Make changes to the animal's information below." : "View detailed information about this animal."}
      </Dialog.Description>
    </Dialog.Header>
    
    <!-- Dialog Body Content -->
    {#if animal}
      {#if mode === "view"}
        <AnimalViewDetails {animal} />
      {:else if mode === "edit" && editingAnimal}
        <AnimalEditForm animal={editingAnimal} {allAnimals} />
      {/if}
    {:else}
      <div class="flex items-center justify-center p-8">
        <p class="text-muted-foreground">No animal selected</p>
      </div>
    {/if}
    
    <!-- Dialog Footer for all modes -->
    <Dialog.Footer>
      {#if mode === "view"}
        <Button type="button" onclick={() => open = false}>
          Close
        </Button>
      {:else if mode === "edit"}
        <Button type="button" variant="outline" onclick={() => open = false}>
          Cancel
        </Button>
        <Button type="submit" form="edit-animal-form">
          Update Animal
        </Button>
      {/if}
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>