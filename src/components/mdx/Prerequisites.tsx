import { cn } from '@/lib/utils';
import { BookOpen, CheckCircle } from 'lucide-react';
import React from 'react';

interface PrerequisitesProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Prerequisites({
  children,
  title = 'Prerequisites',
  className,
}: PrerequisitesProps) {
  return (
    <div
      className={cn(
        'my-6 p-6 bg-muted/50 rounded-lg border border-border',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-brand-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="prose prose-sm max-w-none text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

interface PrerequisiteItemProps {
  children: React.ReactNode;
  completed?: boolean;
}

export function PrerequisiteItem({
  children,
  completed = false,
}: PrerequisiteItemProps) {
  return (
    <div className="flex items-start gap-2 py-1">
      <CheckCircle
        className={cn(
          'h-4 w-4 mt-0.5 flex-shrink-0',
          completed ? 'text-green-600' : 'text-muted-foreground'
        )}
      />
      <span className={cn(completed && 'line-through text-muted-foreground')}>
        {children}
      </span>
    </div>
  );
}
