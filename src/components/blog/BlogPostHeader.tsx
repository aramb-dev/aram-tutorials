import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Eye,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatRelativeTime, getCategoryColor } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const categoryColor = getCategoryColor(post.category?.name || '');

  return (
    <div className="relative">
      {/* Featured Image Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-brand-light/20" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 text-white">
        <div className="container mx-auto px-4 py-16">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/tutorials">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tutorials
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Category and Reading Time */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {post.category && (
                <Link href={`/tutorials?category=${post.category.slug}`}>
                  <Badge
                    className="hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: categoryColor.bg }}
                  >
                    {post.category.name}
                  </Badge>
                </Link>
              )}

              <div className="flex items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.reading_time} min read</span>
                </div>

                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Author and Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-4">
                {/* Author */}
                {post.author && (
                  <div className="flex items-center gap-3">
                    {post.author.avatar_url ? (
                      <Image
                        src={post.author.avatar_url}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-brand-primary" />
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-white">
                        {post.author.name}
                      </p>
                      <p className="text-sm text-slate-300">
                        {post.author.bio}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Date and Actions */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Published{' '}
                      {formatDate(
                        (
                          post.published_at ||
                          post.created_at ||
                          (post as any).publishedAt ||
                          (post as any).updatedAt ||
                          new Date()
                        ).toString()
                      )}
                    </span>
                  </div>

                  {(post.updated_at || (post as any).updatedAt) !==
                    (post.created_at || (post as any).publishedAt) && (
                    <div className="text-xs">
                      Updated{' '}
                      {formatRelativeTime(
                        (
                          post.updated_at ||
                          (post as any).updatedAt ||
                          new Date()
                        ).toString()
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link key={tag.id} href={`/tutorials?tag=${tag.slug}`}>
                      <Badge
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/10 transition-colors"
                      >
                        #{tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="relative">
          <svg
            className="w-full h-12 text-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
