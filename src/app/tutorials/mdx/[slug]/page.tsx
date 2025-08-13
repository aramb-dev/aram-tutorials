import { BackButton } from '@/components/ui/BackButton';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// This will be dynamically imported based on the slug
async function getTutorialComponent(slug: string) {
  try {
    const tutorial = await import(`@/content/tutorials/${slug}.mdx`);
    return tutorial;
  } catch (error) {
    return null;
  }
}

// Extract metadata from MDX file
async function getTutorialMetadata(slug: string) {
  const tutorial = await getTutorialComponent(slug);
  if (!tutorial) return null;

  return {
    title: tutorial.metadata?.title || 'Tutorial',
    description: tutorial.metadata?.description || '',
    publishedAt: tutorial.metadata?.publishedAt || '',
    author: tutorial.metadata?.author || 'Aram Baghdasaryan',
    category: tutorial.metadata?.category || 'tutorial',
    tags: tutorial.metadata?.tags || [],
    featured: tutorial.metadata?.featured || false,
    readingTime: tutorial.metadata?.readingTime || 5,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const metadata = await getTutorialMetadata(params.slug);

  if (!metadata) {
    return {
      title: 'Tutorial Not Found',
      description: 'The requested tutorial could not be found.',
    };
  }

  return {
    title: `${metadata.title} | Aram Tutorials`,
    description: metadata.description,
    authors: [{ name: metadata.author }],
    keywords: metadata.tags,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      publishedTime: metadata.publishedAt,
      authors: [metadata.author],
      tags: metadata.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default async function MDXTutorialPage({
  params,
}: {
  params: { slug: string };
}) {
  const tutorial = await getTutorialComponent(params.slug);
  const metadata = await getTutorialMetadata(params.slug);

  if (!tutorial || !metadata) {
    notFound();
  }

  const TutorialContent = tutorial.default;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <BackButton href="/tutorials" />
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="capitalize">{metadata.category}</span>
              <span>•</span>
              <span>{metadata.readingTime} min read</span>
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
                {new Date(metadata.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>By {metadata.author}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {metadata.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {metadata.description}
            </p>
          </div>

          {/* Tags */}
          {metadata.tags.length > 0 && (
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
          <TutorialContent />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>
                Written by{' '}
                <span className="font-medium text-gray-900">
                  {metadata.author}
                </span>
              </p>
              <p>
                Published on{' '}
                {new Date(metadata.publishedAt).toLocaleDateString()}
              </p>
            </div>

            <BackButton href="/tutorials" variant="outline">
              ← Back to Tutorials
            </BackButton>
          </div>
        </footer>
      </article>
    </div>
  );
}

// Generate static params for all tutorials (optional - for static generation)
export async function generateStaticParams() {
  // In a real app, you might read from a directory or database
  // For now, we'll return the tutorial we just created
  return [{ slug: 'nextjs-typescript-setup' }];
}
