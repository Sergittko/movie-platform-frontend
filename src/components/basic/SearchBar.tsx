'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import { RoundedIconButton } from './RoundedIconButton';

interface SearchBarProps {
  onSearch?: () => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;
    // eslint-disable-next-line no-console
    console.log(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (e: React.FormEvent) => {};

  return (
    <form className="group flex w-full max-w-xl items-center justify-center gap-4">
      <div className="relative flex h-13 w-full items-center rounded-full border border-white/10 bg-white/3 backdrop-blur-md transition-all duration-300 focus-within:border-white/20 focus-within:bg-white/5 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.06)]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type movie name"
          className="w-full bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/10"
        />
      </div>

      <RoundedIconButton icon={Search} type="button" onClick={handleSubmit} />
    </form>
  );
};

export default SearchBar;
