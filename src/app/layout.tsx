import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Devanagari, Newsreader } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const newsreader = Newsreader({
  variable: '--font-serif-claude',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: '--font-noto-devanagari',
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Vāc | Intelligent Sanskrit Voice Tutor (Sarvam AI)',
  description: 'A conversational, voice-first Sanskrit learning platform powered by Sarvam AI. Designed for English and Tamil speakers with real-time speech and grammar guidance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#141413] text-[#ecebe8] font-sans">
        {children}
      </body>
    </html>
  );
}
