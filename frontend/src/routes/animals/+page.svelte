<script lang="ts">
  import type { PageData } from "./$types";
  import AnimalDataTable from "$lib/components/AnimalDataTable.svelte";
  import PageHeader from "$lib/components/page-header.svelte";

  // Get the data from the server
  export let data: PageData;
</script>

<main class="p-6 pb-0" aria-labelledby="animals-title">
  <PageHeader
    title="Animals"
    description="Manage your animal shelter records"
  />

  <section aria-label="Animal management interface">
    <AnimalDataTable data={data.animals} />
  </section>
</main>