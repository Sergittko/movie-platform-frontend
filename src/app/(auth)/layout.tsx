import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { AppRoutePathEnum } from '@/types/routes';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <Link
        href={AppRoutePathEnum.HOME}
        className="mb-6 flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      {children}
    </main>
  );
}
