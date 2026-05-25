import { cookies } from 'next/headers';

import { IAuthResponse } from '@/api/auth/authTypes';
import environment from '@/config';
import {
  defaultEmptyListResponse,
  MOVIES_LIST_LIMIT,
  MOVIES_LIST_SERVER_API_MAP,
  MoviesListsEnum,
  MoviesListsPayloadType,
  PROTECTED_LISTS,
} from '@/constants/movies-lists';

import { MoviesListTypeEnum } from '../movies/moviesTypes';

export const fetchMoviesListServer = async (listType: MoviesListsEnum | MoviesListTypeEnum) => {
  const cookieStore = await cookies();
  const isFetchProtected = PROTECTED_LISTS.includes(listType);
  const token = cookieStore.get('accessToken')?.value;

  if (isFetchProtected && !token) {
    return defaultEmptyListResponse;
  }

  const me: IAuthResponse = await fetch(`${environment.BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  }).then((r) => r.json());

  const userId = me?.data?.user.id;

  if (isFetchProtected && !userId) {
    return defaultEmptyListResponse;
  }

  const requestFn = MOVIES_LIST_SERVER_API_MAP[listType];

  if (!requestFn) {
    throw new Error('Invalid list type');
  }

  try {
    const response = await requestFn(
      {
        ...(isFetchProtected && { userId }),
        limit: MOVIES_LIST_LIMIT,
        page: 1,
        listType,
      } as MoviesListsPayloadType,
      token || '',
    );

    return response || defaultEmptyListResponse;
  } catch {
    return defaultEmptyListResponse;
  }
};
