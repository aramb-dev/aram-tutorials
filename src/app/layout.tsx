import { Analytics } from '@/components/analytics/Analytics';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { FloatingHeader } from '@/components/layout/FloatingHeader';
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { GlobalFooter } from '@/components/ui/GlobalFooter';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aram Tutorials - Tech Made Simple',
  description:
    'Learn technology through clear, practical tutorials. From programming to development tools - we make tech simple, one tutorial at a time.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      ><StackProvider app={stackServerApp}><StackTheme>
        <FloatingHeader />
        <main className="flex-grow">{children}</main>
        <GlobalFooter />
        <CookieConsent />
        <Analytics />
      </StackTheme></StackProvider></body>
    </html>
  );
}
