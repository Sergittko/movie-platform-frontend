'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { authApi } from '@/api/auth/authApi';
import authSelectors from '@/redux/auth/authSelectors';
import { setLoginData } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector, useAuth, useLogOut } from '@/redux/hooks';
import { setUserLoginData } from '@/redux/user/userSlice';

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const REFRESH_INTERVAL = 1000 * 60 * 50;
  const isAuth = useAuth();
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const refreshToken = useAppSelector(authSelectors.getRefreshToken);
  const dispatch = useAppDispatch();
  const handleLogOut = useLogOut();

  const {
    data: refetchData,
    isSuccess: isSuccessRefetch,
    error: errorRefetch,
    isError: isErrorRefetch,
    refetch: refreshUserData,
  } = useQuery({
    queryKey: [`refreshUserData`],
    queryFn: () => authApi.refresh(refreshToken),
    select: (res) => res.data,
    enabled: false,
    retry: 2,
  });

  useEffect(() => {
    if (refetchData && isSuccessRefetch) {
      dispatch(setLoginData(refetchData));
      dispatch(setUserLoginData(refetchData));
    }

    if (errorRefetch && isErrorRefetch) handleLogOut();
  }, [refetchData, isSuccessRefetch, errorRefetch, isErrorRefetch]);

  useEffect(() => {
    if (isAuth) refreshUserData();
  }, [isAuth]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuth) {
        refreshUserData();
      }
    }, REFRESH_INTERVAL);

    refreshIntervalRef.current = interval;

    return () => {
      clearInterval(refreshIntervalRef.current as NodeJS.Timeout);
    };
  }, [isAuth, refreshToken, refreshUserData]);

  return <>{children}</>;
}
