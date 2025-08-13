import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatRelativeTime, getCategoryColor } from '@/lib/utils';
import type { BlogPost } from '@/types';
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Eye,
  Share2,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className="relative z-10 bg-gradient-to-br from-brand-darker via-brand-dark to-brand-darker text-white">
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
            {/* Logistical Metadata - Read time and Views */}
            <div className="flex items-center gap-4 text-sm text-slate-300 mb-6">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time || 5} min read</span>
              </div>

              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{(post.views || 0).toLocaleString()} views</span>
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

            {/* Category and Tags - All topic identifiers grouped together */}
            <div className="mt-8">
              <div className="flex flex-wrap gap-3">
                {/* Main Category Tag */}
                {post.category && (
                  <Link href={`/tutorials?category=${post.category.slug}`}>
                    <Badge
                      className="hover:opacity-80 transition-opacity cursor-pointer text-sm px-3 py-1.5 font-medium"
                      style={{
                        backgroundColor: categoryColor.bg,
                        color: categoryColor.text,
                      }}
                    >
                      📁 {post.category.name}
                    </Badge>
                  </Link>
                )}

                {/* Related Topic Tags */}
                {post.tags &&
                  post.tags.map(tag => (
                    <Link key={tag.id} href={`/tutorials?tag=${tag.slug}`}>
                      <Badge
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/10 transition-colors cursor-pointer text-sm px-3 py-1.5"
                      >
                        #{tag.name}
                      </Badge>
                    </Link>
                  ))}
              </div>

              {/* Tags count indicator */}
              {post.tags && post.tags.length > 0 && (
                <p className="text-xs text-slate-400 mt-2">
                  {post.tags.length} tag{post.tags.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
