import "./globals.css";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kedar Panchal | AI/ML Developer | Software Engineer | Texas A&M Computer Science Honors",
  description: "The portfolio website for Kedar Panchal, a software developer, AI/ML engineer, and Computer Science and Engineering Honors student at Texas A&M. Features a modular, agentic, RAG-powered chatbot to talk about his work experience and skills.",
  metadataBase: new URL("https://www.kedarpanchal.dev"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Kedar Panchal | AI/ML Developer | Software Engineer | Texas A&M Computer Science Honors",
    description: "The portfolio website for Kedar Panchal, a software developer, AI/ML engineer, and Computer Science and Engineering Honors student at Texas A&M. Features a modular, agentic, RAG-powered chatbot to talk about his work experience and skills.",
  },
  generator: "Next.js",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
