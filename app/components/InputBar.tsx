"use client";

import React from "react";
import Link from "next/link";

export default function InputBar() {
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
      <Link href="/generate-playlist">
        <img
          src="/guitar-icon.png"
          alt="Guitar Icon"
          style={{
            cursor: "pointer",
            width: "30px",
            height: "30px",
            marginLeft: "15px", // Space between input box and icon
          }}
        />
      </Link>
    </div>
  );
}
