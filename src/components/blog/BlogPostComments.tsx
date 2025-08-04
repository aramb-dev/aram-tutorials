'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  MessageCircle, 
  Reply, 
  Heart, 
  Flag, 
  MoreHorizontal,
  Send,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isAuthor?: boolean;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface BlogPostCommentsProps {
  postId: string;
}

export function BlogPostComments({ postId }: BlogPostCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20woman%20software%20developer%2C%20friendly%20smile%2C%20modern%20office%20background&image_size=square'
      },
      content: 'This is an excellent tutorial! The step-by-step approach makes it really easy to follow. I especially appreciate the code examples and best practices section.',
      createdAt: '2024-01-15T10:30:00Z',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: '1-1',
          author: {
            name: 'Aram Tutorials Team',
            avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20software%20developer%2C%20friendly%20smile%2C%20modern%20tech%20background&image_size=square',
            isAuthor: true
          },
          content: 'Thank you so much, Sarah! I\'m glad you found it helpful. That\'s exactly what I was aiming for - making complex concepts accessible.',
          createdAt: '2024-01-15T11:15:00Z',
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: '2',
      author: {
        name: 'Mike Chen',
        avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20asian%20male%20software%20developer%2C%20glasses%2C%20modern%20tech%20background&image_size=square'
      },
      content: 'I\'ve been struggling with this concept for weeks, and your explanation finally made it click! The visual examples really helped. Do you have any recommendations for further reading on this topic?',
      createdAt: '2024-01-14T16:45:00Z',
      likes: 8,
      isLiked: true
    },
    {
      id: '3',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20latina%20female%20software%20developer%2C%20confident%20smile%2C%20modern%20office%20background&image_size=square'
      },
      content: 'Great tutorial! One question though - how would you handle error cases in the implementation you showed? Would love to see a follow-up on error handling best practices.',
      createdAt: '2024-01-14T09:20:00Z',
      likes: 15,
      isLiked: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isLoggedIn] = useState(false); // This would come from auth context

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId && !isReply) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                };
              }
              return reply;
            })
          };
        }
        
        return comment;
      })
    );
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: isLoggedIn ? 'Current User' : guestName || 'Anonymous',
        avatar: isLoggedIn ? undefined : undefined
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
    setGuestName('');
    setGuestEmail('');
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: {
        name: isLoggedIn ? 'Current User' : guestName || 'Anonymous',
        avatar: isLoggedIn ? undefined : undefined
      },
      content: replyContent,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    setComments(prev => 
      prev.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      })
    );
    
    setReplyContent('');
    setReplyingTo(null);
    setGuestName('');
    setGuestEmail('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { comment: Comment; isReply?: boolean; parentId?: string }) => (
    <div className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
          {comment.author.avatar ? (
            <Image
              src={comment.author.avatar}
              alt={comment.author.name}
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
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm">{comment.author.name}</span>
            {comment.author.isAuthor && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                Author
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
          </div>
          
          <p className="text-sm text-foreground mb-3 leading-relaxed">
            {comment.content}
          </p>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(comment.id, isReply, parentId)}
              className={`h-8 px-2 ${comment.isLiked ? 'text-red-600' : 'text-muted-foreground'}`}
            >
              <Heart className={`h-4 w-4 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{comment.likes}</span>
            </Button>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="h-8 px-2 text-muted-foreground"
              >
                <Reply className="h-4 w-4 mr-1" />
                <span className="text-xs">Reply</span>
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground"
            >
              <Flag className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-4 space-y-3">
              {!isLoggedIn && (
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    placeholder="Your email (optional)"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="text-sm"
                  />
                </div>
              )}
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px] text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={!replyContent.trim() || (!isLoggedIn && !guestName.trim())}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                    setGuestName('');
                    setGuestEmail('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-6 space-y-6">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply={true}
                  parentId={comment.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Comments Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Comments ({comments.length})
        </h2>
      </div>

      {/* Add Comment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Join the Discussion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLoggedIn && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Your name *"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
              <Input
                placeholder="Your email (optional)"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
              />
            </div>
          )}
          
          <Textarea
            placeholder="Share your thoughts about this tutorial..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[120px]"
          />
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoggedIn ? (
                'Posting as a registered user'
              ) : (
                'Posting as a guest. Consider signing up for a better experience!'
              )}
            </p>
            
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || (!isLoggedIn && !guestName.trim())}
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.length === 0 ? (
          <Card>
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
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>

      {/* Load More Comments */}
      {comments.length > 0 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Comments
          </Button>
        </div>
      )}
    </div>
  );
}