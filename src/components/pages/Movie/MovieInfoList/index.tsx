import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import RowContainer from '@/components/basic/layouts/RowContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTmdbImage } from '@/helpers/getTmdbImage';
import { cn } from '@/lib/utils';

export type MovieInfoItem = {
  image: string;
  title: string;
  subTitle?: string;
  redirectLink?: string;
};

interface IMovieInfoListProps {
  listTitle: string;
  data: MovieInfoItem[];
}

const MovieInfoList: FC<IMovieInfoListProps> = ({ data, listTitle }) => {
  const router = useRouter();

  return (
    <Card className="gap-4">
      <CardHeader className="justify-center">
        <CardTitle>{listTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <RowContainer className="overflow-x-auto">
          {data.map((item, index) => (
            <div
              key={item.title + index}
              onClick={() => item?.redirectLink && router.push(item.redirectLink)}
              className="group"
            >
              {item?.image?.length ? (
                <Image
                  src={getTmdbImage(item.image)}
                  alt={item.title}
                  width={250}
                  height={330}
                  loading="lazy"
                  className={cn(
                    'h-37 max-h-37 max-w-28 min-w-28 rounded-xl object-cover',
                    item?.redirectLink &&
                      'cursor-pointer transition duration-300 group-hover:opacity-50',
                  )}
                />
              ) : (
                <div className="flex h-37 max-h-37 max-w-28 min-w-28 items-center justify-center rounded-xl bg-white/5">
                  <span className="text-6xl font-bold text-white/10">{item.title.charAt(0)}</span>
                </div>
              )}

              <p
                className={cn(
                  'mt-2 line-clamp-2 w-28 max-w-28 text-center text-sm font-semibold text-white/80',
                  item?.redirectLink && 'cursor-pointer transition group-hover:text-white/50',
                )}
              >
                {item.title}
              </p>

              {!!item.subTitle && (
                <p className="text-center text-xs font-normal text-white/50">({item.subTitle})</p>
              )}
            </div>
          ))}
        </RowContainer>
      </CardContent>
    </Card>
  );
};

export default MovieInfoList;
