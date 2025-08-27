<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
  import type { Animal, AnimalFilters } from "$lib/types";
  import { debounce } from "$lib/utils/debounce";
  import { onMount } from "svelte";

  export let animals: Animal[] = [];
  export let onFilterChange: (filtered: Animal[]) => void;
  export let onCreateClick: () => void;

  // Filter state
  let searchTerm = "";
  let filterSpecies = "";
  let filterAdoptionStatus = "";
  let filterNeutered = "";
  let filterDateFrom = "";
  let filterDateTo = "";

  // Get unique values for filters
  $: uniqueSpecies = [...new Set(animals.map((animal) => animal.species))];
  $: uniqueAdoptionStatuses = [
    ...new Set(animals.map((animal) => animal.adoption_status)),
  ];

  // Filtered animals based on search and filters
  $: filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      searchTerm === "" ||
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (animal.breed &&
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpecies =
      filterSpecies === "" || animal.species === filterSpecies;

    const matchesAdoptionStatus =
      filterAdoptionStatus === "" ||
      animal.adoption_status === filterAdoptionStatus;

    const matchesNeutered =
      filterNeutered === "" ||
      (filterNeutered === "yes" && animal.neutered) ||
      (filterNeutered === "no" && !animal.neutered);

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

  // Debounced filter change to improve performance
  const debouncedFilterChange = debounce((filtered: Animal[]) => {
    onFilterChange(filtered);
  }, 300);

  // Call parent when filters change
  $: debouncedFilterChange(filteredAnimals);

  // Clear all filters
  function clearFilters() {
    searchTerm = "";
    filterSpecies = "";
    filterAdoptionStatus = "";
    filterNeutered = "";
    filterDateFrom = "";
    filterDateTo = "";
  }
</script>

<!-- Search and Filter Section -->
<div class="flex flex-col gap-4 py-4">
  <!-- Search Bar - Match scan logs styling -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
    <span class="flex items-center">
      <SearchIcon class="mr-3 text-gray-500" />
      <Input
        type="text"
        bind:value={searchTerm}
        placeholder="Search..."
        class="w-full sm:max-w-sm"
      />
    </span>
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
          Showing {filteredAnimals.length} of {animals.length} animals
        </div>
        <div class="flex gap-2">
          <Button variant="outline" size="sm" onclick={clearFilters}>
            Clear Filters
          </Button>
          <Button size="sm" onclick={onCreateClick}>Add New Animal</Button>
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</div>