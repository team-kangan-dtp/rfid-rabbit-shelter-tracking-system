<script lang="ts">
  import type { Component } from "svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Button } from "$lib/components/ui/button";

  interface StatusBadge {
    icon: Component;
    label: string;
    variant: "admin" | "volunteer" | "custom";
    customClasses?: string;
  }

  interface ActionButton {
    icon: Component;
    label: string;
    variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    onclick?: () => void | Promise<void>;
  }

  interface Props {
    // User information
    firstName: string | null;
    lastName: string | null;
    email: string;
    
    // Display options
    title?: string;
    
    // Status badges
    statusBadges?: StatusBadge[];
    
    // Action buttons
    actionButtons?: ActionButton[];
  }

  let { 
    firstName, 
    lastName, 
    email, 
    title,
    statusBadges = [],
    actionButtons = []
  }: Props = $props();

  // Helper function to get user initials for avatar
  const getUserInitials = (
    firstName: string | null,
    lastName: string | null,
    email: string
  ) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    return email.charAt(0).toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    if (firstName || lastName) {
      return `${firstName || ""} ${lastName || ""}`.trim();
    }
    return title || "User Profile";
  };

  // Get status badge classes
  const getBadgeClasses = (variant: StatusBadge["variant"], customClasses?: string) => {
    if (customClasses) return customClasses;
    
    switch (variant) {
      case "admin":
        return "inline-flex items-center gap-1 px-3 py-1 rounded-md bg-destructive/10 text-destructive text-sm font-medium";
      case "volunteer":
        return "inline-flex items-center gap-1 px-3 py-1 rounded-md bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium";
      case "custom":
      default:
        return "inline-flex items-center gap-1 px-3 py-1 rounded-md bg-muted text-muted-foreground text-sm font-medium";
    }
  };
</script>

<Card.Root class="mb-6">
  <Card.Header>
    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
      <div class="flex items-start gap-4">
        <Avatar.Root class="h-20 w-20">
          <Avatar.Fallback class="text-3xl font-semibold bg-primary text-primary-foreground">
            {getUserInitials(firstName, lastName, email)}
          </Avatar.Fallback>
        </Avatar.Root>
        
        <div class="flex-1 space-y-3 mt-6">
          <div class="flex items-center gap-3 flex-wrap">
            <Card.Title class="text-3xl">
              {getDisplayName()}
            </Card.Title>
            
            <!-- Status Badges -->
            {#each statusBadges as badge}
              {@const IconComponent = badge.icon}
              <span class={getBadgeClasses(badge.variant, badge.customClasses)}>
                <IconComponent class="h-4 w-4" />
                {badge.label}
              </span>
            {/each}
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      {#if actionButtons.length > 0}
        <div class="flex flex-col md:flex-row gap-2 min-w-fit">
          {#each actionButtons as button}
            {@const IconComponent = button.icon}
            <Button 
              variant={button.variant || "outline"} 
              size={button.size || "sm"}
              onclick={button.onclick}
            >
              <IconComponent class="h-4 w-4 mr-2" />
              {button.label}
            </Button>
          {/each}
        </div>
      {/if}
    </div>
  </Card.Header>
</Card.Root>