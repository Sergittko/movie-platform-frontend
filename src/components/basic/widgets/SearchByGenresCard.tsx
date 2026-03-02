import Link from 'next/link';

import { Card, CardTitle } from '@/components/ui/card';
import { genresData } from '@/constants/genres';

const SearchByGenresCard = () => {
  return (
    <Card className="pt-4 pb-3 gap-0 bg-linear-to-b from-white/3 to-transparent border-white/10">
      <CardTitle className="text-center text-lg font-semibold tracking-tight text-white/90">
        Search by genres
      </CardTitle>

      <div className="px-4 flex items-center gap-4 overflow-x-auto w-full pt-4 pb-2">
        {genresData.map(({ name, slug, icon: Icon }) => (
          <Link key={slug} href={`/search?genre=${slug}`} className="group">
            <div
              className="flex flex-col items-center justify-center
                min-w-22 gap-2 px-3 py-3
                rounded-2xl
                border border-white/10
                bg-white/2
                backdrop-blur-sm
                transition-all duration-300 ease-out
                hover:bg-white/6
                hover:border-white/20
                hover:shadow-[0_0_10px_rgba(255,255,255,0.06)]
                hover:scale-[1.03]
                active:scale-[0.98]
"
            >
              <Icon className="h-5 w-5 text-white/60 group-hover:text-white transition-all group-hover:scale-103" />
              <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                {name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default SearchByGenresCard;
