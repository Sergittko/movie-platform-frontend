import Link from 'next/link';
import { FC } from 'react';

interface IAuthWrapperCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  linkTo: string;
  linkText: string;
}

const AuthWrapperCard: FC<IAuthWrapperCardProps> = ({
  children,
  title,
  subtitle,
  footerText,
  linkTo,
  linkText,
}) => {
  return (
    <div className="w-full max-w-md rounded-xl border border-white/20 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-1 text-sm text-white/60">{subtitle}</p>
      </div>

      {children}

      <div className="mt-6 text-center text-sm text-white/60">
        {footerText}{' '}
        <Link href={linkTo} className="text-white transition hover:text-white/80">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default AuthWrapperCard;
