import React from "react";

interface Testimonial {
  rating: number;
  textEn: string;
  textAr: string;
  clientNameEn: string;
  clientNameAr: string;
  clientPositionEn: string;
  clientPositionAr: string;
  avatar: string;
}

interface TestimonialModalContentProps {
  mode: "view" | "add" | "edit";
  testimonial?: Testimonial | null;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ))}
  </div>
);

export const TestimonialModalContent: React.FC<
  TestimonialModalContentProps
> = ({ mode, testimonial, onSubmit, isSubmitting = false }) => {
  if (mode === "view" && testimonial) {
    return (
      <div className="space-y-3 text-sm sm:text-base">
        <div>
          <strong>Rating:</strong> <StarRating rating={testimonial.rating} />
        </div>
        <p>
          <strong>Text (EN):</strong> {testimonial.textEn}
        </p>
        <p>
          <strong>Text (AR):</strong> {testimonial.textAr}
        </p>
        <p>
          <strong>Client Name (EN):</strong> {testimonial.clientNameEn}
        </p>
        <p>
          <strong>Client Name (AR):</strong> {testimonial.clientNameAr}
        </p>
        <p>
          <strong>Position (EN):</strong> {testimonial.clientPositionEn}
        </p>
        <p>
          <strong>Position (AR):</strong> {testimonial.clientPositionAr}
        </p>
        <p>
          <strong>Avatar Initials:</strong> {testimonial.avatar}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating (1–5)
        </label>
        <input
          type="number"
          name="Rating"
          min={1}
          max={5}
          defaultValue={testimonial?.rating ?? 5}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text (EN)
          </label>
          <textarea
            name="TextEn"
            rows={3}
            defaultValue={testimonial?.textEn ?? ""}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text (AR)
          </label>
          <textarea
            name="TextAr"
            rows={3}
            defaultValue={testimonial?.textAr ?? ""}
            required
            dir="rtl"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name (EN)
          </label>
          <input
            type="text"
            name="ClientNameEn"
            defaultValue={testimonial?.clientNameEn ?? ""}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name (AR)
          </label>
          <input
            type="text"
            name="ClientNameAr"
            defaultValue={testimonial?.clientNameAr ?? ""}
            required
            dir="rtl"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position (EN)
          </label>
          <input
            type="text"
            name="ClientPositionEn"
            defaultValue={testimonial?.clientPositionEn ?? ""}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position (AR)
          </label>
          <input
            type="text"
            name="ClientPositionAr"
            defaultValue={testimonial?.clientPositionAr ?? ""}
            required
            dir="rtl"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Avatar Initials (e.g. AM)
        </label>
        <input
          type="text"
          name="Avatar"
          maxLength={3}
          defaultValue={testimonial?.avatar ?? ""}
          required
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
              ? "Create"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
};
