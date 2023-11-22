import { clsx } from 'clsx';
import { differenceInMinutes, formatDistance } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { supabaseUrl } from '../supabase/supabase';
import { io } from 'socket.io-client';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_OPTIONS = [
  { value: 'governance', label: 'Governance' },
  { value: 'fund-utilization', label: 'Fund Utilization' },
  { value: 'development', label: 'Development' },
  { value: 'community-outreach', label: 'Community Outreach' },
];

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
  // return JSON.parse(
  //   localStorage.getItem(`sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`)
  // );
  return JSON.parse(localStorage.getItem(`raia-auth-state`));
}

export const url = apiUrl();
export const secUrl = import.meta.env.VITE_DEV_SEC_API_URL;

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
        // Authorization: 'Bearer ' + getToken().access_token,
        Authorization: 'Bearer ' + getToken().token,
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

export function ratingBadgeVariants(rating) {
  if (rating < 2.5) {
    return { variant: 'destructive', comment: 'Poor' };
  } else if (rating >= 2.5 && rating < 4) {
    return { variant: 'warning', comment: 'Fair' };
  } else if (rating >= 4) {
    return { variant: 'success', comment: 'Good' };
  }
}

export function formatDateDistance(date, date2 = new Date()) {
  return formatDistance(new Date(date), date2, { addSuffix: true });
}

export function replaceEmptyStringsWithNull(obj) {
  const result = {};

  Object.keys(obj).forEach(key => {
    result[key] = obj[key] === '' ? null : obj[key];
  });

  return result;
}

export function isAllowedFileTypes(file, allowedFileTypes) {
  const fileType = file.type.split('/')[1];
  if (!allowedFileTypes.includes(fileType)) {
    return false;
  }
  return true;
}

export function generateSupabasePath(file, bucket = 'uploads') {
  const fileName = `${Math.random()}-${file.name}`.replaceAll('/', '');
  const filePath = `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`;
  return { fileName, filePath };
}

export const notificationInitialState = {
  displayed: false,
  variant: 'info',
  message: '',
};

export function createDateTime(date, time) {
  return new Date(`${date} ${time}`);
}

export function dateDiffInMinutes(date1, date2) {
  return differenceInMinutes(new Date(date1), new Date(date2));
}

export function formatMinutesToHoursAndMinutes(minutes) {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours > 1 ? `${hours} hours` : `${hours} hour`;
    const formattedMinutes =
      remainingMinutes > 1
        ? `${remainingMinutes} minutes`
        : `${remainingMinutes} minute`;
    if (remainingMinutes === 0) {
      return formattedHours;
    } else {
      return `${formattedHours} ${formattedMinutes}`;
    }
  }
}

export function formatDate(date, includeTime = true) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: includeTime ? 'short' : undefined,
  }).format(date);
}

export const socket = io(secUrl);

export const PAGE_SIZE = 10;
