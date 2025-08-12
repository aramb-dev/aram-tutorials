'use client';

import { SearchInput } from '@/components/ui/SearchInput';
import { useRouter } from 'next/navigation';

export function HeroSearch() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/tutorials?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/tutorials');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <SearchInput
        placeholder="Search tutorials..."
        onSearch={handleSearch}
        showSearchButton={true}
        className="w-full"
      />
    </div>
  );
}
