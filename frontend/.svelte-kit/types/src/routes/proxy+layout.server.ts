// @ts-nocheck
import type { LayoutServerLoad } from "./$types";
export const load = async ({
  locals: { safeGetSession, supabase },
  cookies,
}: Parameters<LayoutServerLoad>[0]) => {
  const { session, user } = await safeGetSession();
  
  let userProfile = null;
  
  // If user is authenticated, fetch their profile from the user table
  if (user?.id) {
    const { data, error } = await supabase
      .from("user")
      .select("id, email, first_name, last_name, phone, rfid_tag, volunteer_start_date")
      .eq("id", user.id)
      .single();
    
    if (error) {
      // console.error("Error fetching user profile:", error);
    } else {
      // console.log("✅ User profile loaded:", data);
    }
    
    userProfile = data;
  }
  
  return {
    session,
    user,
    userProfile,
    cookies: cookies.getAll(),
  };
};
