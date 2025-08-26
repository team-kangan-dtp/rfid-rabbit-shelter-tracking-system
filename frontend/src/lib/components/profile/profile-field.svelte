<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    icon: Component;
    label: string;
    value: string | null | undefined;
    fallback?: string;
    alignTop?: boolean;
  }

  let { icon: Icon, label, value, fallback = "Not provided", alignTop = false }: Props = $props();
</script>

<div class="flex {alignTop ? 'items-start' : 'items-center'} gap-3">
  <Icon class="h-4 w-4 text-muted-foreground {alignTop ? 'mt-0.5' : ''}" />
  <div>
    <p class="text-sm font-medium">{label}</p>
    <p class="text-sm text-muted-foreground">
      {value || fallback}
    </p>
  </div>
</div>