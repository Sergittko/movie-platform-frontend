'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ProfileProvider } from '@/providers/ProfileProvider';
import { useAuth } from '@/redux/hooks';
import { AppRoutePathEnum } from '@/types/routes';

export function PrivateProvider({ children }: { children: React.ReactNode }) {
  const isAuth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push(AppRoutePathEnum.LOGIN);
    }
  }, [isAuth, router]);

  if (typeof window !== 'undefined' && !isAuth) {
    return null;
  }

  return isAuth ? <ProfileProvider>{children}</ProfileProvider> : null;
}
