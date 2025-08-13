'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface EnhancedCodeBlockProps {
  children: any;
  [key: string]: any;
}

export function EnhancedCodeBlock({
  children,
  ...props
}: EnhancedCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract code content and language from children
  const getCodeContent = (
    children: any
  ): { code: string; language?: string } => {
    if (typeof children === 'string') {
      return { code: children };
    }

    if (children?.props) {
      const { children: code, className } = children.props;
      const language = className?.replace('language-', '') || undefined;
      return {
        code: typeof code === 'string' ? code : '',
        language,
      };
    }

    return { code: '' };
  };

  const { code, language } = getCodeContent(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Get display name for language
  const getLanguageDisplayName = (lang?: string): string => {
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
      text: 'PLAIN TEXT',
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
  const getLanguageForHighlighter = (lang?: string): string => {
    if (!lang) return 'text';

    const languageMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'jsx',
      ts: 'typescript',
      tsx: 'tsx',
      bash: 'bash',
      shell: 'bash',
      sh: 'bash',
      json: 'json',
      css: 'css',
      html: 'markup',
      xml: 'markup',
      yml: 'yaml',
      yaml: 'yaml',
      md: 'markdown',
      python: 'python',
      py: 'python',
      java: 'java',
      sql: 'sql',
      text: 'text',
    };

    return languageMap[lang.toLowerCase()] || lang.toLowerCase();
  };

  const highlightLanguage = getLanguageForHighlighter(language);

  // If we have code content, use syntax highlighter
  if (code) {
    return (
      <div className="relative group my-6">
        <div className="rounded-lg overflow-hidden border border-slate-700">
          {/* Header with language and copy button */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-slate-900 rounded text-xs font-mono text-slate-300 border border-slate-600">
                {getLanguageDisplayName(language)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 w-7 p-0 hover:bg-slate-700"
              title="Copy code"
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-400" />
              ) : (
                <Copy className="h-3 w-3 text-slate-300" />
              )}
            </Button>
          </div>

          {/* Syntax highlighted code */}
          <SyntaxHighlighter
            language={highlightLanguage}
            style={oneDark}
            customStyle={{
              margin: 0,
              background: '#0f172a', // slate-900 background
              fontSize: '14px',
              lineHeight: '1.5',
              padding: '16px',
            }}
            codeTagProps={{
              style: {
                fontSize: '14px',
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", source-code-pro, monospace',
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }

  // Fallback to regular pre if no code content
  return (
    <div className="relative group my-6">
      <pre
        className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed border border-slate-700"
        {...props}
      >
        {children}
      </pre>
      {/* Copy button for fallback */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            <Copy className="h-3 w-3 text-slate-300" />
          )}
        </Button>
      </div>
    </div>
  );
}
