import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-figtree)', 'sans-serif'],
      },
    },
  },
};

export default config;
