export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeLabels: Record<Locale, { native: string; short: string }> = {
  en: { native: "English", short: "EN" },
  ar: { native: "العربية", short: "AR" },
};

export const rtlLocales: Locale[] = ["ar"];

export const isRTL = (locale: Locale) => rtlLocales.includes(locale);

export const servicesSlugs = [
  "software",
  "branding",
  "business",
  "commerce",
  "mobile",
  "marketing",
] as const;

export type ServiceSlug = (typeof servicesSlugs)[number];
