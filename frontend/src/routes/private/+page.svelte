<script lang="ts">
  import { invalidate, goto } from "$app/navigation";
  import type { EventHandler } from "svelte/elements";
  import * as Card from "$lib/components/ui/card/index.js";
  import type { PageData } from "./$types";
  import { Root } from "$lib/components/ui/button";
  import { toggleMode } from "mode-watcher";
  // import { SunMoon } from "@lucide/svelte/icons/sun-moon";
  import { Button } from "$lib/components/ui/button";
  import SunMoon from "@lucide/svelte/icons/sun-moon";

  let { data } = $props();
  let { supabase, user, currentUser } = $derived(data);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      goto("/auth");
    }
  };

  type User = {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    dateOfBirth: string | null;
    addressLine: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    rfidTag: string | null;
    volunteerStartDate: string | null;
    volunteerEndDate: string | null;
    volunteerNotes: string | null;
    isAdmin: boolean;
    isActiveVolunteer: boolean;
    createdAt: string | null;
    updatedAt: string | null;
  };
</script>

<div class="px-6 pt-0 pb-6">
  <div class="flex items-center justify-between mb-6">
    <div class="space-y-1">
      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        User Profile
      </h1>
      <p class="text-xl text-muted-foreground">
        Manage your profile information and settings
      </p>
    </div>
  </div>

  <header class="flex gap-4 mb-6">
    <Button>
      <a href="/">Dashboard</a>
    </Button>
    <Button class="cursor-pointer" onclick={logout}>Logout</Button>
    <Button onclick={toggleMode}><SunMoon /> Toggle mode</Button>
  </header>

  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Current User</Card.Title>
      <Card.Description>{currentUser?.email}</Card.Description>
    </Card.Header>
    <Card.Content>
      {#if currentUser}
        <div class="space-y-4">
          <!-- Name -->
          <div>
            <Card.Title>Name</Card.Title>
            <Card.Description>
              {currentUser.first_name || ""}
              {currentUser.last_name || ""}
            </Card.Description>
          </div>

          <!-- Phone -->
          <div>
            <Card.Title>Phone</Card.Title>
            <Card.Description
              >{currentUser.phone || "Not provided"}</Card.Description
            >
          </div>

          <!-- Date of Birth -->
          <div>
            <Card.Title>Date of Birth</Card.Title>
            <Card.Description
              >{currentUser.date_of_birth || "Not provided"}</Card.Description
            >
          </div>

          <!-- Address -->
          <div>
            <Card.Title>Address</Card.Title>
            <Card.Description
              >{currentUser.address_line || "Not provided"}</Card.Description
            >
          </div>

          <!-- City -->
          <div>
            <Card.Title>City</Card.Title>
            <Card.Description
              >{currentUser.city || "Not provided"}</Card.Description
            >
          </div>

          <!-- State -->
          <div>
            <Card.Title>State</Card.Title>
            <Card.Description
              >{currentUser.state || "Not provided"}</Card.Description
            >
          </div>

          <!-- Postal Code -->
          <div>
            <Card.Title>Postal Code</Card.Title>
            <Card.Description
              >{currentUser.postal_code || "Not provided"}</Card.Description
            >
          </div>

          <!-- Status -->
          {#if currentUser.is_active_volunteer}
            <div>
              <Card.Title>Status</Card.Title>
              <Card.Description>Active Volunteer</Card.Description>
            </div>
          {/if}

          <!-- Volunteer Since -->
          {#if currentUser.is_active_volunteer}
            <div>
              <Card.Title>Volunteer Since</Card.Title>
              <Card.Description
                >{currentUser.volunteer_start_date ||
                  "Not provided"}</Card.Description
              >
            </div>
          {/if}

          <!-- Role -->
          {#if currentUser.is_admin}
            <div>
              <Card.Title>Role</Card.Title>
              <Card.Description>Administrator</Card.Description>
            </div>
          {/if}

          <!-- RFID Tag -->
          {#if currentUser.rfid_tag}
            <div>
              <Card.Title>RFID Tag</Card.Title>
              <Card.Description>{currentUser.rfid_tag}</Card.Description>
            </div>
          {/if}

          <!-- Volunteer Notes -->
          {#if currentUser.volunteer_notes}
            <div>
              <Card.Title>Volunteer Notes</Card.Title>
              <Card.Description>{currentUser.volunteer_notes}</Card.Description>
            </div>
          {/if}

          <!-- Member Since -->
          <div>
            <Card.Title>Member Since</Card.Title>
            <Card.Description>
              {#if currentUser.created_at}
                {new Date(currentUser.created_at).toLocaleDateString()}
              {:else}
                Not available
              {/if}
            </Card.Description>
          </div>
        </div>
      {:else}
        <Card.Title>Loading</Card.Title>
        <Card.Description>Loading user data...</Card.Description>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
