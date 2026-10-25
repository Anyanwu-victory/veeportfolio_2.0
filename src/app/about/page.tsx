import AboutContent from "@/app/about/_components/AboutContent";
import type { Metadata } from "next";
import { createPageMetadata, siteUrl } from "@/lib/site";
import { getAboutPageData } from "@/sanity/lib/pageData";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPageData();

  return createPageMetadata({
    path: "/about",
    title: data?.seo?.title || "About Victory Anyanwu — Frontend Engineer",
    description:
      data?.seo?.description ||
      "Learn about Victory Anyanwu, a frontend engineer and creative developer based in Abuja, Nigeria.",
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
      jobTitle: "Frontend Engineer and Creative Developer",
      description:
        data.seo?.description ||
        "Frontend engineer and creative developer based in Abuja, Nigeria.",
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
