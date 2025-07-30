<script lang="ts">
    import type { PageData } from "./$types";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import type { Animal, HealthCheck, HealthStatus, Adoption, AdoptionStatus, Shift, ShiftStatus } from "../ambient";

    export let data: PageData;

    let animals: Animal[] = [];
    let healthChecks: HealthCheck[] = [];
    let adoptions: Adoption[] = [];
    let shifts: Shift[] = [];

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
            updatedAt: animal.updatedAt
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
            followUpDate: healthCheck.follow_up_date ? new Date(healthCheck.follow_up_date) : undefined,
            overallHealthStatus: healthCheck.overall_health_status,
            createdAt: healthCheck.createdAt
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
            updatedAt: new Date(adoption.updatedAt)
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
            updatedAt: shift.updatedAt ? new Date(shift.updatedAt) : null
        };

        shifts.push(newShift);
    }
</script>

<main>
    <h1 class="text-2xl font-bold">Animal Shelter Dashboard</h1>
    <p class="text-gray-600">Welcome to the animal shelter dashboard. Here you can find information about the animals and their health checks.</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <Card.Root class="w-full max-w-sm">
            <Card.Header>
                <Card.Title>Animals</Card.Title>
            </Card.Header>

            <Card.Content>
                {#if animals.length === 0}
                    <p>No animals found.</p>
                {:else}
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{animals.length}</span> total animals</h2>
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{animals.filter(animal => animal.adoptionStatus === 'Available').length}</span> available for adoption</h2>
                    <h2 class="text-lg font-semibold"><span class="text-3xl">{animals.filter(animal => animal.arrivalDate && animal.arrivalDate > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)).length}</span> arrived in the last 14 days</h2>

                {/if}
            </Card.Content>

            <Card.Footer class="flex-col gap-2">
                <a href="/animals">
                    <Button class="w-full" variant="outline">View Animals</Button>
                </a>
            </Card.Footer>
        </Card.Root>


        <Card.Root class="w-full max-w-sm">
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
        </Card.Root>


        <Card.Root class="w-full max-w-sm">
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
        </Card.Root>


        <Card.Root class="w-full max-w-sm">
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
        </Card.Root>
    </div>
    
</main>