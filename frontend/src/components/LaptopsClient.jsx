"use client";
import { colors } from "@/lib/theme";
import GlowOrb from "@/components/GlowOrb";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";



import LaptopCard from "@/components/ui/LaptopCard";

export default function LaptopsClient({ laptops, brands }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: colors.bg, overflow: "hidden", paddingBottom: 100 }}>
      {/* Orbs */}
      <GlowOrb color={colors.purple} size="600px" top="-10%" left="-10%" delay={0} />
      <GlowOrb color={colors.cyan} size="500px" top="40%" left="80%" delay={2} />

      {/* Header */}
      <div style={{ paddingTop: 140, paddingBottom: 60, paddingLeft: 24, paddingRight: 24, textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-2px", color: colors.text, marginBottom: 16 }}
        >
          The <span style={{ background: `linear-gradient(135deg, ${colors.cyan}, ${colors.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Arsenal</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 18, color: colors.textMuted, maxWidth: 600, margin: "0 auto", fontWeight: 300 }}
        >
          Browse our curated selection of {laptops.length}+ premium laptops across all budgets and use-cases.
        </motion.p>
      </div>

      {/* Filter Bar (Visual Only for now) */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{ maxWidth: 1280, margin: "0 auto 40px", padding: "0 24px", display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 10 }}
      >
        {brands.map((b) => (
          <Link key={b} href={b === "All" ? "/laptops" : `/laptops?brand=${b}`} style={{
            padding: "8px 20px", borderRadius: 100, fontSize: 14, fontWeight: 500,
            background: b === "All" ? "rgba(6, 182, 212, 0.15)" : "rgba(255,255,255,0.03)",
            border: b === "All" ? `1px solid ${colors.cyan}50` : `1px solid ${colors.border}`,
            color: b === "All" ? colors.cyan : colors.textMuted,
            textDecoration: "none", transition: "all 0.3s"
          }} onMouseEnter={(e) => { if(b !== "All") { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"} }}
             onMouseLeave={(e) => { if(b !== "All") { e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.borderColor = colors.border} }}>
            {b}
          </Link>
        ))}
      </motion.div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32, position: "relative", zIndex: 10 }}>
        {laptops.map((laptop, i) => (
          <LaptopCard key={laptop.id} laptop={laptop} index={i} />
        ))}
      </div>
    </div>
  );
}
