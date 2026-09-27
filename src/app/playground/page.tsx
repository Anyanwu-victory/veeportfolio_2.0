import PlaygroundContent from "@/app/playground/_components/PlaygroundContent";
import { sanityFetch } from "@/sanity/lib/live";
import {
  playgroundPageQuery,
  type PlaygroundPageData,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export default async function PlaygroundPage() {
  const { data } = await sanityFetch({ query: playgroundPageQuery });

  if (!data) notFound();

  return <PlaygroundContent data={data as PlaygroundPageData} />;
}
