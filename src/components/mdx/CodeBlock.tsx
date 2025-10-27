'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Check, Copy, Download, FileText } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlight?: string; // Line numbers to highlight, e.g., "1,3-5,8"
  className?: string;
}

export function CodeBlock({
  children,
  language = 'text',
  title,
  filename,
  showLineNumbers = false,
  highlight,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([children], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `code.${getFileExtension(language)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      jsx: 'jsx',
      tsx: 'tsx',
      python: 'py',
      java: 'java',
      css: 'css',
      html: 'html',
      json: 'json',
      yaml: 'yml',
      yml: 'yml',
      markdown: 'md',
      bash: 'sh',
      shell: 'sh',
      sql: 'sql',
    };
    return extensions[lang.toLowerCase()] || 'txt';
  };

  const getLanguageDisplayName = (lang: string): string => {
    // Handle empty or undefined language
    if (!lang || lang.trim() === '' || lang === 'text') {
      return 'PLAIN TEXT';
    }

    const names: Record<string, string> = {
      js: 'JavaScript',
      javascript: 'JavaScript',
      jsx: 'JSX',
      ts: 'TypeScript',
      typescript: 'TypeScript',
      tsx: 'TSX',
      py: 'Python',
      python: 'Python',
      css: 'CSS',
      html: 'HTML',
      json: 'JSON',
      yml: 'YAML',
      yaml: 'YAML',
      md: 'Markdown',
      markdown: 'Markdown',
      bash: 'Bash',
      shell: 'Shell',
      sh: 'Shell',
      sql: 'SQL',
      xml: 'XML',
      php: 'PHP',
      java: 'Java',
      c: 'C',
      cpp: 'C++',
      csharp: 'C#',
      go: 'Go',
      rust: 'Rust',
      swift: 'Swift',
      kotlin: 'Kotlin',
      dart: 'Dart',
      ruby: 'Ruby',
      powershell: 'PowerShell',
      dockerfile: 'Dockerfile',
      nginx: 'Nginx',
      apache: 'Apache',
      vim: 'Vim',
      diff: 'Diff',
      git: 'Git',
      ini: 'INI',
      toml: 'TOML',
      properties: 'Properties',
    };

    const normalizedLang = lang.toLowerCase().trim();

    // Check if it looks like a CSS class or contains special characters
    if (
      normalizedLang.includes(':') ||
      normalizedLang.includes('-') ||
      normalizedLang.includes('.')
    ) {
      return 'PLAIN TEXT';
    }

    return names[normalizedLang] || 'PLAIN TEXT';
  };

  const parseHighlightLines = (highlight?: string): Set<number> => {
    if (!highlight) return new Set();

    const lines = new Set<number>();
    highlight.split(',').forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(num => parseInt(num.trim()));
        for (let i = start; i <= end; i++) {
          lines.add(i);
        }
      } else {
        lines.add(parseInt(part.trim()));
      }
    });
    return lines;
  };

  const highlightedLines = parseHighlightLines(highlight);
  const codeLines = children.split('\n');

  return (
    <div
      className={cn(
        'my-6 rounded-lg overflow-hidden border border-border',
        className
      )}
    >
      {/* Header Bar */}
      {(title || filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
          <div className="flex items-center gap-2 text-sm">
            {(title || filename) && (
              <div className="flex items-center gap-2 text-foreground font-medium">
                <FileText className="h-4 w-4" />
                {title || filename}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {language && (
              <span className="px-2 py-1 bg-background rounded text-xs font-mono text-muted-foreground border">
                {getLanguageDisplayName(language)}
              </span>
            )}
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 w-7 p-0"
                title="Copy code"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
              {(filename || title) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="h-7 w-7 p-0"
                  title="Download file"
                >
                  <Download className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Code Content */}
      <div className="relative">
        <pre className="p-4 bg-slate-900 text-slate-100 overflow-x-auto text-sm leading-relaxed">
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              <div className="table w-full">
                {codeLines.map((line, index) => {
                  const lineNumber = index + 1;
                  const isHighlighted = highlightedLines.has(lineNumber);

                  return (
                    <div
                      key={index}
                      className={cn(
                        'table-row',
                        isHighlighted && 'bg-yellow-400/10'
                      )}
                    >
                      <div className="table-cell pr-4 text-right text-slate-500 select-none border-r border-slate-700 w-12">
                        {lineNumber}
                      </div>
                      <div className="table-cell pl-4">{line || ' '}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              children
            )}
          </code>
        </pre>

        {/* Copy button for code without header */}
        {!title && !filename && !language && (
          <div className="absolute top-2 right-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="h-7 w-7 p-0 bg-slate-800 hover:bg-slate-700 border-slate-600"
              title="Copy code"
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-400" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
