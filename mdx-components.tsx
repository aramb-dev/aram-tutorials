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
  TableOfContents,
  VideoEmbed,
} from '@/components/mdx';
import type { MDXComponents } from 'mdx/types';

// Custom components that override default HTML elements
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default HTML elements with custom styling
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-foreground mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-foreground mb-4 mt-8 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-foreground mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-foreground mb-2 mt-4">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold text-foreground mb-2 mt-4">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-semibold text-foreground mb-2 mt-4">
        {children}
      </h6>
    ),
    p: ({ children }) => (
      <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-primary pl-4 py-2 my-6 bg-brand-primary/5 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      // Inline code
      if (!className) {
        return (
          <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-brand-primary">
            {children}
          </code>
        );
      }
      // Block code - this will be handled by CodeBlock component
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => {
      // Extract language and code from pre > code structure
      const codeElement = children as any;
      if (codeElement?.props?.className) {
        const language = codeElement.props.className.replace('language-', '');
        const code = codeElement.props.children;
        return <CodeBlock language={language}>{code}</CodeBlock>;
      }
      return (
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-6">
          {children}
        </pre>
      );
    },
    hr: () => <hr className="border-border my-8" />,
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border rounded-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-border">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-4 py-2 text-muted-foreground">
        {children}
      </td>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-brand-primary hover:text-brand-light underline underline-offset-2"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,

    // Custom MDX components
    Callout,
    ProTip,
    ErrorTip,
    ImportantNote,
    SuccessNote,
    CodeBlock,
    TableOfContents,
    Prerequisites,
    PrerequisiteItem,
    Card,
    CardGrid,
    AdditionalResources,
    ResourceLink,
    StepList,
    Step,
    VideoEmbed,
    Image,

    // Allow custom components to be passed through
    ...components,
  };
}
