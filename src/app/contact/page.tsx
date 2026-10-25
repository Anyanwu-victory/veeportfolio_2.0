import ContactContent from "@/app/contact/_components/ContactContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { getContactPageData } from "@/sanity/lib/pageData";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPageData().catch(() => null);

  return createPageMetadata({
    path: "/contact",
    title:
      data?.seo?.title || "Contact Victory Anyanwu | Frontend Engineer",
    description:
      data?.seo?.description ||
      "Contact Victory Anyanwu in Abuja, Nigeria, about frontend engineering, creative development, or your next web project.",
    shareImage: data?.seo?.shareImage,
  });
}

export default async function ContactPage() {
  const data = await getContactPageData();

  if (!data) notFound();

  return <ContactContent data={data} />;
}
