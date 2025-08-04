'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Button } from './button';

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  debounceMs?: number;
  showSearchButton?: boolean;
  autoFocus?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({
    placeholder = 'Search...',
    value = '',
    onChange,
    onSearch,
    onClear,
    className,
    debounceMs = 300,
    showSearchButton = false,
    autoFocus = false,
    ...props
  }, ref) => {
    const [searchValue, setSearchValue] = useState(value);
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Debounce the search value
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(searchValue);
      }, debounceMs);

      return () => clearTimeout(timer);
    }, [searchValue, debounceMs]);

    // Call onChange when debounced value changes
    useEffect(() => {
      if (onChange) {
        onChange(debouncedValue);
      }
    }, [debouncedValue, onChange]);

    // Update local state when external value changes
    useEffect(() => {
      setSearchValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    };

    const handleClear = () => {
      setSearchValue('');
      setDebouncedValue('');
      if (onClear) {
        onClear();
      }
      if (onChange) {
        onChange('');
      }
    };

    const handleSearch = () => {
      if (onSearch) {
        onSearch(searchValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        e.preventDefault();
        handleSearch();
      }
      if (e.key === 'Escape') {
        handleClear();
      }
    };

    return (
      <div className={cn('relative flex items-center', className)}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={ref}
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={cn(
              'pl-10',
              searchValue && 'pr-10',
              showSearchButton && 'rounded-r-none'
            )}
            autoFocus={autoFocus}
            {...props}
          />
          {searchValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {showSearchButton && (
          <Button
            type="button"
            onClick={handleSearch}
            className="rounded-l-none border-l-0"
            variant="outline"
          >
            Search
          </Button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };