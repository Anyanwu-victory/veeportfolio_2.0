import HomeContent from "@/app/_components/HomeContent";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  path: "/",
  title: "Victory Anyanwu — Frontend Engineer in Abuja, Nigeria",
  description:
    "Meet Victory Anyanwu, a frontend engineer in Abuja, Nigeria, creating interactive, accessible web experiences with thoughtful motion and detail.",
});

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <main className="m-0 p-0">
        <HomeContent />
      </main>
    </div>
  );
}


