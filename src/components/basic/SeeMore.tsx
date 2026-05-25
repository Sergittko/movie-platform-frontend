import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ISeeMoreButtonProps {
  seeMoreLink: string;
}

const SeeMoreButton: FC<ISeeMoreButtonProps> = ({ seeMoreLink }) => {
  const router = useRouter();

  const handleRedirect = () => router.push(seeMoreLink);

  return (
    <button
      onClick={handleRedirect}
      className="group flex cursor-pointer items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 transition-colors hover:bg-white/10"
    >
      <p className="relative -top-px text-sm text-white/60 group-hover:text-white">See more</p>

      <ArrowRightIcon className="h-auto w-4 text-white/60 group-hover:text-white" />
    </button>
  );
};

export default SeeMoreButton;
