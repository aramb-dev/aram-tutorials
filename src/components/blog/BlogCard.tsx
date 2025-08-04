'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatRelativeTime, generateBlogPostUrl, getCategoryColor } from '@/lib/utils';
import type { BlogPost } from '@/types';
import { IMAGES } from '@/lib/constants';

export interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showExcerpt?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showAuthor?: boolean;
  showReadingTime?: boolean;
  showViews?: boolean;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  variant = 'default',
  showExcerpt = true,
  showCategory = true,
  showTags = false,
  showAuthor = true,
  showReadingTime = true,
  showViews = false,
  className
}) => {
  const postUrl = generateBlogPostUrl(post.slug);
  const categoryColor = post.category ? getCategoryColor(post.category.name) : undefined;

  if (variant === 'featured') {
    return (
      <Card className={`group overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
        <div className="relative">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary/30 mb-2">AT</div>
                <div className="text-sm text-muted-foreground">Aram Tutorials</div>
              </div>
            </div>
          )}
          {post.is_featured && (
            <Badge className="absolute top-4 left-4" variant="default">
              Featured
            </Badge>
          )}
          {showCategory && post.category && (
            <Badge 
              className="absolute top-4 right-4"
              style={{ backgroundColor: categoryColor }}
            >
              {post.category.name}
            </Badge>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Link href={postUrl} className="group">
                <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h2>
              </Link>
            </div>
            
            {showExcerpt && (
              <p className="text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            )}
            
            {showTags && post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline">
                    +{post.tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-4 border-t bg-muted/30">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              {showAuthor && post.author && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>
              )}
              {showReadingTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.reading_time} min read</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {showViews && (
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatRelativeTime((post.published_at || post.created_at).toString())}</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className={`group hover:shadow-md transition-shadow duration-200 ${className}`}>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            {post.featured_image && (
              <div className="flex-shrink-0">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  width={120}
                  height={80}
                  className="w-20 h-16 object-cover rounded-md"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link href={postUrl} className="group">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  
                  {showExcerpt && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                    {showCategory && post.category && (
                      <Badge style={{ backgroundColor: categoryColor }}>
                        {post.category.name}
                      </Badge>
                    )}
                    {showReadingTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.reading_time}m</span>
                      </div>
                    )}
                    <span>{formatRelativeTime(post.published_at || post.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="relative">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            width={400}
            height={240}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary/30 mb-1">AT</div>
              <div className="text-xs text-muted-foreground">Aram Tutorials</div>
            </div>
          </div>
        )}
        {post.is_featured && (
          <Badge className="absolute top-3 left-3" variant="default" size="sm">
            Featured
          </Badge>
        )}
        {showCategory && post.category && (
          <Badge 
            className="absolute top-3 right-3"
            size="sm"
            style={{ backgroundColor: categoryColor }}
          >
            {post.category.name}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Link href={postUrl} className="group">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>
            </Link>
          </div>
          
          {showExcerpt && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          {showTags && post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag.id} variant="outline" size="sm">
                  {tag.name}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="outline" size="sm">
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t bg-muted/30">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            {showAuthor && post.author && (
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{post.author.name}</span>
              </div>
            )}
            {showReadingTime && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{post.reading_time}m</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {showViews && (
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{post.views}</span>
              </div>
            )}
            <span>{formatRelativeTime(post.published_at || post.created_at)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export { BlogCard };