import { neon } from '@neondatabase/serverless';
import type {
  BlogPost,
  Category,
  Tag,
  Comment,
  User,
  NewsletterSubscription,
  ContactSubmission,
  PaginatedResponse,
  BlogPostFilters,
  BlogPostSort
} from '@/types';

// Initialize Neon client
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL);

// Database utility functions
export class Database {
  // Blog Posts
  static async getAllPosts({
    page = 1,
    limit = 12,
    filters = {},
    sort = { field: 'published_at', order: 'desc' }
  }: {
    page?: number;
    limit?: number;
    filters?: BlogPostFilters;
    sort?: BlogPostSort;
  } = {}): Promise<PaginatedResponse<BlogPost>> {
    const offset = (page - 1) * limit;

    let whereClause = "WHERE bp.status = 'published'";
    const params: any[] = [];
    let paramIndex = 1;

    if (filters.category) {
      whereClause += ` AND c.slug = $${paramIndex}`;
      params.push(filters.category);
      paramIndex++;
    }

    if (filters.search) {
      whereClause += ` AND (bp.title ILIKE $${paramIndex} OR bp.excerpt ILIKE $${paramIndex} OR bp.content ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    if (filters.featured !== undefined) {
      whereClause += ` AND bp.is_featured = $${paramIndex}`;
      params.push(filters.featured);
      paramIndex++;
    }

    const orderClause = `ORDER BY bp.${sort.field} ${sort.order.toUpperCase()}`;

    const query = `
      SELECT
        bp.*,
        u.name as author_name,
        u.avatar_url as author_avatar,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        c.icon as category_icon,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', t.id,
              'name', t.name,
              'slug', t.slug
            )
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) as tags
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
      LEFT JOIN blog_post_tags bpt ON bp.id = bpt.post_id
      LEFT JOIN tags t ON bpt.tag_id = t.id
      ${whereClause}
      GROUP BY bp.id, u.name, u.avatar_url, c.name, c.slug, c.color, c.icon
      ${orderClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    params.push(limit, offset);

    const countQuery = `
      SELECT COUNT(DISTINCT bp.id) as total
      FROM blog_posts bp
      LEFT JOIN categories c ON bp.category_id = c.id
      ${whereClause}
    `;

    const [posts, countResult] = await Promise.all([
      sql`${sql.unsafe(query)}`,
      sql`${sql.unsafe(countQuery)}`
    ]);

    const total = parseInt(countResult[0]?.total || '0');
    const totalPages = Math.ceil(total / limit);

    return {
      data: posts.map(post => ({
        ...post,
        tags: typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags,
        category: {
          id: post.category_id,
          name: post.category_name,
          slug: post.category_slug,
          color: post.category_color,
          icon: post.category_icon
        },
        author: {
          id: post.author_id,
          name: post.author_name,
          avatar_url: post.author_avatar
        }
      })) as BlogPost[],
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const query = `
      SELECT
        bp.*,
        u.name as author_name,
        u.email as author_email,
        u.avatar_url as author_avatar,
        u.bio as author_bio,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        c.icon as category_icon,
        c.description as category_description,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', t.id,
              'name', t.name,
              'slug', t.slug
            )
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) as tags
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
      LEFT JOIN blog_post_tags bpt ON bp.id = bpt.post_id
      LEFT JOIN tags t ON bpt.tag_id = t.id
      WHERE bp.slug = $1 AND bp.status = 'published'
      GROUP BY bp.id, u.name, u.email, u.avatar_url, u.bio, c.name, c.slug, c.color, c.icon, c.description
    `;

    const result = await sql`
      SELECT
        bp.*,
        u.name as author_name,
        u.email as author_email,
        u.avatar_url as author_avatar,
        u.bio as author_bio,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        c.icon as category_icon,
        c.description as category_description,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', t.id,
              'name', t.name,
              'slug', t.slug
            )
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) as tags
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
      LEFT JOIN blog_post_tags bpt ON bp.id = bpt.post_id
      LEFT JOIN tags t ON bpt.tag_id = t.id
      WHERE bp.slug = ${slug} AND bp.status = 'published'
      GROUP BY bp.id, u.name, u.email, u.avatar_url, u.bio, c.name, c.slug, c.color, c.icon, c.description
    `;

    if (result.length === 0) return null;

    const post = result[0];

    // Increment view count
    await sql`UPDATE blog_posts SET views = views + 1 WHERE id = ${post.id}`;

    return {
      ...post,
      tags: typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags,
      category: {
        id: post.category_id,
        name: post.category_name,
        slug: post.category_slug,
        color: post.category_color,
        icon: post.category_icon,
        description: post.category_description
      },
      author: {
        id: post.author_id,
        name: post.author_name,
        email: post.author_email,
        avatar_url: post.author_avatar,
        bio: post.author_bio
      }
    } as BlogPost;
  }

  static async getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
    const query = `
      SELECT
        bp.*,
        u.name as author_name,
        u.avatar_url as author_avatar,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        c.icon as category_icon
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
      WHERE bp.status = 'published' AND bp.is_featured = true
      ORDER BY bp.published_at DESC
      LIMIT ${limit}
    `;

    const result = await sql`
      SELECT
        bp.*,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color
      FROM blog_posts bp
      LEFT JOIN categories c ON bp.category_id = c.id
      WHERE bp.status = 'published' AND bp.is_featured = true
      ORDER BY bp.published_at DESC
      LIMIT ${limit}
    `;

    return result.map(post => ({
      ...post,
      category: {
        id: post.category_id,
        name: post.category_name,
        slug: post.category_slug,
        color: post.category_color,
        icon: post.category_icon
      },
      author: {
        id: post.author_id,
        name: post.author_name,
        avatar_url: post.author_avatar
      }
    })) as BlogPost[];
  }

  static async getRelatedPosts(postId: string, categoryId: string, limit: number = 3): Promise<BlogPost[]> {
    const query = `
      SELECT
        bp.*,
        u.name as author_name,
        u.avatar_url as author_avatar,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        c.icon as category_icon
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
      WHERE bp.status = 'published'
        AND bp.id != ${postId}
        AND bp.category_id = ${categoryId}
      ORDER BY bp.published_at DESC
      LIMIT ${limit}
    `;

    const result = await sql`
      SELECT
        bp.*,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color
      FROM blog_posts bp
      LEFT JOIN categories c ON bp.category_id = c.id
      WHERE bp.status = 'published'
        AND bp.id != ${postId}
        AND bp.category_id = ${categoryId}
      ORDER BY bp.published_at DESC
      LIMIT ${limit}
    `;

    return result.map(post => ({
      ...post,
      category: {
        id: post.category_id,
        name: post.category_name,
        slug: post.category_slug,
        color: post.category_color,
        icon: post.category_icon
      },
      author: {
        id: post.author_id,
        name: post.author_name,
        avatar_url: post.author_avatar
      }
    })) as BlogPost[];
  }

  // Categories
  static async getAllCategories(): Promise<Category[]> {
    const query = `
      SELECT c.*, COUNT(bp.id) as post_count
      FROM categories c
      LEFT JOIN blog_posts bp ON c.id = bp.category_id AND bp.status = 'published'
      GROUP BY c.id
      ORDER BY c.name
    `;

    const result = await sql`
      SELECT * FROM categories
      ORDER BY c.name
    `;
    return result as Category[];
  }

  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    const result = await sql`SELECT * FROM categories WHERE slug = ${slug}`;
    return result[0] as Category || null;
  }

  // Tags
  static async getAllTags(): Promise<Tag[]> {
    const query = `
      SELECT t.*, COUNT(bpt.post_id) as post_count
      FROM tags t
      LEFT JOIN blog_post_tags bpt ON t.id = bpt.tag_id
      LEFT JOIN blog_posts bp ON bpt.post_id = bp.id AND bp.status = 'published'
      GROUP BY t.id
      HAVING COUNT(bpt.post_id) > 0
      ORDER BY post_count DESC, t.name
    `;

    const result = await sql`
      SELECT t.*, COUNT(bpt.post_id) as post_count
      FROM tags t
      LEFT JOIN blog_post_tags bpt ON t.id = bpt.tag_id
      LEFT JOIN blog_posts bp ON bpt.post_id = bp.id AND bp.status = 'published'
      GROUP BY t.id
      HAVING COUNT(bpt.post_id) > 0
      ORDER BY post_count DESC, t.name
    `;
    return result as Tag[];
  }

  // Comments
  static async getCommentsByPostId(postId: string): Promise<Comment[]> {
    const query = `
      SELECT * FROM comments
      WHERE post_id = ${postId} AND status = 'approved'
      ORDER BY created_at ASC
    `;

    const result = await sql`
      SELECT * FROM comments
      WHERE post_id = ${postId} AND status = 'approved'
      ORDER BY created_at ASC
    `;
    return result as Comment[];
  }

  static async createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>): Promise<Comment> {
    const result = await sql`
      INSERT INTO comments (post_id, author_name, author_email, content, status)
      VALUES (${comment.post_id}, ${comment.author_name}, ${comment.author_email}, ${comment.content}, ${comment.status})
      RETURNING *
    `;

    return result[0] as Comment;
  }

  // Newsletter
  static async subscribeToNewsletter(email: string): Promise<NewsletterSubscription> {
    const query = `
      INSERT INTO newsletter_subscriptions (email, status, subscribed_at)
      VALUES ($1, 'active', NOW())
      ON CONFLICT (email)
      DO UPDATE SET status = 'active', subscribed_at = NOW()
      RETURNING *
    `;

    const result = await sql`
      INSERT INTO newsletter_subscriptions (email, status)
      VALUES (${email}, 'active')
      ON CONFLICT (email)
      DO UPDATE SET status = 'active', subscribed_at = NOW()
      RETURNING *
    `;
    return result[0] as NewsletterSubscription;
  }

  // Contact
  static async createContactSubmission(submission: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<ContactSubmission> {
    const result = await sql`
      INSERT INTO contact_submissions (name, email, subject, message, status)
      VALUES (${submission.name}, ${submission.email}, ${submission.subject}, ${submission.message}, 'new')
      RETURNING *
    `;

    return result[0] as ContactSubmission;
  }

  // Search
  static async searchPosts(query: string, limit: number = 10): Promise<BlogPost[]> {
    const searchQuery = `
      SELECT
        bp.*,
        u.name as author_name,
        u.avatar_url as author_avatar,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        c.icon as category_icon,
        ts_rank(to_tsvector('english', bp.title || ' ' || bp.excerpt || ' ' || bp.content), plainto_tsquery('english', ${query})) as rank
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
      WHERE bp.status = 'published'
        AND to_tsvector('english', bp.title || ' ' || bp.excerpt || ' ' || bp.content) @@ plainto_tsquery('english', ${query})
      ORDER BY rank DESC, bp.published_at DESC
      LIMIT ${limit}
    `;

    const result = await sql`
      SELECT
        bp.*,
        u.name as author_name,
        u.email as author_email,
        u.avatar_url as author_avatar,
        u.bio as author_bio,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        c.icon as category_icon,
        ts_rank(to_tsvector('english', bp.title || ' ' || bp.excerpt || ' ' || bp.content), plainto_tsquery('english', ${query})) as rank
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
      WHERE bp.status = 'published'
        AND to_tsvector('english', bp.title || ' ' || bp.excerpt || ' ' || bp.content) @@ plainto_tsquery('english', ${query})
      ORDER BY rank DESC, bp.published_at DESC
      LIMIT ${limit}
    `;

    return result.map(post => ({
      ...post,
      category: {
        id: post.category_id,
        name: post.category_name,
        slug: post.category_slug,
        color: post.category_color,
        icon: post.category_icon
      },
      author: {
        id: post.author_id,
        name: post.author_name,
        avatar_url: post.author_avatar
      }
    })) as BlogPost[];
  }
}

export { sql };