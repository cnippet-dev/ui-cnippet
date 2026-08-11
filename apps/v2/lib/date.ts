import { differenceInDays, differenceInHours, format } from "date-fns";

export function formatTimeAgo(date: Date, now: Date = new Date()): string {
  const diffHours = differenceInHours(now, date);
  const diffDays = differenceInDays(now, date);

  // For times less than 24 hours ago, show the actual time
  if (diffHours < 24) {
    // Detect user's locale to determine 12-hour vs 24-hour format
    // Check for navigator existence to handle SSR
    let userLocale = "en-US";
    let uses12HourFormat = false;

    if (typeof navigator !== "undefined" && navigator.language) {
      userLocale = navigator.language;
      try {
        uses12HourFormat =
          new Intl.DateTimeFormat(userLocale, {
            hour: "numeric",
          }).resolvedOptions().hour12 ?? false;
      } catch {
        // Fallback to 24-hour format if locale resolution fails
        uses12HourFormat = false;
      }
    }

    // Format the time based on user's locale preference
    const timeFormat = uses12HourFormat ? "h:mm a" : "HH:mm";

    return format(date, timeFormat);
  }

  if (diffDays < 7) {
    return `${diffDays}d`;
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "1w" : `${weeks}w`;
  }

  // For older dates, show the actual date
  const currentYear = now.getFullYear();
  const dateYear = date.getFullYear();

  if (dateYear === currentYear) {
    return format(date, "MMM d");
  }
  return format(date, "MMM d, yyyy");
}
