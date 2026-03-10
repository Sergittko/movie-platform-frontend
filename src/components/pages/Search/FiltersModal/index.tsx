import { SlidersHorizontal } from 'lucide-react';

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

import GenresFilter from './GenresFilter';
import RatingFilter from './RatingFilter';
import ReleaseYearFilter from './ReleaseYearFilter';

const FiltersModal = () => {
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <RoundedIconButton icon={SlidersHorizontal} />
          </DialogTrigger>

          <DialogContent className="max-h-[calc(100vh-50px)] max-w-125 min-w-fit overflow-auto sm:max-w-sm xl:min-w-[calc(100%-50%)]">
            <DialogHeader>
              <DialogTitle>Movies filters</DialogTitle>
              <DialogDescription>Customize your search by applying filters below</DialogDescription>
            </DialogHeader>

            <ColContainer>
              {/* SORT */}
              <div className="flex w-full flex-col gap-3">
                <Label className="text-sm font-semibold text-white/80">Sort by</Label>
                <ToggleOptions options={sortByOptions} />
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
              <Button type="submit">Apply filters</Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="ghost" className="ml-auto">
                Reset filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default FiltersModal;
