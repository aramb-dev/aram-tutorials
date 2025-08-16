'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SignIn, useUser } from '@stackframe/stack';
import { Bookmark, Eye, Heart, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface PostActionsProps {
  slug: string;
}

export default function PostActions({ slug }: PostActionsProps) {
  const user = useUser();
  const { data, error, mutate } = useSWR(`/api/posts/${slug}/stats`, fetcher);

  const [isLiking, setIsLiking] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleLike = async () => {
    if (!user) {
      setShowSignIn(true);
      return;
    }
    setIsLiking(true);
    const originalLikes = data.likes;
    const originalUserHasLiked = data.userHasLiked;

    mutate(
      {
        ...data,
        likes: data.userHasLiked ? data.likes - 1 : data.likes + 1,
        userHasLiked: !data.userHasLiked,
      },
      false
    );

    const method = data.userHasLiked ? 'DELETE' : 'POST';
    const res = await fetch(`/api/posts/${slug}/like`, { method });

    if (!res.ok) {
      mutate(
        { ...data, likes: originalLikes, userHasLiked: originalUserHasLiked },
        false
      );
    }
    setIsLiking(false);
  };

  const handleBookmark = async () => {
    if (!user) {
      setShowSignIn(true);
      return;
    }
    setIsBookmarking(true);
    const originalBookmarks = data.bookmarks;
    const originalUserHasBookmarked = data.userHasBookmarked;

    mutate(
      {
        ...data,
        bookmarks: data.userHasBookmarked
          ? data.bookmarks - 1
          : data.bookmarks + 1,
        userHasBookmarked: !data.userHasBookmarked,
      },
      false
    );

    const method = data.userHasBookmarked ? 'DELETE' : 'POST';
    const res = await fetch(`/api/posts/${slug}/bookmark`, { method });

    if (!res.ok) {
      mutate(
        {
          ...data,
          bookmarks: originalBookmarks,
          userHasBookmarked: originalUserHasBookmarked,
        },
        false
      );
    }
    setIsBookmarking(false);
  };

  if (error) {
    return (
      <div className="text-red-500 text-sm">Failed to load post stats.</div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-10">
        <LoadingSpinner size="sm" text="Loading stats..." />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between p-2 border rounded-lg bg-muted/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{data.views ?? 0}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{data.comments ?? 0}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
            className="flex items-center gap-1"
          >
            <Heart
              className={`h-4 w-4 ${
                data.userHasLiked
                  ? 'text-red-500 fill-red-500'
                  : 'text-muted-foreground'
              }`}
            />
            <span className="text-sm">{data.likes ?? 0}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            disabled={isBookmarking}
            className="flex items-center gap-1"
          >
            <Bookmark
              className={`h-4 w-4 ${
                data.userHasBookmarked
                  ? 'text-blue-500 fill-blue-500'
                  : 'text-muted-foreground'
              }`}
            />
            <span className="text-sm">{data.bookmarks ?? 0}</span>
          </Button>
        </div>
      </div>
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
          </DialogHeader>
          <SignIn />
        </DialogContent>
      </Dialog>
    </>
  );
}
