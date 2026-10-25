import WorkContent from "@/app/work/_components/WorkContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { getWorkPageData } from "@/sanity/lib/pageData";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWorkPageData().catch(() => null);

  return createPageMetadata({
    path: "/work",
    title:
      data?.seo?.title || "Frontend Engineering Experience | Victory Anyanwu",
    description:
      data?.seo?.description ||
      "Explore Victory's frontend engineering experience, selected roles, projects, and the tools used to build interactive web products.",
    shareImage: data?.seo?.shareImage,
  });
}

export default async function WorkPage() {
  const data = await getWorkPageData();

  if (!data) notFound();

  return <WorkContent data={data} />;
}
