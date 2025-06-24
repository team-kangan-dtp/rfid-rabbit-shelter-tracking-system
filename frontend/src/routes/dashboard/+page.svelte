<script lang="ts">
  import type { PageData } from "./$types";

  // Get the data from the server
  export let data: PageData;

  // Define the Animal type
  type Animal = {
    animal_id: string;
    name: string;
    species: string;
    breed?: string;
    dob?: string;
    arrival_date: string;
    neutered: boolean;
    adoption_status: string;
    bonded_with?: string;
  };

  // State for editing and creating
  let editingAnimal: Animal | null = null;
  let showCreateForm = false;

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
    dob: "",
    arrival_date: new Date().toISOString().split("T")[0], // Today's date
    neutered: false,
    adoption_status: "Available",
    bonded_with: "",
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
    editingAnimal = { ...animal };
    showCreateForm = false;
  }

  // Handle delete from data table
  function handleDelete(animal: Animal) {
    if (confirm(`Are you sure you want to delete ${animal.name}?`)) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "?/delete";

      const idInput = document.createElement("input");
      idInput.type = "hidden";
      idInput.name = "animal_id";
      idInput.value = animal.animal_id;

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
      dob: "",
      arrival_date: new Date().toISOString().split("T")[0],
      neutered: false,
      adoption_status: "Available",
      bonded_with: "",
    };
  }

  function handleCancel() {
    editingAnimal = null;
    showCreateForm = false;
  }

  // Add form submission handler for debugging
  function handleFormSubmit(event: Event) {
    // Let the form submit naturally - don't prevent default
  }
</script>

<!-- Styled Animals heading with better spacing -->
<div class="p-3 space-y-1">
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Animals
  </h1>
  <p class="text-xl text-muted-foreground">
    Manage your animal shelter records
  </p>
</div>

<!-- Search and Filter Section -->
<div class="p-3 border-b bg-gray-50">
  <div class="space-y-4">
    <!-- Search Bar -->
    <div>
      <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
        Search Animals
      </label>
      <input
        id="search"
        type="text"
        bind:value={searchTerm}
        placeholder="Search by name, species, or breed..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Filters Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Species Filter -->
      <div>
        <label
          for="species-filter"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Species
        </label>
        <select
          id="species-filter"
          bind:value={filterSpecies}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Species</option>
          {#each uniqueSpecies as species}
            <option value={species}>{species}</option>
          {/each}
        </select>
      </div>

      <!-- Adoption Status Filter -->
      <div>
        <label
          for="adoption-filter"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Adoption Status
        </label>
        <select
          id="adoption-filter"
          bind:value={filterAdoptionStatus}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          {#each uniqueAdoptionStatuses as status}
            <option value={status}>{status}</option>
          {/each}
        </select>
      </div>

      <!-- Neutered Filter -->
      <div>
        <label
          for="neutered-filter"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Neutered
        </label>
        <select
          id="neutered-filter"
          bind:value={filterNeutered}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <!-- Date From -->
      <div>
        <label
          for="date-from"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Arrival Date From
        </label>
        <input
          id="date-from"
          type="date"
          bind:value={filterDateFrom}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Date To -->
      <div>
        <label
          for="date-to"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Arrival Date To
        </label>
        <input
          id="date-to"
          type="date"
          bind:value={filterDateTo}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Filter Controls -->
    <div class="flex justify-between items-center">
      <div class="text-sm text-gray-600">
        Showing {filteredAnimals.length} of {data.animals.length} animals
      </div>
      <button
        on:click={clearFilters}
        class="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Clear Filters
      </button>
    </div>
  </div>
</div>

<!-- Animals List -->
<div class="p-3">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredAnimals as animal (animal.animal_id)}
      <div class="border rounded-lg p-4 shadow-sm">
        <div class="space-y-2">
          <h3 class="font-semibold text-lg">{animal.name}</h3>
          <div class="text-sm text-muted-foreground space-y-1">
            <p><span class="font-medium">Species:</span> {animal.species}</p>
            {#if animal.breed}
              <p><span class="font-medium">Breed:</span> {animal.breed}</p>
            {/if}
            {#if animal.dob}
              <p>
                <span class="font-medium">Date of Birth:</span>
                {animal.dob}
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
            {#if animal.bonded_with}
              <p>
                <span class="font-medium">Bonded With:</span>
                {animal.bonded_with}
              </p>
            {/if}
          </div>
          <div class="flex gap-2 pt-2">
            <button
              on:click={() => handleEdit(animal)}
              class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              on:click={() => handleDelete(animal)}
              class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    {:else}
      <div class="col-span-full text-center py-8 text-muted-foreground">
        <p>
          No animals found matching your filters. Try adjusting your search
          criteria.
        </p>
      </div>
    {/each}
  </div>

  <!-- Add Animal Button -->
  <div class="mt-6">
    <button
      on:click={handleCreate}
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Add New Animal
    </button>
  </div>
</div>

<!-- Create New Animal Modal/Dialog -->
{#if showCreateForm}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-xl font-semibold mb-4">Add New Animal</h2>

      <form method="POST" action="?/create" on:submit={handleFormSubmit}>
        <div class="space-y-4">
          <!-- Name -->
          <div>
            <label
              for="create-name"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Name *
            </label>
            <input
              id="create-name"
              type="text"
              name="name"
              bind:value={newAnimal.name}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Species -->
          <div>
            <label
              for="create-species"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Species *
            </label>
            <select
              id="create-species"
              name="species"
              bind:value={newAnimal.species}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Rabbit">Rabbit</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Guinea Pig">Guinea Pig</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <!-- Breed -->
          <div>
            <label
              for="create-breed"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Breed
            </label>
            <input
              id="create-breed"
              type="text"
              name="breed"
              bind:value={newAnimal.breed}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Date of Birth -->
          <div>
            <label
              for="create-dob"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <input
              id="create-dob"
              type="date"
              name="dob"
              bind:value={newAnimal.dob}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Arrival Date -->
          <div>
            <label
              for="create-arrival-date"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Arrival Date *
            </label>
            <input
              id="create-arrival-date"
              type="date"
              name="arrival_date"
              bind:value={newAnimal.arrival_date}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Neutered -->
          <div>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                name="neutered"
                bind:checked={newAnimal.neutered}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm font-medium text-gray-700"
                >Neutered/Spayed</span
              >
            </label>
          </div>

          <!-- Adoption Status -->
          <div>
            <label
              for="create-adoption-status"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Adoption Status *
            </label>
            <select
              id="create-adoption-status"
              name="adoption_status"
              bind:value={newAnimal.adoption_status}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Available">Available</option>
              <option value="Adopted">Adopted</option>
              <option value="Pending">Pending</option>
              <option value="Not Available">Not Available</option>
              <option value="Medical Hold">Medical Hold</option>
            </select>
          </div>

          <!-- Bonded With -->
          <div>
            <label
              for="create-bonded-with"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Bonded With (Animal ID)
            </label>
            <input
              id="create-bonded-with"
              type="text"
              name="bonded_with"
              bind:value={newAnimal.bonded_with}
              placeholder="Enter animal ID if bonded"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-3 mt-6">
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Animal
          </button>
          <button
            type="button"
            on:click={handleCancel}
            class="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Edit Animal Modal/Dialog -->
{#if editingAnimal}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-xl font-semibold mb-4">
        Edit Animal: {editingAnimal.name}
      </h2>

      <form method="POST" action="?/update" on:submit={handleFormSubmit}>
        <!-- Hidden field for animal ID -->
        <input type="hidden" name="animal_id" value={editingAnimal.animal_id} />

        <div class="space-y-4">
          <!-- Name -->
          <div>
            <label
              for="edit-name"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Name *
            </label>
            <input
              id="edit-name"
              type="text"
              name="name"
              bind:value={editingAnimal.name}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Species -->
          <div>
            <label
              for="edit-species"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Species *
            </label>
            <select
              id="edit-species"
              name="species"
              bind:value={editingAnimal.species}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Rabbit">Rabbit</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Guinea Pig">Guinea Pig</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <!-- Breed -->
          <div>
            <label
              for="edit-breed"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Breed
            </label>
            <input
              id="edit-breed"
              type="text"
              name="breed"
              bind:value={editingAnimal.breed}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Date of Birth -->
          <div>
            <label
              for="edit-dob"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <input
              id="edit-dob"
              type="date"
              name="dob"
              bind:value={editingAnimal.dob}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Arrival Date -->
          <div>
            <label
              for="edit-arrival-date"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Arrival Date *
            </label>
            <input
              id="edit-arrival-date"
              type="date"
              name="arrival_date"
              bind:value={editingAnimal.arrival_date}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Neutered -->
          <div>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                name="neutered"
                bind:checked={editingAnimal.neutered}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm font-medium text-gray-700"
                >Neutered/Spayed</span
              >
            </label>
          </div>

          <!-- Adoption Status -->
          <div>
            <label
              for="edit-adoption-status"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Adoption Status *
            </label>
            <select
              id="edit-adoption-status"
              name="adoption_status"
              bind:value={editingAnimal.adoption_status}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Available">Available</option>
              <option value="Adopted">Adopted</option>
              <option value="Pending">Pending</option>
              <option value="Not Available">Not Available</option>
              <option value="Medical Hold">Medical Hold</option>
            </select>
          </div>

          <!-- Bonded With -->
          <div>
            <label
              for="edit-bonded-with"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Bonded With (Animal ID)
            </label>
            <input
              id="edit-bonded-with"
              type="text"
              name="bonded_with"
              bind:value={editingAnimal.bonded_with}
              placeholder="Enter animal ID if bonded"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-3 mt-6">
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Animal
          </button>
          <button
            type="button"
            on:click={handleCancel}
            class="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
