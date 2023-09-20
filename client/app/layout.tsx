import './globals.css';
import type { Metadata } from 'next';
import Providers from './components/Providers';
import KeyModal from './components/KeyModal';
import LoadingSpinner from './components/LoadingSpinner';

export const metadata: Metadata = {
  title: 'AI Doc Chat',
  description: 'Create by Matyas Zednicek',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="flex flex-col items-center w-full h-full min-h-screen bg-[#E8E8E8] text-gray-950">
            {children}
          </main>
          <KeyModal />
          <LoadingSpinner />
        </Providers>
      </body>
    </html>
  );
}
