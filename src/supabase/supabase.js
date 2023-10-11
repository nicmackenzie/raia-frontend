import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON;
const supabaseRoleKey = import.meta.env.VITE_SUPABASE_ANON;
// export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
