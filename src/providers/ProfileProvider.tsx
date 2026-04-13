'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { usersApi } from '@/api/users/usersApi';
import { Loader } from '@/components/basic/Loader';
import { logout } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector, useAuth } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';
import { setUserData, userLogout } from '@/redux/user/userSlice';
import { AppRoutePathEnum } from '@/types/routes';

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const path = usePathname();

  const userId = useAppSelector(userSelectors.getUserId);
  const isPathAuth =
    path.includes(AppRoutePathEnum.REGISTER) || path.includes(AppRoutePathEnum.LOGIN);

  const userData = useQuery({
    queryKey: [`getUserById-${userId}`],
    queryFn: () => usersApi.getUserById(userId),
    select: (res) => res.data.data,
    enabled: !!userId,
    retry: 3,
  });

  useEffect(() => {
    const { data, isSuccess, isError, error } = userData;

    if (data && isSuccess) {
      dispatch(setUserData(data.profile));
      isPathAuth && router.push(AppRoutePathEnum.PROFILE);
    }

    if (isError && error) {
      dispatch(logout());
      dispatch(userLogout());
      !isAuth && router.push(AppRoutePathEnum.LOGIN);
    }
  }, [userData.data, userData.isSuccess, userData.isError, userData.error, isAuth]);

  if (userData.isLoading) return <Loader full />;

  return <> {isAuth && <>{children}</>}</>;
}
