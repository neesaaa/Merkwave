# Dashboard Components - Refactored Structure

This directory contains reusable components for the dashboard to improve code maintainability and readability.

## Components Overview

### 1. **ContentCard** (`ContentCard.tsx`)

A general-purpose card component for displaying content items (blogs, projects, etc.)

**Props:**

- `imageUrl`: Image path from backend
- `imageAlt`: Alt text for accessibility
- `badge`: Optional badge to display on image (with position and styling)
- `title`: Card title
- `metadata`: Array of metadata items (icon + text pairs)
- `description`: Optional description text
- `actions`: Action buttons component
- `gradientOverlay`: Optional gradient overlay on image

### 2. **CardActions** (`CardActions.tsx`)

Action buttons for cards (view, edit, delete)

**Props:**

- `actions`: Array of action objects with `type`, `onClick`, and `label`

**Supported Types:** `view`, `edit`, `delete`

### 3. **Modal** (`Modal.tsx`)

Reusable modal wrapper with themed headers

**Props:**

- `isOpen`: Boolean to control visibility
- `onClose`: Close handler
- `title`: Modal title
- `theme`: Color theme (`blue-purple`, `purple-pink`, `green-teal`)
- `children`: Modal content

### 4. **Modal Content Components**

- `ProjectModalContent`: Form/view for projects
- `BlogModalContent`: Form/view for blogs

**Props:**

- `mode`: `view` | `add` | `edit`
- `project/blog`: Data object (null for add mode)
- `onSubmit`: Form submission handler

### 5. **MetadataIcons** (`MetadataIcons.tsx`)

Common SVG icons for metadata display (user, calendar, tag, link)

## Usage Examples

### Projects Page Refactored Example:

```tsx
import { ContentCard } from "@/components/ContentCard";
import { CardActions } from "@/components/CardActions";
import { Modal } from "@/components/Modal";
import { ProjectModalContent } from "@/components/Modals/ProjectModalContent";
import { MetadataIcons } from "@/components/MetadataIcons";

// In your render:
<ContentCard
  imageUrl={project.imageUrl}
  imageAlt={project.titleEn}
  badge={{
    text: <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold shadow-lg">{project.category}</span>,
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
        { type: "view", onClick: () => handleView(project.slug), label: "View" },
        { type: "edit", onClick: () => handleEdit(project.slug), label: "Edit" },
        { type: "delete", onClick: () => handleDelete(project.slug), label: "Delete" },
      ]}
    />
  }
/>

// Modal usage:
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title={modalMode === "view" ? "View Project" : modalMode === "add" ? "Add New Project" : "Edit Project"}
  theme="blue-purple"
>
  <ProjectModalContent
    mode={modalMode}
    project={selectedProject}
    onSubmit={handleSubmit}
  />
</Modal>
```

### Blogs Page Refactored Example:

```tsx
<ContentCard
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
        { type: "view", onClick: () => handleView(blog.id), label: "View" },
        { type: "edit", onClick: () => handleEdit(blog.id), label: "Edit" },
        { type: "delete", onClick: () => handleDelete(blog.id), label: "Delete" },
      ]}
    />
  }
/>

<Modal
  isOpen={showModal}
  onClose={handleClose}
  title={modalMode === "view" ? "View Blog" : modalMode === "add" ? "Add New Blog" : "Edit Blog"}
  theme="purple-pink"
>
  <BlogModalContent
    mode={modalMode}
    blog={selectedBlog}
    onSubmit={handleSubmit}
  />
</Modal>
```

## Benefits

✅ **Reduced Duplication**: Cards, actions, and modals are reusable  
✅ **Better Maintainability**: Change button styles in one place  
✅ **Improved Readability**: Page components focus on logic, not UI details  
✅ **Type Safety**: All components are fully typed with TypeScript  
✅ **Responsive**: All components have mobile-first responsive design  
✅ **Consistent**: Unified styling across all pages

## Migration Guide

1. Keep existing logic (state, handlers, API calls)
2. Replace card JSX with `<ContentCard>` component
3. Extract modal content into Modal + Content components
4. Use `CardActions` instead of inline button elements
5. Test functionality remains unchanged

## File Structure

```
components/
├── ContentCard.tsx           # General card component
├── CardActions.tsx          # Action buttons
├── Modal.tsx                # Modal wrapper
├── MetadataIcons.tsx        # Icon helpers
├── Modals/
│   ├── ProjectModalContent.tsx
│   └── BlogModalContent.tsx
└── README.md               # This file
```
