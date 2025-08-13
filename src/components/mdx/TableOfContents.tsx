'use client';

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TOCItem[];
  className?: string;
  sticky?: boolean;
}

export function TableOfContents({
  items,
  className,
  sticky = true,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [tocItems, setTocItems] = useState<TOCItem[]>(items || []);

  // Auto-generate TOC from page headings if not provided
  useEffect(() => {
    if (!items) {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const generatedItems: TOCItem[] = Array.from(headings).map(heading => ({
        id:
          heading.id ||
          heading.textContent?.toLowerCase().replace(/\s+/g, '-') ||
          '',
        title: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      }));
      setTocItems(generatedItems);
    }
  }, [items]);

  // Scrollspy functionality
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems
        .map(item => document.getElementById(item.id))
        .filter(Boolean);

      const currentHeading = headingElements.find(heading => {
        if (!heading) return false;
        const rect = heading.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 0;
      });

      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav className={cn('w-full max-w-xs', sticky && 'sticky top-8', className)}>
      <div className="border border-border rounded-lg p-4 bg-background">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          Table of Contents
        </h3>
        <ul className="space-y-1">
          {tocItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  'text-left w-full px-2 py-1 rounded text-sm transition-colors hover:bg-muted',
                  activeId === item.id
                    ? 'text-brand-primary bg-brand-primary/10 font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                  // Indent based on heading level
                  item.level === 2 && 'ml-0',
                  item.level === 3 && 'ml-4',
                  item.level === 4 && 'ml-8',
                  item.level === 5 && 'ml-12',
                  item.level === 6 && 'ml-16'
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
