<script lang="ts">
  import type { Component } from "svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import ProfileField from "./profile-field.svelte";

  interface FieldData {
    icon: Component;
    label: string;
    value: string | null | undefined;
    fallback?: string;
  }

  interface Props {
    title: string;
    description: string;
    // For multi-field cards
    fields?: FieldData[];
    // For simple content cards
    content?: string | null | undefined;
    contentIcon?: Component;
    contentFallback?: string;
    contentAlignTop?: boolean;
  }

  let { 
    title, 
    description, 
    fields, 
    content, 
    contentIcon: ContentIcon, 
    contentFallback = "No information available",
    contentAlignTop = false 
  }: Props = $props();
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{title}</Card.Title>
    <Card.Description>{description}</Card.Description>
  </Card.Header>

  <Card.Content class={fields ? "space-y-4" : ""}>
    {#if fields}
      <!-- Multi-field layout -->
      {#each fields as field}
        <ProfileField 
          icon={field.icon} 
          label={field.label} 
          value={field.value} 
          fallback={field.fallback}
        />
      {/each}
    {:else if ContentIcon}
      <!-- Simple content with icon -->
      <div class="flex {contentAlignTop ? 'items-start' : 'items-center'} gap-3">
        <ContentIcon class="h-4 w-4 text-muted-foreground {contentAlignTop ? 'mt-0.5' : ''}" />
        <div>
          <p class="text-sm text-muted-foreground">
            {content || contentFallback}
          </p>
        </div>
      </div>
    {:else}
      <!-- Plain content -->
      <p class="text-sm text-muted-foreground">
        {content || contentFallback}
      </p>
    {/if}
  </Card.Content>
</Card.Root>