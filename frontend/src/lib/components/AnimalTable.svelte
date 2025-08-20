<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import AnimalTableRow from "$lib/components/AnimalTableRow.svelte";
  import type { Animal, AnimalEventHandlers } from "$lib/types";

  export let data: Animal[] = [];
  export let onView: AnimalEventHandlers['onView'] = undefined;
  export let onEdit: AnimalEventHandlers['onEdit'] = undefined;
  export let onDelete: AnimalEventHandlers['onDelete'] = undefined;
</script>

<div class="w-full rounded-md border" role="region" aria-label="Animals table">
  <Table.Root class="w-full" role="table">
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[200px]">Name</Table.Head>
        <Table.Head class="w-[150px]">Species</Table.Head>
        <Table.Head class="w-[150px]">Date of Birth</Table.Head>
        <Table.Head class="w-[200px]">Adoption Status</Table.Head>
        <Table.Head class="w-[200px]">Actions</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#if data.length}
        {#each data as animal}
          <AnimalTableRow
            {animal}
            onView={onView || (() => {})}
            onEdit={onEdit || (() => {})}
            onDelete={onDelete || (() => {})}
          />
        {/each}
      {:else}
        <Table.Row>
          <Table.Cell colspan={5} class="h-24 text-center" role="cell">
            <span aria-live="polite">No animals found.</span>
          </Table.Cell>
        </Table.Row>
      {/if}
    </Table.Body>
  </Table.Root>
</div>