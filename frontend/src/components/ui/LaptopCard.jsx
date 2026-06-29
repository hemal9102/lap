"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const colors = {
  bgCard: "#0a101f",
  cyan: "#06b6d4",
  purple: "#8b5cf6",
  text: "#f8fafc",
  textMuted: "#94a3b8",
  border: "rgba(255,255,255,0.06)",
  blue: "#3b82f6",
};

export default function LaptopCard({ laptop, index, isHome = false }) {
  const [hovered, setHovered] = useState(false);
  const accentColor = index % 2 === 0 ? colors.cyan : colors.purple;

  let imgSrc = laptop.img || laptop.image;
  if (!imgSrc && laptop.images) {
    try {
      const parsed = JSON.parse(laptop.images);
      if (Array.isArray(parsed) && parsed.length > 0) imgSrc = parsed[0];
    } catch(e) {
      if (typeof laptop.images === 'string') imgSrc = laptop.images;
    }
  }
  if (imgSrc && imgSrc.startsWith('/uploads')) {
    imgSrc = `http://localhost:5000${imgSrc}`;
  }
  if (!imgSrc) imgSrc = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80";

  // Use standard img tag instead of next/image to avoid next.config.js domain restrictions for external DB URLs
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={isHome ? { opacity: 1, y: 0 } : undefined}
      viewport={isHome ? { once: true } : undefined}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24,
        background: colors.bgCard,
        overflow: "hidden",
        border: `1px solid ${hovered ? accentColor + "40" : colors.border}`,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: hovered ? `0 20px 60px ${accentColor}20` : "0 4px 30px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ position: "relative", height: 240, overflow: "hidden", background: "#050a15" }}>
        <img src={imgSrc} alt={laptop.name || laptop.title || "Laptop"} style={{
          width: "100%", height: "100%",
          objectFit: "cover", opacity: hovered ? 1 : 0.7,
          transform: hovered ? "scale(1.08)" : "scale(1)", transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)"
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a101f 0%, transparent 80%)", zIndex: 2 }} />
        {laptop.badge && (
          <span style={{
            position: "absolute", top: 16, left: 16, zIndex: 3, padding: "4px 12px", borderRadius: 100,
            background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", color: "#fff", fontSize: 11, fontWeight: 700,
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            {laptop.badge}
          </span>
        )}
      </div>

      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 12, color: colors.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "1px" }}>
          {typeof laptop.brand === 'object' ? laptop.brand?.name : laptop.brand} {laptop.category ? `· ${typeof laptop.category === 'object' ? laptop.category?.name : laptop.category}` : ''}
        </p>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: colors.text, marginBottom: 12 }}>{laptop.name || laptop.title}</h3>
        <p style={{ fontSize: 14, color: colors.textMuted, marginBottom: 24, flex: 1 }}>{laptop.specs || laptop.desc}</p>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: `1px solid ${colors.border}` }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: colors.text }}>
            {typeof laptop.price === 'number' ? `₹${laptop.price.toLocaleString('en-IN')}` : laptop.price}
          </span>
        </div>
        
        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <Link href={laptop.href || `/laptops/${laptop.id}`} style={{
            flex: 1, padding: "12px", borderRadius: 12, textAlign: "center", fontSize: 14, fontWeight: 700,
            background: "rgba(255,255,255,0.05)", border: `1px solid ${colors.border}`, color: colors.text,
            transition: "all 0.3s"
          }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)" }}
             onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)" }}>
            Details
          </Link>
          <Link href="/contact" style={{
            flex: 1, padding: "12px", borderRadius: 12, textAlign: "center", fontSize: 14, fontWeight: 700,
            background: hovered ? `linear-gradient(135deg, ${accentColor}, ${colors.blue})` : "rgba(255,255,255,0.08)",
            color: "#fff", transition: "all 0.3s", boxShadow: hovered ? `0 8px 20px ${accentColor}40` : "none",
            border: hovered ? "none" : `1px solid ${colors.border}`
          }}>
            Inquire
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
