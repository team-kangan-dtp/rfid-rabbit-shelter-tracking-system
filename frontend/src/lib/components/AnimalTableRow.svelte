<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import AnimalStatusBadge from "$lib/components/AnimalStatusBadge.svelte";
  import type { Animal, AnimalEventHandlers } from "$lib/types";

  export let animal: Animal;
  export let onView: AnimalEventHandlers['onView'] = () => {};
  export let onEdit: AnimalEventHandlers['onEdit'] = () => {};
  export let onDelete: AnimalEventHandlers['onDelete'] = () => {};
</script>

<Table.Row 
  class="cursor-pointer hover:bg-muted/50"
  onclick={() => onView(animal)}
>
  <Table.Cell class="font-medium">{animal.name}</Table.Cell>
  <Table.Cell>{animal.species}</Table.Cell>
  <Table.Cell>{animal.date_of_birth || "Unknown"}</Table.Cell>
  <Table.Cell>
    <AnimalStatusBadge status={animal.adoption_status} />
  </Table.Cell>
  <Table.Cell onclick={(e) => e.stopPropagation()}>
    <div class="flex gap-2">
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
  </Table.Cell>
</Table.Row>