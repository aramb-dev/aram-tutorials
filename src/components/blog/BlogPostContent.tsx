import { Card } from '@/components/mdx';
import { Button } from '@/components/ui/Button';
import type { BlogPost } from '@/types';
import Link from 'next/link';
import { MDXContent } from './MDXContent';

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div className="space-y-8">
          {/* MDX Content with proper component rendering */}
          <MDXContent post={post} />
        </div>
      </div>

      {post.cta && (
        <div>
          <Card title={post.cta.heading}>
            <p>{post.cta.body}</p>
            <div className="mt-4">
              <Button asChild>
                <Link href={post.cta.href}>{post.cta.buttonText}</Link>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
