<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";

  let { data, children } = $props();
  let { session, supabase } = $derived(data);
  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });
    return () => data.subscription.unsubscribe();
  });
</script>

<ModeWatcher />

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
