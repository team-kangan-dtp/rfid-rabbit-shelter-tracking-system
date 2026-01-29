import { f as fail } from "../../../chunks/index.js";
import { s as supabase } from "../../../chunks/supabaseClient.js";
const load = async ({ parent }) => {
  const parentData = await parent();
  const { data, error } = await supabase.from("animal").select();
  if (error) {
    console.error("Supabase error:", error);
    return {
      ...parentData,
      animals: [],
      error: error.message
    };
  }
  console.log("✅ Animal data from database:", data);
  const parsedAnimals = (data ?? []).map((row) => {
    const parsedRow = { ...row };
    for (const key of Object.keys(parsedRow)) {
      const val = parsedRow[key];
      if (typeof val === "string") {
        const trimmed = val.trim();
        if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
          try {
            parsedRow[key] = JSON.parse(trimmed);
          } catch (e) {
          }
        }
      }
    }
    return parsedRow;
  });
  return {
    ...parentData,
    animals: parsedAnimals
  };
};
const actions = {
  // GET - Fetch all animals
  get: async ({ request }) => {
    try {
      const formData = await request.formData();
      console.log("📝 Form data received:");
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
      }
      const limitValue = formData.get("limit");
      const dbFieldsRaw = formData.get("dbFields");
      const dbFields = typeof dbFieldsRaw === "string" && dbFieldsRaw.trim() !== "" ? dbFieldsRaw : "*";
      const limit = limitValue ? parseInt(limitValue, 10) : void 0;
      const query = supabase.from("animal").select(dbFields);
      const { data, error } = limit ? await query.limit(limit) : await query;
      if (error) {
        console.error("❌ Get error:", error);
        return fail(404, { error: error.message });
      }
      return { animals: data ?? [] };
    } catch (err) {
      console.error("❌ Unexpected error in get action:", err);
      return fail(500, { error: "Unexpected error occurred" });
    }
  },
  // CREATE - Add a new animal
  create: async ({ request }) => {
    console.log("🚀🚀🚀 CREATE ACTION CALLED! 🚀🚀🚀");
    try {
      const data = await request.formData();
      console.log("📝 Form data received:");
      for (let [key, value] of data.entries()) {
        console.log(`  ${key}: ${value}`);
      }
      const animalData = {
        name: data.get("name"),
        species: data.get("species"),
        breed: data.get("breed") || null,
        date_of_birth: data.get("date_of_birth") || null,
        fur_colour: data.get("fur_colour") || null,
        weight_kg: data.get("weight_kg") ? parseFloat(data.get("weight_kg")) : null,
        arrival_date: data.get("arrival_date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        neutered: data.get("neutered") === "on",
        adoption_status: data.get("adoption_status") || "Available",
        bonded_with: data.get("bonded_with") || null,
        rfid_tag: data.get("rfid_tag") || null,
        special_needs: data.get("special_needs") || null,
        description: data.get("description") || null
      };
      console.log("💾 Animal data to insert:", animalData);
      const { data: insertedData, error } = await supabase.from("animal").insert([animalData]).select();
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
  update: async ({ request }) => {
    console.log("🔄 UPDATE ACTION CALLED");
    const data = await request.formData();
    const id = data.get("id");
    const animalData = {
      name: data.get("name"),
      species: data.get("species"),
      breed: data.get("breed") || null,
      date_of_birth: data.get("date_of_birth") || null,
      fur_colour: data.get("fur_colour") || null,
      weight_kg: data.get("weight_kg") ? parseFloat(data.get("weight_kg")) : null,
      arrival_date: data.get("arrival_date"),
      neutered: data.get("neutered") === "on",
      adoption_status: data.get("adoption_status"),
      bonded_with: data.get("bonded_with") || null,
      rfid_tag: data.get("rfid_tag") || null,
      special_needs: data.get("special_needs") || null,
      description: data.get("description") || null
    };
    const { error } = await supabase.from("animal").update(animalData).eq("id", id);
    if (error) {
      console.error("Update error:", error);
      return fail(400, { error: error.message });
    }
    return { success: true };
  },
  // DELETE - Delete an existing animal
  delete: async ({ request }) => {
    console.log("🗑️ DELETE ACTION CALLED");
    const data = await request.formData();
    const id = data.get("id");
    const { error } = await supabase.from("animal").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
      return fail(400, { error: error.message });
    }
    return { success: true };
  },
  // PARTIAL UPDATE - only modify provided fields (prevents nulling omitted data)
  put: async ({ request }) => {
    console.log("🧩 PARTIAL PUT ACTION CALLED");
    const form = await request.formData();
    const id = form.get("id");
    if (!id) return fail(400, { error: "Missing id" });
    const allowed = [
      "name",
      "species",
      "breed",
      "date_of_birth",
      "fur_colour",
      "weight_kg",
      "arrival_date",
      "neutered",
      "adoption_status",
      "bonded_with",
      "rfid_tag",
      "special_needs",
      "description"
    ];
    const updatePayload = {};
    for (const key of allowed) {
      if (form.has(key)) {
        let value = form.get(key);
        if (value === "") {
          if ([
            "breed",
            "date_of_birth",
            "fur_colour",
            "bonded_with",
            "rfid_tag",
            "special_needs",
            "description",
            "weight_kg"
          ].includes(key))
            value = null;
        }
        if (key === "weight_kg" && value) value = parseFloat(value);
        if (key === "neutered") value = value === "on" || value === "true";
        updatePayload[key] = value;
      }
    }
    if (Object.keys(updatePayload).length === 0) {
      return fail(400, { error: "No fields provided to update" });
    }
    console.log("🔧 Partial update payload:", updatePayload);
    const { error } = await supabase.from("animal").update(updatePayload).eq("id", id);
    if (error) {
      console.error("Partial update error:", error);
      return fail(400, { error: error.message });
    }
    return { success: true, updated: Object.keys(updatePayload) };
  }
};
export {
  actions,
  load
};
