<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2 px-4">
      <Sidebar.Trigger class="-ml-1" />
      <span class="font-semibold">RFID Rabbit Shelter</span>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
      {@render children?.()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
