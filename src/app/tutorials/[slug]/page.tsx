import { BlogPostComments } from '@/components/blog/BlogPostComments';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { BlogPostSidebar } from '@/components/blog/BlogPostSidebar';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { BackButton } from '@/components/ui/BackButton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Database } from '@/lib/db';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Try to get MDX tutorial
async function getMDXTutorial(slug: string) {
  try {
    const tutorial = await import(`@/content/tutorials/${slug}.mdx`);
    return {
      content: tutorial.default,
      metadata: tutorial.metadata || {},
      type: 'mdx' as const,
    };
  } catch {
    return null;
  }
}

// Get tutorial from either database or MDX
async function getTutorial(slug: string) {
  // First, try database
  const dbPost = await Database.getPostBySlug(slug);
  if (dbPost) {
    // Check if this post contains MDX content (has JSX components)
    const hasMDXContent =
      dbPost.content.includes('<') && dbPost.content.includes('/>');

    if (hasMDXContent) {
      // Try to get the original MDX file
      const mdxTutorial = await getMDXTutorial(slug);
      if (mdxTutorial) {
        return {
          ...mdxTutorial,
          dbPost, // Include DB post for metadata like views, comments, etc.
          type: 'mdx' as const,
        };
      }
    }

    return {
      content: dbPost,
      type: 'database' as const,
    };
  }

  // Fallback to pure MDX
  const mdxTutorial = await getMDXTutorial(slug);
  if (mdxTutorial) {
    return mdxTutorial;
  }

  return null;
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for the blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = await getTutorial(slug);

  if (!tutorial) {
    return {
      title: 'Post Not Found | Aram Tutorials',
      description: 'The requested tutorial could not be found.',
    };
  }

  if (tutorial.type === 'database') {
    const post = tutorial.content;
    return {
      title: `${post.title} | Aram Tutorials`,
      description: post.excerpt,
      keywords: post.tags?.map(tag => tag.name) || [],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        url: `https://tutorials.aramb.dev/tutorials/${post.slug}`,
        images: [
          {
            url:
              post.featured_image ||
              'https://tutorials.aramb.dev/og-default.jpg',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        publishedTime: post.published_at?.toISOString(),
        modifiedTime: post.updated_at.toISOString(),
        tags: post.tags?.map(tag => tag.name) || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [
          post.featured_image || 'https://tutorials.aramb.dev/og-default.jpg',
        ],
        creator: '@aram_dev',
      },
      alternates: {
        canonical: `https://tutorials.aramb.dev/tutorials/${post.slug}`,
      },
    };
  } else {
    // MDX metadata
    const { metadata } = tutorial;
    const dbPost = 'dbPost' in tutorial ? tutorial.dbPost : null;
    const title = metadata.title || dbPost?.title || 'Tutorial';
    const description = metadata.description || dbPost?.excerpt || '';

    return {
      title: `${title} | Aram Tutorials`,
      description: description,
      keywords: metadata.tags || [],
      openGraph: {
        title: title,
        description: description,
        type: 'article',
        publishedTime:
          metadata.publishedAt || dbPost?.published_at?.toISOString(),
        tags: metadata.tags || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
      },
    };
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await Database.getAllPosts({ limit: 100 });
  return posts.data.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const tutorial = await getTutorial(slug);

  if (!tutorial) {
    notFound();
  }

  // Render database post (original behavior)
  if (tutorial.type === 'database') {
    const post = tutorial.content;
    const relatedPosts = post.category
      ? await Database.getRelatedPosts(post.id, post.category_id, 3)
      : [];

    return (
      <div className="min-h-screen bg-background">
        <BlogPostHeader post={post} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <article className="space-y-8">
                <Suspense
                  fallback={
                    <LoadingSpinner size="lg" text="Loading content..." />
                  }
                >
                  <BlogPostContent post={post} />
                </Suspense>
                <Suspense
                  fallback={
                    <LoadingSpinner size="md" text="Loading comments..." />
                  }
                >
                  <BlogPostComments postId={post.id} />
                </Suspense>
              </article>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Suspense
                  fallback={
                    <LoadingSpinner size="sm" text="Loading sidebar..." />
                  }
                >
                  <BlogPostSidebar post={post} />
                </Suspense>
              </div>
            </div>
          </div>
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <Suspense
                fallback={
                  <LoadingSpinner size="md" text="Loading related posts..." />
                }
              >
                <RelatedPosts
                  currentPostId={post.id}
                  category={post.category?.name}
                  tags={post.tags?.map(tag => tag.name)}
                />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render MDX post (new behavior for MDX content)
  const { content: MDXContent, metadata } = tutorial;
  const dbPost = 'dbPost' in tutorial ? tutorial.dbPost : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <BackButton href="/tutorials" />
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="capitalize">
                {metadata.category || 'tutorial'}
              </span>
              <span>•</span>
              <span>{metadata.readingTime || 5} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8 pb-8 border-b border-gray-200">
          <div className="mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <time dateTime={metadata.publishedAt}>
                {metadata.publishedAt
                  ? new Date(metadata.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Recently published'}
              </time>
              <span>•</span>
              <span>By {metadata.author || 'Aram Baghdasaryan'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {metadata.title || dbPost?.title || 'Tutorial'}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {metadata.description || dbPost?.excerpt || ''}
            </p>
          </div>

          {/* Tags */}
          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* MDX Content */}
        <div className="prose prose-lg prose-gray max-w-none mdx-content">
          <MDXContent />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>
                Written by{' '}
                <span className="font-medium text-gray-900">
                  {metadata.author || 'Aram Baghdasaryan'}
                </span>
              </p>
              <p>
                Published on{' '}
                {metadata.publishedAt
                  ? new Date(metadata.publishedAt).toLocaleDateString()
                  : 'Recently'}
              </p>
            </div>

            <BackButton href="/tutorials" variant="outline">
              ← Back to Tutorials
            </BackButton>
          </div>
        </footer>

        {/* Comments for synced posts */}
        {dbPost && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Suspense
              fallback={<LoadingSpinner size="md" text="Loading comments..." />}
            >
              <BlogPostComments postId={dbPost.id} />
            </Suspense>
          </div>
        )}
      </article>
    </div>
  );
}
