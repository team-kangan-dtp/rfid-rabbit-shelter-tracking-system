// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import { supabase } from "$lib/supabaseClient";

// READ - Load all animals without authentication check
export const load = async ({ parent }: Parameters<PageServerLoad>[0]) => {
  // Get parent data (includes session, user, userProfile)
  const parentData = await parent();
  
  // Fetch all animals from the database using the direct supabase client
  const { data, error } = await supabase.from("animal").select();

  // Handle errors gracefully
  if (error) {
    console.error("Supabase error:", error);
    return {
      ...parentData,
      animals: [],
      error: error.message,
    };
  }

  return {
    ...parentData,
    animals: data ?? [],
  };
};

// Actions without authentication checks
export const actions = {
  // CREATE - Add a new animal
  create: async ({ request }: import('./$types').RequestEvent) => {
    console.log("🚀🚀🚀 CREATE ACTION CALLED! 🚀🚀🚀");

    try {
      const data = await request.formData();

      console.log("📝 Form data received:");
      for (let [key, value] of data.entries()) {
        console.log(`  ${key}: ${value}`);
      }

      const animalData = {
        name: data.get("name") as string,
        species: data.get("species") as string,
        breed: (data.get("breed") as string) || null,
        date_of_birth: (data.get("date_of_birth") as string) || null,
        fur_colour: (data.get("fur_colour") as string) || null,
        weight_kg: data.get("weight_kg")
          ? parseFloat(data.get("weight_kg") as string)
          : null,
        arrival_date:
          (data.get("arrival_date") as string) ||
          new Date().toISOString().split("T")[0],
        neutered: data.get("neutered") === "on",
        adoption_status: (data.get("adoption_status") as string) || "Available",
        bonded_with: (data.get("bonded_with") as string) || null,
        rfid_tag: (data.get("rfid_tag") as string) || null,
        special_needs: (data.get("special_needs") as string) || null,
        description: (data.get("description") as string) || null,
      };

      console.log("💾 Animal data to insert:", animalData);

      const { data: insertedData, error } = await supabase
        .from("animal")
        .insert([animalData])
        .select();

      if (error) {
        console.error("❌ Create error:", error);
        return fail(400, { error: error.message });
      }

      console.log("✅ Animal created successfully:", insertedData);
      return { success: true };
    } catch (err) {
      console.error("❌ Unexpected error in create action:", err);
      return fail(500, { error: "Unexpected error occurred" });
    }
  },

  // UPDATE - Update an existing animal
  update: async ({ request }: import('./$types').RequestEvent) => {
    console.log("🔄 UPDATE ACTION CALLED");
    const data = await request.formData();
    const id = data.get("id") as string;

    const animalData = {
      name: data.get("name") as string,
      species: data.get("species") as string,
      breed: (data.get("breed") as string) || null,
      date_of_birth: (data.get("date_of_birth") as string) || null,
      fur_colour: (data.get("fur_colour") as string) || null,
      weight_kg: data.get("weight_kg")
        ? parseFloat(data.get("weight_kg") as string)
        : null,
      arrival_date: data.get("arrival_date") as string,
      neutered: data.get("neutered") === "on",
      adoption_status: data.get("adoption_status") as string,
      bonded_with: (data.get("bonded_with") as string) || null,
      rfid_tag: (data.get("rfid_tag") as string) || null,
      special_needs: (data.get("special_needs") as string) || null,
      description: (data.get("description") as string) || null,
    };

    const { error } = await supabase
      .from("animal")
      .update(animalData)
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      return fail(400, { error: error.message });
    }

    return { success: true };
  },

  // DELETE - Delete an existing animal
  delete: async ({ request }: import('./$types').RequestEvent) => {
    console.log("🗑️ DELETE ACTION CALLED");
    const data = await request.formData();
    const id = data.get("id") as string;

    const { error } = await supabase.from("animal").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return fail(400, { error: error.message });
    }

    return { success: true };
  },
};
;null as any as Actions;