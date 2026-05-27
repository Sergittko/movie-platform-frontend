'use client';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Crown, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface IPremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PremiumDialog = ({ open, onOpenChange }: IPremiumDialogProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) return;

      // TEMP MOCK
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log({
        name,
        email,
      });

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-black/50 p-6 backdrop-blur-2xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/10">
              <Crown className="size-5 text-white/70" />
            </div>

            <DialogTitle>Premium Membership</DialogTitle>
          </div>

          <DialogDescription className="flex items-center gap-1.5">
            <span>Unlock premium movie features and exclusive content.</span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-white">Premium Plan</p>

              <p className="text-sm text-white/50">Unlimited access</p>
            </div>

            <div>
              <span className="text-3xl font-bold text-white">$9</span>

              <span className="ml-1 text-sm text-white/50">/month</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <Input
            placeholder="Cardholder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-white/10 bg-white/5"
          />

          <Input
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-white/10 bg-white/5"
          />

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    color: '#ffffff',
                    fontSize: '16px',
                    '::placeholder': {
                      color: 'rgba(255,255,255,0.4)',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={handleSubscribe} disabled={isLoading} className="w-full rounded-4xl">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Subscribe to Premium'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumDialog;
