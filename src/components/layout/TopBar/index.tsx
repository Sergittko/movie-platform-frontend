import { Film, User } from 'lucide-react';
import Link from 'next/link';

import { topBarRoutes } from '@/constants/routes';
import { AppRoutePathEnum } from '@/types/routes';

const TopBar = () => {
  return (
    <header className="fixed top-0 z-50 w-screen">
      <div
        className="
          flex h-16 items-center justify-between
          px-6 mx-6 mt-4
          backdrop-blur-xl
          bg-white/10
          border border-white/10 rounded-[40px]
          supports-backdrop-filter:bg-white/10
          shadow-[0_4px_30px_rgba(0,0,0,0.1)]
        "
      >
        {/* Left */}
        <div className="flex items-center gap-2">
          <Film className="h-5 w-5 text-white" />
          <span className="text-sm font-semibold tracking-wide text-white">Movies Platform</span>
        </div>

        {/* Center */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          {topBarRoutes.map(({ name, path }) => (
            <Link key={name + path} href={path} className="hover:text-white transition-colors">
              {name}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4 text-white/60 max-w-34 w-full justify-end">
          <Link
            href={AppRoutePathEnum.PROFILE}
            className="p-2.5 border border-white/10 hover:bg-white/10 rounded-full transition-colors"
          >
            <User className="h-4 w-4 cursor-pointer hover:text-white transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
