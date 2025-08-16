'use client';

import { useEffect } from 'react';

interface PostViewTrackerProps {
  slug: string;
}

export function PostViewTracker({ slug }: PostViewTrackerProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await fetch(`/api/posts/${slug}/views`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Failed to increment post view:', error);
      }
    };

    incrementView();
  }, [slug]);

  return null;
}
