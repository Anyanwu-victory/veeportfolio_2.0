import type { Metadata } from "next";

const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = new URL(
  configuredSiteUrl ??
    (productionDomain ? `https://${productionDomain}` : "http://localhost:3000"),
);

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  shareImage?: {
    alt?: string;
    asset?: { url?: string };
  };
};

export function createPageMetadata({
  path,
  title,
  description,
  shareImage,
}: PageMetadataInput): Metadata {
  const imageUrl = shareImage?.asset?.url;
  const images = imageUrl
    ? [{ url: imageUrl, alt: shareImage.alt || title }]
    : undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: new URL(path, siteUrl).toString() },
    openGraph: {
      type: "website",
      url: new URL(path, siteUrl).toString(),
      siteName: "Victory Anyanwu",
      title,
      description,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
