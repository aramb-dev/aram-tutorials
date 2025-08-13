'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BackButtonProps {
  href?: string;
  children?: React.ReactNode;
  variant?: 'ghost' | 'outline' | 'default' | 'destructive' | 'secondary';
}

export function BackButton({
  href,
  children,
  variant = 'ghost',
}: BackButtonProps) {
  const content = (
    <>
      <ArrowLeft className="w-4 h-4" />
      {children || 'Go Back'}
    </>
  );

  if (href) {
    return (
      <Button variant={variant} size="lg" className="gap-2" asChild>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size="lg"
      className="gap-2"
      onClick={() => window.history.back()}
    >
      {content}
    </Button>
  );
}
