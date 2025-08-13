import { BlogPost, Category, Post, Tag, User } from '@/types';

export function transformPostToBlogPost(post: Post): BlogPost {
  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featured_image: post.featured_image,
    author_id: 'default-author',
    category_id: 'default-category',
    status: post.published ? 'published' : 'draft',
    is_featured: false,
    reading_time: post.reading_time,
    views: 0,
    published_at: new Date(post.date),
    created_at: new Date(post.date),
    updated_at: new Date(post.date),
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
      slug: post.category.toLowerCase().replace(/ /g, '-'),
      color: '#ffffff',
      created_at: new Date(),
      updated_at: new Date(),
    } as Category,
    tags: post.tags.map(tag => ({
      id: tag,
      name: tag,
      slug: tag.toLowerCase().replace(/ /g, '-'),
      created_at: new Date(),
      updated_at: new Date(),
    })) as Tag[],
  };
}
