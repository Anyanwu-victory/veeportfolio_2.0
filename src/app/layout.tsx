import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import "./about.css";
import RouteShell from "@/components/layout/RouteShell";
import { SanityLive } from "@/sanity/lib/live";

const garamond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Victory -- Frontend Developer",
  description: "A portfolio website showcasing the work and projects of Victory, a talented developer and designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="flex min-h-full w-full flex-col bg-surface">
        <RouteShell>{children}</RouteShell>
        <SanityLive />
      </body>
    </html>
  );
}
