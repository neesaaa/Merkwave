"use client";

import React, { useState, useEffect } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import {
  ODOO_MODULES_ENDPOINT,
  ODOO_MODULE_BY_ID_ENDPOINT,
  CREATE_ODOO_MODULE_ENDPOINT,
  UPDATE_ODOO_MODULE_ENDPOINT,
  DELETE_ODOO_MODULE_ENDPOINT,
} from "@/config/config";
import { ContentCard } from "@/components/ContentCard";
import { CardActions } from "@/components/CardActions";
import { Modal } from "@/components/Modal";
import { OdooModuleModalContent } from "@/components/Modals/OdooModuleModalContent";
import { MetadataIcons } from "@/components/MetadataIcons";

interface OdooModule {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  detailedDescriptionAr: string;
  detailedDescriptionEn: string;
  imageUrl: string;
}

const OdooModulesPage: React.FC = () => {
  const [modules, setModules] = useState<OdooModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit">("view");
  const [selectedModule, setSelectedModule] = useState<OdooModule | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { authFetch } = useAuthFetch();

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await fetch(ODOO_MODULES_ENDPOINT);
      const data = await response.json();
      setModules(data);
    } catch (error) {
      console.error("Error fetching odoo modules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: number) => {
    try {
      const response = await fetch(ODOO_MODULE_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedModule(data);
      setModalMode("view");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching module details:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(ODOO_MODULE_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedModule(data);
      setModalMode("edit");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching module details:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this module?")) return;
    try {
      const response = await authFetch(DELETE_ODOO_MODULE_ENDPOINT(id), {
        method: "DELETE",
      });
      const responseText = await response.text();
      if (response.ok) {
        alert("Module deleted successfully");
        fetchModules();
      } else {
        alert(
          `Failed to delete module. Status: ${response.status}. ${responseText}`,
        );
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      alert(`Error deleting module: ${error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData();
    const elements = form.elements as HTMLFormControlsCollection & {
      [key: string]: HTMLInputElement | HTMLTextAreaElement;
    };

    formData.append("NameEn", (elements["NameEn"] as HTMLInputElement).value);
    formData.append("NameAr", (elements["NameAr"] as HTMLInputElement).value);
    formData.append(
      "DescriptionEn",
      (elements["DescriptionEn"] as HTMLTextAreaElement).value,
    );
    formData.append(
      "DescriptionAr",
      (elements["DescriptionAr"] as HTMLTextAreaElement).value,
    );
    formData.append(
      "DetailedDescriptionEn",
      (elements["DetailedDescriptionEn"] as HTMLTextAreaElement).value,
    );
    formData.append(
      "DetailedDescriptionAr",
      (elements["DetailedDescriptionAr"] as HTMLTextAreaElement).value,
    );

    if (image && image.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB");
      setIsSubmitting(false);
      return;
    }

    if (image) {
      formData.append("Image", image);
    }

    try {
      const endpoint =
        modalMode === "add"
          ? CREATE_ODOO_MODULE_ENDPOINT
          : UPDATE_ODOO_MODULE_ENDPOINT(selectedModule!.id);

      const response = await authFetch(endpoint, {
        method: modalMode === "add" ? "POST" : "PUT",
        body: formData,
      });

      const responseText = await response.text();
      if (response.ok) {
        alert(
          `Module ${modalMode === "add" ? "created" : "updated"} successfully`,
        );
        setShowModal(false);
        setSelectedModule(null);
        setImage(null);
        fetchModules();
      } else {
        alert(
          `Failed to ${modalMode} module. Status: ${response.status}. ${responseText}`,
        );
      }
    } catch (error) {
      console.error(`Error ${modalMode}ing module:`, error);
      alert(`Error ${modalMode}ing module: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNew = () => {
    setSelectedModule(null);
    setImage(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedModule(null);
    setIsSubmitting(false);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case "view":
        return "View Odoo Module";
      case "add":
        return "Add New Odoo Module";
      case "edit":
        return "Edit Odoo Module";
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Odoo Modules
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold">
              {modules.length} {modules.length === 1 ? "Module" : "Modules"}
            </span>
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
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
          Add Module
        </button>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {modules.map((module) => (
          <ContentCard
            key={module.id}
            imageUrl={module.imageUrl}
            imageAlt={module.nameEn}
            title={module.nameEn}
            metadata={[
              {
                icon: MetadataIcons.user,
                text: module.nameAr,
              },
            ]}
            actions={
              <CardActions
                actions={[
                  {
                    type: "view",
                    onClick: () => handleView(module.id),
                    label: "View",
                  },
                  {
                    type: "edit",
                    onClick: () => handleEdit(module.id),
                    label: "Edit",
                  },
                  {
                    type: "delete",
                    onClick: () => handleDelete(module.id),
                    label: "Delete",
                  },
                ]}
              />
            }
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={getModalTitle()}
        theme="blue-purple"
      >
        <OdooModuleModalContent
          setImage={setImage}
          mode={modalMode}
          module={selectedModule}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default OdooModulesPage;
