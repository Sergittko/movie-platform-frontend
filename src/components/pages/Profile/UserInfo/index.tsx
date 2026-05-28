'use client';

import { Crown, Edit, FolderDot, LogOut } from 'lucide-react';
import { useState } from 'react';

import ColContainer from '@/components/basic/layouts/ColContainer';
import UserAvatar from '@/components/basic/UserAvatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppSelector, useLogOut } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';

import EditProfileModal from './EditProfileModal';

const UserInfo = () => {
  const handleLogOut = useLogOut();
  const userData = useAppSelector(userSelectors.getUserData);
  const { name, email } = userData;

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="sticky top-26 h-[calc(100vh-128px)] w-full max-w-1/6 py-4">
        <CardContent className="flex flex-1 px-4">
          <ColContainer className="h-[stretch] w-full items-center gap-3">
            <button onClick={() => setIsEditOpen(true)}>
              <UserAvatar />
            </button>

            <div className="w-full space-y-0.5">
              <p className="w-full text-center text-base font-medium text-white">{name}</p>

              <p className="w-full text-center text-[12px] text-white/60">{email}</p>
            </div>

            <Button
              className="flex h-8! w-full items-center justify-start gap-2 rounded-4xl hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              variant="outline"
              onClick={() => setIsEditOpen(true)}
            >
              <div className="flex size-4 items-center justify-center">
                <Edit className="relative left-0.5 size-3.5" />
              </div>
              <p>Edit profile</p>
            </Button>

            <Button
              className="flex h-8! w-full items-center justify-start gap-2 rounded-4xl hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              variant="outline"
              disabled
            >
              <div className="flex size-4 items-center justify-center">
                <FolderDot className="relative left-0.5" />
              </div>
              <p>Match list</p>
            </Button>

            <Button
              className="flex h-8! w-full items-center justify-start gap-2 rounded-4xl hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              variant="outline"
            >
              <div className="flex size-4 items-center justify-center">
                <Crown className="relative top-px" />
              </div>
              <p>Premium</p>
            </Button>

            <Button
              className="mt-auto flex h-8! w-full items-center justify-start rounded-4xl"
              variant="outline"
              onClick={handleLogOut}
            >
              <div className="flex size-4 items-center justify-center">
                <LogOut className="relative top-px rotate-180" />
              </div>
              <p>Log out</p>
            </Button>
          </ColContainer>
        </CardContent>
      </Card>

      <EditProfileModal open={isEditOpen} onOpenChange={setIsEditOpen} />
    </>
  );
};

export default UserInfo;
