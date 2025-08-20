<script lang="ts">
  import { invalidate, goto } from "$app/navigation";
  import type { EventHandler } from "svelte/elements";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import type { PageData } from "./$types";
  import { Root } from "$lib/components/ui/button";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import SunMoon from "@lucide/svelte/icons/sun-moon";
  import User from "@lucide/svelte/icons/user";
  import Mail from "@lucide/svelte/icons/mail";
  import Phone from "@lucide/svelte/icons/phone";
  import Calendar from "@lucide/svelte/icons/calendar";
  import MapPin from "@lucide/svelte/icons/map-pin";
  import Shield from "@lucide/svelte/icons/shield";
  import CreditCard from "@lucide/svelte/icons/credit-card";
  import Clock from "@lucide/svelte/icons/clock";
  import Edit from "@lucide/svelte/icons/edit";
  import LogOut from "@lucide/svelte/icons/log-out";

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

  // Helper function to get user initials for avatar
  const getUserInitials = (firstName: string | null, lastName: string | null, email: string) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    return email.charAt(0).toUpperCase();
  };

  // Helper function to format dates
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

<div class="px-6 pt-6 pb-6">
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


  {#if currentUser}
    <!-- Hero Card - User Identity -->
    <Card.Root class="mb-6">
      <Card.Header>
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div class="flex items-start gap-4">
            <Avatar.Root class="h-20 w-20">
              <Avatar.Fallback class="text-xl font-semibold bg-primary text-primary-foreground">
                {getUserInitials(currentUser.first_name, currentUser.last_name, currentUser.email)}
              </Avatar.Fallback>
            </Avatar.Root>
            <div class="flex-1 space-y-3">
              <div class="flex items-center gap-3 flex-wrap">
                <Card.Title class="text-3xl">
                  {currentUser.first_name || currentUser.last_name 
                    ? `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim()
                    : 'User Profile'}
                </Card.Title>
                <!-- Status Badges -->
                {#if currentUser.is_admin}
                  <span class="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                    <Shield class="h-4 w-4" />
                    Administrator
                  </span>
                {/if}
                {#if currentUser.is_active_volunteer}
                  <span class="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium">
                    <User class="h-4 w-4" />
                    Active Volunteer
                  </span>
                {/if}
              </div>
              <Card.Description class="text-base">
                Manage your profile information and account settings
              </Card.Description>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col md:flex-row gap-2 min-w-fit">
            <Button variant="outline" size="sm">
              <Edit class="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" onclick={toggleMode}>
              <SunMoon class="h-4 w-4 mr-2" />
              Toggle Mode
            </Button>
            <Button variant="outline" size="sm" onclick={logout}>
              <LogOut class="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </Card.Header>
    </Card.Root>

    <!-- Information Cards Layout -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      
      <!-- Card 1: Personal Information -->
      <Card.Root>
        <Card.Header>
          <Card.Title>Personal information</Card.Title>
          <Card.Description>Your contact details and personal information</Card.Description>
        </Card.Header>

        <Card.Content class="space-y-4">
          <div class="flex items-center gap-3">
            <Mail class="h-4 w-4 text-muted-foreground" />
            <div>
              <p class="text-sm font-medium">Email</p>
              <p class="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Phone class="h-4 w-4 text-muted-foreground" />
            <div>
              <p class="text-sm font-medium">Phone</p>
              <p class="text-sm text-muted-foreground">{currentUser.phone || 'Not provided'}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Calendar class="h-4 w-4 text-muted-foreground" />
            <div>
              <p class="text-sm font-medium">Date of Birth</p>
              <p class="text-sm text-muted-foreground">{formatDate(currentUser.date_of_birth) || 'Not provided'}</p>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Card 2: Address Information -->
      <Card.Root>
        <Card.Header>
          <Card.Title>Address</Card.Title>
          <Card.Description>Your current address information</Card.Description>
        </Card.Header>

        <Card.Content>
          <div class="flex items-start gap-3">
            <MapPin class="h-4 w-4 text-muted-foreground mt-0.5" />
            <div class="space-y-1">
              <p class="text-sm">
                {currentUser.address_line || 'Address not provided'}
              </p>
              <p class="text-sm text-muted-foreground">
                {#if currentUser.city || currentUser.state || currentUser.postal_code}
                  {[currentUser.city, currentUser.state, currentUser.postal_code].filter(Boolean).join(', ')}
                {:else}
                  City, State, Postal Code not provided
                {/if}
              </p>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Card 3: Volunteer Information (conditional) -->
      {#if currentUser.is_active_volunteer}
        <Card.Root>
          <Card.Header>
            <Card.Title>Volunteer information</Card.Title>
            <Card.Description>Your volunteer details and access information</Card.Description>
          </Card.Header>

          <Card.Content class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <div class="flex items-center gap-3">
                <Clock class="h-4 w-4 text-muted-foreground" />
                <div>
                  <p class="text-sm font-medium">Volunteer Since</p>
                  <p class="text-sm text-muted-foreground">
                    {formatDate(currentUser.volunteer_start_date) || 'Start date not recorded'}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <CreditCard class="h-4 w-4 text-muted-foreground" />
                <div>
                  <p class="text-sm font-medium">Staff Card No (RFID)</p>
                  <p class="text-sm text-muted-foreground font-mono">
                    {currentUser.rfid_tag || 'Not assigned'}
                  </p>
                </div>
              </div>
            </div>
            {#if currentUser.volunteer_notes}
              <div class="space-y-1">
                <p class="text-sm font-medium">Volunteer Notes</p>
                <p class="text-sm text-muted-foreground">
                  {currentUser.volunteer_notes}
                </p>
              </div>
            {/if}
          </Card.Content>
        </Card.Root>
      {/if}

      <!-- Show RFID info for non-volunteers if they have one -->
      {#if !currentUser.is_active_volunteer && currentUser.rfid_tag}
        <Card.Root>
          <Card.Header>
            <Card.Title>Access Information</Card.Title>
            <Card.Description>Your system access details</Card.Description>
          </Card.Header>

          <Card.Content>
            <div class="flex items-center gap-3">
              <CreditCard class="h-4 w-4 text-muted-foreground" />
              <div>
                <p class="text-sm font-medium">Staff Card No (RFID)</p>
                <p class="text-sm text-muted-foreground font-mono">
                  {currentUser.rfid_tag}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      {/if}

    </div>
  {:else}
    <!-- Loading State -->
    <Card.Root class="w-full max-w-md">
      <Card.Header>
        <Card.Title>Loading Profile</Card.Title>
        <Card.Description>Please wait while we load your profile information...</Card.Description>
      </Card.Header>
    </Card.Root>
  {/if}
</div>
