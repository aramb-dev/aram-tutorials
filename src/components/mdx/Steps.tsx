import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import React from 'react';

interface StepProps {
  children: React.ReactNode;
  number?: number;
  title?: string;
  completed?: boolean;
  className?: string;
}

interface StepListProps {
  children: React.ReactNode;
  className?: string;
}

export function StepList({ children, className }: StepListProps) {
  return <div className={cn('my-6 space-y-6', className)}>{children}</div>;
}

export function Step({
  children,
  number,
  title,
  completed = false,
  className,
}: StepProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      {/* Step indicator */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
            completed
              ? 'bg-green-600 text-white'
              : 'bg-brand-primary text-white'
          )}
        >
          {completed ? <Check className="h-4 w-4" /> : number || '•'}
        </div>
        {/* Connecting line - will be hidden on last step via CSS */}
        <div className="w-0.5 h-6 bg-border mt-2 last:hidden" />
      </div>

      {/* Step content */}
      <div className="flex-1 pb-6">
        {title && (
          <h4 className="text-base font-semibold text-foreground mb-2">
            {title}
          </h4>
        )}
        <div className="prose prose-sm max-w-none text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
