'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { usersApi } from '@/api/users/usersApi';
import { Loader } from '@/components/basic/Loader';
import { useAppDispatch, useAppSelector, useAuth } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';
import { setUserData } from '@/redux/user/userSlice';
import { AppRoutePathEnum } from '@/types/routes';

export function PublicProvider({ children }: { children: React.ReactNode }) {
  const isAuth = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userId = useAppSelector(userSelectors.getUserId);

  const userData = useQuery({
    queryKey: [`getUserById-${userId}`],
    queryFn: () => usersApi.getUserById(userId),
    select: (res) => res.data.data,
    enabled: !!userId,
    retry: 3,
  });

  const isAuthWithProfile = isAuth && userId && userData.data && userData.isSuccess;

  useEffect(() => {
    if (userData.data) dispatch(setUserData(userData.data.profile));
  }, [userData.data]);

  useEffect(() => {
    if (isAuthWithProfile) {
      router.push(AppRoutePathEnum.PROFILE);
    }
  }, [isAuthWithProfile, router]);

  if (userData.isLoading) return <Loader full />;

  if (!isAuth || !isAuthWithProfile) {
    return <>{children}</>;
  }

  return null;
}
