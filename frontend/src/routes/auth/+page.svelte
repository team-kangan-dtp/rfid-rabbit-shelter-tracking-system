<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import RabbitIcon from "@lucide/svelte/icons/rabbit";

  let { form } = $props();
  let mode = $state<"login" | "register">("login");

  const emailId = crypto.randomUUID();
  const passwordId = crypto.randomUUID();
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

    <!-- Auth Form Card -->
    <Card.Root>
      <Card.Header class="text-center">
        <Card.Title class="text-xl">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </Card.Title>
        <Card.Description>
          {mode === "login"
            ? "Sign in to your account to continue"
            : "Enter your details to create your account"}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <!-- Display messages/errors -->
        {#if form?.error}
          <div
            class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm"
          >
            {form.error}
          </div>
        {/if}

        {#if form?.message}
          <div
            class="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-sm"
          >
            {form.message}
          </div>
        {/if}

        <form
          method="POST"
          action={mode === "login" ? "?/login" : "?/signup"}
          use:enhance
        >
          <div class="grid gap-6">
            <div class="grid gap-3">
              <Label for="email-{emailId}">Email</Label>
              <Input
                id="email-{emailId}"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div class="grid gap-3">
              <Label for="password-{passwordId}">Password</Label>
              <Input
                id="password-{passwordId}"
                name="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" class="w-full">
              {mode === "login" ? "Login" : "Register"}
            </Button>
          </div>
        </form>

        <!-- Mode toggle -->
        <div class="mt-6 text-center text-sm">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <button
            type="button"
            on:click={() => (mode = mode === "login" ? "register" : "login")}
            class="underline underline-offset-4 hover:text-primary"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
