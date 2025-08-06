'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="gap-2"
      onClick={() => window.history.back()}
    >
      <ArrowLeft className="w-4 h-4" />
      Go Back
    </Button>
  );
}
