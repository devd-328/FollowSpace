/** ISO date string (YYYY-MM-DD) helpers for extraction. */

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number): string {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return toISODate(next);
}

export function normalizeDateString(value: string): string {
  const trimmed = value.trim();
  const isoDate = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
  if (isoDate) return isoDate[1];

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid follow_up_date");
  }

  return toISODate(parsed);
}

export function resolveDateFromText(text: string, anchor: Date = new Date()): string {
  const lower = text.toLowerCase();

  if (/\btoday\b/.test(lower)) return toISODate(anchor);
  if (/\btomorrow\b/.test(lower)) return addDays(anchor, 1);
  if (/\bnext week\b/.test(lower)) return addDays(anchor, 7);
  if (/\bin a week\b/.test(lower)) return addDays(anchor, 7);

  const inDaysMatch = lower.match(/\bin (\d+) days?\b/);
  if (inDaysMatch) return addDays(anchor, Number(inDaysMatch[1]));

  const daysMatch = lower.match(/\b(\d+) days?\b/);
  if (daysMatch && lower.includes("follow")) {
    return addDays(anchor, Number(daysMatch[1]));
  }

  if (/\blater\b/.test(lower)) return addDays(anchor, 7);

  return addDays(anchor, 3);
}
