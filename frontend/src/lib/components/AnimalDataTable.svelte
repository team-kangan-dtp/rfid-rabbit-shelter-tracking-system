<script lang="ts">
  import AnimalFilters from "$lib/components/AnimalFilters.svelte";
  import AnimalList from "$lib/components/AnimalList.svelte";
  import AnimalModal from "$lib/components/AnimalModal.svelte";
  import AnimalCreateForm from "$lib/components/AnimalCreateForm.svelte";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import type { Animal, AnimalModalMode } from "$lib/types";

  export let data: Animal[] = [];

  // Modal state
  let showAnimalModal = false;
  let viewingAnimal: Animal | null = null;
  let modalMode: AnimalModalMode = "view";

  // Form state
  let showCreateForm = false;
  let editingAnimal: Animal | null = null;

  // Filtered animals
  let filteredAnimals: Animal[] = data;

  // Update filtered animals when data prop changes
  $: if (data) {
    filteredAnimals = data;
  }

  // Handle filter changes
  function handleFilterChange(filtered: Animal[]) {
    filteredAnimals = filtered;
  }

  // Handle edit from data table
  function handleEdit(animal: Animal) {
    viewingAnimal = { ...animal };
    modalMode = "edit";
    showCreateForm = false;
    showAnimalModal = true;
  }

  // Handle view from data table
  function handleView(animal: Animal) {
    viewingAnimal = { ...animal };
    modalMode = "view";
    showAnimalModal = true;
  }

  // Handle delete from data table
  function handleDelete(animal: Animal) {
    if (confirm(`Are you sure you want to delete ${animal.name}?`)) {
      // TODO: Implement actual deletion logic
      // This should dispatch an event to the parent component or call an API
      console.log("Delete animal:", animal);
      
      // For now, we'll just close any open modals
      showAnimalModal = false;
      showCreateForm = false;
    }
  }

  // Handle create new animal
  function handleCreate() {
    showCreateForm = true;
    editingAnimal = null;
    showAnimalModal = false;
  }

  function handleCancel() {
    editingAnimal = null;
    showCreateForm = false;
    showAnimalModal = false;
    viewingAnimal = null;
    modalMode = "view";
  }

  function handleFormSubmit() {
    showCreateForm = false;
  }
</script>

<!-- Search and Filter Section -->
<AnimalFilters
  animals={data}
  onFilterChange={handleFilterChange}
  onCreateClick={handleCreate}
/>


<AnimalList
  animals={filteredAnimals}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

<!-- Create New Animal Sheet -->
<Sheet.Root bind:open={showCreateForm}>
  <Sheet.Content class="sm:max-w-lg overflow-y-auto">
    <Sheet.Header>
      <Sheet.Title>Add New Animal</Sheet.Title>
    </Sheet.Header>

    <AnimalCreateForm allAnimals={data} onSubmit={handleFormSubmit} />

    <div class="flex justify-end space-x-2 pt-4">
      <Button type="button" variant="outline" onclick={handleCancel}>
        Cancel
      </Button>
      <Button type="submit" form="create-animal-form">Create Animal</Button>
    </div>
  </Sheet.Content>
</Sheet.Root>

<!-- Animal Modal -->
<AnimalModal animal={viewingAnimal} bind:open={showAnimalModal} mode={modalMode} allAnimals={data} />