import { supabase } from '@/supabase/supabase';
/**
 * API code for all authentication functionality will be done from this file
 * Supabase docs for methods used can be found in https://supabase.com/docs/reference/javascript
 */

/** Used to get the currently logged user details for the session if one exists */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);

  if (!data.session) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
