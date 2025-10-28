import type { Post } from '@/types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export const CATEGORIES_CONFIG: Category[] = [
  {
    id: 'mac',
    name: 'macOS',
    slug: 'mac',
    description: 'macOS tutorials and guides',
    color: '#4A7C59',
    icon: 'laptop',
  },
  {
    id: 'windows',
    name: 'Windows',
    slug: 'windows',
    description: 'Windows tutorials and guides',
    color: '#7BA05A',
    icon: 'monitor',
  },
  {
    id: 'android',
    name: 'Android',
    slug: 'android',
    description: 'Android development and guides',
    color: '#A8C78A',
    icon: 'smartphone',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    slug: 'vscode',
    description: 'Visual Studio Code tutorials',
    color: '#2E5E15',
    icon: 'code',
  },
  {
    id: 'homebrew',
    name: 'Homebrew',
    slug: 'homebrew',
    description: 'Homebrew package manager guides',
    color: '#6B7280',
    icon: 'package',
  },
  {
    id: 'google',
    name: 'Google',
    slug: 'google',
    description: 'Google services and tools',
    color: '#4A7C59',
    icon: 'search',
  },
  {
    id: 'email',
    name: 'Email',
    slug: 'email',
    description: 'Email communication and productivity',
    color: '#3B82F6',
    icon: 'mail',
  },
];

export interface CategoryWithCount extends Category {
  count: number;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const normalizeCategorySlug = (category?: string | null) =>
  category ? slugify(category) : '';

export function getCategoriesWithCounts(posts: Post[]): CategoryWithCount[] {
  const categoryCounts = new Map<string, number>();

  posts.forEach(post => {
    const slug = normalizeCategorySlug(post.category);
    if (!slug) {
      return;
    }

    categoryCounts.set(slug, (categoryCounts.get(slug) ?? 0) + 1);
  });

  return CATEGORIES_CONFIG.filter(category =>
    categoryCounts.has(category.slug)
  )
    .map(category => ({
      ...category,
      count: categoryCounts.get(category.slug) ?? 0,
    }))
    .filter(category => category.count > 0)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
