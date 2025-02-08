"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);

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

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainerRef.current?.appendChild(renderer.domElement);

    // Cylinder Geometry
    const geometry = new THREE.CylinderGeometry(1, 1, 3, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Camera Position
    camera.position.z = 5;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      cylinder.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      threeContainerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={scrollContainerRef} style={{ overflowY: "scroll", height: "200vh", backgroundColor: "#000000" }}>
      {/* Three.js Cylinder Container */}
      <div ref={threeContainerRef} style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none" }}></div>

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
