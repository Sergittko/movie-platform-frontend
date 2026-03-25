'use client';

import { Film, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { mobileMenuRoutes } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { AppRoutePathEnum } from '@/types/routes';

const MobileSidebar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const isActive = (path: AppRoutePathEnum) => {
    if (path === AppRoutePathEnum.HOME) {
      return pathname === path;
    }

    return pathname.startsWith(path);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Burger button */}
      <Button variant="outline" onClick={() => setOpen(true)} className="sm:hidden">
        <Menu className="size-5" />
      </Button>

      <div
        onClick={() => setOpen(false)}
        className={cn(
          'fixed -top-4 -left-6 z-40 bg-black/80 backdrop-blur-3xl transition-opacity duration-600',
          open ? 'h-screen w-screen opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed -top-4 -left-6 z-50 h-fit w-screen transform bg-mist-900/50 backdrop-blur-3xl transition-all duration-400',
          open ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
        )}
      >
        {/* Header */}
        <div className="border-border/40 flex w-full items-center justify-between border-b px-8 py-5">
          <div className="flex items-center gap-2">
            <Film className="size-5 text-white/90" />
            <span className="text-sm font-semibold tracking-wide text-white/90">
              Movies Platform
            </span>
          </div>

          <Button variant="outline" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-7">
          {mobileMenuRoutes.map(({ name, path, icon }) => {
            const Icon = icon;
            const isActiveItem = isActive(path);

            return (
              <Link
                key={name + path}
                href={path}
                onClick={() => setOpen(false)}
                className={cn(
                  'group text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-white/80',
                  isActiveItem && 'text-foreground! bg-white/80!',
                )}
              >
                {!!Icon && (
                  <Icon className="h-4 w-4 opacity-70 transition group-hover:opacity-100" />
                )}
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-border/40 mt-auto border-t p-7">
          <p className="text-muted-foreground text-xs">© 2026 Movie Tracker</p>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
