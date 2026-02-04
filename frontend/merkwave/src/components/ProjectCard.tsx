import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { ProjectListItem } from "@/types/project";

interface ProjectCardProps {
  project: ProjectListItem;
  locale: Locale;
}

function formatDate(dateString: string | undefined, locale: Locale): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const title = locale === 'ar' ? project.titleAr : project.titleEn;
  const publishDate = project.project_date || '';

  return (
    <article className="group bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl overflow-hidden hover:border-yellow-400/60 hover:bg-[#0a1628]/80 transition-all duration-500 hover:shadow-xl hover:shadow-yellow-400/10">
      {project.imageUrl && (
        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-500">
          <Image
            src={project.imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                {locale === 'ar' ? 'مميز' : 'Featured'}
              </span>
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="text-sm text-gray-400">{project.client_name}</span>
        </div>
        
        <h2 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
          <Link href={`/${locale}/portfolio/projects?slug=${project.slug}`}>
            {title}
          </Link>
        </h2>

        <div className="flex items-center justify-between mt-4">
          <Link 
            href={`/${locale}/portfolio/projects?slug=${project.slug}`}
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors text-sm"
          >
            {locale === 'ar' ? 'عرض المشروع' : 'View project'} →
          </Link>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            {publishDate && (
              <time dateTime={publishDate} className="px-2 py-1 bg-gray-700/50 rounded">
                {formatDate(publishDate, locale)}
              </time>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
