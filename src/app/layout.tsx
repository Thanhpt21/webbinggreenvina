// src/app/layout.tsx
'use client';

import { ReactNode } from 'react';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppContent from '@/components/layout/AppContent';
import ChatBox from '@/components/layout/ChatBox';
import ContactButtons from '@/components/layout/ContactButtons';



const queryClient = new QueryClient();


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <QueryClientProvider client={queryClient}>
            <AppContent>
              {children}
              <ContactButtons />
              <ChatBox />
            </AppContent>
        </QueryClientProvider>
      </body>
    </html>
  );
}
