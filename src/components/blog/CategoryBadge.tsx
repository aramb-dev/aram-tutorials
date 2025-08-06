'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { generateCategoryUrl, getCategoryColor } from '@/lib/utils';
import type { Category, CategoryBadgeProps } from '@/types';

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  size = 'md',
  variant = 'default',
  className
}) => {
  const categoryColor = getCategoryColor(category.name);
  const categoryUrl = generateCategoryUrl(category.slug);

  const badgeContent = (
    <Badge
      variant={variant}
      className={className}
      style={{
        backgroundColor: variant === 'default' ? categoryColor.bg : undefined,
        borderColor: variant === 'outline' ? categoryColor.border : undefined,
        color: variant === 'outline' ? categoryColor.text : categoryColor.text
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