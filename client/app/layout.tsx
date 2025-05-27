import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const ubuntu = Geist({
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CySchool",
  description: "Social Media for all Cyprus Schools, Lyceums and Gymnasiums",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
