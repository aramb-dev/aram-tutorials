import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: LucideIcon;
  className?: string;
}

interface CardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export function Card({ children, title, icon: Icon, className }: CardProps) {
  return (
    <div
      className={cn(
        'p-6 bg-background border border-border rounded-lg shadow-sm',
        className
      )}
    >
      {(title || Icon) && (
        <div className="flex items-center gap-2 mb-4">
          {Icon && <Icon className="h-5 w-5 text-brand-primary" />}
          {title && (
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          )}
        </div>
      )}
      <div className="prose prose-sm max-w-none text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export function CardGrid({ children, columns = 2, className }: CardGridProps) {
  return (
    <div
      className={cn(
        'my-6 grid gap-6',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}
