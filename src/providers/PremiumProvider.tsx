import { Crown } from 'lucide-react';
import { FC, useState } from 'react';

import PremiumDialog from '@/components/basic/dialogs/PremiumDialog';
import { Button } from '@/components/ui/button';

interface IPremiumProviderProps {
  children: React.ReactNode;
  text?: string;
}

const PremiumProvider: FC<IPremiumProviderProps> = ({ children, text }) => {
  const [isPremiumDialogOpen, setPremiumDialogOpen] = useState<boolean>(false);
  const isPremium = false;

  const handleOpenDialog = () => setPremiumDialogOpen(true);

  return (
    <div className="w-full">
      {!isPremium && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-zinc-950/50">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-[radial-gradient(circle,rgba(0,0,0,0.50)_0%,rgba(255,255,255,0)_70%)]" />
          <div className="w-full max-w-md p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="text-primary flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.50)] backdrop-blur-3xl">
                <Crown className="h-6 w-6 text-[#39343c]" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white">Premium content</h3>
            <p className="text-sm text-white/70">
              {text || 'Unlock advanced stats, charts and full movie activity tracking.'}
            </p>

            <Button
              className="mt-4 rounded-full border border-[#39343c]/50 bg-[#39343c]/75 hover:border-[#39343c]/60 hover:bg-[#39343c]/40"
              onClick={handleOpenDialog}
            >
              Get Premium
            </Button>
          </div>

          <PremiumDialog open={isPremiumDialogOpen} onOpenChange={setPremiumDialogOpen} />
        </div>
      )}

      <div className={isPremium ? '' : 'blur-[3px]'}>{children}</div>
    </div>
  );
};

export default PremiumProvider;
