import { TutorialsFilters } from '@/components/tutorials/TutorialsFilters';
import { TutorialsHeader } from '@/components/tutorials/TutorialsHeader';
import { TutorialsList } from '@/components/tutorials/TutorialsList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { CATEGORIES_CONFIG, CategoryWithCount } from '@/lib/categories';
import { getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Tutorials | Aram Tutorials - Tech Made Simple',
  description:
    'Browse our comprehensive collection of programming tutorials, web development guides, and tech tips. Learn React, Next.js, Node.js, and more with step-by-step tutorials.',
  keywords: [
    'programming tutorials',
    'web development',
    'React tutorials',
    'Next.js guides',
    'JavaScript tutorials',
    'Node.js tutorials',
    'coding tutorials',
    'tech tutorials',
  ],
  openGraph: {
    title: 'Tutorials | Aram Tutorials - Tech Made Simple',
    description:
      'Browse our comprehensive collection of programming tutorials and web development guides.',
    type: 'website',
    url: 'https://tutorials.aramb.dev/tutorials',
    images: [
      {
        url: 'https://tutorials.aramb.dev/og-tutorials.jpg',
        width: 1200,
        height: 630,
        alt: 'Aram Tutorials - Programming Tutorials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutorials | Aram Tutorials - Tech Made Simple',
    description:
      'Browse our comprehensive collection of programming tutorials and web development guides.',
    images: ['https://tutorials.aramb.dev/og-tutorials.jpg'],
  },
};

interface TutorialsPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function TutorialsPage({
  searchParams,
}: TutorialsPageProps) {
  const {
    category,
    tag,
    search,
    sort = 'newest',
    page = '1',
  } = await searchParams;

  // Fetch categories server-side to avoid fs module in client
  const posts = getAllPosts();
  const categoryCounts = new Map<string, number>();

  // Count posts per category
  posts.forEach(post => {
    const categorySlug = post.category;
    categoryCounts.set(categorySlug, (categoryCounts.get(categorySlug) || 0) + 1);
  });

  // Create categories with counts, only including those with posts
  const categoriesWithPosts: CategoryWithCount[] = CATEGORIES_CONFIG
    .filter(category => categoryCounts.has(category.slug))
    .map(category => ({
      ...category,
      count: categoryCounts.get(category.slug) || 0,
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical sort

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <TutorialsHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Suspense
                fallback={
                  <LoadingSpinner size="sm" text="Loading filters..." />
                }
              >
                <TutorialsFilters
                  selectedCategory={category}
                  selectedTag={tag}
                  searchQuery={search}
                  categoriesWithPosts={categoriesWithPosts}
                />
              </Suspense>
            </div>
          </div>

          {/* Tutorials List */}
          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <LoadingSpinner size="lg" text="Loading tutorials..." />
              }
            >
              <TutorialsList
                category={category}
                tag={tag}
                search={search}
                sort={sort}
                page={parseInt(page)}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
