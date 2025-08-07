import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostSidebar } from '@/components/blog/BlogPostSidebar';
import { BlogPostComments } from '@/components/blog/BlogPostComments';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MOCK_BLOG_POSTS } from '@/lib/constants';
import type { BlogPost } from '@/types';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find(p => p.slug === slug) as any;

  if (!post) {
    return {
      title: 'Post Not Found | Aram Tutorials',
      description: 'The requested tutorial could not be found.'
    };
  }

  return {
    title: `${post.title} | Aram Tutorials`,
    description: post.excerpt,
    keywords: post.tags.map((tag: any) => tag.name),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://aramtutorials.com/tutorials/${post.slug}`,
      images: [
        {
          url: 'https://aramtutorials.com/og-default.jpg',
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags.map((tag: any) => tag.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['https://aramtutorials.com/og-default.jpg'],
      creator: '@aram_dev'
    },
    alternates: {
      canonical: `https://aramtutorials.com/tutorials/${post.slug}`
    }
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return MOCK_BLOG_POSTS.map((post) => ({
    slug: post.slug
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find(p => p.slug === slug) as any;

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = MOCK_BLOG_POSTS
    .filter(p => p.id !== post.id && p.category.slug === post.category.slug)
    .slice(0, 3);

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
              <Suspense fallback={<LoadingSpinner size="lg" text="Loading content..." />}>
                <BlogPostContent post={post} />
              </Suspense>

              {/* Comments Section */}
              <Suspense fallback={<LoadingSpinner size="md" text="Loading comments..." />}>
                <BlogPostComments postId={post.id} />
              </Suspense>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Suspense fallback={<LoadingSpinner size="sm" text="Loading sidebar..." />}>
                <BlogPostSidebar post={post} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <Suspense fallback={<LoadingSpinner size="md" text="Loading related posts..." />}>
              <RelatedPosts currentPostId={post.id} category={post.category?.name} tags={post.tags?.map((tag: any) => tag.name)} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}