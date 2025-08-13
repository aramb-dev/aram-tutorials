// Example usage of MDX components for Aram Tutorials
// This file demonstrates how to use all the MDX components following the design principles

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
  Step,
  StepList,
  SuccessNote,
  TableOfContents,
  VideoEmbed,
} from '@/components/mdx';
import { Database, Settings, Shield, Zap } from 'lucide-react';

export function MDXComponentsExample() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">MDX Components Example</h1>

      {/* Table of Contents */}
      <TableOfContents
        items={[
          { id: 'callouts', title: 'Callouts & Admonitions', level: 2 },
          { id: 'code', title: 'Code Blocks', level: 2 },
          { id: 'prerequisites', title: 'Prerequisites', level: 2 },
          { id: 'steps', title: 'Step-by-Step Guide', level: 2 },
          { id: 'cards', title: 'Cards & Grids', level: 2 },
          { id: 'media', title: 'Media Components', level: 2 },
          { id: 'resources', title: 'Additional Resources', level: 2 },
        ]}
      />

      {/* Callouts Section */}
      <section id="callouts">
        <h2 className="text-2xl font-semibold mb-4">Callouts & Admonitions</h2>

        <ProTip>
          This is a pro tip callout using the brand green color. Perfect for
          helpful insights and best practices.
        </ProTip>

        <ImportantNote>
          This is an important note using warning colors. Use this for critical
          information that users must not miss.
        </ImportantNote>

        <ErrorTip>
          This is an error callout for critical warnings about potential
          breaking changes or dangerous operations.
        </ErrorTip>

        <SuccessNote>
          This is a success callout for positive confirmations and completed
          actions.
        </SuccessNote>

        <Callout type="info" title="Custom Title">
          You can also use the base Callout component with custom titles and
          different types.
        </Callout>
      </section>

      {/* Code Blocks Section */}
      <section id="code">
        <h2 className="text-2xl font-semibold mb-4">Code Blocks</h2>

        <CodeBlock
          language="typescript"
          title="Example React Component"
          filename="Button.tsx"
          showLineNumbers
          highlight="3,5-7"
        >
          {`import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium',
        variant === 'primary' && 'bg-brand-primary text-white',
        variant === 'secondary' && 'bg-muted text-foreground'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`}
        </CodeBlock>

        <CodeBlock language="bash" title="Terminal Commands">
          {`npm install @next/mdx
npm install @mdx-js/loader
npm install @mdx-js/react`}
        </CodeBlock>
      </section>

      {/* Prerequisites Section */}
      <section id="prerequisites">
        <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>

        <Prerequisites>
          <div className="space-y-2">
            <PrerequisiteItem completed>Node.js 18+ installed</PrerequisiteItem>
            <PrerequisiteItem completed>
              Basic knowledge of React
            </PrerequisiteItem>
            <PrerequisiteItem>
              Understanding of TypeScript (recommended)
            </PrerequisiteItem>
            <PrerequisiteItem>Familiarity with Next.js</PrerequisiteItem>
          </div>
        </Prerequisites>
      </section>

      {/* Steps Section */}
      <section id="steps">
        <h2 className="text-2xl font-semibold mb-4">Step-by-Step Guide</h2>

        <StepList>
          <Step number={1} title="Install Dependencies" completed>
            <p>First, install the required packages for MDX support:</p>
            <CodeBlock language="bash">
              {`npm install @next/mdx @mdx-js/loader @mdx-js/react`}
            </CodeBlock>
          </Step>

          <Step number={2} title="Configure Next.js">
            <p>
              Update your <code>next.config.js</code> to support MDX files:
            </p>
            <CodeBlock language="javascript" filename="next.config.js">
              {`/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});`}
            </CodeBlock>
          </Step>

          <Step number={3} title="Create MDX Components">
            <p>
              Set up your custom MDX components to maintain consistent styling
              across all tutorials.
            </p>
          </Step>
        </StepList>
      </section>

      {/* Cards Section */}
      <section id="cards">
        <h2 className="text-2xl font-semibold mb-4">Cards & Grids</h2>

        <CardGrid columns={2}>
          <Card title="Security Best Practices" icon={Shield}>
            <ul className="space-y-1">
              <li>Always validate user input</li>
              <li>Use HTTPS in production</li>
              <li>Implement proper authentication</li>
              <li>Keep dependencies updated</li>
            </ul>
          </Card>

          <Card title="Performance Optimization" icon={Zap}>
            <ul className="space-y-1">
              <li>Optimize images and assets</li>
              <li>Implement code splitting</li>
              <li>Use caching strategies</li>
              <li>Monitor Core Web Vitals</li>
            </ul>
          </Card>

          <Card title="Database Design" icon={Database}>
            <ul className="space-y-1">
              <li>Normalize your schema</li>
              <li>Index frequently queried columns</li>
              <li>Use appropriate data types</li>
              <li>Plan for scalability</li>
            </ul>
          </Card>

          <Card title="Configuration Management" icon={Settings}>
            <ul className="space-y-1">
              <li>Use environment variables</li>
              <li>Separate configs by environment</li>
              <li>Version control your configs</li>
              <li>Document all settings</li>
            </ul>
          </Card>
        </CardGrid>
      </section>

      {/* Media Section */}
      <section id="media">
        <h2 className="text-2xl font-semibold mb-4">Media Components</h2>

        <VideoEmbed
          src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          title="Tutorial: Setting up Next.js with MDX"
        />

        <Image
          src="/api/placeholder/800/400"
          alt="Example screenshot"
          title="Project Structure"
          caption="The recommended folder structure for a Next.js project with MDX support"
        />
      </section>

      {/* Resources Section */}
      <section id="resources">
        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>

        <AdditionalResources
          resources={[
            {
              title: 'Next.js MDX Documentation',
              url: 'https://nextjs.org/docs/advanced-features/using-mdx',
              description: 'Official Next.js documentation for MDX integration',
              type: 'documentation',
            },
            {
              title: 'MDX Playground',
              url: 'https://mdxjs.com/playground/',
              description:
                'Interactive playground to test MDX syntax and components',
              type: 'website',
            },
            {
              title: 'Building a Blog with MDX',
              url: 'https://github.com/vercel/next.js/tree/canary/examples/with-mdx',
              description: 'Example project showing MDX implementation',
              type: 'code',
            },
          ]}
        />
      </section>
    </div>
  );
}
