import { SlidersHorizontal, X } from 'lucide-react';

import ToggleOptions from '@/components/basic/form-controls/ToggleGroup';
import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import { RoundedIconButton } from '@/components/basic/RoundedIconButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { sortByOptions } from '@/constants/movies-filters';
import { cn } from '@/lib/utils';
import { useSearchFilters } from '@/providers/SearchFilersProvider';
import { SortByEnum } from '@/types/movies-filters';

import GenresFilter from './GenresFilter';
import RatingFilter from './RatingFilter';
import ReleaseYearFilter from './ReleaseYearFilter';

const FiltersModal = () => {
  const {
    filters: { sortBy },
    setFilters,
    handleSearchByFilters,
    handleResetFilters,
    isFetching,
    isFiltersEmpty,
  } = useSearchFilters();

  const handleSortChange = (value: string) => {
    setFilters((prev) => {
      let sortBy: SortByEnum | null = value as SortByEnum;

      if (prev.sortBy === value) sortBy = null;

      return {
        ...prev,
        sortBy,
      };
    });
  };

  return (
    <>
      <Dialog>
        <form>
          <div className="relative">
            <DialogTrigger asChild disabled={isFetching}>
              <RoundedIconButton icon={SlidersHorizontal} />
            </DialogTrigger>
            <button
              onClick={handleResetFilters}
              className={cn(
                'absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500/50 p-1 text-xs text-white transition hover:bg-red-500/80',
                isFiltersEmpty && 'hidden',
              )}
              type={'button'}
            >
              <X />
            </button>
          </div>

          <DialogContent className="max-h-[calc(100vh-50px)] max-w-125 min-w-fit overflow-auto sm:max-w-sm xl:min-w-[calc(100%-50%)]">
            <DialogHeader>
              <DialogTitle>Movies filters</DialogTitle>
              <DialogDescription>Customize your search by applying filters below</DialogDescription>
            </DialogHeader>

            <ColContainer>
              {/* SORT */}
              <div className="flex w-full flex-col gap-3">
                <Label className="text-sm font-semibold text-white/80">Sort by</Label>
                <ToggleOptions options={sortByOptions} value={sortBy} onChange={handleSortChange} />
              </div>

              <RowContainer>
                {/* GENRES */}
                <GenresFilter />

                <ColContainer className="w-full">
                  {/* RELEASE YEAR */}
                  <ReleaseYearFilter />

                  {/* RATING */}
                  <RatingFilter />
                </ColContainer>
              </RowContainer>
            </ColContainer>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={handleSearchByFilters}>
                  Apply filters
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="ghost" className="ml-auto" onClick={handleResetFilters}>
                  Reset filters
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default FiltersModal;
