// API Configuration
// All API endpoints in one place for easy management

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5070';

export const API_ENDPOINTS = {
  // Projects
  PROJECTS: {
    GET_ALL: `${API_BASE_URL}/api/Projects`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/api/Projects/${id}`,
  },

  // Blogs
  BLOGS: {
    GET_ALL: `${API_BASE_URL}/api/blogs`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/api/blogs/${id}`,
  },

  // Clients (Contact Form)
  CLIENTS: {
    CONTACT: `${API_BASE_URL}/api/Clients/contact`,
    GET_ALL: `${API_BASE_URL}/api/Clients`,
  },

  // Auth (if needed in the future)
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/Auth/login`,
    REGISTER: `${API_BASE_URL}/api/Auth/register`,
  },
};

// Helper function to get image URL
export const getImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '/placeholder.png';
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${API_BASE_URL}${imageUrl}`;
};

// Helper function to handle API errors
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export { API_BASE_URL };
