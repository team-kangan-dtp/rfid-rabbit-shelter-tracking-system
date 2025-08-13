<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import RabbitIcon from "@lucide/svelte/icons/rabbit";
  import MailIcon from "@lucide/svelte/icons/mail";
</script>

<div
  class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <!-- Logo/Brand with Rabbit Icon -->
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
        <Card.Title class="text-xl">Check your email</Card.Title>
        <Card.Description>
          We've sent a confirmation link to your email address
        </Card.Description>
      </Card.Header>
      <Card.Content class="text-center">
        <!-- Email Icon -->
        <div class="flex justify-center mb-6">
          <div
            class="bg-primary/10 text-primary flex size-16 items-center justify-center rounded-full"
          >
            <MailIcon class="size-8" />
          </div>
        </div>

        <!-- Instructions -->
        <div class="space-y-4 mb-6">
          <p class="text-sm text-muted-foreground">
            Please check your email and click the confirmation link to activate
            your account.
          </p>
          <p class="text-sm text-muted-foreground">
            If you don't see the email, check your spam folder.
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
