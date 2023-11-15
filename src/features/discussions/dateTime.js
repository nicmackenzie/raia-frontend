import React from "react";

export default function timeElapsed(timestamp) {
    const discussionTimestamp = new Date(timestamp);
    const currentTime = new Date();
    const timeDifferenceMil = Math.abs(currentTime - discussionTimestamp);
  
    const seconds = Math.floor(timeDifferenceMil / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximate number of days in a month
    const years = Math.floor(days / 365); // Approximate number of days in a year
  
    if (seconds < 60) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 30) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
  