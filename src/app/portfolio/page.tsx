import PlaygroundContent from "@/app/portfolio/_components/PlaygroundContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { getPlaygroundPageData } from "@/sanity/lib/pageData";
import { notFound } from "next/navigation";

export const metadata: Metadata = createPageMetadata({
  path: "/portfolio",
  title: "Frontend Projects and Creative Development | Victory Anyanwu",
  description:
    "Browse interactive websites, frontend experiments, and creative development projects by Victory Anyanwu, built with modern web technologies.",
});

export default async function PlaygroundPage() {
  const data = await getPlaygroundPageData();

  if (!data) notFound();

  return <PlaygroundContent data={data} />;
}
