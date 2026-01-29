import { createClient } from "@supabase/supabase-js";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_ANON_KEY } from "./public.js";
const customFetch = (url, options = {}) => {
  const modifiedOptions = {
    ...options,
    headers: {
      // Only send apikey header (NOT Authorization: Bearer) - this is what works with local Supabase
      "apikey": PUBLIC_SUPABASE_ANON_KEY,
      // Required for ngrok to prevent browser warning page
      "ngrok-skip-browser-warning": "true",
      // Standard content type for JSON requests
      "Content-Type": "application/json"
    }
  };
  return fetch(url, modifiedOptions);
};
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
  global: {
    // Override the default fetch function with our custom one
    fetch: customFetch
  },
  auth: {
    // Disable session management since we're using direct API access
    persistSession: false,
    autoRefreshToken: false
  }
});
export {
  supabase as s
};
