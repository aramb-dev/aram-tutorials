'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { generateCategoryUrl, getCategoryColor } from '@/lib/utils';
import type { Category, CategoryBadgeProps } from '@/types';

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  size = 'md',
  variant = 'default',
  className
}) => {
  const categoryColor = getCategoryColor(category.name);
  const categoryUrl = generateCategoryUrl(category);

  const badgeContent = (
    <Badge
      size={size}
      variant={variant}
      className={className}
      style={{
        backgroundColor: variant === 'default' ? categoryColor : undefined,
        borderColor: variant === 'outline' ? categoryColor : undefined,
        color: variant === 'outline' ? categoryColor : undefined
      }}
    >
      {category.name}
    </Badge>
  );

  return (
    <Link href={categoryUrl} className="hover:opacity-80 transition-opacity">
      {badgeContent}
    </Link>
  );
};

export { CategoryBadge };