'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  User,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  Check,
  ChevronRight,
  Star,
  Award,
  Coffee,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/types';

interface BlogPostSidebarProps {
  post: BlogPost;
}

export function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShare = async (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title;
    const text = post.excerpt;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL:', err);
        }
        break;
    }
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'getting-started', title: 'Getting Started', level: 1 },
    { id: 'implementation', title: 'Implementation', level: 1 },
    { id: 'best-practices', title: 'Best Practices', level: 1 },
    { id: 'conclusion', title: 'Conclusion', level: 1 },
  ];

  const relatedPosts = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      slug: 'advanced-react-patterns',
      readTime: 8,
    },
    {
      id: '2',
      title: 'TypeScript Best Practices',
      slug: 'typescript-best-practices',
      readTime: 6,
    },
    {
      id: '3',
      title: 'Next.js Performance Tips',
      slug: 'nextjs-performance-tips',
      readTime: 10,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Author Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About the Author</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20software%20developer%2C%20friendly%20smile%2C%20modern%20tech%20background%2C%20high%20quality%20portrait&image_size=square"
                alt="Aram Tutorials Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground mb-1">
                Aram Tutorials Team
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                A team of developers passionate about making tech accessible
                through clear, practical tutorials.
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  <span>50+ Tutorials</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <Link href="/about">
              <Button variant="outline" size="sm" className="w-full">
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Post Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant={isLiked ? 'default' : 'outline'}
              size="sm"
              className="w-full justify-start"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`}
              />
              {isLiked ? 'Liked' : 'Like this post'}
            </Button>

            <Button
              variant={isBookmarked ? 'default' : 'outline'}
              size="sm"
              className="w-full justify-start"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark
                className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`}
              />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Share */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share this post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="justify-start"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="justify-start"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="justify-start"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('copy')}
              className="justify-start"
            >
              {copied ? (
                <Check className="h-4 w-4 mr-2 text-green-600" />
              ) : (
                <LinkIcon className="h-4 w-4 mr-2" />
              )}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table of Contents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Table of Contents</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="space-y-2">
            {tableOfContents.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1 group"
              >
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="group-hover:translate-x-1 transition-transform">
                  {item.title}
                </span>
              </a>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Post Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Post Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>Views</span>
              </div>
              <span className="font-medium">
                {post.views?.toLocaleString() || '1,234'}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span>Likes</span>
              </div>
              <span className="font-medium">89</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bookmark className="h-4 w-4" />
                <span>Bookmarks</span>
              </div>
              <span className="font-medium">23</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Read Time</span>
              </div>
              <span className="font-medium">{post.reading_time} min</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Published</span>
              </div>
              <span className="font-medium">
                {new Date(
                  (
                    post.published_at ||
                    post.created_at ||
                    (post as any).publishedAt ||
                    (post as any).updatedAt ||
                    new Date()
                  ).toString()
                ).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Related Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relatedPosts.map(relatedPost => (
              <Link
                key={relatedPost.id}
                href={`/tutorials/${relatedPost.slug}`}
                className="block group"
              >
                <div className="p-3 rounded-lg border border-transparent group-hover:border-border group-hover:bg-muted/30 transition-all">
                  <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                    {relatedPost.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{relatedPost.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <Link href="/tutorials">
              <Button variant="outline" size="sm" className="w-full">
                View All Tutorials
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            Support My Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If you found this tutorial helpful, consider supporting my work to
            help me create more quality content.
          </p>
          <Button className="w-full" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Buy me a coffee
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
