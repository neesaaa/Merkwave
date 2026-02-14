"use client";

import React, { useState, useEffect } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import {
  BLOGS_ENDPOINT,
  BLOG_BY_ID_ENDPOINT,
  CREATE_BLOG_ENDPOINT,
  UPDATE_BLOG_ENDPOINT,
  DELETE_BLOG_ENDPOINT,
} from "@/config/config";

import { ContentCard } from "@/components/ContentCard";
import { CardActions } from "@/components/CardActions";
import { Modal } from "@/components/Modal";
import { BlogModalContent } from "@/components/Modals/BlogModalContent";
import { MetadataIcons } from "@/components/MetadataIcons";

interface Blog {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailedDescriptionEn?: string;
  detailedDescriptionAr?: string;
  imageUrl: string;
  creator: string;
  blogDate: string;
}

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit">("view");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authFetch } = useAuthFetch();
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(BLOGS_ENDPOINT);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: number) => {
    try {
      const response = await fetch(BLOG_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedBlog(data);
      setSelectedBlogId(id);
      setModalMode("view");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(BLOG_BY_ID_ENDPOINT(id));
      const data = await response.json();
      setSelectedBlog(data);
      setSelectedBlogId(id);
      setModalMode("edit");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const endpoint = DELETE_BLOG_ENDPOINT(id);

      const response = await authFetch(endpoint, {
        method: "DELETE",
      });

      const responseText = await response.text();
      console.log("Delete response status:", response.status);
      console.log("Delete response:", responseText);

      if (response.ok) {
        alert("Blog deleted successfully");
        fetchBlogs();
      } else {
        alert(
          `Failed to delete blog. Status: ${response.status}. ${responseText}`,
        );
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert(`Error deleting blog: ${error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const imageFile = formData.get("Image") as File | null;
    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB");
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint =
        modalMode === "add"
          ? CREATE_BLOG_ENDPOINT
          : UPDATE_BLOG_ENDPOINT(selectedBlogId!);

      console.log("Endpoint:", endpoint);
      console.log("Method:", modalMode === "add" ? "POST" : "PUT");
      for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

      const response = await authFetch(endpoint, {
        method: modalMode === "add" ? "POST" : "PUT",
        body: formData,
      });

      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response:", responseText);

      if (response.ok) {
        alert(
          `Blog ${modalMode === "add" ? "created" : "updated"} successfully`,
        );
        setShowModal(false);
        setSelectedBlog(null);
        setSelectedBlogId(null);
        fetchBlogs();
      } else {
        alert(
          `Failed to ${modalMode} blog. Status: ${response.status}. ${responseText}`,
        );
      }
    } catch (error) {
      console.error(`Error ${modalMode}ing blog:`, error);
      alert(`Error ${modalMode}ing blog: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNew = () => {
    setSelectedBlog(null);
    setSelectedBlogId(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
    setSelectedBlogId(null);
    setIsSubmitting(false);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case "view":
        return "View Blog";
      case "add":
        return "Add New Blog";
      case "edit":
        return "Edit Blog";
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Blogs
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-semibold">
              {blogs.length} {blogs.length === 1 ? "Blog" : "Blogs"}
            </span>
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
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
          Add Blog
        </button>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogs.map((blog) => (
          <ContentCard
            key={blog.id}
            imageUrl={blog.imageUrl}
            imageAlt={blog.titleEn}
            gradientOverlay
            badge={{
              text: (
                <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
                  {MetadataIcons.user}
                  <span className="font-medium truncate">{blog.creator}</span>
                </div>
              ),
              position: "bottom-left",
            }}
            title={blog.titleEn}
            description={blog.descriptionEn}
            metadata={[
              {
                icon: MetadataIcons.calendar,
                text: new Date(blog.blogDate).toLocaleDateString(),
              },
            ]}
            actions={
              <CardActions
                actions={[
                  {
                    type: "view",
                    onClick: () => handleView(blog.id!),
                    label: "View",
                  },
                  {
                    type: "edit",
                    onClick: () => handleEdit(blog.id!),
                    label: "Edit",
                  },
                  {
                    type: "delete",
                    onClick: () => handleDelete(blog.id!),
                    label: "Delete",
                  },
                ]}
              />
            }
          />
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={getModalTitle()}
        theme="purple-pink"
      >
        <BlogModalContent
          mode={modalMode}
          blog={selectedBlog}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default BlogsPage;
