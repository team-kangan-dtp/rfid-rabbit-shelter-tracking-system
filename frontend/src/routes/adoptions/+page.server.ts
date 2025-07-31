import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import { supabase } from "$lib/supabaseClient";

// READ - Load all adoptions without authentication check
export const load: PageServerLoad = async () => {
  // Fetch all adoptions with related animal and adopter data
  const { data, error } = await supabase.from("adoption").select(`
    *,
    animal:animal_id (
      id,
      name,
      species,
      breed
    ),
    adopter:adopter_id (
      id,
      first_name,
      last_name,
      email,
      phone
    )
  `);

  // Also fetch animals and adopters for dropdowns
  const [animalsResult, adoptersResult] = await Promise.all([
    supabase
      .from("animal")
      .select("id, name, species, breed")
      .eq("adoption_status", "Available"),
    supabase.from("adopter").select("id, first_name, last_name, email, phone"),
  ]);

  // Handle errors gracefully
  if (error) {
    console.error("Supabase error:", error);
    return {
      adoptions: [],
      animals: animalsResult.data ?? [],
      adopters: adoptersResult.data ?? [],
      error: error.message,
    };
  }

  console.log(" Adoption data from database:", data);

  return {
    adoptions: data ?? [],
    animals: animalsResult.data ?? [],
    adopters: adoptersResult.data ?? [],
  };
};

// Actions without authentication checks
export const actions: Actions = {
  // CREATE - Add a new adoption
  create: async ({ request }) => {
    console.log("=�=�=� CREATE ADOPTION ACTION CALLED! =�=�=�");

    try {
      const data = await request.formData();

      console.log("=� Form data received:");
      for (let [key, value] of data.entries()) {
        console.log(`  ${key}: ${value}`);
      }

      const adoptionData = {
        animal_id: data.get("animal_id") as string,
        adopter_id: data.get("adopter_id") as string,
        adoption_date:
          (data.get("adoption_date") as string) ||
          new Date().toISOString().split("T")[0],
        adoption_fee: data.get("adoption_fee")
          ? parseFloat(data.get("adoption_fee") as string)
          : 0,
        adoption_status: (data.get("adoption_status") as string) || "Active",
        notes: (data.get("notes") as string) || null,
      };

      console.log("=� Adoption data to insert:", adoptionData);

      const { data: insertedData, error } = await supabase
        .from("adoption")
        .insert([adoptionData])
        .select();

      if (error) {
        console.error("L Create error:", error);
        return fail(400, { error: error.message });
      }

      console.log(" Adoption created successfully:", insertedData);
      return { success: true };
    } catch (err) {
      console.error("L Unexpected error in create action:", err);
      return fail(500, { error: "Unexpected error occurred" });
    }
  },

  // UPDATE - Update an existing adoption
  update: async ({ request }) => {
    console.log("= UPDATE ADOPTION ACTION CALLED");
    const data = await request.formData();
    const id = data.get("id") as string;

    const adoptionData = {
      animal_id: data.get("animal_id") as string,
      adopter_id: data.get("adopter_id") as string,
      adoption_date: data.get("adoption_date") as string,
      adoption_fee: data.get("adoption_fee")
        ? parseFloat(data.get("adoption_fee") as string)
        : 0,
      adoption_status: data.get("adoption_status") as string,
      return_date: (data.get("return_date") as string) || null,
      return_reason: (data.get("return_reason") as string) || null,
      notes: (data.get("notes") as string) || null,
    };

    const { error } = await supabase
      .from("adoption")
      .update(adoptionData)
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      return fail(400, { error: error.message });
    }

    return { success: true };
  },

  // DELETE - Delete an existing adoption
  delete: async ({ request }) => {
    console.log("=� DELETE ADOPTION ACTION CALLED");
    const data = await request.formData();
    const id = data.get("id") as string;

    const { error } = await supabase.from("adoption").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return fail(400, { error: error.message });
    }

    return { success: true };
  },
};
