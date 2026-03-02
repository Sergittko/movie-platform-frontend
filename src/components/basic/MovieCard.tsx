import { FC } from 'react';

interface IMovieCardProps {
  name: string;
}

const MovieCard: FC<IMovieCardProps> = ({ name }) => {
  return (
    <div className="max-w-42 min-w-42 h-62 p-0 backdrop-blur-xl bg-gray-950 border border-white/10 rounded-[10px] shadow-sm flex flex-col gap-1 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-white/20 cursor-pointer">
      <div className="w-full h-full bg-linear-to-br from-red-900 via-30% via-pink-950 to-gray-950 flex items-center justify-center">
        <span className="text-white/10 text-7xl font-bold select-none">{name.charAt(0)}</span>{' '}
      </div>

      <div className="absolute bottom-0 left-0 h-1/3 bg-linear-to-b from-transparent to-black/40 w-full z-0" />

      <p className="text-white line-clamp-2 text-sm max-h-11 min-h-fit absolute bottom-3 left-3 z-10">
        {name}
      </p>
    </div>
  );
};

export default MovieCard;
