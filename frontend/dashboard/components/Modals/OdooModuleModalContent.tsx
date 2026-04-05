import React from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/config/config";

interface OdooModule {
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  detailedDescriptionAr: string;
  detailedDescriptionEn: string;
  imageUrl: string;
}

interface OdooModuleModalContentProps {
  mode: "view" | "add" | "edit";
  module?: OdooModule | null;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const OdooModuleModalContent: React.FC<OdooModuleModalContentProps> = ({
  mode,
  module,
  onSubmit,
  isSubmitting = false,
  setImage,
}) => {
  if (mode === "view" && module) {
    const fullImageUrl = module.imageUrl
      ? `${IMAGE_BASE_URL}${module.imageUrl}`
      : null;

    return (
      <div>
        <div className="relative w-full h-64 rounded overflow-hidden mb-4">
          {fullImageUrl ? (
            <Image
              src={fullImageUrl}
              alt={module.nameEn}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
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
            <strong>Name (EN):</strong> {module.nameEn}
          </p>
          <p>
            <strong>Name (AR):</strong> {module.nameAr}
          </p>
          <p>
            <strong>Description (EN):</strong> {module.descriptionEn}
          </p>
          <p>
            <strong>Description (AR):</strong> {module.descriptionAr}
          </p>
          <p>
            <strong>Detailed Description (EN):</strong>{" "}
            {module.detailedDescriptionEn}
          </p>
          <p>
            <strong>Detailed Description (AR):</strong>{" "}
            {module.detailedDescriptionAr}
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
            Name (English)
          </label>
          <input
            type="text"
            name="NameEn"
            defaultValue={module?.nameEn || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Name (Arabic)
          </label>
          <input
            type="text"
            name="NameAr"
            defaultValue={module?.nameAr || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            defaultValue={module?.descriptionEn || ""}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Description (Arabic)
          </label>
          <textarea
            name="DescriptionAr"
            defaultValue={module?.descriptionAr || ""}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
            defaultValue={module?.detailedDescriptionEn || ""}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Detailed Description (Arabic)
          </label>
          <textarea
            name="DetailedDescriptionAr"
            defaultValue={module?.detailedDescriptionAr || ""}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Image {mode === "edit" && "(leave empty to keep current)"}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage?.(e.target.files?.[0] ?? null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-300"
      >
        {isSubmitting
          ? "Saving..."
          : mode === "add"
            ? "Create Module"
            : "Update Module"}
      </button>
    </form>
  );
};
