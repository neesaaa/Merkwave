export interface Project {
  id: number;
  slug: string;
  titleEn: string;
  titleAr: string;
  client_id?: number | null;
  client_name?: string | null;
  descriptionEn?: string | null;
  descriptionAr?: string | null;
  challenge_en?: string | null;
  challenge_ar?: string | null;
  solution_en?: string | null;
  solution_ar?: string | null;
  key_features_en?: string | null; // JSON array string
  key_features_ar?: string | null; // JSON array string
  results_achieved_en?: string | null; // JSON array string
  results_achieved_ar?: string | null; // JSON array string
  technologiesEn?: string | null; // JSON array string
  technologiesAr?: string | null; // JSON array string
  project_date?: string | null;
  category?: string | null;
  featured?: number | boolean;
  imageUrl?: string | null;
  gallery_images?: string | null; // JSON encoded array from API
  demoUrl?: string | null;
  codeUrl?: string | null;
  accent_color?: string | null;
  status?: string | null;
  order?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ProjectListItem {
  id: number;
  slug: string;
  titleEn: string;
  titleAr: string;
  client_id?: number | null;
  client_name?: string | null;
  project_date?: string | null;
  category?: string | null;
  featured?: number | boolean;
  imageUrl?: string | null;
  demoUrl?: string | null;
  codeUrl?: string | null;
}

export interface ProjectApiResponse {
  status: 'success' | 'failure';
  data?: Project[] | Project;
  message?: string;
}

export interface ProjectsApiResponse {
  status: 'success' | 'failure';
  data?: ProjectListItem[];
  message?: string;
}
