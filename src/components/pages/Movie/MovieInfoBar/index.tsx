import { FC } from 'react';

import RowContainer from '@/components/basic/layouts/RowContainer';

interface IMovieInfoProps {
  label: string;
  value: string | number;
}

const MovieInfo: FC<IMovieInfoProps> = ({ label, value }) => {
  return (
    <RowContainer className="items-center">
      <p className="w-25 text-[13px] font-normal text-white/60">{label}:</p>
      <p className="text-sm font-medium text-white/80">{value}</p>
    </RowContainer>
  );
};

export default MovieInfo;
