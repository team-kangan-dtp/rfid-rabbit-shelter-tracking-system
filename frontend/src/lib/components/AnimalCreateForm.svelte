<script lang="ts">
  import AnimalFormField from "$lib/components/AnimalFormField.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { Animal, AnimalCreateData } from "$lib/types";
  import { ANIMAL_SPECIES, ADOPTION_STATUSES } from "$lib/types";

  export let allAnimals: Animal[] = [];
  export let onSubmit: (event: Event) => void = () => {};

  // New animal form data
  let newAnimal: AnimalCreateData = {
    name: "",
    species: "Rabbit",
    breed: "",
    date_of_birth: "",
    fur_colour: "",
    weight_kg: "",
    arrival_date: new Date().toISOString().split("T")[0],
    neutered: false,
    adoption_status: "Available",
    bonded_with: "",
    rfid_tag: "",
    special_needs: "",
    description: "",
  };

  // Species options
  const speciesOptions = ANIMAL_SPECIES;

  // Adoption status options
  const adoptionStatusOptions = ADOPTION_STATUSES;
</script>

<form
  id="create-animal-form"
  method="POST"
  action="?/create"
  on:submit={onSubmit}
  class="space-y-4"
>
  <!-- Name -->
  <AnimalFormField
    id="create-name"
    label="Name"
    type="text"
    name="name"
    bind:value={newAnimal.name}
    required={true}
  />

  <!-- Species -->
  <div class="space-y-2">
    <Label for="create-species">Species *</Label>
    <Select.Root type="single" bind:value={newAnimal.species}>
      <Select.Trigger>
        {newAnimal.species}
      </Select.Trigger>
      <Select.Content>
        {#each speciesOptions as species}
          <Select.Item value={species}>{species}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <input type="hidden" name="species" bind:value={newAnimal.species} />
  </div>

  <!-- Breed -->
  <AnimalFormField
    id="create-breed"
    label="Breed"
    type="text"
    name="breed"
    bind:value={newAnimal.breed}
  />

  <!-- Date of Birth -->
  <AnimalFormField
    id="create-date-of-birth"
    label="Date of Birth"
    type="date"
    name="date_of_birth"
    bind:value={newAnimal.date_of_birth}
  />

  <!-- Fur Colour -->
  <AnimalFormField
    id="create-fur-colour"
    label="Fur Colour"
    type="text"
    name="fur_colour"
    bind:value={newAnimal.fur_colour}
  />

  <!-- Weight -->
  <AnimalFormField
    id="create-weight"
    label="Weight (kg)"
    type="number"
    name="weight_kg"
    bind:value={newAnimal.weight_kg}
    step="0.1"
  />

  <!-- Arrival Date -->
  <AnimalFormField
    id="create-arrival-date"
    label="Arrival Date"
    type="date"
    name="arrival_date"
    bind:value={newAnimal.arrival_date}
    required={true}
  />

  <!-- Neutered -->
  <div class="flex items-center space-x-2">
    <Checkbox
      id="create-neutered"
      name="neutered"
      bind:checked={newAnimal.neutered}
    />
    <Label for="create-neutered">Neutered/Spayed</Label>
  </div>

  <!-- Adoption Status -->
  <div class="space-y-2">
    <Label for="create-adoption-status">Adoption Status *</Label>
    <Select.Root type="single" bind:value={newAnimal.adoption_status}>
      <Select.Trigger>
        {newAnimal.adoption_status}
      </Select.Trigger>
      <Select.Content>
        {#each adoptionStatusOptions as status}
          <Select.Item value={status}>{status}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <input type="hidden" name="adoption_status" bind:value={newAnimal.adoption_status} />
  </div>

  <!-- RFID Tag -->
  <AnimalFormField
    id="create-rfid-tag"
    label="RFID Tag"
    type="text"
    name="rfid_tag"
    bind:value={newAnimal.rfid_tag}
  />

  <!-- Bonded With -->
  <div class="space-y-2">
    <Label for="create-bonded-with">Bonded With</Label>
    <Select.Root type="single" bind:value={newAnimal.bonded_with}>
      <Select.Trigger>
        {#if newAnimal.bonded_with}
          {allAnimals.find(a => a.id === newAnimal.bonded_with)?.name || newAnimal.bonded_with}
        {:else}
          Select an animal...
        {/if}
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="">None</Select.Item>
        {#each allAnimals as bondAnimal}
          <Select.Item value={bondAnimal.id}>{bondAnimal.name} ({bondAnimal.species})</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <input type="hidden" name="bonded_with" bind:value={newAnimal.bonded_with} />
  </div>

  <!-- Special Needs -->
  <AnimalFormField
    id="create-special-needs"
    label="Special Needs"
    type="textarea"
    name="special_needs"
    bind:value={newAnimal.special_needs}
    placeholder="Any special care requirements..."
  />

  <!-- Description -->
  <AnimalFormField
    id="create-description"
    label="Description"
    type="textarea"
    name="description"
    bind:value={newAnimal.description}
    placeholder="General description of the animal..."
  />
</form>