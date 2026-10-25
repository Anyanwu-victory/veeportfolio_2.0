import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import "./about.css";
import RouteShell from "@/components/layout/RouteShell";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { resumeLinkQuery } from "@/sanity/lib/queries";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let resumeHref: string | null = null;

  try {
    const { data } = await sanityFetch({ query: resumeLinkQuery });
    resumeHref = (data as { href?: string } | null)?.href ?? null;
  } catch {
    // Keep the portfolio available if Sanity cannot be reached.
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="flex min-h-full w-full flex-col bg-surface">
        <RouteShell resumeHref={resumeHref}>{children}</RouteShell>
        <SanityLive />
      </body>
    </html>
  );
}
