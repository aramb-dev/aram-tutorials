import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Database } from '@/lib/db';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
  SortAsc,
  SortDesc,
} from 'lucide-react';
import Link from 'next/link';

interface TutorialsListProps {
  category?: string;
  tag?: string;
  search?: string;
  sort?: string;
  page?: number;
}

const POSTS_PER_PAGE = 9;

export async function TutorialsList({
  category,
  tag,
  search,
  sort = 'newest',
  page = 1,
}: TutorialsListProps) {
  // Fetch posts from database with filters
  const result = await Database.getAllPosts({
    page,
    limit: POSTS_PER_PAGE,
    categorySlug: category,
    search,
  });

  const { data: currentPosts, pagination } = result;
  const { total: totalPosts, totalPages } = pagination;

  // Sort options for display
  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: SortDesc },
    { value: 'oldest', label: 'Oldest First', icon: SortAsc },
    { value: 'popular', label: 'Most Popular', icon: SortDesc },
    { value: 'alphabetical', label: 'A-Z', icon: SortAsc },
  ];

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {search ? `Search Results for "${search}"` : 'All Tutorials'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {totalPosts === 0
              ? 'No tutorials found'
              : totalPosts === 1
                ? '1 tutorial found'
                : `${totalPosts} tutorials found`}
            {(category || tag) && (
              <span>
                {category && ` in ${category}`}
                {tag && ` tagged with ${tag}`}
              </span>
            )}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex gap-1">
            {sortOptions.map(option => {
              const IconComponent = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={sort === option.value ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                >
                  <Link href={`?sort=${option.value}&page=1`}>
                    <IconComponent className="h-3 w-3 mr-1" />
                    {option.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      {currentPosts.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No tutorials found
            </h3>
            <p className="text-muted-foreground mb-4">
              {search
                ? `We couldn't find any tutorials matching "${search}". Try adjusting your search terms or filters.`
                : 'No tutorials match your current filters. Try adjusting your selection.'}
            </p>
            <Button variant="outline" asChild>
              <Link href="/tutorials">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Tutorials
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Tutorials Grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {currentPosts.map(post => (
              <BlogCard
                key={post.id}
                post={post}
                variant="default"
                showTags={true}
                showViews={true}
                showExcerpt={true}
                showCategory={true}
                showReadingTime={true}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                asChild={page > 1}
              >
                {page > 1 ? (
                  <Link href={`?page=${page - 1}`}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Link>
                ) : (
                  <span>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </span>
                )}
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  pageNum => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= page - 1 && pageNum <= page + 1);

                    if (!showPage) {
                      // Show ellipsis
                      if (pageNum === page - 2 || pageNum === page + 2) {
                        return (
                          <span
                            key={pageNum}
                            className="px-2 text-muted-foreground"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? 'default' : 'outline'}
                        size="sm"
                        className="w-8 h-8 p-0"
                        asChild
                      >
                        <Link href={`?page=${pageNum}`}>{pageNum}</Link>
                      </Button>
                    );
                  }
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                asChild={page < totalPages}
              >
                {page < totalPages ? (
                  <Link href={`?page=${page + 1}`}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                ) : (
                  <span>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {(page - 1) * POSTS_PER_PAGE + 1}-
            {Math.min(page * POSTS_PER_PAGE, totalPosts)} of {totalPosts}{' '}
            tutorials
          </div>
        </>
      )}
    </div>
  );
}
