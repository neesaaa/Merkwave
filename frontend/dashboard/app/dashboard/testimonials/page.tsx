"use client";

import React, { useState, useEffect } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import {
  TESTIMONIALS_ENDPOINT,
  TESTIMONIAL_BY_ID_ENDPOINT,
  CREATE_TESTIMONIAL_ENDPOINT,
  UPDATE_TESTIMONIAL_ENDPOINT,
  DELETE_TESTIMONIAL_ENDPOINT,
} from "@/config/config";

import { CardActions } from "@/components/CardActions";
import { Modal } from "@/components/Modal";
import { TestimonialModalContent } from "@/components/Modals/TestimonialModalContent";

interface Testimonial {
  id: number;
  rating: number;
  textEn: string;
  textAr: string;
  clientNameEn: string;
  clientNameAr: string;
  clientPositionEn: string;
  clientPositionAr: string;
  avatar: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ))}
  </div>
);

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit">("view");
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authFetch } = useAuthFetch();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(TESTIMONIALS_ENDPOINT);
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: number) => {
    try {
      const response = await fetch(TESTIMONIAL_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedTestimonial(data);
      setSelectedId(id);
      setModalMode("view");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(TESTIMONIAL_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedTestimonial(data);
      setSelectedId(id);
      setModalMode("edit");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await authFetch(DELETE_TESTIMONIAL_ENDPOINT(id), {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Testimonial deleted successfully");
        fetchTestimonials();
      } else {
        const text = await response.text();
        alert(`Failed to delete. Status: ${response.status}. ${text}`);
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert(`Error deleting testimonial: ${error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    // Build JSON body from form data
    const body = {
      rating: parseInt(formData.get("Rating") as string, 10),
      textEn: formData.get("TextEn") as string,
      textAr: formData.get("TextAr") as string,
      clientNameEn: formData.get("ClientNameEn") as string,
      clientNameAr: formData.get("ClientNameAr") as string,
      clientPositionEn: formData.get("ClientPositionEn") as string,
      clientPositionAr: formData.get("ClientPositionAr") as string,
      avatar: formData.get("Avatar") as string,
    };

    try {
      const endpoint =
        modalMode === "add"
          ? CREATE_TESTIMONIAL_ENDPOINT
          : UPDATE_TESTIMONIAL_ENDPOINT(selectedId!);

      const response = await authFetch(endpoint, {
        method: modalMode === "add" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(
          `Testimonial ${modalMode === "add" ? "created" : "updated"} successfully`,
        );
        setShowModal(false);
        setSelectedTestimonial(null);
        setSelectedId(null);
        fetchTestimonials();
      } else {
        const text = await response.text();
        alert(`Failed. Status: ${response.status}. ${text}`);
      }
    } catch (error) {
      console.error(`Error ${modalMode}ing testimonial:`, error);
      alert(`Error: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNew = () => {
    setSelectedTestimonial(null);
    setSelectedId(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTestimonial(null);
    setSelectedId(null);
    setIsSubmitting(false);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case "view":
        return "View Testimonial";
      case "add":
        return "Add New Testimonial";
      case "edit":
        return "Edit Testimonial";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading testimonials...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Testimonials
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {testimonials.length} testimonial
            {testimonials.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-linear-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-medium shadow text-sm"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Cards Grid */}
      {testimonials.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No testimonials yet. Add your first one!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col gap-4 border border-gray-100"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-cyan-400 to-teal-500 flex items-center justify-center shrink-0">
                  <span className="text-black font-bold text-sm">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {t.clientNameEn}
                  </p>
                  <p className="text-xs text-gray-500">{t.clientPositionEn}</p>
                </div>
                <div className="ml-auto">
                  <StarRating rating={t.rating} />
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                &quot;{t.textEn}&quot;
              </p>

              {/* Actions */}
              <CardActions
                actions={[
                  {
                    type: "view",
                    onClick: () => handleView(t.id),
                    label: "View",
                  },
                  {
                    type: "edit",
                    onClick: () => handleEdit(t.id),
                    label: "Edit",
                  },
                  {
                    type: "delete",
                    onClick: () => handleDelete(t.id),
                    label: "Delete",
                  },
                ]}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={getModalTitle()}
        theme="purple-pink"
      >
        <div className="p-4 sm:p-6">
          <TestimonialModalContent
            mode={modalMode}
            testimonial={selectedTestimonial}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TestimonialsPage;
