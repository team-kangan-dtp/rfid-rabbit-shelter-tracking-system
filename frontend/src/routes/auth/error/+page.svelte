<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import RabbitIcon from "@lucide/svelte/icons/rabbit";
  import Warning from "@lucide/svelte/icons/mail-warning";
</script>

<div
  class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <!-- Logo/Brand with Rabbit Icon -->
    <!-- svelte-ignore a11y_missing_attribute -->
    <a class="flex items-center gap-2 self-center font-medium">
      <div
        class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
      >
        <RabbitIcon class="size-4" />
      </div>
      Shelter Sync
    </a>

    <!-- Email Check Card -->
    <Card.Root>
      <Card.Header class="text-center">
        <Card.Title class="text-xl">Sign In Error</Card.Title>
        <Card.Description>An error occurred while signing in.</Card.Description>
      </Card.Header>
      <Card.Content class="text-center">
        <!-- Email Icon -->
        <div class="flex justify-center mb-6">
          <div
            class="bg-destructive/10 text-destructive flex size-16 items-center justify-center rounded-full"
          >
            <Warning class="size-8" />
          </div>
        </div>

        <!-- Instructions -->
        <div class="space-y-4 mb-6">
          <p class="text-sm text-muted-foreground">
            Please try again or contact support.
          </p>
        </div>

        <!-- Back to Sign In Button -->
        <a href="/auth" class="w-full">
          <Button class="w-full">Back to Sign In</Button>
        </a>
      </Card.Content>
    </Card.Root>
  </div>
</div>
