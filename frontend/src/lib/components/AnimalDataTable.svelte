<script lang="ts">
  import AnimalDataTablePaginated from "$lib/components/animal-table/animal-data-table.svelte";
  import { columns } from "$lib/components/animal-table/animal-columns";
  import AnimalFilters from "$lib/components/AnimalFilters.svelte";
  import AnimalModal from "$lib/components/AnimalModal.svelte";
  import AnimalCreateForm from "$lib/components/AnimalCreateForm.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import type { Animal, AnimalModalMode } from "$lib/types";
  import { supabase } from "$lib/supabaseClient";
  import { invalidateAll } from "$app/navigation";

  export let data: Animal[] = [];

  // Modal state
  let showAnimalModal = false;
  let viewingAnimal: Animal | null = null;
  let modalMode: AnimalModalMode = "view";

  // Form state
  let showCreateForm = false;

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
  async function handleDelete(animal: Animal) {
    if (!animal.id) {
      alert(`Cannot delete ${animal.name}: Invalid ID`);
      return;
    }

    if (!confirm(`Are you sure you want to delete ${animal.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('animal')
        .delete()
        .eq('id', animal.id);

      if (error) {
        alert(`Failed to delete ${animal.name}: ${error.message}`);
        return;
      }

      await invalidateAll();
      showAnimalModal = false;
      showCreateForm = false;
    } catch (err) {
      alert(`Failed to delete ${animal.name}: An unexpected error occurred`);
    }
  }

  // Handle create new animal
  function handleCreate() {
    showCreateForm = true;
    showAnimalModal = false;
  }

  function handleCancel() {
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

<!-- Paginated Animal Data Table -->
<AnimalDataTablePaginated
  data={filteredAnimals}
  {columns}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

<!-- Create New Animal Dialog -->
<Dialog.Root bind:open={showCreateForm}>
  <Dialog.Content class="max-w-2xl max-h-[90vh] flex flex-col">
    <Dialog.Header class="flex-shrink-0">
      <Dialog.Title>Add New Animal</Dialog.Title>
      <Dialog.Description>
        Fill in the details below to add a new animal to the shelter.
      </Dialog.Description>
    </Dialog.Header>

    <div class="flex-1 overflow-y-auto px-6">
      <AnimalCreateForm allAnimals={data} onSubmit={handleFormSubmit} />
    </div>

    <Dialog.Footer class="flex-shrink-0">
      <Button type="button" variant="outline" onclick={handleCancel}>
        Cancel
      </Button>
      <Button type="submit" form="create-animal-form">Create Animal</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Animal Modal -->
<AnimalModal
  animal={viewingAnimal}
  bind:open={showAnimalModal}
  mode={modalMode}
  allAnimals={data}
/>
