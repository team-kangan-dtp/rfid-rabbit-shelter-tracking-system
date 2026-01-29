import { s as supabase } from "../../../chunks/supabaseClient.js";
import { r as redirect, f as fail } from "../../../chunks/index.js";
const load = async ({ parent }) => {
  const parentData = await parent();
  const { data, error } = await supabase.from("user").select().eq("id", parentData.user?.id);
  if (error) {
    console.error("Supabase error:", error);
    return {
      ...parentData,
      currentUser: null,
      error: error.message
    };
  }
  return {
    ...parentData,
    currentUser: data ? data[0] : null
  };
};
const actions = {
  update: async ({ request, locals }) => {
    const session = await locals.safeGetSession();
    if (!session) {
      throw redirect(303, "/auth");
    }
    const formData = await request.formData();
    const userId = formData.get("id");
    const updateData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      phone: formData.get("phone"),
      date_of_birth: formData.get("date_of_birth"),
      address_line: formData.get("address_line"),
      city: formData.get("city"),
      state: formData.get("state"),
      postal_code: formData.get("postal_code"),
      volunteer_start_date: formData.get("volunteer_start_date"),
      is_active_volunteer: formData.get("is_active_volunteer"),
      rfid_tag: formData.get("rfid_tag"),
      volunteer_notes: formData.get("volunteer_notes")
    };
    const { error } = await supabase.from("user").update(updateData).eq("id", userId);
    if (error) {
      console.error("Profile update error:", error);
      return fail(500, {
        error: "Failed to update profile. Please try again."
      });
    }
    return {
      success: true,
      message: "Profile updated successfully!"
    };
  }
};
export {
  actions,
  load
};
