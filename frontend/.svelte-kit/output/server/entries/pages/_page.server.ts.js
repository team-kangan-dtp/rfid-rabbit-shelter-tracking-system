import "../../chunks/index.js";
import { s as supabase } from "../../chunks/supabaseClient.js";
const load = async ({ parent }) => {
  const parentData = await parent();
  const { data: animalData, error } = await supabase.from("animal").select();
  const { data: healthCheckData, error: healthCheckError } = await supabase.from("health_check").select();
  const { data: adoptionData, error: adoptionError } = await supabase.from("adoption").select();
  const { data: shiftData, error: shiftError } = await supabase.from("shift").select();
  const { data: rfidData, error: rfidError } = await supabase.from("rfid_log").select();
  if (error || healthCheckError || adoptionError || shiftError || rfidError) {
    console.error(
      "Supabase error:",
      error || healthCheckError || adoptionError || shiftError || rfidError
    );
    return {
      ...parentData,
      // Include parent data even on error
      animals: [],
      healthChecks: [],
      adoptions: [],
      shifts: [],
      rfids: [],
      animalError: error?.message,
      healthCheckError: healthCheckError?.message,
      adoptionError: adoptionError?.message,
      shiftError: shiftError?.message,
      rfidError: rfidError?.message
    };
  }
  return {
    ...parentData,
    // Include parent data (session, user, userProfile)
    animals: animalData ?? [],
    healthChecks: healthCheckData ?? [],
    adoptions: adoptionData ?? [],
    shifts: shiftData ?? [],
    rfids: rfidData ?? []
  };
};
export {
  load
};
