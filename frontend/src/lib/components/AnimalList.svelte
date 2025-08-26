<script lang="ts">
  import AnimalTable from "$lib/components/AnimalTable.svelte";
  import AnimalStatusBadge from "$lib/components/AnimalStatusBadge.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import type { Animal, AnimalEventHandlers } from "$lib/types";

  export let animals: Animal[] = [];
  export let onView: AnimalEventHandlers['onView'] = () => {};
  export let onEdit: AnimalEventHandlers['onEdit'] = () => {};
  export let onDelete: AnimalEventHandlers['onDelete'] = () => {};
</script>

<!-- Animals List -->
<div class="mt-6">
  <!-- Table for md and larger screens -->
  <div class="hidden md:block overflow-x-auto">
    <AnimalTable 
      data={animals} 
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  </div>

  <!-- Cards for small screens -->
  <div class="block md:hidden">
    <div class="grid grid-cols-1 gap-4">
      {#each animals as animal (animal.id)}
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
                    onclick={() => onView(animal)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => onEdit(animal)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onclick={() => onDelete(animal)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <!-- Essential Information - same styling as view modal -->
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span class="font-medium text-muted-foreground">Species:</span>
                  <p class="mt-1">{animal.species}</p>
                </div>
                {#if animal.date_of_birth}
                  <div>
                    <span class="font-medium text-muted-foreground">Date of Birth:</span>
                    <p class="mt-1">{animal.date_of_birth}</p>
                  </div>
                {/if}
                <div class="col-span-2">
                  <span class="font-medium text-muted-foreground">Adoption Status:</span>
                  <p class="mt-1">
                    <AnimalStatusBadge status={animal.adoption_status} />
                  </p>
                </div>
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
</div>