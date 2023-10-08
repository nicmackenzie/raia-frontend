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

export async function signInWithPassword({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signUp(details) {
  const { data, error } = await supabase.auth.signUp({
    email: details.email,
    password: details.password,
    options: {
      data: {
        fullName: details.fullName,
        role: details.joiningAs,
        contact: details.contact,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
