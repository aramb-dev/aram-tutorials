import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { Database } from '@/lib/db';
import { Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export async function FeaturedPosts() {
  // Get featured posts from database
  const featuredPosts = await Database.getFeaturedPosts(3);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary rounded-full px-4 py-2 mb-4">
          <Star className="h-4 w-4" />
          <span className="text-sm font-medium">🔥 Featured Content</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Featured Tutorials
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Hand-picked tutorials covering the most important concepts and popular
          technologies in development.
        </p>
      </div>

      {/* Featured Posts Grid */}
      {featuredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <BlogCard
                key={post.id}
                post={post}
                variant="featured"
                showExcerpt
                showCategory
                showTags
                showAuthor
                showReadingTime
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/tutorials">
                <TrendingUp className="mr-2 h-4 w-4" />
                View All Tutorials
              </Link>
            </Button>
          </div>
        </>
      ) : (
        /* Fallback when no featured posts */
        <div className="text-center py-12">
          <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No Featured Posts Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Featured tutorials will appear here once they're published.
            </p>
            <Button asChild variant="outline">
              <Link href="/tutorials">Browse All Tutorials</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
