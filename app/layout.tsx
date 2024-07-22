import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-screen flex-col overflow-x-hidden font-sora">
        {children}
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
