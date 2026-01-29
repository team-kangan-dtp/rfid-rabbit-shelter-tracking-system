import { isBrowser, createBrowserClient, createServerClient } from "@supabase/ssr";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_ANON_KEY } from "../../chunks/public.js";
const load = async ({ data, depends, fetch }) => {
  depends("supabase:auth");
  const supabase = isBrowser() ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      fetch
    }
  }) : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      fetch
    },
    cookies: {
      getAll() {
        return data.cookies;
      }
    }
  });
  return {
    session: data.session,
    // ← Use server data
    user: data.user,
    // ← Use server data
    supabase
  };
};
export {
  load
};
