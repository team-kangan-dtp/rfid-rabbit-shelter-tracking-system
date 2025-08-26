<script lang="ts">
  import AnimalStatusBadge from "$lib/components/AnimalStatusBadge.svelte";
  import type { Animal } from "$lib/types";

  export let animal: Animal;
</script>

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
          <AnimalStatusBadge status={animal.adoption_status} />
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
          <p class="mt-2 text-sm text-orange-700 bg-orange-50 p-3 rounded-md">{animal.special_needs}</p>
        </div>
      {/if}
      {#if animal.description}
        <div>
          <span class="font-medium text-muted-foreground">Description:</span>
          <p class="mt-2 text-sm">{animal.description}</p>
        </div>
      {/if}
    </div>
  {/if}
</div>