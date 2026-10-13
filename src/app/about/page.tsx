import AboutContent from "@/app/about/_components/AboutContent";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutPageQuery, type AboutPageData } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: aboutPageQuery });

  if (!data) notFound();

  return <AboutContent data={data as AboutPageData} />;
}
