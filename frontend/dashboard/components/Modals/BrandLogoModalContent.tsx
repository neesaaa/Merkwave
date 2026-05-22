import React from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/config/config";

interface BrandLogo {
  name: string;
  altText: string;
  imageUrl: string;
}

interface BrandLogoModalContentProps {
  mode: "view" | "add" | "edit";
  logo?: BrandLogo | null;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const BrandLogoModalContent: React.FC<BrandLogoModalContentProps> = ({
  mode,
  logo,
  onSubmit,
  isSubmitting = false,
  setImage,
}) => {
  if (mode === "view" && logo) {
    const fullImageUrl = logo.imageUrl
      ? `${IMAGE_BASE_URL}${logo.imageUrl}`
      : null;
    return (
      <div className="space-y-4">
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          {fullImageUrl ? (
            <Image
              src={fullImageUrl}
              alt={logo.altText || logo.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          ) : (
            <div className="text-gray-400 text-center">
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
              <p className="text-sm">No Image</p>
            </div>
          )}
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {logo.name}
          </p>
          <p>
            <strong>Alt Text:</strong> {logo.altText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Brand Name
        </label>
        <input
          type="text"
          name="Name"
          defaultValue={logo?.name ?? ""}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alt Text
        </label>
        <input
          type="text"
          name="AltText"
          defaultValue={logo?.altText ?? ""}
          placeholder="e.g. Boslat Brand Logo"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Logo Image {mode === "edit" && "(leave empty to keep current)"}
        </label>
        {mode === "edit" && logo?.imageUrl && (
          <div className="relative w-32 h-16 mb-2 border rounded overflow-hidden bg-gray-50">
            <Image
              src={`${IMAGE_BASE_URL}${logo.imageUrl}`}
              alt={logo.altText}
              fill
              className="object-contain p-1"
              unoptimized
            />
          </div>
        )}
        <input
          type="file"
          name="Image"
          accept="image/*"
          required={mode === "add"}
          onChange={(e) => setImage?.(e.target.files?.[0] ?? null)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60 text-sm font-medium transition-colors"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "add"
              ? "Upload Logo"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
};
