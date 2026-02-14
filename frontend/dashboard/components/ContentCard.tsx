import React, { ReactNode } from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/config/config";

interface ContentCardProps {
  imageUrl: string;
  imageAlt: string;
  badge?: {
    text: ReactNode;
    position: "top-right" | "bottom-left";
    className?: string;
  };
  title: string;
  metadata: Array<{
    icon: ReactNode;
    text: string;
  }>;
  description?: string;
  actions: ReactNode;
  gradientOverlay?: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  imageUrl,
  imageAlt,
  badge,
  title,
  metadata,
  description,
  actions,
  gradientOverlay = false,
}) => {
  const fullImageUrl = imageUrl ? `${IMAGE_BASE_URL}${imageUrl}` : null;

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Image Section */}
      <div className="relative overflow-hidden h-48 bg-gray-100">
        {fullImageUrl ? (
          <Image
            src={fullImageUrl}
            alt={imageAlt}
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

        {gradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        )}

        {badge && (
          <div
            className={`absolute ${
              badge.position === "top-right"
                ? "top-3 right-3"
                : "bottom-3 left-3"
            } ${badge.className || ""}`}
          >
            {badge.text}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 line-clamp-2">
          {title}
        </h3>

        {description && (
          <p className="text-gray-600 mb-3 line-clamp-2 text-xs sm:text-sm">
            {description}
          </p>
        )}

        {/* Metadata */}
        <div className="space-y-2 mb-3 sm:mb-4">
          {metadata.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
            >
              {item.icon}
              <span className="line-clamp-1">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        {actions}
      </div>
    </div>
  );
};
