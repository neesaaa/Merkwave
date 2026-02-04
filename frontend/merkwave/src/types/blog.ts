export interface Blog {
  id: number;
  titleEn: string;
  titleAr: string;
  slug: string;
  contentEn?: string;
  contentAr?: string;
  tagsEn?: string;
  tagsAr?: string;
  excerptEn?: string;
  excerptAr?: string;
  imageUrl?: string;
  readTime?: number;
  author?: string; // Legacy field
  authorEn: string;
  authorAr: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  metaTitleEn?: string;
  metaTitleAr?: string;
  metaDescriptionEn?: string;
  metaDescriptionAr?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  views: number;
}

export interface BlogListItem {
  id: number;
  titleEn: string;
  titleAr: string;
  slug: string;
  excerptEn?: string;
  excerptAr?: string;
  imageUrl?: string;
  readTime?: number;
  authorEn: string;
  authorAr: string;
  createdAt: string;
  publishedAt?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  views: number;
}

export interface BlogApiResponse {
  status: 'success' | 'failure';
  data?: Blog[] | Blog;
  message?: string;
}

export interface BlogsApiResponse {
  status: 'success' | 'failure';
  data?: BlogListItem[];
  message?: string;
}