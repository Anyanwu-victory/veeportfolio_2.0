import WorkContent from "@/app/work/_components/WorkContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { getWorkPageData } from "@/sanity/lib/pageData";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWorkPageData();

  return createPageMetadata({
    path: "/work",
    title: data?.seo?.title || "Frontend Engineering Experience — Victory Anyanwu",
    description:
      data?.seo?.description ||
      "Explore frontend engineering experience from Victory Anyanwu, based in Abuja, Nigeria.",
    shareImage: data?.seo?.shareImage,
  });
}

export default async function WorkPage() {
  const data = await getWorkPageData();

  if (!data) notFound();

  return <WorkContent data={data} />;
}
