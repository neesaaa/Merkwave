"use client";

import React from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/config/config";

export interface FleetFeature {
  id?: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface Fleet {
  id?: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailedDescriptionEn?: string;
  detailedDescriptionAr?: string;
  imageUrl?: string;
  model3DUrl?: string;
  features?: FleetFeature[];
}

interface FleetModalContentProps {
  mode: "view" | "add" | "edit";
  fleet?: Fleet | null;
  features: FleetFeature[];
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
  onUpdateFeature: (index: number, field: keyof FleetFeature, value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
}

export const FleetModalContent: React.FC<FleetModalContentProps> = ({
  mode,
  fleet,
  features,
  onAddFeature,
  onRemoveFeature,
  onUpdateFeature,
  onSubmit,
  isSubmitting = false,
}) => {

  /* ── VIEW MODE ─────────────────────────────────────────── */
  if (mode === "view" && fleet) {
    const fullImageUrl = fleet.imageUrl
      ? `${IMAGE_BASE_URL}${fleet.imageUrl}`
      : null;
    const fullModelUrl = fleet.model3DUrl
      ? `${IMAGE_BASE_URL}${fleet.model3DUrl}`
      : null;

    return (
      <div className="space-y-4">
        {/* Image */}
        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-gray-100">
          {fullImageUrl ? (
            <Image
              src={fullImageUrl}
              alt={fleet.nameEn}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2"
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

        {/* Details */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="sm:col-span-2 pb-1 border-b border-gray-100">
            <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Name</dt>
            <dd className="font-medium text-gray-800">{fleet.nameEn} <span className="text-gray-400">/ {fleet.nameAr}</span></dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Description (EN)</dt>
            <dd className="text-gray-700">{fleet.descriptionEn}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Description (AR)</dt>
            <dd className="text-gray-700">{fleet.descriptionAr}</dd>
          </div>
          {fleet.detailedDescriptionEn && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Detailed Description (EN)</dt>
              <dd className="text-gray-700">{fleet.detailedDescriptionEn}</dd>
            </div>
          )}
          {fleet.detailedDescriptionAr && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Detailed Description (AR)</dt>
              <dd className="text-gray-700">{fleet.detailedDescriptionAr}</dd>
            </div>
          )}
          {fullModelUrl && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">3D Model</dt>
              <dd>
                <a
                  href={fullModelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:underline break-all text-sm"
                >
                  View / Download Model
                </a>
              </dd>
            </div>
          )}
        </dl>

        {/* Features */}
        {fleet.features && fleet.features.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Features ({fleet.features.length})
            </h3>
            <div className="space-y-2">
              {fleet.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-cyan-200 bg-cyan-50 p-3"
                >
                  <p className="font-semibold text-cyan-800 text-sm">
                    {feat.titleEn}
                    <span className="font-normal text-cyan-500 ml-2">/ {feat.titleAr}</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{feat.descriptionEn}</p>
                  <p className="text-xs text-gray-500">{feat.descriptionAr}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── ADD / EDIT MODE ────────────────────────────────────── */
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Name (English) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="NameEn"
            defaultValue={fleet?.nameEn ?? ""}
            required
            placeholder="Enter name in English"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Name (Arabic) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="NameAr"
            defaultValue={fleet?.nameAr ?? ""}
            required
            placeholder="أدخل الاسم بالعربية"
            dir="rtl"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300"
          />
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Description (English) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="DescriptionEn"
            defaultValue={fleet?.descriptionEn ?? ""}
            required
            rows={3}
            placeholder="Short description…"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300 resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Description (Arabic) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="DescriptionAr"
            defaultValue={fleet?.descriptionAr ?? ""}
            required
            rows={3}
            placeholder="وصف قصير…"
            dir="rtl"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300 resize-none"
          />
        </div>
      </div>

      {/* Detailed Description */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Detailed Description (English)
          </label>
          <textarea
            name="DetailedDescriptionEn"
            defaultValue={fleet?.detailedDescriptionEn ?? ""}
            rows={3}
            placeholder="Full details…"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300 resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Detailed Description (Arabic)
          </label>
          <textarea
            name="DetailedDescriptionAr"
            defaultValue={fleet?.detailedDescriptionAr ?? ""}
            rows={3}
            placeholder="تفاصيل كاملة…"
            dir="rtl"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300 resize-none"
          />
        </div>
      </div>

      {/* File uploads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Image {mode === "edit" && <span className="normal-case font-normal">(leave empty to keep current)</span>}
          </label>
          <input
            type="file"
            name="Image"
            accept="image/*"
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
              file:mr-3 file:py-2 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200"
          />
          {fleet?.imageUrl && (
            <p className="text-xs text-gray-400 mt-1 truncate">Current: {fleet.imageUrl}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            3D Model{" "}
            {mode === "edit" && <span className="normal-case font-normal">(leave empty to keep current)</span>}
          </label>
          <input
            type="file"
            name="Model3D"
            accept=".glb,.gltf,.obj,.fbx"
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
              file:mr-3 file:py-2 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200"
          />
          {fleet?.model3DUrl && (
            <p className="text-xs text-gray-400 mt-1 truncate">Current: {fleet.model3DUrl}</p>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {/* Features header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Features
            {features.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold">
                {features.length}
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={onAddFeature}
            className="flex items-center gap-1.5 text-xs font-semibold bg-cyan-600 text-white px-3 py-1.5 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Feature
          </button>
        </div>

        {/* Features list */}
        <div className="divide-y divide-gray-100">
          {features.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              No features yet — click &ldquo;Add Feature&rdquo; above.
            </p>
          )}

          {features.map((feat, idx) => (
            <div key={idx} className="p-4 bg-white">
              {/* Feature header row */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2.5 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  Feature {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveFeature(idx)}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>

              {/* Title row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Title (EN)</label>
                  <input
                    type="text"
                    value={feat.titleEn}
                    onChange={(e) => onUpdateFeature(idx, "titleEn", e.target.value)}
                    required
                    placeholder="Feature title…"
                    className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Title (AR)</label>
                  <input
                    type="text"
                    value={feat.titleAr}
                    onChange={(e) => onUpdateFeature(idx, "titleAr", e.target.value)}
                    required
                    placeholder="عنوان الميزة…"
                    dir="rtl"
                    className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300"
                  />
                </div>
              </div>

              {/* Description row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description (EN)</label>
                  <textarea
                    value={feat.descriptionEn}
                    onChange={(e) => onUpdateFeature(idx, "descriptionEn", e.target.value)}
                    required
                    rows={2}
                    placeholder="Describe this feature…"
                    className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description (AR)</label>
                  <textarea
                    value={feat.descriptionAr}
                    onChange={(e) => onUpdateFeature(idx, "descriptionAr", e.target.value)}
                    required
                    rows={2}
                    placeholder="وصف الميزة…"
                    dir="rtl"
                    className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-300 resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-4 py-3 rounded-xl hover:from-cyan-700 hover:to-teal-700 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        {isSubmitting && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {isSubmitting
          ? mode === "add" ? "Creating…" : "Updating…"
          : mode === "add" ? "Create Fleet" : "Update Fleet"}
      </button>
    </form>
  );
};
