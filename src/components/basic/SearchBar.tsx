'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import { useSearchFilters } from '@/providers/SearchFilersProvider';

import { RoundedIconButton } from './RoundedIconButton';

interface SearchBarProps {
  onSearch?: () => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { isFetching, setSearchByNameValue, setPage } = useSearchFilters();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  // useEffect(() => {
  // if (!debouncedQuery.trim()) return;
  // }, [debouncedQuery, onSearch]);            // TODO: show search results in list

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSearchByNameValue(debouncedQuery.trim());
    setPage(1);
  };

  const handleReset = () => {
    setQuery('');
    setSearchByNameValue('');
    setPage(1);
  };

  return (
    <form className="group flex w-full max-w-xl items-center justify-center gap-4">
      <div
        className={cn(
          'relative flex h-13 w-full items-center rounded-full border border-white/10 bg-white/3 backdrop-blur-md transition-all duration-300 focus-within:border-white/20 focus-within:bg-white/5 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.06)]',
          isFetching && 'border-white/5 bg-white/1',
        )}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
          placeholder="Type movie name"
          className={cn(
            'w-full bg-transparent px-5 py-3.5 pr-10 text-sm text-white outline-none placeholder:text-white/20',
            isFetching && 'text-white/50 placeholder:text-white/5',
          )}
          disabled={isFetching}
        />

        <button
          className={cn(
            'absolute top-0 right-4 bottom-0 m-auto text-white/60 transition-all duration-300 hover:text-white/80',
            isFetching && 'text-white/30!',
            !query.trim() && 'hidden',
          )}
          onClick={handleReset}
          type="button"
          disabled={isFetching || !query.trim()}
        >
          <X className="size-5" />
        </button>
      </div>

      <RoundedIconButton icon={Search} type="button" onClick={handleSubmit} disabled={isFetching} />
    </form>
  );
};

export default SearchBar;
