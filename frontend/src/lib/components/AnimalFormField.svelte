<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import type { FormFieldType } from "$lib/types";

  export let id: string;
  export let label: string;
  export let type: FormFieldType = "text";
  export let name: string;
  export let value: string | number | boolean = "";
  export let required: boolean = false;
  export let placeholder: string = "";
  export let options: string[] = [];
  export let step: string = "";
  export let checked: boolean = false;
  export let error: string = "";
  export let disabled: boolean = false;
</script>

<div class="space-y-2">
  {#if type !== "checkbox"}
    <Label for={id}>{label}{required ? " *" : ""}</Label>
  {/if}
  
  {#if type === "select"}
    <Select.Root type="single" bind:value {disabled}>
      <Select.Trigger aria-describedby={error ? `${id}-error` : undefined}>
        {value || placeholder}
      </Select.Trigger>
      <Select.Content>
        {#each options as option}
          <Select.Item value={option}>{option}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <input type="hidden" {name} bind:value />
  {:else if type === "textarea"}
    <textarea
      {id}
      {name}
      bind:value
      {placeholder}
      {required}
      {disabled}
      aria-describedby={error ? `${id}-error` : undefined}
      class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {error ? 'border-red-500' : ''}"
    ></textarea>
  {:else if type === "checkbox"}
    <div class="flex items-center space-x-2">
      <Checkbox {id} {name} bind:checked {disabled} aria-describedby={error ? `${id}-error` : undefined} />
      <Label for={id}>{label}{required ? " *" : ""}</Label>
    </div>
  {:else}
    <Input
      {id}
      {type}
      {name}
      bind:value
      {required}
      {placeholder}
      {step}
      {disabled}
      aria-describedby={error ? `${id}-error` : undefined}
      class="w-full {error ? 'border-red-500' : ''}"
    />
  {/if}
  
  <!-- Error message -->
  {#if error}
    <p id="{id}-error" class="text-sm text-red-600 mt-1" role="alert">{error}</p>
  {/if}
</div>