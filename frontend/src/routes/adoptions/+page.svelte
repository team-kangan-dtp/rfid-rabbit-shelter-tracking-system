<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";

  // Get the data from the server
  export let data: PageData;

  // Define the Adoption type based on database schema
  type Adoption = {
    id: string;
    animal_id: string;
    adopter_id: string;
    adoption_date: string;
    adoption_fee: number;
    return_date?: string;
    return_reason?: string;
    adoption_status: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
    animal?: {
      id: string;
      name: string;
      species: string;
      breed?: string;
    };
    adopter?: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    };
  };

  // State for editing and creating
  let editingAdoption: Adoption | null = null;
  let showCreateForm = false;
  let showEditForm = false;

  // Update showEditForm when editingAdoption changes
  $: showEditForm = editingAdoption !== null;

  // Filter/Search state
  let searchTerm = "";
  let filterStatus = "";
  let filterDateFrom = "";
  let filterDateTo = "";

  // New adoption form data
  let newAdoption = {
    animal_id: "",
    adopter_id: "",
    adoption_date: new Date().toISOString().split("T")[0],
    adoption_fee: "",
    adoption_status: "Active",
    notes: "",
  };

  // Check if panel should be visible
  $: showPanel = showCreateForm || editingAdoption !== null;

  // Get unique values for filters
  $: uniqueStatuses = [
    ...new Set(data.adoptions.map((adoption) => adoption.adoption_status)),
  ];

  // Filtered adoptions based on search and filters
  $: filteredAdoptions = data.adoptions.filter((adoption) => {
    // Search term filter (animal name, adopter name, email)
    const matchesSearch =
      searchTerm === "" ||
      (adoption.animal?.name && adoption.animal.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (adoption.adopter?.first_name && adoption.adopter.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (adoption.adopter?.last_name && adoption.adopter.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (adoption.adopter?.email && adoption.adopter.email.toLowerCase().includes(searchTerm.toLowerCase()));

    // Status filter
    const matchesStatus =
      filterStatus === "" || adoption.adoption_status === filterStatus;

    // Date range filter (using adoption_date)
    const matchesDateRange = (() => {
      if (!filterDateFrom && !filterDateTo) return true;

      const adoptionDate = new Date(adoption.adoption_date);
      const fromDate = filterDateFrom ? new Date(filterDateFrom) : null;
      const toDate = filterDateTo ? new Date(filterDateTo) : null;

      if (fromDate && toDate) {
        return adoptionDate >= fromDate && adoptionDate <= toDate;
      } else if (fromDate) {
        return adoptionDate >= fromDate;
      } else if (toDate) {
        return adoptionDate <= toDate;
      }
      return true;
    })();

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Clear all filters
  function clearFilters() {
    searchTerm = "";
    filterStatus = "";
    filterDateFrom = "";
    filterDateTo = "";
  }

  // Handle edit from data table
  function handleEdit(adoption: Adoption) {
    editingAdoption = { ...adoption };
    showCreateForm = false;
  }

  // Handle delete from data table
  function handleDelete(adoption: Adoption) {
    const animalName = adoption.animal?.name || "Unknown Animal";
    const adopterName = adoption.adopter ? `${adoption.adopter.first_name} ${adoption.adopter.last_name}` : "Unknown Adopter";
    
    if (confirm(`Are you sure you want to delete the adoption record for ${animalName} adopted by ${adopterName}?`)) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "?/delete";

      const idInput = document.createElement("input");
      idInput.type = "hidden";
      idInput.name = "id";
      idInput.value = adoption.id;

      form.appendChild(idInput);
      document.body.appendChild(form);
      form.submit();
    }
  }

  function handleCreate() {
    editingAdoption = null;
    showCreateForm = true;
    // Reset the new adoption form
    newAdoption = {
      animal_id: "",
      adopter_id: "",
      adoption_date: new Date().toISOString().split("T")[0],
      adoption_fee: "",
      adoption_status: "Active",
      notes: "",
    };
  }

  function handleCancel() {
    editingAdoption = null;
    showCreateForm = false;
  }

  // Add form submission handler for debugging
  function handleFormSubmit(event: Event) {
    // Let the form submit naturally - don't prevent default
  }
</script>

<!-- Adoptions heading -->
<div class="p-6 pb-0">
  <div class="flex items-center justify-between">
    <div class="space-y-1">
      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Adoptions
      </h1>
      <p class="text-xl text-muted-foreground">
        Manage animal adoption records
      </p>
    </div>
    <!-- Add Adoption Button moved to top -->
    <Button onclick={handleCreate}>Add New Adoption</Button>
  </div>
</div>

<!-- Search and Filter Section -->
<div class="p-6 space-y-6">
  <!-- Search Bar -->
  <div class="space-y-2">
    <Label for="search">Search Adoptions</Label>
    <Input
      id="search"
      type="text"
      bind:value={searchTerm}
      placeholder="Search by animal name, adopter name, or email..."
      class="w-full"
    />
  </div>

  <!-- Filters Card -->
  <Card.Root>
    <Card.Header>
      <Card.Title>Filters</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Status Filter -->
        <div class="space-y-2">
          <Label for="status-filter">Status</Label>
          <Select.Root type="single" bind:value={filterStatus}>
            <Select.Trigger class="w-full">
              {filterStatus || "All Statuses"}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="">All Statuses</Select.Item>
              {#each uniqueStatuses as status}
                <Select.Item value={status}>{status}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        <!-- Date From -->
        <div class="space-y-2">
          <Label for="date-from">Adoption Date From</Label>
          <Input
            id="date-from"
            type="date"
            bind:value={filterDateFrom}
            class="w-full"
          />
        </div>

        <!-- Date To -->
        <div class="space-y-2">
          <Label for="date-to">Adoption Date To</Label>
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
          Showing {filteredAdoptions.length} of {data.adoptions.length} adoptions
        </div>
        <Button variant="outline" size="sm" onclick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Card.Content>
  </Card.Root>
</div>

<!-- Adoptions List -->
<div class="px-6 pb-6">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredAdoptions as adoption (adoption.id)}
      <Card.Root>
        <Card.Content class="p-4">
          <div class="space-y-3">
            <!-- Header with animal name and buttons -->
            <div class="flex items-start justify-between">
              <h3 class="font-semibold text-lg">
                {adoption.animal?.name || "Unknown Animal"}
              </h3>
              <div class="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onclick={() => handleEdit(adoption)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onclick={() => handleDelete(adoption)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <!-- Adoption details -->
            <div class="text-sm text-muted-foreground space-y-1">
              {#if adoption.animal}
                <p><span class="font-medium">Species:</span> {adoption.animal.species}</p>
                {#if adoption.animal.breed}
                  <p><span class="font-medium">Breed:</span> {adoption.animal.breed}</p>
                {/if}
              {/if}
              
              {#if adoption.adopter}
                <p>
                  <span class="font-medium">Adopter:</span>
                  {adoption.adopter.first_name} {adoption.adopter.last_name}
                </p>
                <p><span class="font-medium">Email:</span> {adoption.adopter.email}</p>
                <p><span class="font-medium">Phone:</span> {adoption.adopter.phone}</p>
              {/if}
              
              <p>
                <span class="font-medium">Adoption Date:</span>
                {adoption.adoption_date}
              </p>
              <p>
                <span class="font-medium">Adoption Fee:</span>
                ${adoption.adoption_fee}
              </p>
              <p>
                <span class="font-medium">Status:</span>
                {adoption.adoption_status}
              </p>
              
              {#if adoption.return_date}
                <p>
                  <span class="font-medium">Return Date:</span>
                  {adoption.return_date}
                </p>
              {/if}
              
              {#if adoption.return_reason}
                <p>
                  <span class="font-medium">Return Reason:</span>
                  {adoption.return_reason}
                </p>
              {/if}
              
              {#if adoption.notes}
                <p>
                  <span class="font-medium">Notes:</span>
                  {adoption.notes}
                </p>
              {/if}
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    {:else}
      <div class="col-span-full text-center py-8 text-muted-foreground">
        <p>
          No adoptions found matching your filters. Try adjusting your search
          criteria.
        </p>
      </div>
    {/each}
  </div>
</div>

<!-- Create New Adoption Sheet -->
<Sheet.Root bind:open={showCreateForm}>
  <Sheet.Content class="sm:max-w-lg overflow-y-auto">
    <Sheet.Header>
      <Sheet.Title>Add New Adoption</Sheet.Title>
    </Sheet.Header>

    <form
      method="POST"
      action="?/create"
      on:submit={handleFormSubmit}
      class="space-y-4"
    >
      <!-- Animal Selection -->
      <div class="space-y-2">
        <Label for="create-animal">Animal *</Label>
        <Select.Root type="single" bind:value={newAdoption.animal_id}>
          <Select.Trigger>
            {#if newAdoption.animal_id}
              {data.animals.find(a => a.id === newAdoption.animal_id)?.name || "Select Animal"}
            {:else}
              Select Animal
            {/if}
          </Select.Trigger>
          <Select.Content>
            {#each data.animals as animal}
              <Select.Item value={animal.id}>
                {animal.name} ({animal.species}{animal.breed ? `, ${animal.breed}` : ""})
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
        <input type="hidden" name="animal_id" bind:value={newAdoption.animal_id} />
      </div>

      <!-- Adopter Selection -->
      <div class="space-y-2">
        <Label for="create-adopter">Adopter *</Label>
        <Select.Root type="single" bind:value={newAdoption.adopter_id}>
          <Select.Trigger>
            {#if newAdoption.adopter_id}
              {(() => {
                const adopter = data.adopters.find(a => a.id === newAdoption.adopter_id);
                return adopter ? `${adopter.first_name} ${adopter.last_name}` : "Select Adopter";
              })()}
            {:else}
              Select Adopter
            {/if}
          </Select.Trigger>
          <Select.Content>
            {#each data.adopters as adopter}
              <Select.Item value={adopter.id}>
                {adopter.first_name} {adopter.last_name} ({adopter.email})
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
        <input type="hidden" name="adopter_id" bind:value={newAdoption.adopter_id} />
      </div>

      <!-- Adoption Date -->
      <div class="space-y-2">
        <Label for="create-adoption-date">Adoption Date *</Label>
        <Input
          id="create-adoption-date"
          type="date"
          name="adoption_date"
          bind:value={newAdoption.adoption_date}
          required
        />
      </div>

      <!-- Adoption Fee -->
      <div class="space-y-2">
        <Label for="create-adoption-fee">Adoption Fee ($)</Label>
        <Input
          id="create-adoption-fee"
          type="number"
          step="0.01"
          name="adoption_fee"
          bind:value={newAdoption.adoption_fee}
          placeholder="0.00"
        />
      </div>

      <!-- Status -->
      <div class="space-y-2">
        <Label for="create-status">Status *</Label>
        <Select.Root type="single" bind:value={newAdoption.adoption_status}>
          <Select.Trigger>
            {newAdoption.adoption_status}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="Active">Active</Select.Item>
            <Select.Item value="Returned">Returned</Select.Item>
            <Select.Item value="Cancelled">Cancelled</Select.Item>
          </Select.Content>
        </Select.Root>
        <input type="hidden" name="adoption_status" bind:value={newAdoption.adoption_status} />
      </div>

      <!-- Notes -->
      <div class="space-y-2">
        <Label for="create-notes">Notes</Label>
        <textarea
          id="create-notes"
          name="notes"
          bind:value={newAdoption.notes}
          placeholder="Additional notes about the adoption..."
          class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        ></textarea>
      </div>

      <!-- Form Actions -->
      <div class="flex gap-3 pt-4">
        <Button type="submit" class="flex-1">Create Adoption</Button>
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

<!-- Edit Adoption Sheet -->
<Sheet.Root bind:open={showEditForm}>
  <Sheet.Content class="sm:max-w-lg overflow-y-auto">
    <Sheet.Header>
      <Sheet.Title>Edit Adoption</Sheet.Title>
    </Sheet.Header>

    {#if editingAdoption}
      <form
        method="POST"
        action="?/update"
        on:submit={handleFormSubmit}
        class="space-y-4"
      >
        <!-- Hidden field for adoption ID -->
        <input type="hidden" name="id" value={editingAdoption.id} />

        <!-- Animal Selection -->
        <div class="space-y-2">
          <Label for="edit-animal">Animal *</Label>
          <Select.Root type="single" bind:value={editingAdoption.animal_id}>
            <Select.Trigger>
              {#if editingAdoption.animal_id}
                {data.animals.find(a => a.id === editingAdoption.animal_id)?.name || editingAdoption.animal?.name || "Select Animal"}
              {:else}
                Select Animal
              {/if}
            </Select.Trigger>
            <Select.Content>
              {#each data.animals as animal}
                <Select.Item value={animal.id}>
                  {animal.name} ({animal.species}{animal.breed ? `, ${animal.breed}` : ""})
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
          <input type="hidden" name="animal_id" bind:value={editingAdoption.animal_id} />
        </div>

        <!-- Adopter Selection -->
        <div class="space-y-2">
          <Label for="edit-adopter">Adopter *</Label>
          <Select.Root type="single" bind:value={editingAdoption.adopter_id}>
            <Select.Trigger>
              {#if editingAdoption.adopter_id}
                {(() => {
                  const adopter = data.adopters.find(a => a.id === editingAdoption.adopter_id) || editingAdoption.adopter;
                  return adopter ? `${adopter.first_name} ${adopter.last_name}` : "Select Adopter";
                })()}
              {:else}
                Select Adopter
              {/if}
            </Select.Trigger>
            <Select.Content>
              {#each data.adopters as adopter}
                <Select.Item value={adopter.id}>
                  {adopter.first_name} {adopter.last_name} ({adopter.email})
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
          <input type="hidden" name="adopter_id" bind:value={editingAdoption.adopter_id} />
        </div>

        <!-- Adoption Date -->
        <div class="space-y-2">
          <Label for="edit-adoption-date">Adoption Date *</Label>
          <Input
            id="edit-adoption-date"
            type="date"
            name="adoption_date"
            bind:value={editingAdoption.adoption_date}
            required
          />
        </div>

        <!-- Adoption Fee -->
        <div class="space-y-2">
          <Label for="edit-adoption-fee">Adoption Fee ($)</Label>
          <Input
            id="edit-adoption-fee"
            type="number"
            step="0.01"
            name="adoption_fee"
            bind:value={editingAdoption.adoption_fee}
          />
        </div>

        <!-- Status -->
        <div class="space-y-2">
          <Label for="edit-status">Status *</Label>
          <Select.Root type="single" bind:value={editingAdoption.adoption_status}>
            <Select.Trigger>
              {editingAdoption.adoption_status}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Active">Active</Select.Item>
              <Select.Item value="Returned">Returned</Select.Item>
              <Select.Item value="Cancelled">Cancelled</Select.Item>
            </Select.Content>
          </Select.Root>
          <input type="hidden" name="adoption_status" bind:value={editingAdoption.adoption_status} />
        </div>

        <!-- Return Date -->
        <div class="space-y-2">
          <Label for="edit-return-date">Return Date</Label>
          <Input
            id="edit-return-date"
            type="date"
            name="return_date"
            bind:value={editingAdoption.return_date}
          />
        </div>

        <!-- Return Reason -->
        <div class="space-y-2">
          <Label for="edit-return-reason">Return Reason</Label>
          <textarea
            id="edit-return-reason"
            name="return_reason"
            bind:value={editingAdoption.return_reason}
            placeholder="Reason for return (if applicable)..."
            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>
        </div>

        <!-- Notes -->
        <div class="space-y-2">
          <Label for="edit-notes">Notes</Label>
          <textarea
            id="edit-notes"
            name="notes"
            bind:value={editingAdoption.notes}
            placeholder="Additional notes about the adoption..."
            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-3 pt-4">
          <Button type="submit" class="flex-1">Update Adoption</Button>
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