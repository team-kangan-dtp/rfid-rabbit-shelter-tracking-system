// @ts-nocheck
import type { PageServerLoad, Actions } from "./$types";
import { supabase } from "$lib/supabaseClient";

// READ - Load all rfid logs with authentication data
export const load = async ({ parent }: Parameters<PageServerLoad>[0]) => {
  // Get parent data (includes session, user, userProfile)
  const parentData = await parent();

  // Fetch all rfid logs from the database using the direct supabase client
  const { data, error } = await supabase
    .from("rfid_log")
    .select(
      `
      id, 
      scan_time, 
      user_id(id, first_name, last_name), 
      animal_id(id, name, species),
      animal_note(id, note_type)
    `
    )
    .order("scan_time", { ascending: false });

  // Handle errors gracefully
  if (error) {
    console.error("Supabase error:", error);
    return {
      ...parentData,
      rfid_logs: [],
      error: error.message,
    };
  }

  // console.log("✅ RFID log data from database:", data);

  return {
    ...parentData,
    rfid_logs: data ?? [],
  };
};
