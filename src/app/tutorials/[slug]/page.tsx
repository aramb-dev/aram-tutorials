import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { BlogPostSidebar } from '@/components/blog/BlogPostSidebar';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getCategoriesWithCounts } from '@/lib/categories';
import { SEO_DEFAULTS, SITE_CONFIG } from '@/lib/constants';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { transformPostToBlogPost } from '@/lib/transformers';
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
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Aram Tutorials',
      description: 'The requested tutorial could not be found.',
    };
  }

  const description = post.description || post.excerpt || '';
  const imagePath = post.featured_image || SEO_DEFAULTS.DEFAULT_IMAGE;
  const imageUrl = imagePath.startsWith('http')
    ? imagePath
    : new URL(imagePath, SITE_CONFIG.url).toString();
  const canonicalUrl = new URL(`/tutorials/${post.slug}`, SITE_CONFIG.url).toString();
  const publishedTime = post.publishedAt || post.date;
  const publishedTimeIso = publishedTime
    ? new Date(publishedTime).toISOString()
    : undefined;

  return {
    title: `${post.title} | Aram Tutorials`,
    description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: publishedTimeIso,
      modifiedTime: publishedTimeIso,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
      creator: SEO_DEFAULTS.TWITTER_CREATOR,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Transform the post to BlogPost format for the sidebar
  const blogPost = transformPostToBlogPost(post);

  // Extract table of contents from the MDX content (only h1 and h2)
  const generateTableOfContents = (content: string) => {
    const headings = [];

    // Match markdown headers (# and ##)
    const markdownRegex = /^(#{1,2})\s+(.+)$/gm;
    let match;

    while ((match = markdownRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();

      // Skip if it's not h1 or h2
      if (level > 2) continue;

      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      headings.push({ id, title, level });
    }

    // Reset regex for JSX headers
    const jsxRegex = /<h([12])[^>]*>([^<]+)<\/h[12]>/g;

    while ((match = jsxRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const title = match[2].trim();

      // Skip if it's not h1 or h2 (extra safety check)
      if (level > 2) continue;

      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      headings.push({ id, title, level });
    }

    return headings;
  };

  const tableOfContents = generateTableOfContents(post.content);

  // Get related posts (same category, excluding current post)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const categoriesWithPosts = getCategoriesWithCounts(allPosts);

  return (
    <div className="min-h-screen bg-background">
      {/* Blog Post Header */}
      <BlogPostHeader post={blogPost} />

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
                <BlogPostContent post={blogPost} />
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
                <BlogPostSidebar
                  post={blogPost}
                  tableOfContents={tableOfContents}
                />
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
                currentPostId={blogPost.id}
                category={blogPost.category?.name}
                tags={blogPost.tags?.map((tag: any) => tag.name)}
                categories={categoriesWithPosts}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
