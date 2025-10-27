'use client';

import { Button } from '@/components/ui/Button';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TutorialsSearchProps {
  isDark?: boolean;
}

export function TutorialsSearch({ isDark = false }: TutorialsSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );

  // Update search value when URL params change
  useEffect(() => {
    setSearchValue(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set('search', query.trim());
    } else {
      params.delete('search');
    }

    // Reset to first page when searching
    params.delete('page');

    const searchString = params.toString();
    const url = searchString ? `/tutorials?${searchString}` : '/tutorials';

    router.push(url);
  };

  const handleClear = () => {
    setSearchValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('page');

    const searchString = params.toString();
    const url = searchString ? `/tutorials?${searchString}` : '/tutorials';

    router.push(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchValue);
    }
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${
              isDark ? 'text-slate-400' : 'text-muted-foreground'
            }`}
          />
          <input
            type="text"
            placeholder="Search tutorials, topics, or technologies..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full h-16 pl-12 pr-12 text-lg rounded-l-xl border ${
              isDark
                ? 'bg-white/10 border-white/20 text-white placeholder:text-slate-300 focus:bg-white/15 focus:border-brand-primary focus:outline-none focus:ring-0 backdrop-blur-sm'
                : 'bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
            }`}
          />
          {searchValue && (
            <button
              type="button"
              onClick={handleClear}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          size="lg"
          className={`h-16 px-6 rounded-l-none rounded-r-xl ${
            isDark
              ? 'bg-brand-primary hover:bg-brand-light text-white border-brand-primary'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
}
