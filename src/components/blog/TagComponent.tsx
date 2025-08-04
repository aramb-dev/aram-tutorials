'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { generateTagUrl } from '@/lib/utils';
import type { TagProps } from '@/types';

const TagComponent: React.FC<TagProps> = ({
  tag,
  size = 'md',
  variant = 'outline',
  removable = false,
  onRemove,
  className
}) => {
  const tagUrl = generateTagUrl(tag.slug);

  const handleRemove = () => {
    if (onRemove) {
      onRemove(tag);
    }
  };

  const badgeContent = (
    <Badge
      size={size}
      variant={variant}
      removable={removable}
      onRemove={removable ? handleRemove : undefined}
      className={className}
    >
      #{tag.name}
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