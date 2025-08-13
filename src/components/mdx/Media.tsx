import { cn } from '@/lib/utils';
import { FileImage, Play } from 'lucide-react';
import NextImage from 'next/image';

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
  const aspectRatio = (height / width) * 100;

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
}

export function Image({
  src,
  alt,
  title,
  width = 800,
  height = 400,
  caption,
  className,
}: ImageProps) {
  return (
    <figure className={cn('my-8', className)}>
      <div className="relative rounded-lg overflow-hidden border border-border bg-muted">
        {title && (
          <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
            <FileImage className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{title}</span>
          </div>
        )}
        <div className="p-4">
          <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto rounded border border-border"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
