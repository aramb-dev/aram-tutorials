// Core data types for Aram Tutorials blog

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author_id: string;
  category_id: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  reading_time: number;
  views: number;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;

  // Relations
  author?: User;
  category?: Category;
  tags?: Tag[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: Date;
  updated_at: Date;

  // Relations
  post?: BlogPost;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribed_at: Date;
  unsubscribed_at?: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: Date;
  updated_at: Date;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Search and filter types
export interface BlogPostFilters {
  category?: string;
  tags?: string[];
  status?: BlogPost['status'];
  featured?: boolean;
  search?: string;
  author?: string;
}

export interface BlogPostSort {
  field: 'created_at' | 'published_at' | 'title' | 'views' | 'reading_time';
  order: 'asc' | 'desc';
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface CommentFormData {
  author_name: string;
  author_email: string;
  content: string;
  post_id: string;
}

// SEO and metadata types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// Component prop types
export interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showExcerpt?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showAuthor?: boolean;
  showReadingTime?: boolean;
}

export interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
}

export interface TagProps {
  tag: Tag;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  removable?: boolean;
  onRemove?: (tag: Tag) => void;
  className?: string;
}

// Database schema types (for migrations)
export interface DatabaseSchema {
  users: User;
  categories: Category;
  tags: Tag;
  blog_posts: BlogPost;
  comments: Comment;
  newsletter_subscriptions: NewsletterSubscription;
  contact_submissions: ContactSubmission;
}

// Utility types
export type CreateBlogPost = Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>;
export type UpdateBlogPost = Partial<CreateBlogPost>;
export type CreateCategory = Omit<Category, 'id' | 'created_at' | 'updated_at'>;
export type UpdateCategory = Partial<CreateCategory>;
export type CreateTag = Omit<Tag, 'id' | 'created_at' | 'updated_at'>;
export type UpdateTag = Partial<CreateTag>;