import PlaygroundContent from "@/app/portfolio/_components/PlaygroundContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { getPlaygroundPageData } from "@/sanity/lib/pageData";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPlaygroundPageData();

  return createPageMetadata({
    path: "/portfolio",
    title: data?.seo?.title || "Creative Development Portfolio — Victory Anyanwu",
    description:
      data?.seo?.description ||
      "Browse interactive websites, frontend experiments, and creative development projects by Victory Anyanwu.",
    shareImage: data?.seo?.shareImage,
  });
}

export default async function PlaygroundPage() {
  const data = await getPlaygroundPageData();

  if (!data) notFound();

  return <PlaygroundContent data={data} />;
}
