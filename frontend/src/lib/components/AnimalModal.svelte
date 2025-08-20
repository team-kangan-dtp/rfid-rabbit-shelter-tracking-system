<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";

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

  export let animal: Animal | null = null;
  export let open: boolean = false;
  export let mode: "view" | "edit" = "view";

  // Create a local copy for editing
  let editingAnimal: Animal | null = null;
  
  // Update local copy when animal prop changes
  $: if (animal && mode === "edit") {
    editingAnimal = { ...animal };
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="max-w-2xl max-h-[90vh] flex flex-col">
    <Dialog.Header>
      <Dialog.Title>
        {animal ? `${mode === "edit" ? "Edit" : "View"} ${animal.name}` : "Animal Details"}
      </Dialog.Title>
      <Dialog.Description>
        {mode === "edit" ? "Make changes to the animal's information below." : "View detailed information about this animal."}
      </Dialog.Description>
    </Dialog.Header>
    
    <!-- Dialog Body Content -->
    {#if animal}
      {#if mode === "view"}
        <!-- View Mode Content -->
        <div class="flex-1 space-y-6 overflow-y-auto">
          <!-- Basic Information Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Basic Information</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium text-muted-foreground">Species:</span>
                <p class="mt-1">{animal.species}</p>
              </div>
              {#if animal.breed}
                <div>
                  <span class="font-medium text-muted-foreground">Breed:</span>
                  <p class="mt-1">{animal.breed}</p>
                </div>
              {/if}
              {#if animal.date_of_birth}
                <div>
                  <span class="font-medium text-muted-foreground">Date of Birth:</span>
                  <p class="mt-1">{animal.date_of_birth}</p>
                </div>
              {/if}
              {#if animal.fur_colour}
                <div>
                  <span class="font-medium text-muted-foreground">Fur Colour:</span>
                  <p class="mt-1">{animal.fur_colour}</p>
                </div>
              {/if}
              {#if animal.weight_kg}
                <div>
                  <span class="font-medium text-muted-foreground">Weight:</span>
                  <p class="mt-1">{animal.weight_kg} kg</p>
                </div>
              {/if}
            </div>
          </div>

          <!-- Status Information Section -->
          <div class="space-y-4 border-t pt-4">
            <h3 class="text-lg font-semibold">Status Information</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium text-muted-foreground">Arrival Date:</span>
                <p class="mt-1">{animal.arrival_date}</p>
              </div>
              <div>
                <span class="font-medium text-muted-foreground">Neutered:</span>
                <p class="mt-1">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                    {animal.neutered ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    {animal.neutered ? "Yes" : "No"}
                  </span>
                </p>
              </div>
              <div>
                <span class="font-medium text-muted-foreground">Adoption Status:</span>
                <p class="mt-1">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                    {animal.adoption_status === 'Available' ? 'bg-green-100 text-green-800' : 
                     animal.adoption_status === 'Adopted' ? 'bg-blue-100 text-blue-800' : 
                     animal.adoption_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                     'bg-gray-100 text-gray-800'}">
                    {animal.adoption_status}
                  </span>
                </p>
              </div>
              {#if animal.rfid_tag}
                <div>
                  <span class="font-medium text-muted-foreground">RFID Tag:</span>
                  <p class="mt-1 font-mono text-sm">{animal.rfid_tag}</p>
                </div>
              {/if}
              {#if animal.bonded_with}
                <div>
                  <span class="font-medium text-muted-foreground">Bonded With:</span>
                  <p class="mt-1">{animal.bonded_with}</p>
                </div>
              {/if}
            </div>
          </div>

          <!-- Additional Information Section -->
          {#if animal.special_needs || animal.description}
            <div class="space-y-4 border-t pt-4">
              <h3 class="text-lg font-semibold">Additional Information</h3>
              {#if animal.special_needs}
                <div>
                  <span class="font-medium text-muted-foreground">Special Needs:</span>
                  <div class="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <p class="text-sm">{animal.special_needs}</p>
                  </div>
                </div>
              {/if}
              {#if animal.description}
                <div>
                  <span class="font-medium text-muted-foreground">Description:</span>
                  <div class="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <p class="text-sm">{animal.description}</p>
                  </div>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {:else if mode === "edit" && editingAnimal}
        <!-- Edit Mode Content -->
        <form id="edit-animal-form" method="POST" action="?/update" class="flex-1 space-y-4 overflow-y-auto">
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
            <input type="hidden" name="species" bind:value={editingAnimal.species} />
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
            <input type="hidden" name="adoption_status" bind:value={editingAnimal.adoption_status} />
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

        </form>
      {/if}
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