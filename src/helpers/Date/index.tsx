export const formatDateDifference = (diffInHours: number): string => {
  // If the difference is zero, return an empty string
  if (diffInHours === 0) {
    return "";
  }

  // Check if the difference is less than a day
  if (diffInHours < 24) {
    // Return the difference in hours with appropriate unit
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"}`;
  }

  // Check if the difference is less than a week
  if (diffInHours < 168) {
    // Return the difference in days with appropriate unit
    const diffInDays = Math.round(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
  }

  // Check if the difference is less than a month
  if (diffInHours < 720) {
    // Return the difference in weeks with appropriate unit
    const diffInWeeks = Math.round(diffInHours / 168);
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"}`;
  }

  // Check if the difference is less than a year
  if (diffInHours < 8760) {
    // Return the difference in months with appropriate unit
    const diffInMonths = Math.round(diffInHours / 720);
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"}`;
  }

  // Return the difference in years with appropriate unit
  const diffInYears = Math.round(diffInHours / 8760);
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"}`;
};
