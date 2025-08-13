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
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchPlaceholder?: string;
  };

  let {
    data,
    columns,
    searchPlaceholder = "Search...",
  }: DataTableProps<TData, TValue> = $props();

  // Reactive state
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let columnFilters = $state<ColumnFiltersState>([]);
  let sorting = $state<SortingState>([]);
  let globalFilter = $state("");
  let dateFrom = $state("");
  let dateTo = $state("");

  // Custom filter functions
  const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    if (!filterValue) return true;

    const searchValue = filterValue.toLowerCase();
    const original = row.original;

    // Search in all relevant fields
    const searchableValues = [
      original.id,
      original.scan_time,
      `${original.user_id?.first_name} ${original.user_id?.last_name}`,
      `${original.animal_id?.name} (${original.animal_id?.species})`,
      original.animal_id?.name,
      original.animal_id?.species,
      original.animal_note?.note_type,
    ];

    return searchableValues.some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(searchValue)
    );
  };

  const dateRangeFilterFn = (row: any, columnId: string, filterValue: any) => {
    const { from, to } = filterValue || {};
    if (!from && !to) return true;

    const cellValue = row.getValue(columnId);
    if (!cellValue) return false;

    const cellDate = new Date(cellValue);
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to + "T23:59:59") : null; // Include full day

    if (fromDate && cellDate < fromDate) return false;
    if (toDate && cellDate > toDate) return false;

    return true;
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
    filterFns: {
      dateRange: dateRangeFilterFn,
    },
  });

  // Clear all filters
  function clearFilters() {
    globalFilter = "";
    dateFrom = "";
    dateTo = "";
    sorting = [];
    table.resetColumnFilters();
  }

  // Update date range filter when date inputs change
  $effect(() => {
    const filters: ColumnFiltersState = [];

    if (dateFrom || dateTo) {
      filters.push({
        id: "scan_time",
        value: { from: dateFrom, to: dateTo },
      });
    }

    // Find the scan_time column and set its filter function
    const scanTimeColumn = table.getColumn("scan_time");
    if (scanTimeColumn) {
      scanTimeColumn.columnDef.filterFn = dateRangeFilterFn;
    }

    columnFilters = filters;
  });
</script>

<!-- Search and Filter Controls -->
<div class="flex flex-col gap-4 py-4">
  <!-- Top row: Global search and clear button -->
  <div
    class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
  >
    <Input
      placeholder={searchPlaceholder}
      value={globalFilter}
      oninput={(e) => (globalFilter = e.currentTarget.value)}
      class="w-full sm:max-w-sm"
    />
    <Button variant="outline" onclick={clearFilters} class="w-full sm:w-auto"
      >Clear All Filters</Button
    >
  </div>

  <!-- Second row: Date range filters -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
    <span class="text-sm font-medium">Date Range:</span>
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto"
    >
      <Input
        type="date"
        value={dateFrom}
        oninput={(e) => (dateFrom = e.currentTarget.value)}
        class="w-full sm:w-40"
      />
      <span class="text-sm text-muted-foreground hidden sm:inline">to</span>
      <Input
        type="date"
        value={dateTo}
        oninput={(e) => (dateTo = e.currentTarget.value)}
        class="w-full sm:w-40"
      />
    </div>
  </div>
</div>

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
              <FlexRender
                content={cell.column.columnDef.cell}
                context={cell.getContext()}
              />
            </Table.Cell>
          {/each}
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell colspan={columns.length} class="h-24 text-center">
            No results found.
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>

<!-- Mobile Cards (visible only on mobile) -->
<div class="md:hidden space-y-4">
  {#each table.getRowModel().rows as row (row.id)}
    {@const rowData = row.original}
    <div class="bg-card border rounded-lg p-4 space-y-3">
      <!-- Scan ID and Time -->
      <div class="flex justify-between items-start">
        <div>
          <div class="text-sm font-medium">Scan #{rowData.id}</div>
          <div class="text-xs text-muted-foreground">
            {new Date(rowData.scan_time).toLocaleString()}
          </div>
        </div>
      </div>

      <!-- Animal Info -->
      {#if rowData.animal_id}
        <div class="border-t pt-3">
          <div class="text-sm font-medium text-primary">
            {rowData.animal_id.name}
          </div>
          <div class="text-xs text-muted-foreground">
            {rowData.animal_id.species}
          </div>
        </div>
      {/if}

      <!-- User Info -->
      {#if rowData.user_id}
        <div class="border-t pt-3">
          <div class="text-xs text-muted-foreground">Scanned by:</div>
          <div class="text-sm">
            {rowData.user_id.first_name}
            {rowData.user_id.last_name}
          </div>
        </div>
      {/if}
    </div>
  {:else}
    <div class="text-center py-8 text-muted-foreground">No results found.</div>
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
      of {table.getFilteredRowModel().rows.length} entries
      {#if table.getFilteredRowModel().rows.length !== data.length}
        <span class="hidden sm:inline">(filtered from {data.length} total)</span
        >
      {/if}
    {:else}
      No entries to show
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
