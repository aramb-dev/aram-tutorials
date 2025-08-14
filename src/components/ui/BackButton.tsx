'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BackButtonProps {
  href?: string;
  children?: React.ReactNode;
  variant?: 'ghost' | 'outline' | 'default' | 'destructive' | 'secondary';
  className?: string;
}

export function BackButton({
  href,
  children,
  variant = 'ghost',
  className,
}: BackButtonProps) {
  const content = (
    <>
      <ArrowLeft className="w-4 h-4" />
      {children || 'Go Back'}
    </>
  );

  if (href) {
    return (
      <Button
        variant={variant}
        size="lg"
        className={cn('gap-2', className)}
        asChild
      >
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size="lg"
      className={cn('gap-2', className)}
      onClick={() => window.history.back()}
    >
      {content}
    </Button>
  );
}
