import tailwindScrollbarHide from 'tailwind-scrollbar-hide';
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-figtree)', 'sans-serif'],
      },
    },
  },
  plugins: [tailwindScrollbarHide],
};

export default config;
