import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kedar Panchal",
  description: "My portfolio site!",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="toolbar">
          <h1><Link href="/" style={{ textDecoration: "none" }}>Kedar Panchal</Link></h1>
          <h2><Link href="/" style={{ textDecoration: "none" }}>About</Link></h2>
          <h2><Link href="/" style={{ textDecoration: "none" }}>Experience</Link></h2>
          <h2><Link href="/" style={{ textDecoration: "none" }}>Projects</Link></h2>
          <h2><Link href="/" style={{ textDecoration: "none" }}>Certifications</Link></h2>
        </div>
        {children}
      </body>
    </html>
  );
}
