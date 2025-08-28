<script lang="ts" generics="TData, TValue">
  import {
    type ColumnDef,
    type PaginationState,
    type ColumnFiltersState,
    type SortingState,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getSortedRowModel,
  } from "@tanstack/table-core";
  import {
    createSvelteTable,
    FlexRender,
  } from "$lib/components/ui/data-table/index.js";
  import type { Animal } from "$lib/types";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import AnimalStatusBadge from "$lib/components/AnimalStatusBadge.svelte";

  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onView?: (animal: Animal) => void;
    onEdit?: (animal: Animal) => void;
    onDelete?: (animal: Animal) => void;
  };

  let {
    data,
    columns,
    onView = () => {},
    onEdit = () => {},
    onDelete = () => {},
  }: DataTableProps<TData, TValue> = $props();

  // Reactive state
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let columnFilters = $state<ColumnFiltersState>([]);
  let sorting = $state<SortingState>([]);
  let globalFilter = $state("");

  // Custom filter function
  const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    if (!filterValue) return true;

    const searchValue = filterValue.toLowerCase();
    const original = row.original as Animal;

    // Search in all relevant fields
    const searchableValues = [
      original.name,
      original.species,
      original.breed,
      original.adoption_status,
      original.fur_colour,
      original.special_needs,
      original.description,
      original.rfid_tag,
    ];

    return searchableValues.some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(searchValue)
    );
  };

  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    state: {
      get pagination() {
        return pagination;
      },
      get columnFilters() {
        return columnFilters;
      },
      get sorting() {
        return sorting;
      },
      get globalFilter() {
        return globalFilter;
      },
    },
    onPaginationChange: (updater) => {
      pagination =
        typeof updater === "function" ? updater(pagination) : updater;
    },
    onColumnFiltersChange: (updater) => {
      columnFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;
    },
    onSortingChange: (updater) => {
      sorting = typeof updater === "function" ? updater(sorting) : updater;
    },
    onGlobalFilterChange: (updater) => {
      globalFilter =
        typeof updater === "function" ? updater(globalFilter) : updater;
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn,
  });

  // No need for clearFilters - handled by AnimalFilters component

  // Set up global handlers for action buttons
  $effect(() => {
    if (typeof window !== 'undefined') {
      (window as any).handleAnimalView = (id: string) => {
        const animal = data.find((a: any) => a.id === id);
        if (animal) onView(animal as unknown as Animal);
      };
      
      (window as any).handleAnimalEdit = (id: string) => {
        const animal = data.find((a: any) => a.id === id);
        if (animal) onEdit(animal as unknown as Animal);
      };
      
      (window as any).handleAnimalDelete = (id: string) => {
        const animal = data.find((a: any) => a.id === id);
        if (animal) onDelete(animal as unknown as Animal);
      };
    }
  });
</script>

<!-- No search controls - handled by AnimalFilters component -->

<!-- Desktop Table (hidden on mobile) -->
<div class="hidden md:block rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <Table.Row>
          {#each headerGroup.headers as header (header.id)}
            <Table.Head colspan={header.colSpan}>
              {#if !header.isPlaceholder}
                {#if header.column.getCanSort()}
                  <Button
                    variant="ghost"
                    onclick={() => header.column.toggleSorting()}
                    class="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    <FlexRender
                      content={header.column.columnDef.header}
                      context={header.getContext()}
                    />
                    {#if header.column.getIsSorted() === "asc"}
                      <span class="ml-1">↑</span>
                    {:else if header.column.getIsSorted() === "desc"}
                      <span class="ml-1">↓</span>
                    {:else}
                      <span class="ml-1 opacity-50">↕</span>
                    {/if}
                  </Button>
                {:else}
                  <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                  />
                {/if}
              {/if}
            </Table.Head>
          {/each}
        </Table.Row>
      {/each}
    </Table.Header>
    <Table.Body>
      {#each table.getRowModel().rows as row (row.id)}
        <Table.Row data-state={row.getIsSelected() && "selected"}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <Table.Cell>
              {#if cell.column.id === "adoption_status"}
                {@const animal = row.original as Animal}
                <AnimalStatusBadge status={animal.adoption_status as any} />
              {:else if cell.column.id === "actions"}
                {@const animal = row.original as Animal}
                <div class="flex items-center gap-2">
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
              {:else}
                <FlexRender
                  content={cell.column.columnDef.cell}
                  context={cell.getContext()}
                />
              {/if}
            </Table.Cell>
          {/each}
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell colspan={columns.length} class="h-24 text-center">
            No animals found.
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>

<!-- Mobile Cards (visible only on mobile) -->
<div class="md:hidden space-y-4">
  {#each table.getRowModel().rows as row (row.id)}
    {@const animal = row.original as Animal}
    <div class="bg-card border rounded-lg p-4 space-y-3">
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

      <!-- Essential Information -->
      <div class="grid grid-cols-2 gap-3 text-sm">
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
        <div class="col-span-2">
          <span class="font-medium text-muted-foreground">Adoption Status:</span>
          <p class="mt-1">
            <AnimalStatusBadge status={animal.adoption_status as any} />
          </p>
        </div>
        <div>
          <span class="font-medium text-muted-foreground">Arrival Date:</span>
          <p class="mt-1">{new Date(animal.arrival_date).toLocaleDateString()}</p>
        </div>
        <div>
          <span class="font-medium text-muted-foreground">Neutered:</span>
          <p class="mt-1">{animal.neutered ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  {:else}
    <div class="text-center py-8 text-muted-foreground">No animals found.</div>
  {/each}
</div>

<!-- Pagination -->
<div
  class="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4"
>
  <div class="text-sm text-muted-foreground text-center sm:text-left">
    {#if table.getFilteredRowModel().rows.length > 0}
      Showing {pagination.pageIndex * pagination.pageSize + 1} to
      {Math.min(
        (pagination.pageIndex + 1) * pagination.pageSize,
        table.getFilteredRowModel().rows.length
      )}
      of {table.getFilteredRowModel().rows.length} animals
      {#if table.getFilteredRowModel().rows.length !== data.length}
        <span class="hidden sm:inline">(filtered from {data.length} total)</span
        >
      {/if}
    {:else}
      No animals to show
    {/if}
  </div>

  <div class="flex items-center space-x-2">
    <Button
      variant="outline"
      size="lg"
      onclick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      class="px-2 sm:px-3"
    >
      <span class="hidden sm:inline">Previous</span>
      <span class="sm:hidden">Prev</span>
    </Button>
    <div class="text-sm font-medium px-2">
      <span class="hidden sm:inline">Page</span>
      {pagination.pageIndex + 1}
      <span class="hidden sm:inline">of</span>
      <span class="sm:hidden">/</span>
      {table.getPageCount() || 1}
    </div>
    <Button
      variant="outline"
      size="lg"
      onclick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      class="px-2 sm:px-3"
    >
      <span class="hidden sm:inline">Next</span>
      <span class="sm:hidden">Next</span>
    </Button>
  </div>
</div>