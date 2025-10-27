'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { generateTagUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { TagProps } from '@/types';

const TagComponent: React.FC<TagProps> = ({
  tag,
  size = 'md',
  variant = 'outline',
  removable = false,
  onRemove,
  className,
}) => {
  const tagUrl = generateTagUrl(tag.slug);

  const handleRemove = () => {
    if (onRemove) {
      onRemove(tag);
    }
  };

  const badgeContent = (
    <Badge variant={variant} className={cn(className, removable && 'pr-1')}>
      #{tag.name}
      {removable && (
        <button
          onClick={handleRemove}
          className="ml-1 text-xs hover:text-destructive"
          aria-label={`Remove ${tag.name} tag`}
        >
          ×
        </button>
      )}
    </Badge>
  );

  if (removable) {
    return badgeContent;
  }

  return (
    <Link href={tagUrl} className="hover:opacity-80 transition-opacity">
      {badgeContent}
    </Link>
  );
};

export { TagComponent };
