import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  depends,
  locals: { supabase },
  parent,
}) => {
  // Get user/session data from parent layout
  const parentData = await parent();

  depends("supabase:db:notes");
  const { data: notes } = await supabase
    .from("notes")
    .select("id,note")
    .order("id");

  return {
    ...parentData, // This includes session, user, userProfile from root layout
    notes: notes ?? [],
  };
};
