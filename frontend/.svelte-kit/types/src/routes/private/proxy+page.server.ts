// @ts-nocheck
import type { PageServerLoad, Actions } from "./$types";
import { supabase } from "$lib/supabaseClient";
import { fail, redirect } from "@sveltejs/kit";

// READ - Load current user data without authentication check
export const load = async ({ parent }: Parameters<PageServerLoad>[0]) => {
  // Get parent data (includes session, user, userProfile)
  const parentData = await parent();

  // Fetch current user from the database using the direct supabase client
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("id", parentData.user?.id);

  // Handle errors gracefully
  if (error) {
    console.error("Supabase error:", error);
    return {
      ...parentData,
      currentUser: null,
      error: error.message,
    };
  }

  // console.log("✅ Current user data from database:", data);
  // console.log("✅ Extracting first user from array:", data ? data[0] : null);

  return {
    ...parentData,
    currentUser: data ? data[0] : null,
  };
};

export const actions = {
  update: async ({ request, locals }: import('./$types').RequestEvent) => {
    const session = await locals.safeGetSession();
    if (!session) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();
    const userId = formData.get("id") as string;

    // Extract form fields
    const updateData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone: formData.get("phone") as string,
      date_of_birth: formData.get("date_of_birth") as string,
      address_line: formData.get("address_line") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postal_code: formData.get("postal_code") as string,
      volunteer_start_date: formData.get("volunteer_start_date") as string,
      is_active_volunteer: formData.get("is_active_volunteer"),
      rfid_tag: formData.get("rfid_tag") as string,
      volunteer_notes: formData.get("volunteer_notes") as string,
    };

    // Update user in database
    const { error } = await supabase
      .from("user")
      .update(updateData)
      .eq("id", userId);

    if (error) {
      console.error("Profile update error:", error);
      return fail(500, {
        error: "Failed to update profile. Please try again.",
      });
    }

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  },
};
;null as any as Actions;