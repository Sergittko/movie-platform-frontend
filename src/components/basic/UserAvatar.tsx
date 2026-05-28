'use client';

import { User } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

import { useAppSelector } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';

interface IUserAvatarProps {
  tempAvatar?: string | null;
  className?: string;
}

const UserAvatar: FC<IUserAvatarProps> = ({ tempAvatar = null, className }) => {
  const { avatar } = useAppSelector(userSelectors.getUserData);

  const displayAvatar = tempAvatar || avatar || null;

  return (
    <div
      className={`flex h-30 w-30 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] ${className || ''}`}
    >
      {displayAvatar ? (
        <Image
          src={displayAvatar || ''}
          alt="avatar"
          width={300}
          height={300}
          className="size-full object-cover"
        />
      ) : (
        <User className="h-10 w-10 text-white/60" />
      )}
    </div>
  );
};

export default UserAvatar;
