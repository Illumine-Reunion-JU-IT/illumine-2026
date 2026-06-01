import { Metadata } from 'next';
import React from 'react';
import ErrorPage from '@/components/ui/ErrorPage';

export const metadata: Metadata = {
  title: 'System Error | Illumine 2026',
  description: 'An unexpected system disruption has occurred. Please return to core terminal coordinates.',
  openGraph: {
    title: 'System Error | Illumine 2026',
    description: 'An unexpected system disruption has occurred. Please return to core terminal coordinates.',
    url: 'https://illumine-reunion-ju-it.vercel.app/error',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'System Error | Illumine 2026',
    description: 'An unexpected system disruption has occurred.',
  },
};

export default function Error() {
  return <ErrorPage />;
}