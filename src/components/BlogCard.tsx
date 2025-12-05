import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { BlogListItem } from "@/types/blog";

interface BlogCardProps {
  blog: BlogListItem;
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

export function BlogCard({ blog, locale }: BlogCardProps) {
  const title = locale === 'ar' ? blog.titleAr : blog.titleEn;
  const excerpt = locale === 'ar' ? blog.excerptAr : blog.excerptEn;
  const author = locale === 'ar' ? blog.authorAr : blog.authorEn;
  const publishDate = blog.publishedAt || blog.createdAt;

  return (
    <article className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {blog.imageUrl && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={blog.imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {blog.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {locale === 'ar' ? 'مميز' : 'Featured'}
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
          <span>{author}</span>
          <time dateTime={publishDate}>
            {formatDate(publishDate, locale)}
          </time>
        </div>
        
        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
          <Link href={`/${locale}/blogs/blogdetail?slug=${blog.slug}`}>
            {title}
          </Link>
        </h2>
        
        {excerpt && (
          <p className="text-slate-700 mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Link 
            href={`/${locale}/blogs/blogdetail?slug=${blog.slug}`}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            {locale === 'ar' ? 'اقرأ المزيد' : 'Read more'}
          </Link>
          
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            {blog.readTime && (
              <span>
                {blog.readTime} {locale === 'ar' ? 'دقيقة' : 'min read'}
              </span>
            )}
            <span>
              {blog.views} {locale === 'ar' ? 'مشاهدة' : 'views'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}