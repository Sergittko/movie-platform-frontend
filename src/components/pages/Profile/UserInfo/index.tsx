'use client';

import { useMutation } from '@tanstack/react-query';
import { Crown, Edit, FolderDot, LogOut, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { usersApi } from '@/api/users/usersApi';
import ColContainer from '@/components/basic/layouts/ColContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch, useAppSelector, useLogOut } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';
import { setUserPartialData } from '@/redux/user/userSlice';

const UserInfo = () => {
  const handleLogOut = useLogOut();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userSelectors.getUserData);
  const { name, email } = userData;

  const [avatar, setAvatar] = useState<string | null>(userData.avatar);

  const { mutate: uploadAvatarRequest, isPending: uploadAvatarIsFetching } = useMutation({
    mutationFn: (data: { file: File; userId: string }) => usersApi.uploadAvatar(data),
    mutationKey: ['uploadAvatar'],
    onSuccess: (response) => {
      if (response.data.data.avatarUrl) {
        dispatch(setUserPartialData({ avatar: response.data.data.avatarUrl }));
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      uploadAvatarRequest({ file: selectedFile, userId: userData.id });
    }
  };

  useEffect(() => {
    setAvatar(userData.avatar);
  }, [userData.avatar]);

  return (
    <Card className="sticky top-26 h-[calc(100vh-128px)] w-full max-w-1/6 py-4">
      <CardContent className="flex flex-1 px-4">
        <ColContainer className="h-[stretch] w-full items-center gap-3">
          <label
            aria-disabled={uploadAvatarIsFetching}
            className="flex h-30 w-30 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={uploadAvatarIsFetching}
            />

            {avatar ? (
              <Image
                src={avatar || ''}
                alt="avatar"
                width={300}
                height={300}
                className="size-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-white/60" />
            )}
          </label>

          <div className="w-full space-y-0.5">
            <p className="w-full text-center text-base font-medium text-white">{name}</p>

            <p className="w-full text-center text-[12px] text-white/60">{email}</p>
          </div>

          <Button
            className="flex h-8! w-full items-center justify-start gap-2 rounded-4xl hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            variant="outline"
          >
            <div className="flex size-4 items-center justify-center">
              <Edit className="relative left-0.5 size-3.5" />
            </div>
            <p>Edit profile</p>
          </Button>

          <Button
            className="flex h-8! w-full items-center justify-start gap-2 rounded-4xl hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            variant="outline"
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
  );
};

export default UserInfo;
