import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Sora } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="flex min-h-screen w-screen flex-col overflow-x-hidden font-sora">
        {children}
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
