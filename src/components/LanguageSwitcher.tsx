"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import { Locale, defaultLocale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  label: Record<Locale, { native: string; short: string }>;
};

export default function LanguageSwitcher({ locale, label }: Props) {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  const otherLocale: Locale = locale === "en" ? "ar" : "en";

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0 || !["en", "ar"].includes(segments[0] as Locale)) {
    segments.unshift(defaultLocale);
  }
  segments[0] = otherLocale;

  const search = searchParams.toString();
  let basePath = `/${segments.join("/")}`;
  if (!basePath.endsWith("/")) {
    basePath = `${basePath}/`;
  }
  const newPath = `${basePath}${search ? `?${search}` : ""}` as Route;

  return (
    <Link
      href={newPath}
      className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold transition-colors hover:border-blue-600 hover:text-blue-600"
      hrefLang={otherLocale}
    >
      <span>{label[otherLocale].short}</span>
      <span className="hidden text-xs text-slate-500 sm:inline">
        {label[otherLocale].native}
      </span>
    </Link>
  );
}
