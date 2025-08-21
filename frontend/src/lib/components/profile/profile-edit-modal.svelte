<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Phone } from "lucide-svelte";

  interface Props {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    volunteerStartDate: string;
    isActiveVolunteer: boolean;
    rfidTag: string;
    notes: string;
    open: boolean;
  }

  let {
    id,
    email,
    firstName,
    lastName,
    phone,
    dateOfBirth,
    addressLine,
    city,
    state,
    postalCode,
    volunteerStartDate,
    isActiveVolunteer,
    rfidTag,
    notes,
    open = $bindable(),
  }: Props = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="max-w-2xl max-h-[90vh] flex flex-col">
    <Dialog.Header>
      <Dialog.Title>Edit Profile</Dialog.Title>
      <Dialog.Description>
        Profile editing form will go here.
      </Dialog.Description>
    </Dialog.Header>

    <form
      id="edit-profile-form"
      method="POST"
      action="?/update"
      class="flex-1 space-y-4
    overflow-y-auto"
    >
      <input type="hidden" name="id" value={id} />

      <!-- First Name -->
      <div class="space-y-2">
        <Label for="first-name">First Name *</Label>
        <Input
          id="first-name"
          type="text"
          name="first_name"
          bind:value={firstName}
          required
        />
      </div>

      <!-- Last Name -->
      <div class="space-y-2">
        <Label for="last-name">Last Name *</Label>
        <Input
          id="last-name"
          type="text"
          name="last_name"
          bind:value={lastName}
          required
        />
      </div>

      <!-- Phone -->
      <div class="space-y-2">
        <Label for="phone">Phone *</Label>
        <Input id="phone" type="tel" name="phone" bind:value={phone} required />
      </div>

      <!-- Date of Birth -->
      <div class="space-y-2">
        <Label for="date-of-birth">Date of Birth *</Label>
        <Input
          id="date-of-birth"
          type="date"
          name="date_of_birth"
          bind:value={dateOfBirth}
          required
        />
      </div>

      <!-- Address Line -->
      <div class="space-y-2">
        <Label for="address-line">Address Line *</Label>
        <Input
          id="address-line"
          type="text"
          name="address_line"
          bind:value={addressLine}
          required
        />
      </div>

      <!-- City -->
      <div class="space-y-2">
        <Label for="city">City *</Label>
        <Input id="city" type="text" name="city" bind:value={city} required />
      </div>

      <!-- State -->
      <div class="space-y-2">
        <Label for="state">State *</Label>
        <Input
          id="state"
          type="text"
          name="state"
          bind:value={state}
          required
        />
      </div>

      <!-- Postal Code -->
      <div class="space-y-2">
        <Label for="postal-code">Postal Code *</Label>
        <Input
          id="postal-code"
          type="text"
          name="postal_code"
          bind:value={postalCode}
          required
        />
      </div>

      <!-- Volunteer Start Date -->
      <div class="space-y-2">
        <Label for="volunteer-start-date">Volunteer Start Date *</Label>
        <Input
          id="volunteer-start-date"
          type="date"
          name="volunteer_start_date"
          bind:value={volunteerStartDate}
          required
        />
      </div>

      <!-- Is Active Volunteer -->
      <div class="space-y-2">
        <Label for="is-active-volunteer">Active Volunteer Status</Label>
        <Checkbox id="is-active-volunteer" name="is_active_volunteer" bind:checked={isActiveVolunteer} />
      </div>

      <!-- RFID Tag -->
      <div class="space-y-2">
        <Label for="rfid-tag">RFID Tag *</Label>
        <Input
          id="rfid-tag"
          type="text"
          name="rfid_tag"
          bind:value={rfidTag}
          required
        />
      </div>

      <!-- Notes -->
      <div class="space-y-2">
        <Label for="notes">Notes</Label>
        <Textarea id="notes" name="volunteer_notes" bind:value={notes} />
      </div>
    </form>

    <Dialog.Footer>
      <Button type="submit" form="edit-profile-form">Update Profile</Button>
      <Button onclick={() => (open = false)}>Close</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
