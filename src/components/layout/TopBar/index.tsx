import { Film, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { topBarRoutes } from '@/constants/routes';
import { AppRoutePathEnum } from '@/types/routes';

const TopBar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 max-w-full min-w-full px-6">
      <div className="mx-auto mt-4 flex h-16 w-full max-w-6xl items-center justify-between rounded-[40px] border border-white/10 bg-white/10 px-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl supports-backdrop-filter:bg-white/10">
        {/* Left */}
        <div className="flex items-center gap-2">
          <Film className="h-5 w-5 text-white" />
          <span className="text-sm font-semibold tracking-wide text-white">Movies Platform</span>
        </div>

        {/* Center */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {topBarRoutes.map(({ name, path }) => (
            <Link
              key={name + path}
              href={path}
              className={`transition-colors hover:text-white ${
                pathname.includes(path) ? 'text-white' : 'text-white/70'
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex w-full max-w-34 items-center justify-end gap-4 text-white/60">
          <Link
            href={AppRoutePathEnum.PROFILE}
            className="rounded-full border border-white/10 p-2.5 transition-colors hover:bg-white/10"
          >
            <User className="h-4 w-4 cursor-pointer transition-colors hover:text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
