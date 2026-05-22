// Base URL for API - reads from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5070";

// Auth Endpoints
export const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}/api/auth/register`;

// Projects Endpoints
export const PROJECTS_ENDPOINT = `${API_BASE_URL}/api/projects`;
export const PROJECT_BY_ID_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/projects/${id}`;
export const CREATE_PROJECT_ENDPOINT = `${API_BASE_URL}/api/projects`;
export const UPDATE_PROJECT_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/projects/${id}`;
export const DELETE_PROJECT_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/projects/${id}`;

// Blogs Endpoints
export const BLOGS_ENDPOINT = `${API_BASE_URL}/api/blogs`;
export const BLOG_BY_ID_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/blogs/${id}`;
export const CREATE_BLOG_ENDPOINT = `${API_BASE_URL}/api/blogs`;
export const UPDATE_BLOG_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/blogs/${id}`;
export const DELETE_BLOG_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/blogs/${id}`;

// Clients Endpoints
export const CLIENTS_ENDPOINT = `${API_BASE_URL}/api/clients`;

// Fleet Endpoints
export const FLEET_ENDPOINT = `${API_BASE_URL}/api/fleet`;
export const FLEET_BY_ID_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/fleet/${id}`;
export const CREATE_FLEET_ENDPOINT = `${API_BASE_URL}/api/fleet`;
export const UPDATE_FLEET_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/fleet/${id}`;
export const DELETE_FLEET_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/fleet/${id}`;

// Image base URL for displaying images
export const IMAGE_BASE_URL = API_BASE_URL;

// Odoo Modules Endpoints
export const ODOO_MODULES_ENDPOINT = `${API_BASE_URL}/api/odoomodules`;
export const ODOO_MODULE_BY_ID_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/odoomodules/${id}`;
export const CREATE_ODOO_MODULE_ENDPOINT = `${API_BASE_URL}/api/odoomodules`;
export const UPDATE_ODOO_MODULE_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/odoomodules/${id}`;
export const DELETE_ODOO_MODULE_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/odoomodules/${id}`;

// Testimonials Endpoints
export const TESTIMONIALS_ENDPOINT = `${API_BASE_URL}/api/testimonials`;
export const TESTIMONIAL_BY_ID_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/testimonials/${id}`;
export const CREATE_TESTIMONIAL_ENDPOINT = `${API_BASE_URL}/api/testimonials`;
export const UPDATE_TESTIMONIAL_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/testimonials/${id}`;
export const DELETE_TESTIMONIAL_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/testimonials/${id}`;

// Brand Logos Endpoints
export const BRAND_LOGOS_ENDPOINT = `${API_BASE_URL}/api/brandlogos`;
export const BRAND_LOGO_BY_ID_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/brandlogos/${id}`;
export const CREATE_BRAND_LOGO_ENDPOINT = `${API_BASE_URL}/api/brandlogos`;
export const UPDATE_BRAND_LOGO_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/brandlogos/${id}`;
export const DELETE_BRAND_LOGO_ENDPOINT = (id: number) =>
  `${API_BASE_URL}/api/brandlogos/${id}`;
