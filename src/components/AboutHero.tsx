"use client";

import styles from "./NeonRoom.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import type { AboutPageData, SiteImageData } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const ease = [0.22, 1, 0.36, 1] as const;

const statementComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
  },
  marks: {
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="about-hero__em">{children}</em>
    ),
  },
};

function getArtworkSource(artwork: SiteImageData) {
  if (artwork.source === "site") return artwork.path;
  if (!artwork.image?.asset) return undefined;

  return urlFor(artwork.image).width(1560).fit("max").auto("format").url();
}

type AboutHeroProps = {
  data: AboutPageData;
};

export default function AboutHero({ data }: AboutHeroProps) {
  const artworkSource = getArtworkSource(data.artwork);

  return (
    <div className="about-hero__stage">
      <div className={`about-hero ${styles.hero}`}>
        <div className="about-hero__intro indent-14 lg:indent-26 font-display">
          <PortableText
            value={data.statement}
            components={statementComponents}
          />
        </div>

        <motion.div
          className="about-hero__banner"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.55, ease }}
        >
          {artworkSource && (
            <Image
              src={artworkSource}
              alt={data.artwork.alt}
              fill
              className="about-hero__banner-img"
              priority
              sizes="(min-width: 1024px) 78rem, 100vw"
            />
          )}
        </motion.div>

        <div className="about-hero__footer">
          <p className="about-hero__caption">{data.artworkCaption}</p>

          <p className="about-hero__outro font-clash">
            {data.introduction}
          </p>
        </div>
      </div>
    </div>
  );
}
