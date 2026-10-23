import ContactContent from "@/app/contact/_components/ContactContent";
import { sanityFetch } from "@/sanity/lib/live";
import { contactPageQuery, type ContactPageData } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: contactPageQuery });

  if (!data) notFound();

  return <ContactContent data={data as ContactPageData} />;
}
