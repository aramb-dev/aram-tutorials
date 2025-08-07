'use client';

import { useState } from 'react';
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Hash,
  Folder,
  Calendar,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface TutorialsFiltersProps {
  selectedCategory?: string;
  selectedTag?: string;
  searchQuery?: string;
}

export function TutorialsFilters({
  selectedCategory,
  selectedTag,
  searchQuery,
}: TutorialsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    tags: false,
    dateRange: false,
    difficulty: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to first page when filters change
    params.delete('page');

    router.push(`/tutorials?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/tutorials');
  };

  // Mock data for tags and other filters
  const popularTags = [
    { name: 'React', count: 15 },
    { name: 'Next.js', count: 12 },
    { name: 'JavaScript', count: 20 },
    { name: 'TypeScript', count: 10 },
    { name: 'Node.js', count: 8 },
    { name: 'CSS', count: 14 },
    { name: 'Tailwind', count: 9 },
    { name: 'API', count: 7 },
    { name: 'Database', count: 6 },
    { name: 'Authentication', count: 5 },
  ];

  const difficultyLevels = [
    { name: 'Beginner', count: 18 },
    { name: 'Intermediate', count: 22 },
    { name: 'Advanced', count: 10 },
  ];

  const hasActiveFilters = selectedCategory || selectedTag || searchQuery;

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedCategory && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Folder className="h-3 w-3" />
                  {selectedCategory}
                  <button
                    onClick={() => updateFilters('category', null)}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
            {selectedTag && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  {selectedTag}
                  <button
                    onClick={() => updateFilters('tag', null)}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
            {searchQuery && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button
                    onClick={() => updateFilters('search', null)}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Categories Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-sm flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Categories
            </CardTitle>
            {expandedSections.categories ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.categories && (
          <CardContent className="space-y-2">
            {DEFAULT_CATEGORIES.map(category => (
              <button
                key={category.slug}
                onClick={() => updateFilters('category', category.slug)}
                className={`w-full text-left p-2 rounded-md transition-colors hover:bg-muted ${
                  selectedCategory === category.slug
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <Badge variant="outline" className="text-xs">
                    0
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.description}
                </p>
              </button>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Tags Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('tags')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-sm flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Popular Tags
            </CardTitle>
            {expandedSections.tags ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.tags && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <button
                  key={tag.name}
                  onClick={() => updateFilters('tag', tag.name.toLowerCase())}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors ${
                    selectedTag === tag.name.toLowerCase()
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tag.name}
                  <Badge variant="secondary" className="text-xs ml-1">
                    {tag.count}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Difficulty Filter */}
      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection('difficulty')}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Difficulty Level
            </CardTitle>
            {expandedSections.difficulty ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </CardHeader>
        {expandedSections.difficulty && (
          <CardContent className="space-y-2">
            {difficultyLevels.map(level => (
              <button
                key={level.name}
                onClick={() =>
                  updateFilters('difficulty', level.name.toLowerCase())
                }
                className="w-full text-left p-2 rounded-md transition-colors hover:bg-muted text-muted-foreground"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{level.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {level.count}
                  </Badge>
                </div>
              </button>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Quick Actions */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              href="/tutorials?sort=newest"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              → Latest Tutorials
            </Link>
            <Link
              href="/tutorials?sort=popular"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              → Most Popular
            </Link>
            <Link
              href="/tutorials?difficulty=beginner"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              → Beginner Friendly
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
