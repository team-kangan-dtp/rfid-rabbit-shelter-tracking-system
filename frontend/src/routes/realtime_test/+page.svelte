<script>
  import { supabase } from "$lib/supabaseClient";
  import { onMount, onDestroy } from "svelte";

  let logEvents = [];
  let connectionStatus = "Disconnected";
  let channel;
  let currentUserId = null;

  onMount(() => {
    console.log("Setting up realtime channel...");

    channel = supabase
      .channel("log-test")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rfid_scan_log",
          filter: `rfid = ${currentUserId}`,
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
