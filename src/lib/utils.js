import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName) {
  const words = fullName.split(/\s+/);
  const firstNameInitial = words[0] ? words[0].charAt(0) : '';

  const lastNameInitial =
    words.length > 1 ? words[words.length - 1].charAt(0) : '';

  return firstNameInitial + lastNameInitial;
}

export function apiUrl() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_DEV_API_URL;
  } else {
    return import.meta.env.VITE_PROD_API_URL;
  }
}

export function getToken() {
  return JSON.parse(
    localStorage.getItem(`sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`)
  );
}

export const url = apiUrl();

export async function httpRequest(
  url,
  method = 'GET',
  body = null,
  headers = {}
) {
  try {
    const response = await fetch(url, {
      method: method,
      body,
      headers: {
        'Content-Type': 'application/json',
        ...headers, // Additional headers can be passed as an object
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.errors || data.error || 'Something went wrong with your request'
      );
    }

    return data; // Return the response data on success
  } catch (error) {
    throw new Error(error.message);
  }
}

export function numberFormatter(value) {
  if (!isNaN(parseFloat(value))) {
    return new Intl.NumberFormat(undefined, {
      notation: 'compact',
    }).format(value);
  } else {
    return 0;
  }
}
