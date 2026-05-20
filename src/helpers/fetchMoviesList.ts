import environment from '@/config';

export const fetchMoviesList = async ({
  endpoint,
  token,
  params,
}: {
  endpoint: string;
  token?: string;
  params?: Record<string, string>;
}) => {
  const query = new URLSearchParams(params as Record<string, string>).toString();

  const res = await fetch(`${environment.BASE_URL}/${endpoint}?${query}`, {
    headers: {
      ...(!!token && {
        Authorization: `Bearer ${token}`,
      }),
    },

    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
};
