// Base URL for API - reads from environment variable
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5070";

// Auth Endpoints
export const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}/api/auth/register`;

// Projects Endpoints
export const PROJECTS_ENDPOINT = `${API_BASE_URL}/api/projects`;
export const PROJECT_BY_ID_ENDPOINT = (id: number ) =>
  `${API_BASE_URL}/api/projects/${id}`;
export const CREATE_PROJECT_ENDPOINT = `${API_BASE_URL}/api/projects`;
export const UPDATE_PROJECT_ENDPOINT = (id: number ) =>
  `${API_BASE_URL}/api/projects/${id}`;
export const DELETE_PROJECT_ENDPOINT = (id: number ) =>
  `${API_BASE_URL}/api/projects/${id}`;

// Blogs Endpoints
export const BLOGS_ENDPOINT = `${API_BASE_URL}/api/blogs`;
export const BLOG_BY_ID_ENDPOINT = (id: number ) =>
  `${API_BASE_URL}/api/blogs/${id}`;
export const CREATE_BLOG_ENDPOINT = `${API_BASE_URL}/api/blogs`;
export const UPDATE_BLOG_ENDPOINT = (id: number ) =>
  `${API_BASE_URL}/api/blogs/${id}`;
export const DELETE_BLOG_ENDPOINT = (id: number ) =>
  `${API_BASE_URL}/api/blogs/${id}`;

// Clients Endpoints
export const CLIENTS_ENDPOINT = `${API_BASE_URL}/api/clients`;

// Image base URL for displaying images
export const IMAGE_BASE_URL = API_BASE_URL;
