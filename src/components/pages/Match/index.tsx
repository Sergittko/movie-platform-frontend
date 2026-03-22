import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import MoviesMatchCarousel from './MoviesMatchCarousel';

const MatchPage = () => {
  return (
    <Card className="min-h-full">
      <CardHeader className="text-center">
        <CardTitle>Find Your Next Movie</CardTitle>
        <div>
          <CardDescription>Swipe through random picks and build your watch list</CardDescription>
          <CardDescription>Select or skip movies and move to next</CardDescription>
        </div>
      </CardHeader>

      <Separator className="bg-white/20" />

      <CardContent className="flex flex-1 items-center justify-center">
        <MoviesMatchCarousel />
      </CardContent>
    </Card>
  );
};

export default MatchPage;
