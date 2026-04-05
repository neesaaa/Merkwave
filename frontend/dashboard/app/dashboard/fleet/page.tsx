"use client";

import React, { useState, useEffect } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import {
  FLEET_ENDPOINT,
  FLEET_BY_ID_ENDPOINT,
  CREATE_FLEET_ENDPOINT,
  UPDATE_FLEET_ENDPOINT,
  DELETE_FLEET_ENDPOINT,
} from "@/config/config";

import { ContentCard } from "@/components/ContentCard";
import { CardActions } from "@/components/CardActions";
import { Modal } from "@/components/Modal";
import { FleetModalContent, FleetFeature } from "@/components/Modals/FleetModalContent";

interface Fleet {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailedDescriptionEn?: string;
  detailedDescriptionAr?: string;
  imageUrl: string;
  model3DUrl?: string;
  features?: FleetFeature[];
}
import { MetadataIcons } from "@/components/MetadataIcons";

const emptyFeature = (): FleetFeature => ({
  titleEn: "",
  titleAr: "",
  descriptionEn: "",
  descriptionAr: "",
});

const FleetPage: React.FC = () => {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit">("view");
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);
  const [selectedFleetId, setSelectedFleetId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState<FleetFeature[]>([]);
  const { authFetch } = useAuthFetch();

  useEffect(() => {
    fetchFleets();
  }, []);

  const fetchFleets = async () => {
    try {
      const response = await fetch(FLEET_ENDPOINT);
      const data = await response.json();
      setFleets(data);
    } catch (error) {
      console.error("Error fetching fleets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: number) => {
    try {
      const response = await fetch(FLEET_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedFleet(data);
      setSelectedFleetId(id);
      setFeatures(data.features ?? []);
      setModalMode("view");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching fleet details:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(FLEET_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedFleet(data);
      setSelectedFleetId(id);
      setFeatures(data.features ?? []);
      setModalMode("edit");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching fleet details:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this fleet item?")) return;

    try {
      const response = await authFetch(DELETE_FLEET_ENDPOINT(id), {
        method: "DELETE",
      });

      const responseText = await response.text();
      console.log("Delete response status:", response.status);

      if (response.ok) {
        alert("Fleet item deleted successfully");
        fetchFleets();
      } else {
        alert(
          `Failed to delete fleet item. Status: ${response.status}. ${responseText}`,
        );
      }
    } catch (error) {
      console.error("Error deleting fleet:", error);
      alert(`Error deleting fleet: ${error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const elements = form.elements as HTMLFormControlsCollection & Record<string, HTMLInputElement | HTMLTextAreaElement>;
    const formData = new FormData();

    // Text fields
    formData.append("NameEn", (elements["NameEn"] as HTMLInputElement).value);
    formData.append("NameAr", (elements["NameAr"] as HTMLInputElement).value);
    formData.append("DescriptionEn", (elements["DescriptionEn"] as HTMLTextAreaElement).value);
    formData.append("DescriptionAr", (elements["DescriptionAr"] as HTMLTextAreaElement).value);
    formData.append("DetailedDescriptionEn", (elements["DetailedDescriptionEn"] as HTMLTextAreaElement)?.value ?? "");
    formData.append("DetailedDescriptionAr", (elements["DetailedDescriptionAr"] as HTMLTextAreaElement)?.value ?? "");

    // File fields — only append if a file was actually chosen
    const imageInput = elements["Image"] as HTMLInputElement;
    if (imageInput?.files?.[0]) {
      const imageFile = imageInput.files[0];
      if (imageFile.size > 20 * 1024 * 1024) {
        alert("Image size must be less than 20 MB");
        setIsSubmitting(false);
        return;
      }
      formData.append("Image", imageFile);
    }

    const modelInput = elements["Model3D"] as HTMLInputElement;
    if (modelInput?.files?.[0]) {
      const modelFile = modelInput.files[0];
      if (modelFile.size > 100 * 1024 * 1024) {
        alert("3D model size must be less than 100 MB");
        setIsSubmitting(false);
        return;
      }
      formData.append("Model3D", modelFile);
    }

    // Features from state
    features.forEach((feat, idx) => {
      formData.append(`Features[${idx}].TitleEn`, feat.titleEn);
      formData.append(`Features[${idx}].TitleAr`, feat.titleAr);
      formData.append(`Features[${idx}].DescriptionEn`, feat.descriptionEn);
      formData.append(`Features[${idx}].DescriptionAr`, feat.descriptionAr);
    });

    console.log("FormData entries:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const endpoint =
        modalMode === "add"
          ? CREATE_FLEET_ENDPOINT
          : UPDATE_FLEET_ENDPOINT(selectedFleetId!);

      const response = await authFetch(endpoint, {
        method: modalMode === "add" ? "POST" : "PUT",
        body: formData,
      });

      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response:", responseText);

      if (response.ok) {
        alert(`Fleet item ${modalMode === "add" ? "created" : "updated"} successfully`);
        setShowModal(false);
        setSelectedFleet(null);
        setSelectedFleetId(null);
        setFeatures([]);
        fetchFleets();
      } else {
        alert(`Failed to ${modalMode} fleet item. Status: ${response.status}. ${responseText}`);
      }
    } catch (error) {
      console.error(`Error ${modalMode}ing fleet:`, error);
      alert(`Error ${modalMode}ing fleet: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNew = () => {
    setSelectedFleet(null);
    setSelectedFleetId(null);
    setFeatures([]);
    setModalMode("add");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFleet(null);
    setSelectedFleetId(null);
    setFeatures([]);
    setIsSubmitting(false);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case "view":
        return "View Fleet";
      case "add":
        return "Add New Fleet";
      case "edit":
        return "Edit Fleet";
      default:
        return "";
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Fleet
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs sm:text-sm font-semibold">
              {fleets.length} {fleets.length === 1 ? "Truck" : "Trucks"}
            </span>
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:from-cyan-700 hover:to-teal-700 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Fleet
        </button>
      </div>

      {/* Fleet Grid */}
      {fleets.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 21H8M12 17v4"
            />
          </svg>
          <p className="text-lg font-medium">No fleet items yet</p>
          <p className="text-sm mt-1">Click &ldquo;Add Fleet&rdquo; to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {fleets.map((fleet) => (
            <ContentCard
              key={fleet.id}
              imageUrl={fleet.imageUrl}
              imageAlt={fleet.nameEn}
              gradientOverlay
              badge={
                fleet.features && fleet.features.length > 0
                  ? {
                      text: (
                        <div className="flex items-center gap-1.5 text-white text-xs sm:text-sm">
                          {MetadataIcons.calendar}
                          <span className="font-medium">
                            {fleet.features.length} feature
                            {fleet.features.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      ),
                      position: "bottom-left",
                    }
                  : undefined
              }
              title={fleet.nameEn}
              description={fleet.descriptionEn}
              metadata={[
                {
                  icon: MetadataIcons.user,
                  text: fleet.nameAr,
                },
              ]}
              actions={
                <CardActions
                  actions={[
                    {
                      type: "view",
                      onClick: () => handleView(fleet.id),
                      label: "View",
                    },
                    {
                      type: "edit",
                      onClick: () => handleEdit(fleet.id),
                      label: "Edit",
                    },
                    {
                      type: "delete",
                      onClick: () => handleDelete(fleet.id),
                      label: "Delete",
                    },
                  ]}
                />
              }
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={getModalTitle()}
        theme="green-teal"
      >
        <FleetModalContent
          mode={modalMode}
          fleet={selectedFleet}
          features={features}
          onAddFeature={() => setFeatures((prev) => [...prev, emptyFeature()])}
          onRemoveFeature={(idx) => setFeatures((prev) => prev.filter((_, i) => i !== idx))}
          onUpdateFeature={(idx, field, value) =>
            setFeatures((prev) =>
              prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f))
            )
          }
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default FleetPage;
