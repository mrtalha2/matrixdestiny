import { redirect, notFound } from "next/navigation";
import { formatBirthDateSlug, isValidCalendarDate } from "@/lib/validations/birthdate";
import { normalizeLocalePrefix, getLocalizedPath } from "@/lib/i18n/config";

interface LocalizedChartIndexProps {
  params: {
    locale: string;
  };
  searchParams: {
    day?: string;
    month?: string;
    year?: string;
    date?: string;
    name?: string;
  };
}

export default function LocalizedChartIndexPage({ params, searchParams }: LocalizedChartIndexProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const nameQuery = searchParams.name ? `?name=${encodeURIComponent(searchParams.name.trim())}` : "";

  // 1. If explicit date string is provided (e.g. YYYY-MM-DD)
  if (searchParams.date) {
    const parts = searchParams.date.split("-").map(Number);
    if (parts.length === 3 && isValidCalendarDate(parts[2], parts[1], parts[0])) {
      const slug = formatBirthDateSlug(parts[2], parts[1], parts[0]);
      redirect(getLocalizedPath(`/chart/${slug}${nameQuery}`, norm));
    }
  }

  // 2. If segmented day, month, year are provided
  if (searchParams.day && searchParams.month && searchParams.year) {
    const d = parseInt(searchParams.day, 10);
    const m = parseInt(searchParams.month, 10);
    const y = parseInt(searchParams.year, 10);

    if (isValidCalendarDate(d, m, y)) {
      const slug = formatBirthDateSlug(d, m, y);
      redirect(getLocalizedPath(`/chart/${slug}${nameQuery}`, norm));
    }
  }

  // Fallback if no valid parameters provided
  redirect(getLocalizedPath("/#calculator-hero", norm));
}
