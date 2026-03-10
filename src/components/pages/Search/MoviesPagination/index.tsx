'use client';
import { FC } from 'react';

import useScrollToTop from '@/components/hooks/useScrollToTop';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { allMoviesData } from '@/constants/movies-widget-data';

interface IMoviesPaginationProps {
  moviesPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MoviesPagination: FC<IMoviesPaginationProps> = ({ moviesPerPage, page, setPage }) => {
  const totalPages = Math.ceil(allMoviesData.length / moviesPerPage);

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      const isFirst = i === 1;
      const isLast = i === totalPages;
      const isNearCurrent = Math.abs(i - page) <= 1;

      if (isFirst || isLast || isNearCurrent) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === page}
              onClick={(e) => {
                e.preventDefault();
                setPage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if ((i === page - 2 && page > 3) || (i === page + 2 && page < totalPages - 2)) {
        pages.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    return pages;
  };

  useScrollToTop([page]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              setPage((p) => Math.max(p - 1, 1));
            }}
          />
        </PaginationItem>

        {renderPages()}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              setPage((p) => Math.min(p + 1, totalPages));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MoviesPagination;
