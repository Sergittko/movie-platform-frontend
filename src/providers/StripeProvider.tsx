'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface IStripeProviderProps {
  children: ReactNode;
}

const StripeProvider = ({ children }: IStripeProviderProps) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
