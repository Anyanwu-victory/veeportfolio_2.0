"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import ButterflyLoader from "@/components/ButterflyLoader";
import HomePage from "@/pages/home"; 
import Header from "@/components/Header";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />} */}
      {!isLoaded && <ButterflyLoader onComplete={() => setIsLoaded(true)} />}

         <main
        style={{
          opacity: isLoaded ? 1 : 0,
          visibility: isLoaded ? 'visible' : 'hidden',
          transition: 'opacity 1s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* Header is fixed — lives outside the flow */}
        <Header />

        {/* Hero fills the full screen, header overlaps it from top */}
        <HomePage/>

        {/* Navigation sits in the middle of the hero — position it inside HeroSection */}
      </main>
    </div>
  );
}

