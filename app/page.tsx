"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [playlist, setPlaylist] = useState<any>(null);

  const createPlaylist = async () => {
    // Checks if the input is empty
    if (!input) {
      return;
    }

    try {
      const response = await fetch("/api/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      console.log(data);
      setPlaylist(data);
      setInput("");
    } catch (error) {
      console.error("Error generating playlist: ", error);
    }
  };

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

    if (threeContainerRef.current) {
      threeContainerRef.current.appendChild(renderer.domElement);
    }

    // Cylinder Object (drum base)
    const sideMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const topBottomMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });
    const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 1, 32);
    const baseCylinder = new THREE.Mesh(baseGeometry, [
      sideMaterial,
      topBottomMaterial,
    ]);

    scene.add(baseCylinder);

    // Array for 6 smaller cylinders
    const numCylinders = 6;
    const radius = 1.25;
    const angleStep = (Math.PI * 2) / numCylinders;

    for (let i = 0; i < numCylinders; i++) {
      const drumDetailGeometry = new THREE.CylinderGeometry(
        0.05,
        0.05,
        0.8,
        32
      );
      const drumDetailMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
      });
      const drumDetailCylinder = new THREE.Mesh(
        drumDetailGeometry,
        drumDetailMaterial
      );
      const angle = i * angleStep;
      drumDetailCylinder.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
      baseCylinder.add(drumDetailCylinder);
    }

    // Add torus rings
    const torusGeometry = new THREE.TorusGeometry(1.22, 0.13, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xfff68a });
    const torus1 = new THREE.Mesh(torusGeometry, torusMaterial);
    torus1.rotation.x = Math.PI / 2;
    torus1.position.set(0, 0.44, 0);
    baseCylinder.add(torus1);

    const torus2 = torus1.clone();
    torus2.position.set(0, -0.44, 0);
    baseCylinder.add(torus2);

    // Tilt drum
    baseCylinder.rotation.x = Math.PI / 24;
    baseCylinder.rotation.z = Math.PI / 24;

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Position camera
    camera.position.z = 5;

    // Floating Music Notes Effect
    const textureLoader = new THREE.TextureLoader();
    const noteTexture = [
      textureLoader.load("/music-note.png"),
      textureLoader.load("/music-note2.png"),
    ];

    // Define the type for notes array
    interface Note {
      sprite: THREE.Sprite;
      speed: number;
    }

    const numNotes = 15;
    const notes: Note[] = []; // Explicitly define type

    for (let i = 0; i < numNotes; i++) {
      const spriteMaterial = new THREE.SpriteMaterial({
        map: noteTexture[Math.floor(Math.random() * noteTexture.length)], // Assigns a single texture
        transparent: true,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.5, 0.5, 1);

      sprite.position.set(
        (Math.random() - 0.5) * 8, // Random x position
        Math.random() * 5, // Random y position
        (Math.random() - 0.5) * 8 // Random z position
      );

      scene.add(sprite);
      notes.push({ sprite, speed: Math.random() * 0.005 + 0.002 });
    }

    // Animate only upwards
    const animateNotes = () => {
      notes.forEach(({ sprite, speed }) => {
        sprite.position.y += speed; // Move upwards

        if (sprite.position.y > 5) sprite.position.y = -2; // Reset when it gets too high
      });
    };

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      baseCylinder.rotation.y += 0.01;
      animateNotes();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      renderer.dispose();
      threeContainerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        height: "205vh",
        backgroundImage: "radial-gradient(circle, #c63aa7, #481c7a, #000000)",
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
          color: "white",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h1 className="afacadFlux">
          plAIlist
          <br />
          Time to curate the best playlist of your life.
        </h1>
      </div>

      {/* Second Section */}
      <div
        className="section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 className="afacadFlux">
          Describe what type of music you're interested in.
          <br />
          Play the guitar to generate.
        </h1>
        {/* Chat Box Input */}
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#fff",
            padding: "4px 20px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <input
            type="text"
            placeholder="Enter keywords..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              color: "#48484c",
              border: "none",
              outline: "none",
              fontSize: "16px",
              width: "200px",
              padding: "8px",
              borderRadius: "20px",
            }}
          />

          {/* Guitar Icon as a Link */}
          <button
            onClick={createPlaylist}
            style={{
              cursor: "pointer",
              width: "30px",
              height: "30px",
              marginLeft: "15px", // Space between input box and icon
              marginBottom: "10px",
            }}
          >
            <Image
              src="/guitar-icon.png"
              alt="Guitar Icon"
              width={30}
              height={30}
            />
          </button>
        </div>

        {/*Display Playlist*/}
        <div className="afacadFlux">
          {playlist && (
            <div style={{ marginTop: "20px" }}>
              <h1 className="justify-items-center">Generated Playlist</h1>
              <ul className="text-left">
                {playlist.playlist
                  .split("\n")
                  .map((song: string, index: number) => (
                    <li key={index}>{song}</li>
                  ))}
              </ul>
              <div>
                <h1 className="afacadFlux mt-20">
                  Would You Like to Import This Playlist into Spotify?
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
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
