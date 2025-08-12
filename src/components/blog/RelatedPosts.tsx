'use client';

import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
}

export function RelatedPosts({
  currentPostId,
  category,
  tags,
}: RelatedPostsProps) {
  // Mock related posts data - in a real app, this would come from an API
  const relatedPosts: BlogPost[] = [
    {
      id: '2',
      title: 'Advanced React Patterns: Compound Components and Render Props',
      slug: 'advanced-react-patterns',
      excerpt:
        "Learn advanced React patterns that will make your components more flexible and reusable. We'll explore compound components, render props, and custom hooks.",
      content: 'Detailed content about advanced React patterns...',
      featured_image:
        'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20React%20development%20setup%20with%20code%20editor%20showing%20advanced%20patterns%2C%20clean%20workspace%2C%20professional%20tech%20illustration&image_size=landscape_16_9',
      author_id: '1',
      category_id: '1',
      status: 'published' as const,
      is_featured: false,
      reading_time: 12,
      views: 2847,
      published_at: new Date('2024-01-10T00:00:00Z'),
      created_at: new Date('2024-01-10T00:00:00Z'),
      updated_at: new Date('2024-01-10T00:00:00Z'),
      author: {
        id: '1',
        name: 'Aram Tutorials Team',
        email: 'aramtutorials@gmail.com',
        avatar_url:
          'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20software%20developer%2C%20friendly%20smile%2C%20modern%20tech%20background&image_size=square',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      },
      category: {
        id: '1',
        name: 'React',
        slug: 'react',
        color: '#4A7C59',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      },
      tags: [
        {
          id: '1',
          name: 'React',
          slug: 'react',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
        },
        {
          id: '2',
          name: 'JavaScript',
          slug: 'javascript',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
        },
        {
          id: '5',
          name: 'Advanced',
          slug: 'advanced',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
        },
      ],
    },
    {
      id: '3',
      title: 'TypeScript Best Practices for React Applications',
      slug: 'typescript-best-practices-react',
      excerpt:
        "Discover the best practices for using TypeScript in React applications. From type definitions to advanced patterns, we'll cover everything you need to know.",
      content: 'Comprehensive guide to TypeScript best practices...',
      featured_image:
        'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=TypeScript%20code%20editor%20with%20React%20components%2C%20type%20definitions%2C%20modern%20development%20environment%2C%20clean%20professional%20setup&image_size=landscape_16_9',
      author_id: '1',
      category_id: '2',
      status: 'published' as const,
      is_featured: false,
      reading_time: 10,
      views: 1923,
      published_at: new Date('2024-01-08T00:00:00Z'),
      created_at: new Date('2024-01-08T00:00:00Z'),
      updated_at: new Date('2024-01-08T00:00:00Z'),
      author: {
        id: '1',
        name: 'Aram Tutorials Team',
        email: 'aramtutorials@gmail.com',
        avatar_url:
          'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20software%20developer%2C%20friendly%20smile%2C%20modern%20tech%20background&image_size=square',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      },
      category: {
        id: '2',
        name: 'TypeScript',
        slug: 'typescript',
        color: '#3178C6',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      },
      tags: [
        {
          id: '3',
          name: 'TypeScript',
          slug: 'typescript',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
        },
        {
          id: '1',
          name: 'React',
          slug: 'react',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
        },
        {
          id: '4',
          name: 'Best Practices',
          slug: 'best-practices',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
        },
      ],
    },
    {
      id: '4',
      title: 'Next.js Performance Optimization: A Complete Guide',
      slug: 'nextjs-performance-optimization',
      excerpt:
        "Learn how to optimize your Next.js applications for maximum performance. We'll cover image optimization, code splitting, caching strategies, and more.",
      content: 'Complete guide to Next.js performance optimization...',
      featured_image:
        'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Next.js%20development%20dashboard%20showing%20performance%20metrics%2C%20optimization%20tools%2C%20modern%20web%20development%20setup&image_size=landscape_16_9',
      author_id: '1',
      category_id: '3',
      status: 'published' as const,
      is_featured: true,
      reading_time: 15,
      views: 3456,
      published_at: new Date('2024-01-05T00:00:00Z'),
      created_at: new Date('2024-01-05T00:00:00Z'),
      updated_at: new Date('2024-01-05T00:00:00Z'),
      author: {
        id: '1',
        name: 'Aram Tutorials Team',
        email: 'aramtutorials@gmail.com',
        avatar_url:
          'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20software%20developer%2C%20friendly%20smile%2C%20modern%20tech%20background&image_size=square',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      },
      category: {
        id: '3',
        name: 'Next.js',
        slug: 'nextjs',
        color: '#000000',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      },
      tags: [
        {
          id: '6',
          name: 'Next.js',
          slug: 'nextjs',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
        },
        {
          id: '7',
          name: 'Performance',
          slug: 'performance',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
        },
        {
          id: '8',
          name: 'Optimization',
          slug: 'optimization',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
        },
      ],
    },
  ];

  // Filter out the current post
  const filteredPosts = relatedPosts.filter(post => post.id !== currentPostId);

  // Get trending posts (mock data)
  const trendingPosts = [
    {
      id: '5',
      title: 'Building a Full-Stack App with Next.js and Supabase',
      slug: 'fullstack-nextjs-supabase',
      readTime: 18,
      views: 5234,
    },
    {
      id: '6',
      title: 'Modern CSS Techniques for React Developers',
      slug: 'modern-css-react',
      readTime: 8,
      views: 2891,
    },
    {
      id: '7',
      title: 'State Management in React: Redux vs Zustand',
      slug: 'react-state-management',
      readTime: 12,
      views: 4567,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Related Posts Section */}
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
          {filteredPosts.slice(0, 3).map(post => (
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

      {/* Trending Posts Sidebar */}
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

      {/* Popular Categories */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/tutorials?category=react" className="group">
                <div className="p-3 rounded-lg border border-transparent group-hover:border-border group-hover:bg-muted/30 transition-all text-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
                      R
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    React
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    25 tutorials
                  </p>
                </div>
              </Link>

              <Link href="/tutorials?category=typescript" className="group">
                <div className="p-3 rounded-lg border border-transparent group-hover:border-border group-hover:bg-muted/30 transition-all text-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
                      TS
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    TypeScript
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    18 tutorials
                  </p>
                </div>
              </Link>

              <Link href="/tutorials?category=nextjs" className="group">
                <div className="p-3 rounded-lg border border-transparent group-hover:border-border group-hover:bg-muted/30 transition-all text-center">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-bold">
                      N
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Next.js
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    15 tutorials
                  </p>
                </div>
              </Link>

              <Link href="/tutorials?category=css" className="group">
                <div className="p-3 rounded-lg border border-transparent group-hover:border-border group-hover:bg-muted/30 transition-all text-center">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">
                      CSS
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    CSS
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    12 tutorials
                  </p>
                </div>
              </Link>
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
              Get notified when I publish new tutorials and coding tips. No
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
              Join 1,000+ developers who trust Aram Tutorials
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
