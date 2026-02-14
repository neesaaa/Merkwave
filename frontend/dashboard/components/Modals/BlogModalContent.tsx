import React from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/config/config";

interface Blog {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailedDescriptionEn?: string;
  detailedDescriptionAr?: string;
  imageUrl: string;
  creator: string;
  blogDate: string;
}

interface BlogModalContentProps {
  mode: "view" | "add" | "edit";
  blog?: Blog | null;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
}

export const BlogModalContent: React.FC<BlogModalContentProps> = ({
  mode,
  blog,
  onSubmit,
  isSubmitting = false,
}) => {
  if (mode === "view" && blog) {
      const fullImageUrl = blog.imageUrl ? `${IMAGE_BASE_URL}${blog.imageUrl}` : null;
    return (
      <div>
        <div className="relative w-full h-64 rounded overflow-hidden mb-4">
        {fullImageUrl ? (
          <Image
            src={fullImageUrl}
            alt={blog.titleEn}
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
            <strong>Title (EN):</strong> {blog.titleEn}
          </p>
          <p>
            <strong>Title (AR):</strong> {blog.titleAr}
          </p>
          <p>
            <strong>Description (EN):</strong> {blog.descriptionEn}
          </p>
          <p>
            <strong>Description (AR):</strong> {blog.descriptionAr}
          </p>
          {blog.detailedDescriptionEn && (
            <p>
              <strong>Detailed Description (EN):</strong>{" "}
              {blog.detailedDescriptionEn}
            </p>
          )}
          {blog.detailedDescriptionAr && (
            <p>
              <strong>Detailed Description (AR):</strong>{" "}
              {blog.detailedDescriptionAr}
            </p>
          )}
          <p>
            <strong>Creator:</strong> {blog.creator}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(blog.blogDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title (English)
          </label>
          <input
            type="text"
            name="TitleEn"
            defaultValue={blog?.titleEn || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Title (Arabic)
          </label>
          <input
            type="text"
            name="TitleAr"
            defaultValue={blog?.titleAr || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Description (English)
          </label>
          <textarea
            name="DescriptionEn"
            defaultValue={blog?.descriptionEn || ""}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description (Arabic)
          </label>
          <textarea
            name="DescriptionAr"
            defaultValue={blog?.descriptionAr || ""}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Detailed Description (English)
          </label>
          <textarea
            name="DetailedDescriptionEn"
            defaultValue={blog?.detailedDescriptionEn || ""}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Detailed Description (Arabic)
          </label>
          <textarea
            name="DetailedDescriptionAr"
            defaultValue={blog?.detailedDescriptionAr || ""}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Creator</label>
        <input
          type="text"
          name="Creator"
          defaultValue={blog?.creator || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Blog Date</label>
        <input
          type="date"
          name="BlogDate"
          defaultValue={
            blog?.blogDate
              ? new Date(blog.blogDate).toISOString().split("T")[0]
              : ""
          }
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          name="Image"
          accept="image/*"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        {blog?.imageUrl && (
          <p className="text-sm text-gray-500 mt-1">Current: {blog.imageUrl}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              ? "Create Blog"
              : "Update Blog"}
        </button>
      </div>
    </form>
  );
};
