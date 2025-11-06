import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { CategoryWithCount } from '@/lib/categories';
import { getAllPosts } from '@/lib/mdx';
import { transformPostToBlogPost } from '@/lib/transformers';
import type { BlogPost } from '@/types';
import {
  ArrowRight,
  BookOpen,
  Clock,
  Eye,
  Star,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

interface RelatedPostsProps {
  currentPostId: string;
  category?: string;
  tags?: string[];
  categories?: CategoryWithCount[];
}

export async function RelatedPosts({
  currentPostId,
  category,
  tags,
  categories = [],
}: RelatedPostsProps) {
  // Fetch all posts from MDX
  const allMdxPosts = await getAllPosts();
  const allPosts = allMdxPosts.map(transformPostToBlogPost);

  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.id !== currentPostId);

  // Build related posts list: prioritize category matches, then tag matches
  let related: BlogPost[] = [];

  // First, add posts with the same category
  if (category) {
    const categoryMatches = otherPosts.filter(
      post => post.category?.name === category
    );
    related.push(...categoryMatches);
  }

  // Then, add posts that share tags (if not already included)
  if (tags && tags.length > 0) {
    const tagMatches = otherPosts.filter(post => {
      // Skip if already in related
      if (related.some(r => r.id === post.id)) return false;
      // Check if post has any matching tags
      return post.tags?.some(tag => tags.includes(tag.name));
    });
    related.push(...tagMatches);
  }

  // If still not enough posts, add remaining posts sorted by date
  if (related.length < 5) {
    const remaining = otherPosts
      .filter(post => !related.some(r => r.id === post.id))
      .sort((a, b) => {
        const dateA = a.published_at || a.created_at || new Date(0);
        const dateB = b.published_at || b.created_at || new Date(0);
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
    related.push(...remaining.slice(0, 5 - related.length));
  }

  // Limit to maximum 5 posts
  related = related.slice(0, 5);

  // Get trending posts (sorted by views, top 3)
  const trendingPosts = [...otherPosts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3)
    .map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      readTime: post.reading_time || 5,
      views: post.views || 0,
    }));

  const categoriesToDisplay: CategoryWithCount[] = categories.slice(0, 6);
  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .map(part => part[0]?.toUpperCase())
      .slice(0, 2)
      .join('');

  // Calculate total subscribers (mock for now, but could be from database)
  const totalSubscribers = 1000;

  return (
    <div className="space-y-8">
      {/* Related Posts Section */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Related Tutorials
            </h2>
            <Link href="/tutorials">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.slice(0, 3).map(post => (
              <BlogCard
                key={post.id}
                post={post}
                variant="compact"
                showTags={true}
                showViews={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Trending Posts Sidebar */}
      {trendingPosts.length > 0 && (
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/tutorials/${post.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start gap-4 p-3 rounded-lg border border-transparent group-hover:border-border group-hover:bg-muted/30 transition-all">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h4>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <Link href="/tutorials?sort=popular">
                  <Button variant="outline" size="sm" className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View All Trending
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Popular Categories */}
      {categoriesToDisplay.length > 0 && (
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {categoriesToDisplay.map((category: CategoryWithCount) => {
                  const initials =
                    getInitials(category.name) || category.name[0];
                  const baseColor = category.color || '#3B82F6';
                  const backgroundHex = `${baseColor.replace('#', '')}1A`;

                  return (
                    <Link
                      key={category.slug}
                      href={`/tutorials?category=${encodeURIComponent(category.slug)}`}
                      className="group"
                    >
                      <div className="p-3 rounded-lg border border-transparent group-hover:border-border group-hover:bg-muted/30 transition-all text-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
                          style={{
                            backgroundColor: `#${backgroundHex}`,
                            color: baseColor,
                          }}
                        >
                          <span className="text-sm font-bold">{initials}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {category.count}{' '}
                          {category.count === 1 ? 'tutorial' : 'tutorials'}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t">
                <Link href="/tutorials">
                  <Button variant="outline" size="sm" className="w-full">
                    Browse All Categories
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Newsletter Signup */}
      <section>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5" />
              Stay Updated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified when we publish new tutorials and coding tips. No
              spam, just quality content!
            </p>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button className="w-full" size="sm">
                Subscribe to Newsletter
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-3 text-center">
              Join {totalSubscribers.toLocaleString()}+ developers who trust
              Aram Tutorials
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}