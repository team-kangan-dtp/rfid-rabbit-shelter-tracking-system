<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import RfidScanChart from "$lib/components/rfid-scan-chart.svelte";
  import type {
    Animal,
    HealthCheck,
    Adoption,
    Shift,
    RfidLog,
  } from "../ambient";

  export let data: PageData;

  let animals: Animal[] = [];
  let healthChecks: HealthCheck[] = [];
  let adoptions: Adoption[] = [];
  let shifts: Shift[] = [];
  let rfidScans: RfidLog[] = [];

  // Convert the animal data to animal types
  for (const animal of data.animals) {
    let newAnimal: Animal = {
      id: animal.id,
      name: animal.name,
      dateOfBirth: animal.date_of_birth ? new Date(animal.date_of_birth) : null,
      species: animal.species,
      breed: animal.breed,
      furColour: animal.fur_color,
      weightKg: animal.weight_kg,
      arrivalDate: animal.arrival_date ? new Date(animal.arrival_date) : null,
      neutered: animal.neutered,
      adoptionStatus: animal.adoption_status,
      bondedWith: animal.bonded_with,
      rfidTag: animal.rfid_tag,
      specialNeeds: animal.special_needs,
      description: animal.description,
      createdAt: animal.createdAt,
      updatedAt: animal.updatedAt,
    };

    animals.push(newAnimal);
  }

  // Convert the health check data to health check types
  for (const healthCheck of data.healthChecks) {
    let newHealthCheck: HealthCheck = {
      id: healthCheck.id,
      animalId: healthCheck.animal_id,
      vetId: healthCheck.vet_id,
      checkDate: new Date(healthCheck.check_date),
      checkType: healthCheck.check_type,
      weightKg: healthCheck.weight_kg,
      temperatureCelsius: healthCheck.temperature_celsius,
      heartRate: healthCheck.heart_rate,
      examinationNotes: healthCheck.examination_notes,
      diagnosis: healthCheck.diagnosis,
      treatmentGiven: healthCheck.treatment_given,
      medicationsPrescribed: healthCheck.medications_prescribed,
      followUpRequired: healthCheck.follow_up_required,
      followUpDate: healthCheck.follow_up_date
        ? new Date(healthCheck.follow_up_date)
        : undefined,
      overallHealthStatus: healthCheck.overall_health_status,
      createdAt: healthCheck.createdAt,
    };

    healthChecks.push(newHealthCheck);
  }

  // Convert the adoption data to adoption types
  for (const adoption of data.adoptions) {
    let newAdoption: Adoption = {
      id: adoption.id,
      animalId: adoption.animal_id,
      adopterId: adoption.adopter_id,
      adoptionDate: new Date(adoption.adoption_date),
      adoptionFee: adoption.adoption_fee,
      returnDate: adoption.return_date ? new Date(adoption.return_date) : null,
      returnReason: adoption.return_reason ?? null,
      adoptionStatus: adoption.adoption_status ?? null,
      notes: adoption.notes ?? null,
      createdAt: new Date(adoption.createdAt),
      updatedAt: new Date(adoption.updatedAt),
    };

    adoptions.push(newAdoption);
  }

  // Convert the shift data to shift types
  for (const shift of data.shifts) {
    let newShift: Shift = {
      shiftId: shift.shift_id,
      userId: shift.user_id,
      shiftType: shift.shift_type,
      shiftDate: new Date(shift.shift_date),
      actualStart: shift.actual_start ?? null,
      actualEnd: shift.actual_end ?? null,
      primaryRole: shift.primary_role ?? null,
      dutiesPerformed: shift.duties_performed ?? null,
      status: shift.status ?? null,
      notes: shift.notes ?? null,
      createdAt: shift.createdAt ? new Date(shift.createdAt) : null,
      updatedAt: shift.updatedAt ? new Date(shift.updatedAt) : null,
    };

    shifts.push(newShift);
  }

  // Convert the RFID scan data to RfidLog types
  for (const rfid of data.rfids) {
    let newRfid: RfidLog = {
      id: rfid.id,
      scanTime: rfid.scan_time ? new Date(rfid.scan_time) : null,
      userId: rfid.user_id ?? null,
      animalId: rfid.animal_id ?? null,
    };

    rfidScans.push(newRfid);
  }
</script>

<main class="px-6 pt-6 pb-6">
  <div class="flex items-center justify-between mb-2">
    <div class="space-y-1">
      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Dashboard
      </h1>
      <p class="text-xl text-muted-foreground">
        Overview of shelter operations and animal status.
      </p>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    <Card.Root class="w-full max-w-sm">
      <Card.Header
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <Card.Title class="text-lg font-medium">Animals</Card.Title>
        <a href="/animals">
          <Button size="sm" variant="outline">View Animals</Button>
        </a>
      </Card.Header>

      <Card.Content class="space-y-4">
        {#if animals.length === 0}
          <p class="text-muted-foreground">No animals found.</p>
        {:else}
          <div class="grid gap-3">
            <!-- Total animals -->
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="text-2xl">{animals.length}</p>
                <p class="text-xs text-muted-foreground">Total animals</p>
              </div>
              <div
                class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
              >
                <svg
                  class="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>

            <!-- New arrivals -->
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="text-2xl">
                  {animals.filter(
                    (animal) =>
                      animal.arrivalDate &&
                      animal.arrivalDate >
                        new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
                <p class="text-xs text-muted-foreground">
                  New arrivals (14 days)
                </p>
              </div>
              <div
                class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
              >
                <svg
                  class="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <!-- Available for adoption -->
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="text-2xl">
                  {animals.filter(
                    (animal) => animal.adoptionStatus === "Available"
                  ).length}
                </p>
                <p class="text-xs text-muted-foreground">
                  Available for adoption
                </p>
              </div>
              <div
                class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
              >
                <svg
                  class="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>

            <!-- Successfully adopted -->
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="text-2xl">
                  {animals.filter(
                    (animal) => animal.adoptionStatus === "Adopted"
                  ).length}
                </p>
                <p class="text-xs text-muted-foreground">
                  Successfully adopted
                </p>
              </div>
              <div
                class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
              >
                <svg
                  class="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        {/if}
      </Card.Content>
    </Card.Root>

    <!-- <Card.Root class="w-full max-w-sm">
            <Card.Header>
                <Card.Title>Health Checks</Card.Title>
            </Card.Header>

            <Card.Content>
                {#if healthChecks.length === 0}
                    <p>No health checks found.</p>
                {:else}
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{healthChecks.filter(check => check.overallHealthStatus != null && (check.overallHealthStatus === 'Excellent' || check.overallHealthStatus === 'Good')).length}</span> healthy animals</h2>
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{healthChecks.filter(check => check.checkDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</span> health checks in the last 30 days</h2>
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{healthChecks.filter(check => check.followUpRequired && check.followUpDate && check.followUpDate > new Date()).length}</span> follow-up required</h2>
                {/if}
            </Card.Content>

            <Card.Footer class="flex-col gap-2">
                <a href="/health_checks">
                    <Button class="w-full" variant="outline">View Health Checks</Button>
                </a>
            </Card.Footer>
        </Card.Root> -->

    <!-- <Card.Root class="w-full max-w-sm">
            <Card.Header>
                <Card.Title>Adoptions</Card.Title>
            </Card.Header>

            <Card.Content>
                {#if adoptions.length === 0}
                    <p>No adoptions found.</p>
                {:else}
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{adoptions.filter(adoption => adoption.adoptionStatus === 'Active' as AdoptionStatus && adoption.adoptionDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</span> adoptions in the last 30 days</h2>
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{adoptions.filter(adoption => adoption.adoptionStatus === 'Cancelled' as AdoptionStatus && adoption.updatedAt > new Date(Date.now() - 92 * 24 * 60 * 60 * 1000)).length}</span> cancelled adoptions in the last 3 months</h2>
                {/if}
            </Card.Content>

            <Card.Footer class="flex-col gap-2">
                <a href="/adoptions">
                    <Button class="w-full" variant="outline">View Adoptions</Button>
                </a>
            </Card.Footer>
        </Card.Root> -->

    <!-- <Card.Root class="w-full max-w-sm">
            <Card.Header>
                <Card.Title>Roster</Card.Title>
            </Card.Header>

            <Card.Content>
                {#if shifts.length === 0}
                    <p>No shifts found.</p>
                {:else}
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{shifts.filter(shifts => shifts.status === 'Scheduled' as ShiftStatus && shifts.shiftDate > new Date()).length}</span> scheduled & upcoming shifts</h2>
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{shifts.filter(shifts => shifts.status === 'In Progress' as ShiftStatus && shifts.shiftDate > new Date()).length}</span> in-progress shifts</h2>
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{shifts.filter(shifts => shifts.status === 'Cancelled' as ShiftStatus && shifts.shiftDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</span> cancelled shifts in the last 30 days</h2>
                {/if}
            </Card.Content>

            <Card.Footer class="flex-col gap-2">
                <a href="/roster">
                    <Button class="w-full" variant="outline">View roster</Button>
                </a>
            </Card.Footer>
        </Card.Root> -->

    <Card.Root class="w-full max-w-sm">
      <Card.Header
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <Card.Title class="text-lg font-medium">Scan Logs</Card.Title>
        <a href="/scan-logs">
          <Button size="sm" variant="outline">View scan logs</Button>
        </a>
      </Card.Header>

      <Card.Content>
        {#if rfidScans.length === 0}
          <p class="text-muted-foreground">No logs found.</p>
        {:else}
          <RfidScanChart rawChartData={rfidScans} />
        {/if}
      </Card.Content>
    </Card.Root>

    <Card.Root class="w-full max-w-sm">
      <Card.Header
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <Card.Title class="text-lg font-medium">My Profile</Card.Title>
        <a href="/private">
          <Button size="sm" variant="outline">Edit Profile</Button>
        </a>
      </Card.Header>

      <Card.Content class="space-y-4">
        {#if data.userProfile}
          <div class="grid gap-3">
            <!-- Name -->
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="text-2xl">
                  {#if data.userProfile.first_name || data.userProfile.last_name}
                    {data.userProfile.first_name || ""}
                    {data.userProfile.last_name || ""}
                  {:else}
                    {data.userProfile.email}
                  {/if}
                </p>
                <p class="text-xs text-muted-foreground">Name</p>
              </div>
              <div
                class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
              >
                <svg
                  class="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            <!-- Volunteer Status -->
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="text-2xl">Active</p>
                <p class="text-xs text-muted-foreground">Volunteer status</p>
              </div>
              <div
                class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
              >
                <svg
                  class="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <!-- Volunteer Since -->
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                {#if data.userProfile.volunteer_start_date}
                  <p class="text-2xl">
                    {new Date(
                      data.userProfile.volunteer_start_date
                    ).toLocaleDateString()}
                  </p>
                  <p class="text-xs text-muted-foreground">Volunteer since</p>
                {:else}
                  <p class="text-2xl">Not set</p>
                  <p class="text-xs text-muted-foreground">Volunteer since</p>
                {/if}
              </div>
              <div
                class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
              >
                <svg
                  class="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                  />
                </svg>
              </div>
            </div>

            <!-- RFID Access Card -->
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                {#if data.userProfile.rfid_tag}
                  <p class="text-2xl">
                    {data.userProfile.rfid_tag}
                  </p>
                  <p class="text-xs text-muted-foreground">RFID access card</p>
                {:else}
                  <p class="text-2xl">Not Assigned</p>
                  <p class="text-xs text-muted-foreground">RFID access card</p>
                {/if}
              </div>
              <div
                class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
              >
                <svg
                  class="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        {:else}
          <p class="text-muted-foreground">No profile information available.</p>
        {/if}
      </Card.Content>
    </Card.Root>
  </div>
</main>
