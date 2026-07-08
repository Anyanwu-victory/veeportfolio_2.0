import Image from "next/image";
import { motion } from "framer-motion";

type IllustrationProps = {
  className?: string;
  /**
   * Drop your 3D render at public/illustration.png (transparent background,
   * character facing left on the couch, matches the comps). Swap this path
   * if you name the file differently.
   */
  src?: string;
};

export default function Illustration({
  className = "",
  src = "/illustration.png",
}: IllustrationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
      className={`relative aspect-4/3 w-full ${className}`}
    >
      {/* Soft ellipse the character sits on, per the comp */}
      <div className="absolute bottom-[8%] left-1/2 h-[18%] w-[78%] -translate-x-1/2 rounded-[50%] bg-[#f4d38a]/70 blur-[2px]" />
      <Image
        src={src}
        alt="Illustration of Goody relaxing on a couch with a laptop and a floor lamp"
        fill
        priority
        className="relative object-contain object-bottom"
        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 90vw"
      />
    </motion.div>
  );
}