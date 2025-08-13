import type { BlogPost } from '@/types';
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
    </div>
  );
}
