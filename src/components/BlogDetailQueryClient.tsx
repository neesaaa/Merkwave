'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Eye, User, Tag } from 'lucide-react';
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { BlogApiResponse, Blog } from "@/types/blog";
import { staticBlogs } from "@/data/blogContent";

interface BlogDetailQueryClientProps {
  locale: Locale;
  initialSlug?: string;
}

export function BlogDetailQueryClient({ locale, initialSlug }: BlogDetailQueryClientProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const slugFromQuery = searchParams.get('slug');
  // Prefer server-provided initialSlug when available (pretty URL support)
  const slug = initialSlug ?? slugFromQuery;
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  useEffect(() => {
    // If we already have a slug (from server or query) start fetch.
    if (!slug) {
      setError('No blog slug provided');
      setLoading(false);
      return;
    }

    fetchBlog(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, initialSlug]);

  const fetchBlog = async (slugArg?: string) => {
    const usedSlug = slugArg ?? slug;
    if (!usedSlug) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://merkwave.com/api/blogs/get_detail.php?slug=${encodeURIComponent(usedSlug)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      
      const data: BlogApiResponse = await response.json();

      // Backend sometimes returns data.data as an array (listing) even for detail endpoints.
      // Accept both object and array responses: if it's an array take the first item.
      if (data.status === 'success' && data.data) {
        const blogItem = Array.isArray(data.data) ? data.data[0] : data.data;
        if (blogItem) {
          setBlog(blogItem as Blog);
          return;
        }
      }
      
      // If API fails or returns no data, try to find static content
      const staticBlog = staticBlogs.find(b => b.slug === usedSlug);
      if (staticBlog) {
        // Convert static blog to Blog format
        const mappedBlog: Blog = {
          id: 0,
          slug: staticBlog.slug,
          titleEn: staticBlog.titleEn,
          titleAr: staticBlog.titleAr,
          contentEn: staticBlog.contentEn,
          contentAr: staticBlog.contentAr,
          excerptEn: staticBlog.excerptEn,
          excerptAr: staticBlog.excerptAr,
          authorEn: staticBlog.authorEn,
          authorAr: staticBlog.authorAr,
          featured: staticBlog.featured,
          imageUrl: staticBlog.imageUrl,
          tagsEn: staticBlog.tagsEn,
          tagsAr: staticBlog.tagsAr,
          readTime: staticBlog.readTime,
          views: 1250,
          publishedAt: staticBlog.publishedAt,
          createdAt: staticBlog.createdAt,
          updatedAt: staticBlog.updatedAt,
          status: staticBlog.status
        };
        setBlog(mappedBlog);
      } else {
        setError('Blog not found');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      // Try static content as fallback
      const staticBlog = staticBlogs.find(b => b.slug === usedSlug);
      if (staticBlog) {
        const mappedBlog: Blog = {
          id: 0,
          slug: staticBlog.slug,
          titleEn: staticBlog.titleEn,
          titleAr: staticBlog.titleAr,
          contentEn: staticBlog.contentEn,
          contentAr: staticBlog.contentAr,
          excerptEn: staticBlog.excerptEn,
          excerptAr: staticBlog.excerptAr,
          authorEn: staticBlog.authorEn,
          authorAr: staticBlog.authorAr,
          featured: staticBlog.featured,
          imageUrl: staticBlog.imageUrl,
          tagsEn: staticBlog.tagsEn,
          tagsAr: staticBlog.tagsAr,
          readTime: staticBlog.readTime,
          views: 1250,
          publishedAt: staticBlog.publishedAt,
          createdAt: staticBlog.createdAt,
          updatedAt: staticBlog.updatedAt,
          status: staticBlog.status
        };
        setBlog(mappedBlog);
      } else {
        setError('Failed to load blog');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!slug) {
    return (
      <div className={`min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43] ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">
              {locale === 'ar' ? 'لم يتم تحديد معرف المقال' : 'No blog slug provided'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43] ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-200">
              {locale === 'ar' ? 'جاري تحميل المقال...' : 'Loading blog...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={`min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43] ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg mb-4">
              {locale === 'ar' ? 'لم يتم العثور على المقال' : 'Blog post not found'}
            </p>
            <button 
              onClick={() => fetchBlog()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
            >
              {locale === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const title = locale === 'ar' ? blog.titleAr : blog.titleEn;
  const content = locale === 'ar' ? blog.contentAr : blog.contentEn;
  const author = locale === 'ar' ? blog.authorAr : blog.authorEn;
  const tags = formatTags(locale === 'ar' ? blog.tagsAr : blog.tagsEn);
  const publishDate = blog.publishedAt || blog.createdAt;

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43] ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className={`flex items-center space-x-2 text-sm text-gray-400 mb-8 ${isArabic ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <Link href={`/${locale}`} className="hover:text-cyan-400 transition-colors">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/blogs`} className="hover:text-cyan-400 transition-colors">
            {dict.navigation.blogs}
          </Link>
          <span>/</span>
          <span className="text-cyan-400 truncate max-w-xs">{title}</span>
        </div>

        <Link href={`/${locale}/blogs`} className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8">
          <ArrowLeft className={`w-5 h-5 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {isArabic ? 'العودة للمقالات' : 'Back to Blogs'}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-400/15 via-pink-500/20 to-red-600/15 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Featured Badge */}
            {blog.featured && (
              <div className="mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-medium">
                  {isArabic ? 'مقال مميز' : 'Featured Article'}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {/* Blog Meta Info */}
            <div className={`flex flex-wrap gap-6 text-sm text-gray-400 mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(publishDate).toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {blog.readTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {blog.readTime} {isArabic ? 'دقيقة قراءة' : 'min read'}
                </div>
              )}
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {blog.views} {isArabic ? 'مشاهدة' : 'views'}
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className={`flex flex-wrap gap-2 mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium flex items-center"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.imageUrl && (
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={blog.imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-8 lg:p-12">
              <div 
                className="prose prose-lg prose-invert max-w-none
                  prose-headings:text-cyan-400 
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                  prose-strong:text-white
                  prose-ul:text-gray-300
                  prose-ol:text-gray-300
                  prose-blockquote:border-l-cyan-400 prose-blockquote:text-gray-300
                  prose-code:text-cyan-300 prose-code:bg-gray-800/50 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-600/40"
                dangerouslySetInnerHTML={{ __html: content || '' }}
              />
            </div>

            {/* Updated Date Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                {isArabic ? 'آخر تحديث:' : 'Last updated:'}{' '}
                {new Date(blog.updatedAt).toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Blogs CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link href={`/${locale}/blogs`}>
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-105">
                <ArrowLeft className={`${isArabic ? 'ml-2 rotate-180' : 'mr-2'} w-5 h-5`} />
                {isArabic ? 'العودة إلى المقالات' : 'Back to All Blogs'}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatTags(tags: string | undefined): string[] {
  if (!tags) return [];
  return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
}