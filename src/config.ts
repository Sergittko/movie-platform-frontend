const environment = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001',
  SUPABASE_HOST: process.env.NEXT_PUBLIC_SUPABASE_HOST || '',
  TMDB_IMAGE_URL: process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p',
};

export default environment;
