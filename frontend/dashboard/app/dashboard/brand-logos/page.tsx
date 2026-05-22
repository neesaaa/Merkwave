"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import {
  BRAND_LOGOS_ENDPOINT,
  BRAND_LOGO_BY_ID_ENDPOINT,
  CREATE_BRAND_LOGO_ENDPOINT,
  UPDATE_BRAND_LOGO_ENDPOINT,
  DELETE_BRAND_LOGO_ENDPOINT,
  IMAGE_BASE_URL,
} from "@/config/config";
import { CardActions } from "@/components/CardActions";
import { Modal } from "@/components/Modal";
import { BrandLogoModalContent } from "@/components/Modals/BrandLogoModalContent";

interface BrandLogo {
  id: number;
  name: string;
  altText: string;
  imageUrl: string;
}

const BrandLogosPage: React.FC = () => {
  const [logos, setLogos] = useState<BrandLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit">("view");
  const [selectedLogo, setSelectedLogo] = useState<BrandLogo | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { authFetch } = useAuthFetch();

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const res = await fetch(BRAND_LOGOS_ENDPOINT);
      setLogos(await res.json());
    } catch (err) {
      console.error("Error fetching brand logos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: number) => {
    const res = await fetch(BRAND_LOGO_BY_ID_ENDPOINT(id));
    const data = await res.json();
    setSelectedLogo(data);
    setSelectedId(id);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEdit = async (id: number) => {
    const res = await fetch(BRAND_LOGO_BY_ID_ENDPOINT(id));
    const data = await res.json();
    setSelectedLogo(data);
    setSelectedId(id);
    setImage(null);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this brand logo?")) return;
    const res = await authFetch(DELETE_BRAND_LOGO_ENDPOINT(id), {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Deleted successfully");
      fetchLogos();
    } else {
      alert(`Failed. Status: ${res.status}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const elements = form.elements as HTMLFormControlsCollection &
      Record<string, HTMLInputElement>;
    const formData = new FormData();
    formData.append("Name", elements["Name"].value);
    formData.append("AltText", elements["AltText"].value);

    if (image) {
      if (image.size > 5 * 1024 * 1024) {
        alert("Image must be under 5 MB");
        setIsSubmitting(false);
        return;
      }
      formData.append("Image", image);
    }

    const endpoint =
      modalMode === "add"
        ? CREATE_BRAND_LOGO_ENDPOINT
        : UPDATE_BRAND_LOGO_ENDPOINT(selectedId!);
    const method = modalMode === "add" ? "POST" : "PUT";

    try {
      const res = await authFetch(endpoint, { method, body: formData });
      if (res.ok) {
        alert(
          `Brand logo ${modalMode === "add" ? "created" : "updated"} successfully`,
        );
        setShowModal(false);
        setSelectedLogo(null);
        setSelectedId(null);
        setImage(null);
        fetchLogos();
      } else {
        const text = await res.text();
        alert(`Failed. Status: ${res.status}. ${text}`);
      }
    } catch (err) {
      alert(`Error: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNew = () => {
    setSelectedLogo(null);
    setSelectedId(null);
    setImage(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLogo(null);
    setSelectedId(null);
    setImage(null);
    setIsSubmitting(false);
  };

  const getModalTitle = () => {
    if (modalMode === "add") return "Add Brand Logo";
    if (modalMode === "edit") return "Edit Brand Logo";
    return "View Brand Logo";
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading brand logos...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Brand Logos
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {logos.length} logo{logos.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-linear-to-r from-yellow-500 to-orange-500 text-white px-5 py-2.5 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all font-medium shadow text-sm"
        >
          + Add Logo
        </button>
      </div>

      {/* Grid */}
      {logos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No brand logos yet. Add your first one!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col overflow-hidden"
            >
              {/* Logo image area */}
              <div className="relative h-32 bg-gray-50 flex items-center justify-center p-4">
                {logo.imageUrl ? (
                  <Image
                    src={`${IMAGE_BASE_URL}${logo.imageUrl}`}
                    alt={logo.altText || logo.name}
                    fill
                    className="object-contain p-4"
                    sizes="200px"
                    unoptimized
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No image</span>
                )}
              </div>

              {/* Name */}
              <div className="px-4 py-3 flex-1">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {logo.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{logo.altText}</p>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4">
                <CardActions
                  actions={[
                    {
                      type: "view",
                      onClick: () => handleView(logo.id),
                      label: "View",
                    },
                    {
                      type: "edit",
                      onClick: () => handleEdit(logo.id),
                      label: "Edit",
                    },
                    {
                      type: "delete",
                      onClick: () => handleDelete(logo.id),
                      label: "Delete",
                    },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={getModalTitle()}
        theme="blue-purple"
      >
        <div className="p-4 sm:p-6">
          <BrandLogoModalContent
            mode={modalMode}
            logo={selectedLogo}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            setImage={setImage}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BrandLogosPage;
