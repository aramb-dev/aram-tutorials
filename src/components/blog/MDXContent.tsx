import {
  AdditionalResources,
  Callout,
  Card,
  CardGrid,
  CodeBlock,
  ErrorTip,
  Image,
  ImportantNote,
  PrerequisiteItem,
  Prerequisites,
  ProTip,
  ResourceLink,
  Step,
  StepList,
  SuccessNote,
  VideoEmbed,
} from '@/components/mdx';
import type { BlogPost } from '@/types';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { EnhancedCodeBlock } from './EnhancedCodeBlock';

interface MDXContentProps {
  post: BlogPost;
}

// MDX Components mapping
const components = {
  AdditionalResources,
  Callout,
  Card,
  CardGrid,
  CodeBlock,
  ErrorTip,
  Image,
  ImportantNote,
  PrerequisiteItem,
  Prerequisites,
  ProTip,
  ResourceLink,
  Step,
  StepList,
  SuccessNote,
  VideoEmbed,
  // Enhanced HTML elements with custom styling
  h1: (props: any) => (
    <h1
      id={props.children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}
      className="text-3xl font-bold tracking-tight mb-6 text-foreground scroll-mt-20"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      id={props.children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}
      className="text-2xl font-semibold tracking-tight mb-4 mt-8 text-foreground scroll-mt-20"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      id={props.children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}
      className="text-xl font-semibold mb-3 mt-6 text-foreground scroll-mt-20"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="text-muted-foreground leading-relaxed mb-4" {...props} />
  ),
  code: (props: any) => {
    // If it's a code block (has language class), let the pre handle it
    if (props.className?.startsWith('language-')) {
      return <code className={props.className} {...props} />;
    }

    // Inline code styling
    return (
      <code
        className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
        {...props}
      />
    );
  },
  pre: (props: any) => <EnhancedCodeBlock {...props} />,
  ul: (props: any) => (
    <ul
      className="list-disc list-inside space-y-2 mb-4 text-muted-foreground"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground"
      {...props}
    />
  ),
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4 bg-muted/30 py-2"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-primary hover:underline font-medium transition-colors hover:text-primary/80"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="w-full border-collapse border border-border"
        {...props}
      />
    </div>
  ),
  th: (props: any) => (
    <th
      className="border border-border px-4 py-2 bg-muted font-semibold text-left"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
  hr: (props: any) => <hr className="my-8 border-border" {...props} />,
};

export function MDXContent({ post }: MDXContentProps) {
  return <MDXRemote source={post.content} components={components} />;
}
