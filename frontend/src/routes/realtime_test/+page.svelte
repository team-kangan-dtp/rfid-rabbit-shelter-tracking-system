<script>
  import { supabase } from "$lib/supabaseClient";
  import { onMount, onDestroy } from "svelte";
  import { page } from "$app/state";

  let logEvents = [];
  let connectionStatus = $state("Disconnected");
  let channel;
  let currentUserId = $derived(page.data.user?.id || null);
  let currentUserEmail = $derived(page.data.user?.email || null);

  onMount(() => {
    console.log("Setting up realtime channel...");
    console.log("Current user ID:", currentUserId);

    channel = supabase
      .channel("log-test")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rfid_scan_log",
          filter: `user_id=eq.${currentUserId}`,
        },
        (payload) => {
          console.log("New log entry:", payload);
          logEvents = [payload.new, ...logEvents];
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
        if (status === "SUBSCRIBED") {
          connectionStatus = "Connected";
        } else if (status === "CLOSED") {
          connectionStatus = "Disconnected";
        } else {
          connectionStatus = `Status: ${status}`;
        }
      });
  });

  onDestroy(() => {
    if (channel) {
      console.log("Cleaning up realtime channel...");
      channel.unsubscribe();
      connectionStatus = "Disconnected";
    }
  });
</script>

<h1>Realtime Log Test</h1>
<p>Status: {connectionStatus}</p>
<p>Current user email: {currentUserEmail}</p>
<p>Current user ID: {currentUserId}</p>

{#if logEvents.length > 0}
  <h2>Recent Log Events:</h2>
  <ul>
    {#each logEvents as event, index}
      <li>
        <strong>Event {index + 1}:</strong>
        <pre>{JSON.stringify(event, null, 2)}</pre>
      </li>
    {/each}
  </ul>
{:else}
  <p>No log events received yet. Try inserting data into the log table.</p>
{/if}
