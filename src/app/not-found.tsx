import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NotFoundAnimation from "@/app/_components/NotFoundAnimation";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found — Victory",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.eyebrow} aria-hidden="true">
          <span className={styles.status}>Page missing</span>
          <span>404 / Wrong turn</span>
        </div>

        <div className={styles.scene}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <NotFoundAnimation className={styles.animation} />
        </div>

        <section className={styles.message} aria-labelledby="not-found-title">
          <h1 className={styles.title} id="not-found-title">
            This page wandered off.
          </h1>
          <p className={styles.description}>
            The cat could not find it either. Head home and pick up the trail
            from there.
          </p>
          <Link className={styles.homeLink} href="/">
            Return home <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </main>
  );
}
