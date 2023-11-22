import { supabase } from '@/supabase/supabase';
import { httpRequest, secUrl } from '../lib/utils';
/**
 * API code for all authentication functionality will be done from this file
 * Supabase docs for methods used can be found in https://supabase.com/docs/reference/javascript
 */

/** Used to get the currently logged user details for the session if one exists */
// const url = apiUrl();
export async function getCurrentUser() {
  // const { data, error } = await supabase.auth.getSession();
  // // console.log(data);

  // if (error) throw new Error(error.message);

  // if (!data.session) return null;

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // const dbUser = await httpRequest(`${url}/me`);

  // user.user = dbUser; //combine user from database with user from supabase

  // return user;
  const storedValue = localStorage.getItem('raia-auth-state');
  if (!storedValue) return null;

  try {
    const data = await httpRequest(secUrl + '/auth/me');

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signInWithPassword({ email, password }) {
  try {
    const res = await fetch(`${secUrl}/auth/sign-in`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    throw new Error(error);
  }
  // const { data } = await axiosRequest(
  //   `${secUrl}/auth/sign-in`,
  //   'POST',
  //   JSON.stringify({ email, password })
  // );
  // console.log(data);

  // return data;
}

// export async function signInWithPassword({ email, password }) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) throw new Error(error.message);

//   return data;
// }

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
    const response = await fetch(secUrl + '/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify({
        email: details.email,
        fullName: details.fullName,
        role: details.joiningAs,
        contact: details.contact,
        password: details.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const resdata = await response.json();
    if (!response.ok)
      throw new Error(
        resdata.error || 'Something went wrong while signing you up'
      );

    return resdata;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function sendResetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
}

// export async function logout() {
//   const { error } = await supabase.auth.signOut();

//   if (error) throw new Error(error.message);
// }

export async function logout() {
  try {
    await httpRequest(secUrl + '/auth/logout', 'POST');
  } catch (error) {
    throw new Error(error);
  }
}
