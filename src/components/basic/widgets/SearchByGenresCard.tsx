import Link from 'next/link';

import { Card, CardTitle } from '@/components/ui/card';
import { genresData } from '@/constants/genres';

const SearchByGenresCard = () => {
  return (
    <Card className="gap-0 border-white/10 bg-linear-to-b from-white/3 to-transparent pt-4 pb-3">
      <CardTitle className="text-center text-lg font-semibold tracking-tight text-white/90">
        Search by genres
      </CardTitle>

      <div className="flex w-full items-center gap-4 overflow-x-auto px-4 pt-4 pb-2">
        {genresData.map(({ name, slug, icon: Icon }) => (
          <Link key={slug} href={`/search?genre=${slug}`} className="group">
            <div className="flex min-w-22 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/2 px-3 py-3 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] hover:border-white/20 hover:bg-white/6 hover:shadow-[0_0_10px_rgba(255,255,255,0.06)] active:scale-[0.98]">
              <Icon className="h-5 w-5 text-white/60 transition-all group-hover:scale-103 group-hover:text-white" />
              <span className="text-sm font-medium text-white/60 transition-colors group-hover:text-white">
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
