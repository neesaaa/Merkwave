"use client";

import React, { useState, useEffect } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import {
  PROJECTS_ENDPOINT,
  PROJECT_BY_ID_ENDPOINT,
  CREATE_PROJECT_ENDPOINT,
  UPDATE_PROJECT_ENDPOINT,
  DELETE_PROJECT_ENDPOINT,
} from "@/config/config";

import { ContentCard } from "@/components/ContentCard";
import { CardActions } from "@/components/CardActions";
import { Modal } from "@/components/Modal";
import { ProjectModalContent } from "@/components/Modals/ProjectModalContent";
import { MetadataIcons } from "@/components/MetadataIcons";

interface Project {
  id: number;
  slug: string;
  titleEn: string;
  titleAr: string;
  clientName: string;
  projectDate: string;
  category: string;
  categoryAr: string;
  imageUrl: string;
  demoUrl: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit">("view");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authFetch } = useAuthFetch();
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(PROJECTS_ENDPOINT);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: number) => {
    try {
      const response = await fetch(PROJECT_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedProject(data);
      setModalMode("view");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(PROJECT_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedProject(data);
      setModalMode("edit");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const endpoint = DELETE_PROJECT_ENDPOINT(id);

      const response = await authFetch(endpoint, {
        method: "DELETE",
      });

      const responseText = await response.text();
      console.log("Delete response status:", response.status);
      console.log("Delete response:", responseText);

      if (response.ok) {
        alert("Project deleted successfully");
        fetchProjects();
      } else {
        alert(
          `Failed to delete project. Status: ${response.status}. ${responseText}`,
        );
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(`Error deleting project: ${error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData();

    const elements = form.elements as any;

    formData.append("Slug", elements.Slug.value);
    formData.append("TitleEn", elements.TitleEn.value);
    formData.append("TitleAr", elements.TitleAr.value);
    formData.append("ClientName", elements.ClientName.value);
    formData.append("Category", elements.Category.value);
    formData.append("ProjectDate", elements.ProjectDate.value);
    formData.append("DemoUrl", elements.DemoUrl.value);

    if (image && image.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB");
      setIsSubmitting(false);
      return;
    }

    if (image) {
      formData.append("Image", image);
    }

    console.log("FormData entries:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const endpoint =
        modalMode === "add"
          ? CREATE_PROJECT_ENDPOINT
          : UPDATE_PROJECT_ENDPOINT(selectedProject!.id);

      console.log("Endpoint:", endpoint);
      console.log("Method:", modalMode === "add" ? "POST" : "PUT");

      const response = await authFetch(endpoint, {
        method: modalMode === "add" ? "POST" : "PUT",
        body: formData,
      });

      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response:", responseText);

      if (response.ok) {
        alert(
          `Project ${modalMode === "add" ? "created" : "updated"} successfully`,
        );
        setShowModal(false);
        setSelectedProject(null);
        fetchProjects();
      } else {
        alert(
          `Failed to ${modalMode} project. Status: ${response.status}. ${responseText}`,
        );
      }
    } catch (error) {
      console.error(`Error ${modalMode}ing project:`, error);
      alert(`Error ${modalMode}ing project: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNew = () => {
    setSelectedProject(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    setIsSubmitting(false);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case "view":
        return "View Project";
      case "add":
        return "Add New Project";
      case "edit":
        return "Edit Project";
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
            Projects
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold">
              {projects.length} {projects.length === 1 ? "Project" : "Projects"}
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
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project) => (
          <ContentCard
            key={project.id}
            imageUrl={project.imageUrl}
            imageAlt={project.titleEn}
            badge={{
              text: (
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold shadow-lg">
                  {project.category}
                </span>
              ),
              position: "top-right",
            }}
            title={project.titleEn}
            metadata={[
              {
                icon: MetadataIcons.user,
                text: project.clientName,
              },
              {
                icon: MetadataIcons.calendar,
                text: new Date(project.projectDate).toLocaleDateString(),
              },
            ]}
            actions={
              <CardActions
                actions={[
                  {
                    type: "view",
                    onClick: () => handleView(project.id),
                    label: "View",
                  },
                  {
                    type: "edit",
                    onClick: () => handleEdit(project.id),
                    label: "Edit",
                  },
                  {
                    type: "delete",
                    onClick: () => handleDelete(project.id),
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
        <ProjectModalContent
          setImage={setImage}
          mode={modalMode}
          project={selectedProject}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default ProjectsPage;
