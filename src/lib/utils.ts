import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Category color utility
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'web-development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'javascript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'react': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    'nextjs': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'typescript': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'css': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    'html': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    'nodejs': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'database': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'tutorial': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    'beginner': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
    'intermediate': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    'advanced': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
}

// Time formatting utility
export function formatRelativeTime(date: string): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

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
    day: 'numeric'
  });
}

// Category URL generation utility
export function generateCategoryUrl(slug: string): string {
  return `/tutorials?category=${slug}`;
}
