"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import ButterflyLoader from "@/components/ButterflyLoader";
import HomePage from "@/pages/home"; 

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />} */}
      {!isLoaded && <ButterflyLoader onComplete={() => setIsLoaded(true)} />}

      <main
        style={{
          opacity: isLoaded ? 1 : 0,
          visibility: isLoaded ? "visible" : "hidden",
          transition: "opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1)",
          transform: isLoaded ? "translateY(0px)" : "translateY(20px)"
        }}
        className="w-full px-4 sm:px-6 lg:px-8"
      >
        <section className="">
             <HomePage/>
        </section>
      </main>
    </div>
  );
}

