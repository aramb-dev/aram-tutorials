import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/Button';
import { MOCK_BLOG_POSTS } from '@/lib/constants';

export function RecentPosts() {
  // Get recent posts (all posts for demo, sorted by date)
  const recentPosts = [...MOCK_BLOG_POSTS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-accent-green/10 text-accent-green rounded-full px-4 py-2 mb-4">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Latest Content</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Recent Tutorials
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay up-to-date with our latest tutorials and programming insights.
        </p>
      </div>
      
      {/* Recent Posts Grid */}
      {recentPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard 
                key={post.id}
                post={post}
                variant="default"
                showExcerpt
                showCategory
                showAuthor
                showReadingTime
                showViews
              />
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/tutorials">
                <ArrowRight className="mr-2 h-4 w-4" />
                View All Tutorials
              </Link>
            </Button>
          </div>
        </>
      ) : (
        /* Fallback when no posts */
        <div className="text-center py-12">
          <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
            <p className="text-muted-foreground mb-4">
              New tutorials will appear here once they're published.
            </p>
            <Button asChild variant="outline">
              <Link href="/about">
                Learn About Aram
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}