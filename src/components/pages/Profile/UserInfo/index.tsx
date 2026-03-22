import { LogOut, Star, User } from 'lucide-react';

import ColContainer from '@/components/basic/layouts/ColContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const UserInfo = () => {
  return (
    <Card className="sticky top-26 h-[calc(100vh-128px)] max-w-1/5">
      <CardContent className="flex flex-1">
        <ColContainer className="h-[stretch] w-full items-center">
          <div className="flex h-30 w-30 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <User className="h-10 w-10 text-white/60" />
          </div>

          <div className="space-y-0.5">
            <p className="w-full text-center text-base font-medium text-white">John</p>

            <p className="w-full text-center text-sm text-white/60">johnmail@example.com</p>
          </div>

          <Button
            className="flex w-full items-center justify-center gap-1 rounded-4xl hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            variant="outline"
          >
            <p>Get premium</p>
            <Star className="relative top-px" />
          </Button>

          <Button
            className="flex w-full items-center justify-center gap-1 rounded-4xl hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            variant="outline"
          >
            <p>See match list</p>
          </Button>

          <Button
            className="mt-auto flex w-full items-center justify-between rounded-4xl"
            variant="outline"
          >
            <p>Log out</p>
            <LogOut />
          </Button>
        </ColContainer>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
