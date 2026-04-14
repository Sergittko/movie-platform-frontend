import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { TanstackProvider } from '@/providers/TanstackProvider';

export const metadata: Metadata = {
  title: 'Movies Portal',
};

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body>
        <TanstackProvider>
          {children}

          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  );
}
