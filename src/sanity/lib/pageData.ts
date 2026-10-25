import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  aboutPageQuery,
  contactPageQuery,
  homePageQuery,
  playgroundPageQuery,
  workPageQuery,
  type AboutPageData,
  type ContactPageData,
  type HomePageData,
  type PlaygroundPageData,
  type WorkPageData,
} from "@/sanity/lib/queries";

export const getHomePageData = cache(async () => {
  const { data } = await sanityFetch({ query: homePageQuery });
  return data as HomePageData | null;
});

export const getAboutPageData = cache(async () => {
  const { data } = await sanityFetch({ query: aboutPageQuery });
  return data as AboutPageData | null;
});

export const getWorkPageData = cache(async () => {
  const { data } = await sanityFetch({ query: workPageQuery });
  return data as WorkPageData | null;
});

export const getPlaygroundPageData = cache(async () => {
  const { data } = await sanityFetch({ query: playgroundPageQuery });
  return data as PlaygroundPageData | null;
});

export const getContactPageData = cache(async () => {
  const { data } = await sanityFetch({ query: contactPageQuery });
  return data as ContactPageData | null;
});
