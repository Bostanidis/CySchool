'use client';

import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ubuntu = Geist({
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    // Prevent scrolling on auth pages
    if (isAuthPage) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isAuthPage]);

  return (
    <html lang="en">
      <body className={`${ubuntu.variable} antialiased`}>
        {isAuthPage ? (
          // Render auth pages without sidebar
          <div className="h-screen overflow-hidden">
            {children}
          </div>
        ) : (
          // Render normal pages with sidebar
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
              {children}
            </main>
          </SidebarProvider>
        )}
      </body>
    </html>
  );
}