import { BlogPost, Category, Post, Tag, User } from '@/types';

export function transformPostToBlogPost(post: Post): BlogPost {
  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.description || post.excerpt || '',
    content: post.content,
    featured_image: post.featured_image,
    cta: post.cta,
    author_id: 'default-author',
    category_id: 'default-category',
    status:
      post.featured !== false && post.published !== false
        ? 'published'
        : 'draft',
    is_featured: post.featured || false,
    reading_time: post.readingTime || post.reading_time || 5,
    views: 0,
    published_at: new Date(post.publishedAt || post.date || new Date()),
    created_at: new Date(post.publishedAt || post.date || new Date()),
    updated_at: new Date(post.publishedAt || post.date || new Date()),
    author: {
      id: 'default-author',
      name: post.author,
      email: '',
      created_at: new Date(),
      updated_at: new Date(),
    } as User,
    category: {
      id: 'default-category',
      name: post.category,
      slug: post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      color: getCategoryColor(post.category),
      created_at: new Date(),
      updated_at: new Date(),
    } as Category,
    tags: post.tags.map(tag => ({
      id: tag,
      name: tag,
      slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      created_at: new Date(),
      updated_at: new Date(),
    })) as Tag[],
  };
}

// Helper function to get category colors
function getCategoryColor(category: string): string {
  const categoryColors: Record<string, string> = {
    'web-development': '#3b82f6', // blue
    javascript: '#f59e0b', // amber
    typescript: '#3b82f6', // blue
    react: '#06b6d4', // cyan
    nextjs: '#000000', // black
    nodejs: '#22c55e', // green
    python: '#3b82f6', // blue
    tutorial: '#8b5cf6', // violet
    guide: '#06b6d4', // cyan
    tips: '#f59e0b', // amber
    default: '#6b7280', // gray
  };

  return categoryColors[category.toLowerCase()] || categoryColors.default;
}
