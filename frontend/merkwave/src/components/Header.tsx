import Link from "next/link";
import { Suspense } from "react";
import { localeLabels, Locale } from "@/lib/i18n";
import { Dictionary } from "@/content/dictionary";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/services", key: "services" as const },
  { href: "/portfolio", key: "portfolio" as const },
  { href: "/blogs", key: "blogs" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export default function Header({ locale, dictionary }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
  <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-semibold">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-white">
            MW
          </span>
          <span>{dictionary.meta.siteName}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((item) => (
            <Link key={item.key} href={`/${locale}${item.href}`} className="transition-colors hover:text-blue-600">
              {dictionary.navigation[item.key] as any}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Suspense
            fallback={
              <span className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-400">
                …
              </span>
            }
          >
            <LanguageSwitcher locale={locale} label={localeLabels} />
          </Suspense>
          <a
            href="#contact"
            className="hidden rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white md:inline-flex"
          >
            {dictionary.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </header>
  );
}
