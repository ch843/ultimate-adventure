/**
 * Format a date string (YYYY-MM-DD) for display.
 * Parses date components directly to avoid UTC timezone shift issues.
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", options);
}

/**
 * Format a date string with full weekday name.
 */
export function formatDateLong(dateString: string): string {
  return formatDate(dateString, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
