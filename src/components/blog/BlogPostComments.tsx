'use client';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
} from '@/components/ui';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Comment } from '@prisma/client';
import { SignIn, useUser } from '@stackframe/stack';
import {
  AlertCircle,
  Flag,
  Heart,
  MessageCircle,
  Reply,
  Send,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';

type CommentWithUser = Comment & {
  user: {
    name?: string | null;
    image?: string | null;
  };
};

interface BlogPostCommentsProps {
  postSlug: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function BlogPostComments({ postSlug }: BlogPostCommentsProps) {
  const user = useUser();
  const {
    data: comments,
    error,
    mutate,
  } = useSWR<CommentWithUser[]>(`/api/posts/${postSlug}/comments`, fetcher);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch(`/api/posts/${postSlug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        mutate(
          currentComments => [newCommentData, ...(currentComments || [])],
          {
            revalidate: false,
          }
        );
        setNewComment('');
      } else {
        const errorData = await response.json();
        setSubmissionError(
          errorData.error || 'An unknown error occurred. Please try again.'
        );
      }
    } catch (err) {
      setSubmissionError('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const CommentItem = ({ comment }: { comment: CommentWithUser }) => (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
        {comment.user.image ? (
          <Image
            src={comment.user.image}
            alt={comment.user.name || 'User avatar'}
            width={40}
            height={40}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary/60" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-foreground">
            {comment.user.name}
          </span>
          <span className="text-xs text-muted-foreground">
            · {formatDate(comment.createdAt)}
          </span>
        </div>

        <p className="text-sm text-foreground/90 mb-2 leading-relaxed">
          {comment.content}
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-primary"
          >
            <Heart className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs font-medium">0</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-primary"
          >
            <Reply className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs font-medium">Reply</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-destructive"
          >
            <Flag className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Comments ({comments?.length || 0})
        </h2>
      </div>

      {user ? (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Join the Discussion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Share your thoughts about this tutorial..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="min-h-[120px] bg-background/50"
                disabled={isSubmitting}
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {newComment.length}/500
              </div>
            </div>

            {submissionError && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <p>{submissionError}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Posting as {user.displayName}
                </p>
              </div>

              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Join the conversation
            </h3>
            <p className="text-muted-foreground mb-4">
              Sign in to share your thoughts and comments.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Sign In to Comment</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign In</DialogTitle>
                </DialogHeader>
                <SignIn />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

      <div className="space-y-8 divide-y divide-border">
        {error && (
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-medium text-destructive mb-2">
                Failed to load comments
              </h3>
              <p className="text-destructive/80">
                There was an issue fetching the comments. Please try refreshing
                the page.
              </p>
            </CardContent>
          </Card>
        )}
        {!comments && !error && (
          <div className="pt-12">
            <LoadingSpinner text="Loading comments..." />
          </div>
        )}
        {comments && comments.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No comments yet
              </h3>
              <p className="text-muted-foreground">
                Be the first to share your thoughts about this tutorial!
              </p>
            </CardContent>
          </Card>
        )}
        {comments &&
          comments.map((comment, index) => (
            <div key={comment.id} className={index > 0 ? 'pt-8' : ''}>
              <CommentItem comment={comment} />
            </div>
          ))}
      </div>
    </div>
  );
}
