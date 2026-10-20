import WorkContent from "@/app/work/_components/WorkContent";
import { sanityFetch } from "@/sanity/lib/live";
import { workPageQuery, type WorkPageData } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export default async function WorkPage() {
  const { data } = await sanityFetch({ query: workPageQuery });

  if (!data) notFound();

  return <WorkContent data={data as WorkPageData} />;
}
