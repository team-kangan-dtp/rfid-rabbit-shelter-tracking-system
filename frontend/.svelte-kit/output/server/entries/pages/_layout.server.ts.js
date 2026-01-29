const load = async ({
  locals: { safeGetSession, supabase },
  cookies
}) => {
  const { session, user } = await safeGetSession();
  let userProfile = null;
  if (user?.id) {
    const { data, error } = await supabase.from("user").select("id, email, first_name, last_name, phone, rfid_tag, volunteer_start_date").eq("id", user.id).single();
    userProfile = data;
  }
  return {
    session,
    user,
    userProfile,
    cookies: cookies.getAll()
  };
};
export {
  load
};
