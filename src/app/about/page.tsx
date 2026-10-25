import AboutContent from "@/app/about/_components/AboutContent";
import type { Metadata } from "next";
import { createPageMetadata, siteUrl } from "@/lib/site";
import { getAboutPageData } from "@/sanity/lib/pageData";
import { notFound } from "next/navigation";

const aboutDescription =
  "Learn about Victory Anyanwu, a frontend engineer based in Abuja, Nigeria, and his approach to building thoughtful web experiences.";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPageData().catch(() => null);

  return createPageMetadata({
    path: "/about",
    title: data?.seo?.title || "About Victory Anyanwu | Frontend Engineer",
    description: data?.seo?.description || aboutDescription,
    shareImage: data?.seo?.shareImage,
  });
}

export default async function AboutPage() {
  const data = await getAboutPageData();

  if (!data) notFound();

  const profileUrl = new URL("/about", siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profileUrl,
    mainEntity: {
      "@type": "Person",
      name: "Victory Anyanwu",
      jobTitle: "Frontend Engineer",
      description: data.seo?.description || aboutDescription,
      url: profileUrl,
      sameAs: [
        "https://github.com/Anyanwu-victory",
        "https://linkedin.com/in/victory-anyanwu",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AboutContent data={data} />
    </>
  );
}
