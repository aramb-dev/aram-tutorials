'use client';

import { SearchInput } from '@/components/ui/SearchInput';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function TutorialsSearch() {
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
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('page');

    const searchString = params.toString();
    const url = searchString ? `/tutorials?${searchString}` : '/tutorials';

    router.push(url);
  };

  return (
    <div className="w-full max-w-lg">
      <SearchInput
        placeholder="Search tutorials..."
        value={searchValue}
        onChange={setSearchValue}
        onSearch={handleSearch}
        onClear={handleClear}
        showSearchButton={true}
        className="w-full"
      />
    </div>
  );
}
