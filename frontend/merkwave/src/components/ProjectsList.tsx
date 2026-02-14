"use client";

import { useEffect, useState } from "react";
import { Locale } from "@/lib/i18n";
import { ProjectsApiResponse, ProjectListItem } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { API_ENDPOINTS } from "@/config/api";

interface ProjectsListProps {
  locale: Locale;
  initialProjects?: ProjectListItem[];
  categoryFilter?: string;
}

export function ProjectsList({
  locale,
  initialProjects = [],
  categoryFilter = "all",
}: ProjectsListProps) {
  const [projects, setProjects] = useState<ProjectListItem[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProjects.length === 0) fetchProjects();
  }, [initialProjects.length]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_ENDPOINTS.PROJECTS.GET_ALL, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  // Filter projects by category
  const filteredProjects =
    categoryFilter === "all"
      ? projects
      : projects.filter((project) => project.category === categoryFilter);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-gray-200">
          {locale === "ar" ? "جاري تحميل المشاريع..." : "Loading projects..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300 text-lg mb-4">
          {locale === "ar"
            ? "حدث خطأ في تحميل المشاريع"
            : "Error loading projects"}
        </p>
        <button
          onClick={fetchProjects}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
        >
          {locale === "ar" ? "إعادة المحاولة" : "Try Again"}
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300 text-lg">
          {locale === "ar"
            ? "لا توجد مشاريع متاحة حالياً"
            : "No projects available at the moment"}
        </p>
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300 text-lg">
          {locale === "ar"
            ? "لا توجد مشاريع في هذه الفئة"
            : "No projects found in this category"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} locale={locale} />
      ))}
    </div>
  );
}
