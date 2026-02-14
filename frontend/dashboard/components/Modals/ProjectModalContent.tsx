import React from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/config/config";

const PROJECT_CATEGORIES = [
  {
    value: "WebDevelopment",
    label: "Web Development",
    labelAr: "تطوير مواقع الويب",
  },
  { value: "MobileApps", label: "Mobile Apps", labelAr: "تطبيقات الموبايل" },
  { value: "ECommerce", label: "E-Commerce", labelAr: "التجارة الإلكترونية" },
  { value: "Branding", label: "Branding", labelAr: "الهوية التجارية" },
  { value: "SEO", label: "SEO", labelAr: "تحسين محركات البحث" },
  {
    value: "SocialMedia",
    label: "Social Media",
    labelAr: "إدارة وسائل التواصل الاجتماعي",
  },
  {
    value: "MediaProduction",
    label: "Media Production",
    labelAr: "الإنتاج الإعلامي",
  },
  {
    value: "Photography",
    label: "Photography",
    labelAr: "التصوير الفوتوغرافي",
  },
];

interface Project {
  slug: string;
  titleEn: string;
  titleAr: string;
  clientName: string;
  projectDate: string;
  category: string;
  categoryAr: string;
  imageUrl: string;
  demoUrl: string;
}

interface ProjectModalContentProps {
  mode: "view" | "add" | "edit";
  project?: Project | null;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const ProjectModalContent: React.FC<ProjectModalContentProps> = ({
  mode,
  project,
  onSubmit,
  isSubmitting = false,
  setImage,
}) => {
  if (mode === "view" && project) {
      const fullImageUrl = project.imageUrl ? `${IMAGE_BASE_URL}${project.imageUrl}` : null;
    return (
      <div>
        <div className="relative w-full h-64 rounded overflow-hidden mb-4">
        {fullImageUrl ? (
          <Image
            src={fullImageUrl}
            alt={project.titleEn}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm font-medium">No Image</p>
            </div>
          </div>
        )}
        </div>
        <div className="space-y-2 text-sm sm:text-base">
          <p>
            <strong>Title (EN):</strong> {project.titleEn}
          </p>
          <p>
            <strong>Title (AR):</strong> {project.titleAr}
          </p>
          <p>
            <strong>Client:</strong> {project.clientName}
          </p>
          <p>
            <strong>Category (EN):</strong> {project.category}
          </p>
          <p>
            <strong>Category (AR):</strong> {project.categoryAr}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(project.projectDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Demo URL:</strong>{" "}
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              {project.demoUrl}
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          type="text"
          name="Slug"
          defaultValue={project?.slug || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title (English)
          </label>
          <input
            type="text"
            name="TitleEn"
            defaultValue={project?.titleEn || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Title (Arabic)
          </label>
          <input
            type="text"
            name="TitleAr"
            defaultValue={project?.titleAr || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Client Name</label>
        <input
          type="text"
          name="ClientName"
          defaultValue={project?.clientName || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="Category"
          defaultValue={project?.category || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="">Select a category</option>
          {PROJECT_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label} ({cat.labelAr})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Project Date</label>
        <input
          type="date"
          name="ProjectDate"
          defaultValue={
            project?.projectDate
              ? new Date(project.projectDate).toISOString().split("T")[0]
              : ""
          }
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Demo URL</label>
        <input
          type="text"
          name="DemoUrl"
          defaultValue={project?.demoUrl || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          name="Image"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && setImage) {
              setImage(file);
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {project?.imageUrl && (
          <p className="text-sm text-gray-500 mt-1">
            Current: {project.imageUrl}
          </p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting && (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {isSubmitting
            ? mode === "add"
              ? "Creating..."
              : "Updating..."
            : mode === "add"
              ? "Create Project"
              : "Update Project"}
        </button>
      </div>
    </form>
  );
};
