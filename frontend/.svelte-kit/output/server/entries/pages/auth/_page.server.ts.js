import { f as fail, r as redirect } from "../../../chunks/index.js";
const actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return fail(400, {
        error: "Email and password are required"
      });
    }
    if (password.length < 6) {
      return fail(400, {
        error: "Password must be at least 6 characters long"
      });
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Signup error:", error);
      return fail(400, {
        error: error.message || "Failed to create account. Please try again."
      });
    } else {
      redirect(303, "/auth/check-mail");
    }
  },
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return fail(400, {
        error: "Email and password are required"
      });
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      console.error("Login error:", error);
      return fail(400, {
        error: error.message || "Invalid email or password. Please try again."
      });
    } else {
      redirect(303, "/");
    }
  }
};
export {
  actions
};
