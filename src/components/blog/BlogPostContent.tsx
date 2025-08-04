'use client';

import { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  Play,
  Code,
  FileText,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/types';

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Mock code blocks for demonstration
  const codeBlocks = [
    {
      id: 'code-1',
      language: 'javascript',
      title: 'Setting up the project',
      code: `// Initialize a new Next.js project
npx create-next-app@latest my-app --typescript --tailwind --eslint

// Navigate to the project directory
cd my-app

// Install additional dependencies
npm install lucide-react @types/node`
    },
    {
      id: 'code-2',
      language: 'tsx',
      title: 'Creating a React component',
      code: `import React from 'react';
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Button onClick={onClick}>
        Click me!
      </Button>
    </div>
  );
}`
    }
  ];

  return (
    <div className="space-y-8">
      {/* Table of Contents */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="space-y-2">
            <a href="#introduction" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              1. Introduction
            </a>
            <a href="#getting-started" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              2. Getting Started
            </a>
            <a href="#implementation" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              3. Implementation
            </a>
            <a href="#best-practices" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              4. Best Practices
            </a>
            <a href="#conclusion" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              5. Conclusion
            </a>
          </nav>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div className="space-y-8">
          {/* Introduction Section */}
          <section id="introduction">
            <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {post.content}
            </p>
            
            {/* Info Box */}
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                      Pro Tip
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      Before diving into the implementation, make sure you have a solid understanding of the fundamentals. 
                      This will help you follow along more easily and avoid common pitfalls.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Getting Started Section */}
          <section id="getting-started">
            <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Let's start by setting up our development environment. We'll need to install a few dependencies 
              and configure our project structure.
            </p>
            
            {/* Prerequisites */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Node.js 18.0 or higher
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Basic knowledge of React and TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    A code editor (VS Code recommended)
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Code Block */}
            <div className="space-y-4">
              {codeBlocks.map((block) => (
                <Card key={block.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        <span className="font-medium">{block.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {block.language}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(block.code, block.id)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedCode === block.id ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      <code>{block.code}</code>
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Implementation Section */}
          <section id="implementation">
            <h2 className="text-2xl font-bold text-foreground mb-4">Implementation</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Now that we have our environment set up, let's dive into the actual implementation. 
              We'll build this step by step, explaining each part along the way.
            </p>

            {/* Warning Box */}
            <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                      Important Note
                    </h4>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      Make sure to test your implementation thoroughly before deploying to production. 
                      The examples shown here are for educational purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-muted-foreground leading-relaxed mb-6">
              The implementation involves several key concepts that work together to create a robust solution. 
              Let's break down each component and understand how they interact with each other.
            </p>
          </section>

          {/* Best Practices Section */}
          <section id="best-practices">
            <h2 className="text-2xl font-bold text-foreground mb-4">Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use React.memo for expensive components</li>
                    <li>• Implement proper code splitting</li>
                    <li>• Optimize images and assets</li>
                    <li>• Use lazy loading when appropriate</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Validate all user inputs</li>
                    <li>• Use HTTPS in production</li>
                    <li>• Implement proper authentication</li>
                    <li>• Keep dependencies updated</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Conclusion Section */}
          <section id="conclusion">
            <h2 className="text-2xl font-bold text-foreground mb-4">Conclusion</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In this tutorial, we've covered the essential concepts and implementation details needed to build 
              a robust solution. The techniques we've discussed will serve as a solid foundation for your future projects.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Remember that learning is an iterative process. Don't hesitate to experiment with the code, 
              try different approaches, and build upon what you've learned here.
            </p>
          </section>

          {/* Resources Section */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Official Documentation
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download Source Code
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Play className="h-4 w-4" />
                  Watch Video Tutorial
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}