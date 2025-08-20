<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import AnimalModal from "$lib/components/AnimalModal.svelte";
  import PageHeader from "$lib/components/page-header.svelte";

  // Get the data from the server
  export let data: PageData;

  // Define the Animal type with updated schema
  type Animal = {
    id: string;
    name: string;
    species: string;
    breed?: string;
    date_of_birth?: string;
    fur_colour?: string;
    weight_kg?: number;
    arrival_date: string;
    neutered: boolean;
    adoption_status: string;
    bonded_with?: string;
    rfid_tag?: string;
    special_needs?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
  };

  // State for editing and creating
  let editingAnimal: Animal | null = null;
  let showCreateForm = false;
  let showEditForm = false;
  let showAnimalModal = false;
  let viewingAnimal: Animal | null = null;
  let modalMode: "view" | "edit" = "view";

  // Update showEditForm when editingAnimal changes
  $: showEditForm = editingAnimal !== null;

  // Filter/Search state
  let searchTerm = "";
  let filterSpecies = "";
  let filterAdoptionStatus = "";
  let filterNeutered = "";
  let filterDateFrom = "";
  let filterDateTo = "";

  // New animal form data
  let newAnimal = {
    name: "",
    species: "Rabbit",
    breed: "",
    date_of_birth: "",
    fur_colour: "",
    weight_kg: "",
    arrival_date: new Date().toISOString().split("T")[0], // Today's date
    neutered: false,
    adoption_status: "Available",
    bonded_with: "",
    rfid_tag: "",
    special_needs: "",
    description: "",
  };

  // Check if panel should be visible
  $: showPanel = showCreateForm || editingAnimal !== null;

  // Get unique values for filters
  $: uniqueSpecies = [...new Set(data.animals.map((animal) => animal.species))];
  $: uniqueAdoptionStatuses = [
    ...new Set(data.animals.map((animal) => animal.adoption_status)),
  ];

  // Filtered animals based on search and filters
  $: filteredAnimals = data.animals.filter((animal) => {
    // Search term filter (name, species, breed)
    const matchesSearch =
      searchTerm === "" ||
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (animal.breed &&
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase()));

    // Species filter
    const matchesSpecies =
      filterSpecies === "" || animal.species === filterSpecies;

    // Adoption status filter
    const matchesAdoptionStatus =
      filterAdoptionStatus === "" ||
      animal.adoption_status === filterAdoptionStatus;

    // Neutered filter
    const matchesNeutered =
      filterNeutered === "" ||
      (filterNeutered === "yes" && animal.neutered) ||
      (filterNeutered === "no" && !animal.neutered);

    // Date range filter (using arrival_date)
    const matchesDateRange = (() => {
      if (!filterDateFrom && !filterDateTo) return true;

      const animalDate = new Date(animal.arrival_date);
      const fromDate = filterDateFrom ? new Date(filterDateFrom) : null;
      const toDate = filterDateTo ? new Date(filterDateTo) : null;

      if (fromDate && toDate) {
        return animalDate >= fromDate && animalDate <= toDate;
      } else if (fromDate) {
        return animalDate >= fromDate;
      } else if (toDate) {
        return animalDate <= toDate;
      }
      return true;
    })();

    return (
      matchesSearch &&
      matchesSpecies &&
      matchesAdoptionStatus &&
      matchesNeutered &&
      matchesDateRange
    );
  });

  // Clear all filters
  function clearFilters() {
    searchTerm = "";
    filterSpecies = "";
    filterAdoptionStatus = "";
    filterNeutered = "";
    filterDateFrom = "";
    filterDateTo = "";
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
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "?/delete";

      const idInput = document.createElement("input");
      idInput.type = "hidden";
      idInput.name = "id";
      idInput.value = animal.id;

      form.appendChild(idInput);
      document.body.appendChild(form);
      form.submit();
    }
  }

  function handleCreate() {
    editingAnimal = null;
    showCreateForm = true;
    // Reset the new animal form
    newAnimal = {
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
  }

  function handleCancel() {
    editingAnimal = null;
    showCreateForm = false;
    showAnimalModal = false;
    viewingAnimal = null;
    modalMode = "view";
  }

  // Add form submission handler for debugging
  function handleFormSubmit(event: Event) {
    // Let the form submit naturally - don't prevent default
  }
</script>

<!-- Animals heading -->
<div class="p-6 pb-0">
  <PageHeader title="Animals" description="Manage your animal shelter records">
    {#snippet button()}
      <Button onclick={handleCreate}>Add New Animal</Button>
    {/snippet}
  </PageHeader>
</div>

<!-- Search and Filter Section -->
<div class="p-6 space-y-6">
  <!-- Search Bar -->
  <div class="space-y-2">
    <Label for="search">Search Animals</Label>
    <Input
      id="search"
      type="text"
      bind:value={searchTerm}
      placeholder="Search by name, species, or breed..."
      class="w-full"
    />
  </div>

  <!-- Filters Card -->
  <Card.Root>
    <Card.Header>
      <Card.Title>Filters</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Species Filter -->
        <div class="space-y-2">
          <Label for="species-filter">Species</Label>
          <Select.Root type="single" bind:value={filterSpecies}>
            <Select.Trigger class="w-full">
              {filterSpecies || "All Species"}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="">All Species</Select.Item>
              {#each uniqueSpecies as species}
                <Select.Item value={species}>{species}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        <!-- Adoption Status Filter -->
        <div class="space-y-2">
          <Label for="adoption-filter">Adoption Status</Label>
          <Select.Root type="single" bind:value={filterAdoptionStatus}>
            <Select.Trigger class="w-full">
              {filterAdoptionStatus || "All Statuses"}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="">All Statuses</Select.Item>
              {#each uniqueAdoptionStatuses as status}
                <Select.Item value={status}>{status}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        <!-- Neutered Filter -->
        <div class="space-y-2">
          <Label for="neutered-filter">Neutered</Label>
          <Select.Root type="single" bind:value={filterNeutered}>
            <Select.Trigger class="w-full">
              {filterNeutered || "All"}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="">All</Select.Item>
              <Select.Item value="yes">Yes</Select.Item>
              <Select.Item value="no">No</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <!-- Date From -->
        <div class="space-y-2">
          <Label for="date-from">Arrival Date From</Label>
          <Input
            id="date-from"
            type="date"
            bind:value={filterDateFrom}
            class="w-full"
          />
        </div>

        <!-- Date To -->
        <div class="space-y-2">
          <Label for="date-to">Arrival Date To</Label>
          <Input
            id="date-to"
            type="date"
            bind:value={filterDateTo}
            class="w-full"
          />
        </div>
      </div>

      <!-- Filter Controls -->
      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-muted-foreground">
          Showing {filteredAnimals.length} of {data.animals.length} animals
        </div>
        <Button variant="outline" size="sm" onclick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Card.Content>
  </Card.Root>
</div>

<!-- Animals List -->
<div class="px-6 pb-6">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredAnimals as animal (animal.id)}
      <Card.Root>
        <Card.Content class="p-4">
          <div class="space-y-3">
            <!-- Header with name and buttons -->
            <div class="flex items-start justify-between">
              <h3 class="font-semibold text-lg">{animal.name}</h3>
              <div class="flex gap-2 ml-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onclick={() => handleView(animal)}
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onclick={() => handleEdit(animal)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onclick={() => handleDelete(animal)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <!-- Animal details -->
            <div class="text-sm text-muted-foreground space-y-1">
              <p><span class="font-medium">Species:</span> {animal.species}</p>
              {#if animal.breed}
                <p><span class="font-medium">Breed:</span> {animal.breed}</p>
              {/if}
              {#if animal.date_of_birth}
                <p>
                  <span class="font-medium">Date of Birth:</span>
                  {animal.date_of_birth}
                </p>
              {/if}
              {#if animal.fur_colour}
                <p>
                  <span class="font-medium">Fur Colour:</span>
                  {animal.fur_colour}
                </p>
              {/if}
              {#if animal.weight_kg}
                <p>
                  <span class="font-medium">Weight:</span>
                  {animal.weight_kg} kg
                </p>
              {/if}
              <p>
                <span class="font-medium">Arrival Date:</span>
                {animal.arrival_date}
              </p>
              <p>
                <span class="font-medium">Neutered:</span>
                {animal.neutered ? "Yes" : "No"}
              </p>
              <p>
                <span class="font-medium">Adoption Status:</span>
                {animal.adoption_status}
              </p>
              {#if animal.rfid_tag}
                <p>
                  <span class="font-medium">RFID Tag:</span>
                  {animal.rfid_tag}
                </p>
              {/if}
              {#if animal.special_needs}
                <p>
                  <span class="font-medium">Special Needs:</span>
                  {animal.special_needs}
                </p>
              {/if}
              {#if animal.description}
                <p>
                  <span class="font-medium">Description:</span>
                  {animal.description}
                </p>
              {/if}
              {#if animal.bonded_with}
                <p>
                  <span class="font-medium">Bonded With:</span>
                  {animal.bonded_with}
                </p>
              {/if}
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    {:else}
      <div class="col-span-full text-center py-8 text-muted-foreground">
        <p>
          No animals found matching your filters. Try adjusting your search
          criteria.
        </p>
      </div>
    {/each}
  </div>
</div>

<!-- Create New Animal Sheet -->
<Sheet.Root bind:open={showCreateForm}>
  <Sheet.Content class="sm:max-w-lg overflow-y-auto">
    <Sheet.Header>
      <Sheet.Title>Add New Animal</Sheet.Title>
    </Sheet.Header>

    <form
      method="POST"
      action="?/create"
      on:submit={handleFormSubmit}
      class="space-y-4"
    >
      <!-- Name -->
      <div class="space-y-2">
        <Label for="create-name">Name *</Label>
        <Input
          id="create-name"
          type="text"
          name="name"
          bind:value={newAnimal.name}
          required
        />
      </div>

      <!-- Species -->
      <div class="space-y-2">
        <Label for="create-species">Species *</Label>
        <Select.Root type="single" bind:value={newAnimal.species}>
          <Select.Trigger>
            {newAnimal.species}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="Rabbit">Rabbit</Select.Item>
            <Select.Item value="Dog">Dog</Select.Item>
            <Select.Item value="Cat">Cat</Select.Item>
            <Select.Item value="Guinea Pig">Guinea Pig</Select.Item>
            <Select.Item value="Bird">Bird</Select.Item>
            <Select.Item value="Other">Other</Select.Item>
          </Select.Content>
        </Select.Root>
        <input type="hidden" name="species" bind:value={newAnimal.species} />
      </div>

      <!-- Breed -->
      <div class="space-y-2">
        <Label for="create-breed">Breed</Label>
        <Input
          id="create-breed"
          type="text"
          name="breed"
          bind:value={newAnimal.breed}
        />
      </div>

      <!-- Date of Birth -->
      <div class="space-y-2">
        <Label for="create-date-of-birth">Date of Birth</Label>
        <Input
          id="create-date-of-birth"
          type="date"
          name="date_of_birth"
          bind:value={newAnimal.date_of_birth}
        />
      </div>

      <!-- Fur Colour -->
      <div class="space-y-2">
        <Label for="create-fur-colour">Fur Colour</Label>
        <Input
          id="create-fur-colour"
          type="text"
          name="fur_colour"
          bind:value={newAnimal.fur_colour}
        />
      </div>

      <!-- Weight -->
      <div class="space-y-2">
        <Label for="create-weight">Weight (kg)</Label>
        <Input
          id="create-weight"
          type="number"
          step="0.1"
          name="weight_kg"
          bind:value={newAnimal.weight_kg}
        />
      </div>

      <!-- Arrival Date -->
      <div class="space-y-2">
        <Label for="create-arrival-date">Arrival Date *</Label>
        <Input
          id="create-arrival-date"
          type="date"
          name="arrival_date"
          bind:value={newAnimal.arrival_date}
          required
        />
      </div>

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
            <Select.Item value="Available">Available</Select.Item>
            <Select.Item value="Pending">Pending</Select.Item>
            <Select.Item value="Adopted">Adopted</Select.Item>
            <Select.Item value="Hold">Hold</Select.Item>
            <Select.Item value="Medical Hold">Medical Hold</Select.Item>
            <Select.Item value="Not Available">Not Available</Select.Item>
          </Select.Content>
        </Select.Root>
        <input
          type="hidden"
          name="adoption_status"
          bind:value={newAnimal.adoption_status}
        />
      </div>

      <!-- RFID Tag -->
      <div class="space-y-2">
        <Label for="create-rfid-tag">RFID Tag</Label>
        <Input
          id="create-rfid-tag"
          type="text"
          name="rfid_tag"
          bind:value={newAnimal.rfid_tag}
        />
      </div>

      <!-- Bonded With -->
      <div class="space-y-2">
        <Label for="create-bonded-with">Bonded With (Animal ID)</Label>
        <Input
          id="create-bonded-with"
          type="text"
          name="bonded_with"
          bind:value={newAnimal.bonded_with}
          placeholder="Enter animal ID if bonded"
        />
      </div>

      <!-- Special Needs -->
      <div class="space-y-2">
        <Label for="create-special-needs">Special Needs</Label>
        <textarea
          id="create-special-needs"
          name="special_needs"
          bind:value={newAnimal.special_needs}
          placeholder="Any special care requirements..."
          class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        ></textarea>
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <Label for="create-description">Description</Label>
        <textarea
          id="create-description"
          name="description"
          bind:value={newAnimal.description}
          placeholder="General description of the animal..."
          class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        ></textarea>
      </div>

      <!-- Form Actions -->
      <div class="flex gap-3 pt-4">
        <Button type="submit" class="flex-1">Create Animal</Button>
        <Button
          type="button"
          variant="outline"
          class="flex-1"
          onclick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  </Sheet.Content>
</Sheet.Root>

<!-- Edit Animal Sheet -->
<Sheet.Root bind:open={showEditForm}>
  <Sheet.Content class="sm:max-w-lg overflow-y-auto">
    <Sheet.Header>
      <Sheet.Title>Edit Animal: {editingAnimal?.name}</Sheet.Title>
    </Sheet.Header>

    {#if editingAnimal}
      <form
        method="POST"
        action="?/update"
        on:submit={handleFormSubmit}
        class="space-y-4"
      >
        <!-- Hidden field for animal ID -->
        <input type="hidden" name="id" value={editingAnimal.id} />

        <!-- Name -->
        <div class="space-y-2">
          <Label for="edit-name">Name *</Label>
          <Input
            id="edit-name"
            type="text"
            name="name"
            bind:value={editingAnimal.name}
            required
          />
        </div>

        <!-- Species -->
        <div class="space-y-2">
          <Label for="edit-species">Species *</Label>
          <Select.Root type="single" bind:value={editingAnimal.species}>
            <Select.Trigger>
              {editingAnimal.species}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Rabbit">Rabbit</Select.Item>
              <Select.Item value="Dog">Dog</Select.Item>
              <Select.Item value="Cat">Cat</Select.Item>
              <Select.Item value="Guinea Pig">Guinea Pig</Select.Item>
              <Select.Item value="Bird">Bird</Select.Item>
              <Select.Item value="Other">Other</Select.Item>
            </Select.Content>
          </Select.Root>
          <input
            type="hidden"
            name="species"
            bind:value={editingAnimal.species}
          />
        </div>

        <!-- Breed -->
        <div class="space-y-2">
          <Label for="edit-breed">Breed</Label>
          <Input
            id="edit-breed"
            type="text"
            name="breed"
            bind:value={editingAnimal.breed}
          />
        </div>

        <!-- Date of Birth -->
        <div class="space-y-2">
          <Label for="edit-date-of-birth">Date of Birth</Label>
          <Input
            id="edit-date-of-birth"
            type="date"
            name="date_of_birth"
            bind:value={editingAnimal.date_of_birth}
          />
        </div>

        <!-- Fur Colour -->
        <div class="space-y-2">
          <Label for="edit-fur-colour">Fur Colour</Label>
          <Input
            id="edit-fur-colour"
            type="text"
            name="fur_colour"
            bind:value={editingAnimal.fur_colour}
          />
        </div>

        <!-- Weight -->
        <div class="space-y-2">
          <Label for="edit-weight">Weight (kg)</Label>
          <Input
            id="edit-weight"
            type="number"
            step="0.1"
            name="weight_kg"
            bind:value={editingAnimal.weight_kg}
          />
        </div>

        <!-- Arrival Date -->
        <div class="space-y-2">
          <Label for="edit-arrival-date">Arrival Date *</Label>
          <Input
            id="edit-arrival-date"
            type="date"
            name="arrival_date"
            bind:value={editingAnimal.arrival_date}
            required
          />
        </div>

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
              <Select.Item value="Available">Available</Select.Item>
              <Select.Item value="Pending">Pending</Select.Item>
              <Select.Item value="Adopted">Adopted</Select.Item>
              <Select.Item value="Hold">Hold</Select.Item>
              <Select.Item value="Medical Hold">Medical Hold</Select.Item>
              <Select.Item value="Not Available">Not Available</Select.Item>
            </Select.Content>
          </Select.Root>
          <input
            type="hidden"
            name="adoption_status"
            bind:value={editingAnimal.adoption_status}
          />
        </div>

        <!-- RFID Tag -->
        <div class="space-y-2">
          <Label for="edit-rfid-tag">RFID Tag</Label>
          <Input
            id="edit-rfid-tag"
            type="text"
            name="rfid_tag"
            bind:value={editingAnimal.rfid_tag}
          />
        </div>

        <!-- Bonded With -->
        <div class="space-y-2">
          <Label for="edit-bonded-with">Bonded With (Animal ID)</Label>
          <Input
            id="edit-bonded-with"
            type="text"
            name="bonded_with"
            bind:value={editingAnimal.bonded_with}
            placeholder="Enter animal ID if bonded"
          />
        </div>

        <!-- Special Needs -->
        <div class="space-y-2">
          <Label for="edit-special-needs">Special Needs</Label>
          <textarea
            id="edit-special-needs"
            name="special_needs"
            bind:value={editingAnimal.special_needs}
            placeholder="Any special care requirements..."
            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <Label for="edit-description">Description</Label>
          <textarea
            id="edit-description"
            name="description"
            bind:value={editingAnimal.description}
            placeholder="General description of the animal..."
            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-3 pt-4">
          <Button type="submit" class="flex-1">Update Animal</Button>
          <Button
            type="button"
            variant="outline"
            class="flex-1"
            onclick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    {/if}
  </Sheet.Content>
</Sheet.Root>

<!-- Animal Modal -->
<AnimalModal animal={viewingAnimal} bind:open={showAnimalModal} mode={modalMode} />
