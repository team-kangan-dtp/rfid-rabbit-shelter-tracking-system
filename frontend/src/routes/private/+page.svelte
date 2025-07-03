<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { EventHandler } from "svelte/elements";
  import * as Card from "$lib/components/ui/card/index.js";
  import type { PageData } from "./$types";
  import { Root } from "$lib/components/ui/button";

  let { data } = $props();
  let { supabase, user } = $derived(data);
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Current User</Card.Title>
    <Card.Description>{user?.email}</Card.Description>
  </Card.Header>
</Card.Root>
