'use client';

import { Github, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-border/30 border-t bg-neutral-900/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row">
        <p className="hidden text-xs text-white/70 sm:block">Built for movie lovers 🎬</p>

        <p className="text-xs text-white/70">© 2026 Movie Platform | Sergio Diorov</p>

        <div className="flex w-full max-w-32.75 items-center justify-center gap-2 sm:justify-end">
          <Link
            href="https://github.com/"
            target="_blank"
            className="p-2 text-white/70 transition hover:text-white/40"
          >
            <Github className="h-4 w-4" />
          </Link>

          <Link
            href="mailto:your@email.com"
            className="p-2 text-white/70 transition hover:text-white/40"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
