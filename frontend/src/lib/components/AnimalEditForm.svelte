<script lang="ts">
  import AnimalFormField from "$lib/components/AnimalFormField.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { Animal } from "$lib/types";
  import { ANIMAL_SPECIES, ADOPTION_STATUSES } from "$lib/types";
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";

  export let animal: Animal;
  export let allAnimals: Animal[] = [];
  export let onUpdateSuccess: () => void = () => {};

  // Create a local copy for editing
  let editingAnimal: Animal = { ...animal };
  
  // Update local copy when animal prop changes
  $: if (animal) {
    editingAnimal = { ...animal };
  }

  // Species options
  const speciesOptions = ANIMAL_SPECIES;

  // Adoption status options
  const adoptionStatusOptions = ADOPTION_STATUSES;
</script>

<form 
  id="edit-animal-form" 
  method="POST" 
  action="?/update" 
  class="flex-1 space-y-4 overflow-y-auto"
  use:enhance={() => {
    return async ({ result, formData }) => {
      if (result.type === 'success') {
        const animalName = formData.get('name') as string;
        toast.success(`${animalName} has been updated successfully`);
        onUpdateSuccess();
      } else if (result.type === 'failure') {
        toast.error(result.data?.error || 'Failed to update animal');
      }
    };
  }}
>
  <input type="hidden" name="id" value={editingAnimal.id} />
  
  <!-- Name -->
  <AnimalFormField
    id="edit-name"
    label="Name"
    type="text"
    name="name"
    bind:value={editingAnimal.name}
    required={true}
  />

  <!-- Species -->
  <div class="space-y-2">
    <Label for="edit-species">Species *</Label>
    <Select.Root type="single" bind:value={editingAnimal.species}>
      <Select.Trigger>
        {editingAnimal.species}
      </Select.Trigger>
      <Select.Content>
        {#each speciesOptions as species}
          <Select.Item value={species}>{species}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <input type="hidden" name="species" bind:value={editingAnimal.species} />
  </div>

  <!-- Breed -->
  <AnimalFormField
    id="edit-breed"
    label="Breed"
    type="text"
    name="breed"
    bind:value={editingAnimal.breed}
  />

  <!-- Date of Birth -->
  <AnimalFormField
    id="edit-date-of-birth"
    label="Date of Birth"
    type="date"
    name="date_of_birth"
    bind:value={editingAnimal.date_of_birth}
  />

  <!-- Fur Colour -->
  <AnimalFormField
    id="edit-fur-colour"
    label="Fur Colour"
    type="text"
    name="fur_colour"
    bind:value={editingAnimal.fur_colour}
  />

  <!-- Weight -->
  <AnimalFormField
    id="edit-weight"
    label="Weight (kg)"
    type="number"
    name="weight_kg"
    bind:value={editingAnimal.weight_kg}
    step="0.1"
  />

  <!-- Arrival Date -->
  <AnimalFormField
    id="edit-arrival-date"
    label="Arrival Date"
    type="date"
    name="arrival_date"
    bind:value={editingAnimal.arrival_date}
    required={true}
  />

  <!-- Neutered -->
  <div class="flex items-center space-x-2">
    <Checkbox
      id="edit-neutered"
      name="neutered"
      bind:checked={editingAnimal.neutered}
    />
    <Label for="edit-neutered">Neutered/Spayed</Label>
  </div>

  <!-- Adoption Status -->
  <div class="space-y-2">
    <Label for="edit-adoption-status">Adoption Status *</Label>
    <Select.Root type="single" bind:value={editingAnimal.adoption_status}>
      <Select.Trigger>
        {editingAnimal.adoption_status}
      </Select.Trigger>
      <Select.Content>
        {#each adoptionStatusOptions as status}
          <Select.Item value={status}>{status}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <input type="hidden" name="adoption_status" bind:value={editingAnimal.adoption_status} />
  </div>

  <!-- RFID Tag -->
  <AnimalFormField
    id="edit-rfid-tag"
    label="RFID Tag"
    type="text"
    name="rfid_tag"
    bind:value={editingAnimal.rfid_tag}
  />

  <!-- Bonded With -->
  <div class="space-y-2">
    <Label for="edit-bonded-with">Bonded With</Label>
    <Select.Root type="single" bind:value={editingAnimal.bonded_with}>
      <Select.Trigger>
        {#if editingAnimal.bonded_with}
          {allAnimals.find(a => a.id === editingAnimal.bonded_with)?.name || editingAnimal.bonded_with}
        {:else}
          Select an animal...
        {/if}
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="">None</Select.Item>
        {#each allAnimals.filter(a => a.id !== editingAnimal.id) as bondAnimal}
          <Select.Item value={bondAnimal.id}>{bondAnimal.name} ({bondAnimal.species})</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <input type="hidden" name="bonded_with" bind:value={editingAnimal.bonded_with} />
  </div>

  <!-- Special Needs -->
  <AnimalFormField
    id="edit-special-needs"
    label="Special Needs"
    type="textarea"
    name="special_needs"
    bind:value={editingAnimal.special_needs}
    placeholder="Any special care requirements..."
  />

  <!-- Description -->
  <AnimalFormField
    id="edit-description"
    label="Description"
    type="textarea"
    name="description"
    bind:value={editingAnimal.description}
    placeholder="General description of the animal..."
  />
</form>