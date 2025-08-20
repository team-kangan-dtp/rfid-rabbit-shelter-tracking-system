// @ts-nocheck
import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/supabaseClient";

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
