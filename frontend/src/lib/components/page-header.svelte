<script lang="ts">
  import type { Snippet } from "svelte";

  // Component for page headings
  const {
    title,
    description,
    button,
  }: {
    title: string;
    description: string;
    button?: Snippet;
  } = $props();
</script>

<!-- Page heading -->
<div class="mb-2 flex items-center justify-between">
  <div class="space-y-1">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {title}
    </h1>
    <p class="text-xl text-muted-foreground">
      {description}
    </p>
  </div>

  {#if button}
    <div class="ml-4">
      <!-- Render the button snippet -->
      {@render button()}
    </div>
  {/if}
</div>
