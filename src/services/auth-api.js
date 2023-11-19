import { supabase } from '@/supabase/supabase';
import { apiUrl, httpRequest } from '../lib/utils';
/**
 * API code for all authentication functionality will be done from this file
 * Supabase docs for methods used can be found in https://supabase.com/docs/reference/javascript
 */

/** Used to get the currently logged user details for the session if one exists */
const url = apiUrl();
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();
  // console.log(data);

  if (error) throw new Error(error.message);

  if (!data.session) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dbUser = await httpRequest(`${url}/me`);

  user.user = dbUser; //combine user from database with user from supabase

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

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);

  if (!data.session) return null;

  return data.session;
}

export async function signUp(details) {
  try {
    const response = await fetch(url + '/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: details.email,
        full_name: details.fullName,
        role: details.joiningAs,
        contact: details.contact,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const resdata = await response.json();

    if (!response.ok) {
      throw new Error(resdata.errors);
    }

    const { data, error } = await supabase.auth.signUp({
      email: details.email,
      password: details.password,
      options: {
        data: {
          fullName: details.fullName,
          role: details.joiningAs,
          contact: details.contact,
          avatar_url: null,
        },
      },
    });

    if (error) throw new Error(error.message);

    try {
      await fetch(`${url}/session/set_uid/${resdata.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ user_uid: data.user.id }),
      });
    } catch (error) {
      throw new Error(error.message);
    }

    // try {
    //   await httpRequest(
    //     `${url}/session/set_uid/${resdata.id}`,
    //     'PATCH',
    //     JSON.stringify({ user_uid: data.user.id })
    //   );
    // } catch (error) {
    //   throw new Error(error.message);
    // }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function sendResetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
