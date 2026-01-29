import { s as supabase } from "../../../chunks/supabaseClient.js";
const load = async ({ parent }) => {
  const parentData = await parent();
  const { data, error } = await supabase.from("rfid_log").select(
    `
      id, 
      scan_time, 
      user_id(id, first_name, last_name), 
      animal_id(id, name, species),
      animal_note(id, note_type)
    `
  ).order("scan_time", { ascending: false });
  if (error) {
    console.error("Supabase error:", error);
    return {
      ...parentData,
      rfid_logs: [],
      error: error.message
    };
  }
  return {
    ...parentData,
    rfid_logs: data ?? []
  };
};
export {
  load
};
