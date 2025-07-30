import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import { supabase } from "$lib/supabaseClient";

// READ - Load all animals without authentication check
export const load: PageServerLoad = async () => {
  // Fetch all animals and health checks from the database using the direct supabase client
  const { data: animalData, error } = await supabase.from("animal").select();
  const { data: healthCheckData, error: healthCheckError } = await supabase
    .from("health_check")
    .select();
  const { data: adoptionData, error: adoptionError } = await supabase
    .from("adoption")
    .select();

  const { data: shiftData, error: shiftError } = await supabase
    .from("shift")
    .select();

  // Handle errors gracefully
  if (error || healthCheckError || adoptionError || shiftError) {
    console.error(
      "Supabase error:",
      error || healthCheckError || adoptionError || shiftError
    );
    return {
      animals: [],
      healthChecks: [],
      adoptions: [],
      shifts: [],
      animalError: error?.message,
      healthCheckError: healthCheckError?.message,
      adoptionError: adoptionError?.message,
      shiftError: shiftError?.message,
    };
  }

  //  console.log("✅ Animal data from database:", animalData);
  //  console.log("✅ Health check data from database:", healthCheckData);
  console.log("✅ Adoption data from database:", adoptionData);

  return {
    animals: animalData ?? [],
    healthChecks: healthCheckData ?? [],
    adoptions: adoptionData ?? [],
    shifts: shiftData ?? [],
  };
};
