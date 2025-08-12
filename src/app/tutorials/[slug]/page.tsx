import { BlogPostComments } from '@/components/blog/BlogPostComments';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { BlogPostSidebar } from '@/components/blog/BlogPostSidebar';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
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

// Generate metadata for the blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await Database.getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Aram Tutorials',
      description: 'The requested tutorial could not be found.',
    };
  }

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
            post.featured_image || 'https://tutorials.aramb.dev/og-default.jpg',
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
  const post = await Database.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts from the same category
  const relatedPosts = post.category
    ? await Database.getRelatedPosts(post.id, post.category_id, 3)
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Blog Post Header */}
      <BlogPostHeader post={post} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="space-y-8">
              {/* Post Content */}
              <Suspense
                fallback={
                  <LoadingSpinner size="lg" text="Loading content..." />
                }
              >
                <BlogPostContent post={post} />
              </Suspense>

              {/* Comments Section */}
              <Suspense
                fallback={
                  <LoadingSpinner size="md" text="Loading comments..." />
                }
              >
                <BlogPostComments postId={post.id} />
              </Suspense>
            </article>
          </div>

          {/* Sidebar */}
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

        {/* Related Posts */}
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
