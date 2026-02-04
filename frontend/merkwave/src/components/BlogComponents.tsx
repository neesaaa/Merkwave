import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/content/dictionary";

interface BlogBreadcrumbProps {
  locale: Locale;
  dict: Dictionary;
  blogTitle: string;
}

export function BlogBreadcrumb({ locale, dict, blogTitle }: BlogBreadcrumbProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center space-x-2 text-sm text-slate-600">
        <li>
          <Link href={`/${locale}`} className="hover:text-blue-600">
            {dict.navigation.home}
          </Link>
        </li>
        <li className="before:content-['/'] before:mx-2">
          <Link href={`/${locale}/blogs`} className="hover:text-blue-600">
            {dict.navigation.blogs}
          </Link>
        </li>
        <li className="before:content-['/'] before:mx-2 text-slate-900 truncate">
          {blogTitle}
        </li>
      </ol>
    </nav>
  );
}

interface BlogHeaderProps {
  title: string;
  author: string;
  publishDate: string;
  readTime?: number;
  views: number;
  featured: boolean;
  tags: string[];
  locale: Locale;
}

function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogHeader({ 
  title, 
  author, 
  publishDate, 
  readTime, 
  views, 
  featured, 
  tags, 
  locale 
}: BlogHeaderProps) {
  return (
    <header className="mb-8">
      {featured && (
        <div className="mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {locale === 'ar' ? 'مقال مميز' : 'Featured Article'}
          </span>
        </div>
      )}
      
      <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
        {title}
      </h1>
      
      <div className="flex flex-wrap items-center justify-between gap-4 text-slate-600 mb-6">
        <div className="flex items-center space-x-4">
          <span className="font-medium">{author}</span>
          <time dateTime={publishDate}>
            {formatDate(publishDate, locale)}
          </time>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          {readTime && (
            <span>
              {readTime} {locale === 'ar' ? 'دقيقة قراءة' : 'min read'}
            </span>
          )}
          <span>
            {views} {locale === 'ar' ? 'مشاهدة' : 'views'}
          </span>
        </div>
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

interface BlogContentProps {
  content: string;
  locale: Locale;
}

export function BlogContent({ content, locale }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {content ? (
        <div 
          dangerouslySetInnerHTML={{ __html: content }} 
          className="text-slate-800 leading-relaxed"
        />
      ) : (
        <p className="text-slate-600">
          {locale === 'ar' ? 'المحتوى غير متوفر' : 'Content not available'}
        </p>
      )}
    </div>
  );
}

interface BlogFooterProps {
  locale: Locale;
  updatedAt: string;
}

export function BlogFooter({ locale, updatedAt }: BlogFooterProps) {
  return (
    <footer className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between">
        <Link 
          href={`/${locale}/blogs`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'ar' ? 'العودة إلى المقالات' : 'Back to blogs'}
        </Link>
        
        <div className="text-sm text-slate-500">
          {locale === 'ar' ? 'آخر تحديث:' : 'Last updated:'} {formatDate(updatedAt, locale)}
        </div>
      </div>
    </footer>
  );
}