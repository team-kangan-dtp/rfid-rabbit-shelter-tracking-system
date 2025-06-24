// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

/**
 * ISSUE: The default Supabase client sends both 'apikey' and 'Authorization: Bearer' headers
 * PROBLEM: Our local Supabase setup (via ngrok) only accepts the 'apikey' header
 * SOLUTION: Override the default fetch function to control exactly which headers are sent
 */

// Custom fetch function that only sends the headers that work with our local setup
const customFetch = (url, options = {}) => {
  const modifiedOptions = {
    ...options,
    headers: {
      // Only send apikey header (NOT Authorization: Bearer) - this is what works with local Supabase
      'apikey': PUBLIC_SUPABASE_ANON_KEY,
      // Required for ngrok to prevent browser warning page
      'ngrok-skip-browser-warning': 'true',
      // Standard content type for JSON requests
      'Content-Type': 'application/json'
    }
  }
  return fetch(url, modifiedOptions)
}

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
  global: {
    // Override the default fetch function with our custom one
    fetch: customFetch
  },
  auth: {
    // Disable session management since we're using direct API access
    persistSession: false,
    autoRefreshToken: false
  }
})
