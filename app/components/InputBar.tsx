"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { auto } from "openai/_shims/registry.mjs";

export default function InputBar() {
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
      setPlaylist(data);
      console.log(data);
      setInput("");
    } catch (error) {
      console.error("Error generating playlist: ", error);
    }
  };

  return (
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
  );
}
