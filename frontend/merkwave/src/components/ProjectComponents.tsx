import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/content/dictionary";

interface ProjectBreadcrumbProps {
  locale: Locale;
  dict: Dictionary;
  projectTitle: string;
}

export function ProjectBreadcrumb({ locale, dict, projectTitle }: ProjectBreadcrumbProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center space-x-2 text-sm text-slate-600">
        <li>
          <Link href={`/${locale}`} className="hover:text-blue-600">
            {dict.navigation.home}
          </Link>
        </li>
        <li className="before:content-['/'] before:mx-2">
          <Link href={`/${locale}/portfolio`} className="hover:text-blue-600">
            {dict.navigation.portfolio}
          </Link>
        </li>
        <li className="before:content-['/'] before:mx-2 text-slate-900 truncate">
          {projectTitle}
        </li>
      </ol>
    </nav>
  );
}

interface ProjectHeaderProps {
  title: string;
  clientName?: string | null;
  projectDate?: string | null;
  featured?: number | boolean;
  accentColor?: string | null;
  locale: Locale;
}

function formatDate(dateString: string | null | undefined, locale: Locale): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ProjectHeader({ title, clientName, projectDate, featured, accentColor, locale }: ProjectHeaderProps) {
  return (
    <header className="mb-8">
      {featured && (
        <div className="mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {locale === 'ar' ? 'مشروع مميز' : 'Featured Project'}
          </span>
        </div>
      )}

      <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
        {title}
      </h1>

      <div className="flex items-center justify-between gap-4 text-slate-600 mb-6">
        <div className="flex items-center space-x-4">
          <span className="font-medium">{clientName}</span>
          <time dateTime={projectDate || ''}>{formatDate(projectDate, locale)}</time>
        </div>

        {accentColor && (
          <div className="h-8 w-8 rounded-full" style={{ backgroundColor: accentColor }} />
        )}
      </div>
    </header>
  );
}

interface ProjectContentProps {
  content: string;
  locale: Locale;
}

export function ProjectContent({ content, locale }: ProjectContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} className="text-slate-800 leading-relaxed" />
      ) : (
        <p className="text-slate-600">{locale === 'ar' ? 'المحتوى غير متوفر' : 'Content not available'}</p>
      )}
    </div>
  );
}

interface ProjectFooterProps {
  locale: Locale;
  updatedAt?: string | null;
}

function formatDateSimple(dateString: string | null | undefined, locale: Locale) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ProjectFooter({ locale, updatedAt }: ProjectFooterProps) {
  return (
    <footer className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between">
        <Link href={`/${locale}/portfolio`} className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'ar' ? 'العودة إلى أعمالنا' : 'Back to portfolio'}
        </Link>

        <div className="text-sm text-slate-500">
          {locale === 'ar' ? 'آخر تحديث:' : 'Last updated:'} {formatDateSimple(updatedAt, locale)}
        </div>
      </div>
    </footer>
  );
}
