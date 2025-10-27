'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Download, FileImage, Maximize2, Play, X } from 'lucide-react';
import NextImage from 'next/image';
import { useState } from 'react';

interface VideoEmbedProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
  thumbnail?: string;
  className?: string;
}

export function VideoEmbed({
  src,
  title = 'Video',
  width = 560,
  height = 315,
  thumbnail,
  className,
}: VideoEmbedProps) {
  // Extract video ID from YouTube URLs
  const getYouTubeId = (url: string): string | null => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(src);
  const isYouTube = !!youtubeId;

  return (
    <div className={cn('my-8', className)}>
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-slate-900">
        {/* Video Title */}
        {title && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
            <h4 className="text-white font-medium text-sm flex items-center gap-2">
              <Play className="h-4 w-4" />
              {title}
            </h4>
          </div>
        )}

        {/* Video Container */}
        <div className="relative w-full aspect-video">
          {isYouTube ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <video
              controls
              className="absolute inset-0 w-full h-full object-cover"
              poster={thumbnail}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}

interface ImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  caption?: string;
  className?: string;
  downloadable?: boolean;
  lightbox?: boolean;
  border?: boolean;
  rounded?: boolean;
  shadow?: boolean;
}

export function Image({
  src,
  alt,
  title,
  width = 800,
  height = 400,
  caption,
  className,
  downloadable = false,
  lightbox = true,
  border = true,
  rounded = true,
  shadow = false,
}: ImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = title || alt || 'image';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <>
      <figure className={cn('my-8', className)}>
        <div
          className={cn(
            'relative overflow-hidden bg-muted',
            rounded && 'rounded-lg',
            border && 'border border-border',
            shadow && 'shadow-lg'
          )}
        >
          {/* Header with title and actions */}
          {(title || downloadable) && (
            <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
              <div className="flex items-center gap-2">
                <FileImage className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {title || alt}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {lightbox && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLightboxOpen(true)}
                    className="h-7 w-7 p-0"
                    title="View full size"
                  >
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                )}
                {downloadable && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownload}
                    className="h-7 w-7 p-0"
                    title="Download image"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Image */}
          <div className="p-4">
            <div
              className={cn(
                'relative group cursor-pointer overflow-hidden',
                rounded && 'rounded',
                border && 'border border-border'
              )}
              onClick={() => lightbox && setIsLightboxOpen(true)}
            >
              <NextImage
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-auto transition-transform duration-200 group-hover:scale-105"
                priority={false}
              />
              {lightbox && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                  <Maximize2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Caption */}
        {caption && (
          <figcaption className="mt-2 text-sm text-muted-foreground text-center italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-full max-h-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
              Close
            </Button>
            <NextImage
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="max-w-full max-h-full object-contain"
            />
            {caption && (
              <p className="text-white text-center mt-4">{caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Screenshot component for code examples
interface ScreenshotProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  browser?: boolean;
  terminal?: boolean;
  mobile?: boolean;
  className?: string;
}

export function Screenshot({
  src,
  alt,
  title,
  caption,
  browser = false,
  terminal = false,
  mobile = false,
  className,
}: ScreenshotProps) {
  return (
    <figure className={cn('my-8', className)}>
      <div
        className={cn(
          'relative rounded-lg overflow-hidden border border-border bg-muted shadow-lg',
          mobile && 'max-w-sm mx-auto'
        )}
      >
        {/* Browser/Terminal header */}
        {(browser || terminal) && (
          <div
            className={cn(
              'flex items-center gap-2 px-4 py-2 border-b border-border',
              browser && 'bg-slate-100 dark:bg-slate-800',
              terminal && 'bg-slate-900'
            )}
          >
            <div className="flex gap-1.5">
              <div
                className={cn(
                  'w-3 h-3 rounded-full',
                  browser && 'bg-red-500',
                  terminal && 'bg-red-400'
                )}
              />
              <div
                className={cn(
                  'w-3 h-3 rounded-full',
                  browser && 'bg-yellow-500',
                  terminal && 'bg-yellow-400'
                )}
              />
              <div
                className={cn(
                  'w-3 h-3 rounded-full',
                  browser && 'bg-green-500',
                  terminal && 'bg-green-400'
                )}
              />
            </div>
            {title && (
              <span
                className={cn(
                  'text-sm font-medium ml-2',
                  browser && 'text-slate-700 dark:text-slate-300',
                  terminal && 'text-slate-300'
                )}
              >
                {title}
              </span>
            )}
          </div>
        )}

        {/* Image */}
        <div className="relative">
          <NextImage
            src={src}
            alt={alt}
            width={mobile ? 375 : 1200}
            height={mobile ? 667 : 800}
            className="w-full h-auto"
          />
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Image comparison component
interface ImageComparisonProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  title?: string;
  caption?: string;
  className?: string;
}

export function ImageComparison({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  title,
  caption,
  className,
}: ImageComparisonProps) {
  return (
    <figure className={cn('my-8', className)}>
      {title && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-foreground">{title}</h4>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Before
          </div>
          <div className="relative rounded-lg overflow-hidden border border-border">
            <NextImage
              src={beforeSrc}
              alt={beforeAlt}
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded">
            After
          </div>
          <div className="relative rounded-lg overflow-hidden border border-border">
            <NextImage
              src={afterSrc}
              alt={afterAlt}
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
