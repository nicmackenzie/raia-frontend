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
