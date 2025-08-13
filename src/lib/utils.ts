import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Category color utility
export function getCategoryColor(category: string): {
  bg: string;
  text: string;
  border: string;
} {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    mac: { bg: '#007AFF', text: '#ffffff', border: '#007AFF' },
    windows: { bg: '#0078D4', text: '#ffffff', border: '#0078D4' },
    android: { bg: '#3DDC84', text: '#000000', border: '#3DDC84' },
    vscode: { bg: '#007ACC', text: '#ffffff', border: '#007ACC' },
    homebrew: { bg: '#FBB040', text: '#000000', border: '#FBB040' },
    google: { bg: '#4285F4', text: '#ffffff', border: '#4285F4' },
    'web-development': { bg: '#2E5E15', text: '#ffffff', border: '#2E5E15' },
    javascript: { bg: '#F7DF1E', text: '#000000', border: '#F7DF1E' },
    react: { bg: '#61DAFB', text: '#000000', border: '#61DAFB' },
    nextjs: { bg: '#000000', text: '#ffffff', border: '#000000' },
    typescript: { bg: '#3178C6', text: '#ffffff', border: '#3178C6' },
    css: { bg: '#1572B6', text: '#ffffff', border: '#1572B6' },
    html: { bg: '#E34F26', text: '#ffffff', border: '#E34F26' },
    nodejs: { bg: '#339933', text: '#ffffff', border: '#339933' },
    database: { bg: '#4A7C59', text: '#ffffff', border: '#4A7C59' },
    tutorial: { bg: '#2E5E15', text: '#ffffff', border: '#2E5E15' },
    beginner: { bg: '#4A7C59', text: '#ffffff', border: '#4A7C59' },
    intermediate: { bg: '#7BA05A', text: '#ffffff', border: '#7BA05A' },
    advanced: { bg: '#DC2626', text: '#ffffff', border: '#DC2626' },
  };
  return (
    colors[category.toLowerCase()] || {
      bg: '#6B7280',
      text: '#ffffff',
      border: '#6B7280',
    }
  );
}

// Time formatting utility
export function formatRelativeTime(date: string): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

// Email validation utility
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Blog post URL generation utility
export function generateBlogPostUrl(slug: string): string {
  return `/tutorials/${slug}`;
}

// Date formatting utility
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Category URL generation utility
export function generateCategoryUrl(slug: string): string {
  return `/tutorials?category=${slug}`;
}

// Tag URL generation utility
export function generateTagUrl(slug: string): string {
  return `/tutorials?tag=${slug}`;
}

// Slugify utility
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
