'use client';

import { useState, useMemo } from 'react';
import { 
  Grid, 
  List, 
  SortAsc, 
  SortDesc, 
  ChevronLeft, 
  ChevronRight,
  Search,
  BookOpen
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogCard } from '@/components/blog/BlogCard';
import { MOCK_BLOG_POSTS } from '@/lib/constants';
import { useRouter, useSearchParams } from 'next/navigation';

interface TutorialsListProps {
  category?: string;
  tag?: string;
  search?: string;
  sort?: string;
  page?: number;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'popular' | 'alphabetical';

const POSTS_PER_PAGE = 9;

export function TutorialsList({ 
  category, 
  tag, 
  search, 
  sort = 'newest', 
  page = 1 
}: TutorialsListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...MOCK_BLOG_POSTS];

    // Apply category filter
    if (category) {
      filtered = filtered.filter(post => 
        post.category.slug === category
      );
    }

    // Apply tag filter
    if (tag) {
      filtered = filtered.filter(post => 
        post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
      );
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    switch (sort) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
    }

    return filtered;
  }, [category, tag, search, sort]);

  // Pagination
  const totalPosts = filteredAndSortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredAndSortedPosts.slice(startIndex, endIndex);

  const updateSort = (newSort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.delete('page'); // Reset to first page
    router.push(`/tutorials?${params.toString()}`);
  };

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/tutorials?${params.toString()}`);
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: SortDesc },
    { value: 'oldest', label: 'Oldest First', icon: SortAsc },
    { value: 'popular', label: 'Most Popular', icon: SortDesc },
    { value: 'alphabetical', label: 'A-Z', icon: SortAsc }
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
            {totalPosts === 0 ? 'No tutorials found' : 
             totalPosts === 1 ? '1 tutorial found' : 
             `${totalPosts} tutorials found`}
            {(category || tag) && (
              <span>
                {category && ` in ${category}`}
                {tag && ` tagged with ${tag}`}
              </span>
            )}
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-1">
              {sortOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Button
                    key={option.value}
                    variant={sort === option.value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => updateSort(option.value as SortOption)}
                    className="text-xs"
                  >
                    <IconComponent className="h-3 w-3 mr-1" />
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
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
              {search ? 
                `We couldn't find any tutorials matching "${search}". Try adjusting your search terms or filters.` :
                'No tutorials match your current filters. Try adjusting your selection.'
              }
            </p>
            <Button 
              variant="outline" 
              onClick={() => router.push('/tutorials')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Browse All Tutorials
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Tutorials Grid/List */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {currentPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                variant={viewMode === 'list' ? 'compact' : 'default'}
                showTags={true}
                showViews={true}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    (pageNum >= page - 1 && pageNum <= page + 1);
                  
                  if (!showPage) {
                    // Show ellipsis
                    if (pageNum === page - 2 || pageNum === page + 2) {
                      return (
                        <span key={pageNum} className="px-2 text-muted-foreground">
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
                      onClick={() => updatePage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(page + 1)}
                disabled={page >= totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, totalPosts)} of {totalPosts} tutorials
          </div>
        </>
      )}
    </div>
  );
}