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

  const { data: rfidData, error: rfidError } = await supabase
    .from("rfid_log")
    .select();

  // Handle errors gracefully
  if (error || healthCheckError || adoptionError || shiftError || rfidError) {
    console.error(
      "Supabase error:",
      error || healthCheckError || adoptionError || shiftError || rfidError
    );
    return {
      animals: [],
      healthChecks: [],
      adoptions: [],
      shifts: [],
      rfids: [],
      animalError: error?.message,
      healthCheckError: healthCheckError?.message,
      adoptionError: adoptionError?.message,
      shiftError: shiftError?.message,
      rfidError: rfidError?.message,
    };
  }

  //  console.log("✅ Animal data from database:", animalData);
  //  console.log("✅ Health check data from database:", healthCheckData);
  // console.log("✅ Adoption data from database:", adoptionData);
  // console.log("✅ Shift data from database:", shiftData);
  console.log("✅ RFID data from database:", rfidData);

  return {
    animals: animalData ?? [],
    healthChecks: healthCheckData ?? [],
    adoptions: adoptionData ?? [],
    shifts: shiftData ?? [],
    rfids: rfidData ?? [],
  };
};
