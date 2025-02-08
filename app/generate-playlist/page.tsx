"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);

  const [playlist, setPlaylist] = useState<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections
    document.querySelectorAll(".section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        height: "205vh",
        backgroundImage: "radial-gradient(circle, #37ff63, #ffffff)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        scrollBehavior: "smooth",
      }}
    >
      {/* Three.js Cylinder Container */}
      <div
        ref={threeContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      ></div>

      {/* First Section */}
      <div
        className="section"
        style={{
          minHeight: "55vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          textAlign: "center",
        }}
      >
        <h1 className="afacadFlux">
          Here's ur damn playlist
          <br />
          I'm so sleepy.
        </h1>
      </div>

      {/* Second Section */}
      <div
        className="section"
        style={{
          minHeight: "150vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          textAlign: "center",
        }}
      >
        <h1 className="afacadFlux">
          would u like to bring it to spotify -,-
          <br />
          Play the guitar.
        </h1>
        <div>
          {/* Icon to Spotify link */}
          <Link
            href="https://www.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/guitar-icon.png"
              alt="Guitar Icon"
              style={{
                cursor: "pointer",
                width: "30px",
                height: "30px",
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
