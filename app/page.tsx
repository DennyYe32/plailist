"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // GSAP Scroll Animation
    gsap.to(".section", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div ref={scrollContainerRef} style={{ overflowY: "scroll", height: "200vh", backgroundColor: "#000000" }}>
      {/* Scrollable Sections */}
      <div className="section" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", opacity: 0, transform: "translateY(50px)" }}>
        <h1>Time to curate the best playlist of your life.</h1>
      </div>

      <div className="section" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", opacity: 0, transform: "translateY(50px)" }}>
        <h1>Enter keywords to describe what music you're interested in.</h1>
      </div>
    </div>
  );
}
