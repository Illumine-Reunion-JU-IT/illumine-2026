import localFont from 'next/font/local';

export const mechsuit = localFont({
  src: '../../public/fonts/Mechsuit.otf',
  display: 'swap',
  variable: '--font-mechsuit',
});

export const ttLakes = localFont({
  src: [
    { path: '../../public/fonts/TT-Lakes-Neue-Trial-Regular.ttf', weight: '400' },
    { path: '../../public/fonts/TT-Lakes-Neue-Trial-Medium.ttf', weight: '500' },
  ],
  display: 'swap',
  variable: '--font-tt-lakes',
});