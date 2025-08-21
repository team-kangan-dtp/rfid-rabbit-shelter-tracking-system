<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import { toggleMode } from "mode-watcher";
  import SunMoon from "@lucide/svelte/icons/sun-moon";
  import User from "@lucide/svelte/icons/user";
  import Phone from "@lucide/svelte/icons/phone";
  import Calendar from "@lucide/svelte/icons/calendar";
  import MapPin from "@lucide/svelte/icons/map-pin";
  import Shield from "@lucide/svelte/icons/shield";
  import CreditCard from "@lucide/svelte/icons/credit-card";
  import Clock from "@lucide/svelte/icons/clock";
  import Edit from "@lucide/svelte/icons/edit";
  import LogOut from "@lucide/svelte/icons/log-out";
  import FileText from "@lucide/svelte/icons/file-text";
  import PageHeader from "$lib/components/page-header.svelte";
  import { ProfileInfoCard, ProfileHeroCard } from "$lib/components/profile";
  import { ProfileEditModal } from "$lib/components/profile";

  let { data } = $props();
  let { supabase, currentUser } = $derived(data);

  // Modal state management
  let profileEditModalOpen = $state(false);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      goto("/auth");
    }
  };

  // Helper function to format dates
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
</script>

<div class="px-6 pt-6 pb-6">
  <PageHeader
    title="User Profile"
    description="Manage your profile information and settings"
  />

  {#if currentUser}
    <!-- TODO(human): Replace this entire hero card section with ProfileHeroCard component -->
    <ProfileHeroCard
      firstName={currentUser.first_name}
      lastName={currentUser.last_name}
      email={currentUser.email}
      statusBadges={[
        currentUser.is_admin && {
          variant: "admin",
          label: "Administrator",
          icon: Shield,
        },
        currentUser.is_active_volunteer && {
          variant: "volunteer",
          label: "Active Volunteer",
          icon: User,
        },
      ].filter(Boolean)}
      actionButtons={[
        {
          variant: "outline",
          label: "Edit Profile",
          icon: Edit,
          onclick: () => {
            profileEditModalOpen = true;
          },
        },
        {
          variant: "outline",
          label: "Toggle Mode",
          icon: SunMoon,
          onclick: toggleMode,
        },
        {
          variant: "outline",
          label: "Logout",
          icon: LogOut,
          onclick: logout,
        },
      ]}
    />

    <!-- Information Cards Layout -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Personal Information Card -->
      <ProfileInfoCard
        title="Personal Information"
        description="Your personal details and contact information"
        fields={[
          {
            icon: User,
            label: "Email",
            value: currentUser.email,
            fallback: "Email not provided",
          },
          {
            icon: Phone,
            label: "Phone Number",
            value: currentUser.phone,
            fallback: "Phone number not provided",
          },
          {
            icon: Calendar,
            label: "Date of Birth",
            value: formatDate(currentUser.date_of_birth),
          },
          {
            icon: MapPin,
            label: "Address",
            value:
              [
                currentUser.address_line,
                currentUser.city,
                currentUser.state,
                currentUser.postal_code,
              ]
                .filter(Boolean)
                .join(", ") || null,
            fallback: "Address not provided",
          },
        ]}
      />

      <!-- Volunteer Information Card -->
      <ProfileInfoCard
        title="Volunteer Information"
        description="Your volunteer details and access information"
        fields={[
          {
            icon: Clock,
            label: "Volunteer Start Date",
            value: formatDate(currentUser.volunteer_start_date),
            fallback: "Start date not recorded",
          },
          {
            icon: CreditCard,
            label: "Staff Card No (RFID)",
            value: currentUser.rfid_tag,
            fallback: "RFID not assigned",
          },
        ]}
      />

      <!-- Volunteer Card -->
      <ProfileInfoCard
        title="Volunteer Notes"
        description="Information, preferences, and notes about you as a volunteer"
        fields={[
          {
            icon: FileText,
            label: "Volunteer Notes",
            value: currentUser.volunteer_notes,
            fallback: "No notes recorded",
          },
        ]}
      />
    </div>
  {/if}
</div>

<!-- Profile Edit Modal -->
{#if currentUser}
  <ProfileEditModal
    bind:open={profileEditModalOpen}
    id={currentUser.id}
    email={currentUser.email}
    firstName={currentUser.first_name || ""}
    lastName={currentUser.last_name || ""}
    phone={currentUser.phone || ""}
    dateOfBirth={currentUser.date_of_birth || ""}
    addressLine={currentUser.address_line || ""}
    city={currentUser.city || ""}
    state={currentUser.state || ""}
    postalCode={currentUser.postal_code || ""}
    volunteerStartDate={currentUser.volunteer_start_date || ""}
    isActiveVolunteer={currentUser.is_active_volunteer || false}
    rfidTag={currentUser.rfid_tag || ""}
    notes={currentUser.volunteer_notes || ""}
  />
{/if}
