<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { EventHandler } from "svelte/elements";
  import * as Card from "$lib/components/ui/card/index.js";
  import type { PageData } from "./$types";
  import { Root } from "$lib/components/ui/button";

  let { data } = $props();
  let { supabase, user } = $derived(data);
</script>

<div class="p-6 pb-0">
  <div class="flex items-center justify-between">
    <div class="space-y-1">
      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Animals
      </h1>
      <p class="text-xl text-muted-foreground">
        Manage your animal shelter records
      </p>
    </div>
  </div>
</div>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Current User</Card.Title>
    <Card.Description>{user?.email}</Card.Description>
  </Card.Header>
</Card.Root>
