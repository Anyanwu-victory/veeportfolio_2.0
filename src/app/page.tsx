import HomeContent from "@/app/_components/HomeContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { getHomePageData } from "@/sanity/lib/pageData";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData().catch(() => null);

  return createPageMetadata({
    path: "/",
    title:
      data?.seo?.title ||
      "Victory Anyanwu — Frontend Engineer in Abuja, Nigeria",
    description:
      data?.seo?.description ||
      "Meet Victory Anyanwu, a frontend engineer in Abuja, Nigeria, creating interactive, accessible web experiences with thoughtful motion and detail.",
    shareImage: data?.seo?.shareImage,
  });
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <main className="m-0 p-0">
        <HomeContent />
      </main>
    </div>
  );
}
