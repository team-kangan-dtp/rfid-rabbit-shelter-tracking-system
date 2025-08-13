import type { PageServerLoad, Actions } from "./$types";
import { supabase } from "$lib/supabaseClient";

// READ - Load all rfid logs without authentication check
export const load: PageServerLoad = async () => {
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
      rfid_logs: [],
      error: error.message,
    };
  }

  console.log("✅ RFID log data from database:", data);

  return {
    rfid_logs: data ?? [],
  };
};
