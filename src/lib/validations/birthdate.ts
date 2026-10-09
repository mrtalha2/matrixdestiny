import { z } from "zod";

/**
 * Checks if a given year, month, day form a valid Gregorian calendar date.
 * Handles varying days per month and leap years accurately.
 */
export function isValidCalendarDate(day: number, month: number, year: number): boolean {
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;

  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return day >= 1 && day <= daysInMonth[month - 1];
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export const birthDateSchema = z
  .object({
    name: z.string().trim().max(60, "Name must be under 60 characters").optional(),
    day: z
      .string()
      .trim()
      .regex(/^\d{1,2}$/, "Day must be 1–31")
      .transform(Number),
    month: z
      .string()
      .trim()
      .regex(/^\d{1,2}$/, "Month must be 1–12")
      .transform(Number),
    year: z
      .string()
      .trim()
      .regex(/^\d{4}$/, "Year must be 4 digits")
      .transform(Number),
  })
  .refine(
    (data) => isValidCalendarDate(data.day, data.month, data.year),
    {
      message: "Please enter a valid calendar date (e.g. check month days & leap years)",
      path: ["day"],
    }
  );

export type BirthDateFormData = z.infer<typeof birthDateSchema>;

/**
 * Formats day, month, year numbers into a standard ISO date slug: YYYY-MM-DD
 */
export function formatBirthDateSlug(day: number, month: number, year: number): string {
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const yyyy = String(year);
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Parses a YYYY-MM-DD slug into { day, month, year }
 */
export function parseBirthDateSlug(slug: string): { day: number; month: number; year: number } | null {
  const match = slug.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const [, yearStr, monthStr, dayStr] = match;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (!isValidCalendarDate(day, month, year)) return null;

  return { day, month, year };
}
