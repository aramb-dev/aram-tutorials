import type { BlogPost } from '@/types';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper function to transform database post to BlogPost type
function transformPost(post: any): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featured_image: post.featuredImage,
    author_id: post.authorId,
    category_id: post.categoryId,
    status: post.published ? 'published' : 'draft',
    is_featured: post.featured,
    reading_time: post.readingTime,
    views: post.views,
    published_at: post.publishedAt,
    created_at: post.createdAt,
    updated_at: post.updatedAt,
    // Relations
    category: post.category
      ? {
          id: post.category.id,
          name: post.category.name,
          slug: post.category.slug,
          description: post.category.description,
          color: post.category.color || '#6B7280',
          icon: post.category.icon,
          created_at: post.category.createdAt,
          updated_at: post.category.updatedAt,
        }
      : undefined,
    tags: post.tags || [],
  };
}

// Database utility functions
export class Database {
  // Blog Posts
  static async getAllPosts({
    page = 1,
    limit = 12,
    categorySlug,
    search,
    published = true,
  }: {
    page?: number;
    limit?: number;
    categorySlug?: string;
    search?: string;
    published?: boolean;
  } = {}) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (published) where.published = true;
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: posts.map(post =>
        transformPost({
          ...post,
          tags: post.tags.map(pt => pt.tag),
        })
      ),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  static async getPostBySlug(slug: string) {
    const post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          where: { approved: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!post) return null;

    return transformPost({
      ...post,
      tags: post.tags.map(pt => pt.tag),
    });
  }

  static async getFeaturedPosts(limit = 3) {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return posts.map(post =>
      transformPost({
        ...post,
        tags: post.tags.map(pt => pt.tag),
      })
    );
  }

  static async getRecentPosts(limit = 6) {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return posts.map(post =>
      transformPost({
        ...post,
        tags: post.tags.map(pt => pt.tag),
      })
    );
  }

  static async getRelatedPosts(postId: string, categoryId: string, limit = 3) {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
        categoryId,
        NOT: { id: postId },
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return posts.map(post =>
      transformPost({
        ...post,
        tags: post.tags.map(pt => pt.tag),
      })
    );
  }

  // Categories
  static async getAllCategories() {
    return prisma.category.findMany({
      include: {
        _count: {
          select: { posts: { where: { published: true } } },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  static async getCategoryBySlug(slug: string) {
    return prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { posts: { where: { published: true } } },
        },
      },
    });
  }

  // Tags
  static async getAllTags() {
    return prisma.tag.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: { post: { published: true } },
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  // Comments
  static async getCommentsByPostId(postId: string) {
    return prisma.comment.findMany({
      where: { postId, approved: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async createComment(data: {
    postId: string;
    userId: string;
    content: string;
  }) {
    return prisma.comment.create({
      data: {
        ...data,
        approved: false, // Comments need approval by default
      },
    });
  }

  // Newsletter
  static async subscribeToNewsletter(email: string) {
    return prisma.newsletterSubscription.upsert({
      where: { email },
      update: { active: true },
      create: { email, active: true },
    });
  }

  static async unsubscribeFromNewsletter(email: string) {
    return prisma.newsletterSubscription.update({
      where: { email },
      data: { active: false },
    });
  }

  // Contact
  static async createContactSubmission(data: {
    name: string;
    email: string;
    message: string;
  }) {
    return prisma.contactSubmission.create({
      data,
    });
  }

  // Search
  static async searchPosts(query: string, limit = 10) {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return posts.map(post =>
      transformPost({
        ...post,
        tags: post.tags.map(pt => pt.tag),
      })
    );
  }
}

export default Database;
