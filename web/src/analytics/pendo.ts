// Pendo Track Events. The Pendo agent attaches the visitor and account to every event,
// so the properties only describe the event itself.
export type TrackEventProperties = Record<string, string | number | boolean | string[]>;

interface PendoAgent {
  track: (eventName: string, properties?: TrackEventProperties) => void;
}

declare global {
  interface Window {
    pendo?: PendoAgent;
  }
}

/** Sends a Pendo Track Event. Does nothing when the Pendo agent isn't loaded, and never throws. */
export function trackEvent(eventName: string, properties: TrackEventProperties): void {
  try {
    window.pendo?.track(eventName, properties);
  } catch {
    // Tracking must never break the app.
  }
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Days since the Unix epoch for a "YYYY-MM-DD" date, or null when it can't be parsed. */
function epochDay(isoDate: string): number | null {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return null;
  return Date.UTC(year, month - 1, day) / DAY_MS;
}

/** Length of a trip in days, counting both the start and end date (-1 when the dates can't be read). */
export function tripLengthDays(startDate: string, endDate: string): number {
  const start = epochDay(startDate);
  const end = epochDay(endDate);
  return start === null || end === null ? -1 : end - start + 1;
}

/** Days from today to a "YYYY-MM-DD" date, negative when it has passed (0 when it can't be read). */
export function daysUntil(isoDate: string): number {
  const date = epochDay(isoDate);
  if (date === null) return 0;
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / DAY_MS;
  return date - today;
}
