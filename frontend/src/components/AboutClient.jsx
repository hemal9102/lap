"use client";
import { colors } from "@/lib/theme";
import GlowOrb from "@/components/GlowOrb";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";



function StatCard({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ textAlign: "center", position: "relative", zIndex: 1 }}
    >
      <div style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, color: colors.text, marginBottom: 8 }}>{value}</div>
      <div style={{ fontSize: 14, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
    </motion.div>
  );
}

function ValueCard({ icon, title, desc, index, accentColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px", borderRadius: 24,
        background: hovered ? `linear-gradient(135deg, ${accentColor}15, ${colors.bgCard})` : colors.bgCard,
        border: `1px solid ${hovered ? accentColor + "40" : colors.border}`,
        transition: "all 0.4s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        position: "relative", zIndex: 1
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 12 }}>{title}</h3>
      <p style={{ fontSize: 14, color: hovered ? "#cbd5e1" : colors.textMuted, lineHeight: 1.6, transition: "color 0.4s" }}>{desc}</p>
    </motion.div>
  );
}

export default function AboutClient({ stats, values }) {
  return (
    <div style={{ minHeight: "100vh", background: colors.bg, overflow: "hidden" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", paddingTop: 160, paddingBottom: 100, textAlign: "center", paddingLeft: 24, paddingRight: 24 }}>
        <GlowOrb color={colors.purple} size="600px" top="-10%" left="20%" delay={0} />
        <GlowOrb color={colors.cyan} size="400px" top="20%" left="60%" delay={2} />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: "relative", zIndex: 10, maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#a78bfa", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>Our Story</p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-1px" }}>
            Built by Enthusiasts,<br />
            <span style={{ background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue}, ${colors.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>For Smart Buyers</span>
          </h1>
          <p style={{ fontSize: 18, color: colors.textMuted, lineHeight: 1.7, fontWeight: 300 }}>
            We got tired of seeing people buy the wrong laptop because of aggressive salesmen or misleading specs. So we built NextTop — a place where knowledge comes first.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ position: "relative", padding: "60px 24px", borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {stats.map((s, i) => (
            <StatCard key={s.label} index={i} {...s} />
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ position: "relative", padding: "120px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: "relative", zIndex: 1 }}>
            <p style={{ color: colors.cyan, fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>Our Mission</p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, marginBottom: 24, lineHeight: 1.1, letterSpacing: "-1px" }}>Make Every Rupee Count</h2>
            <div style={{ fontSize: 16, color: colors.textMuted, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 16, fontWeight: 300 }}>
              <p>India's laptop market is full of flashy marketing and misleading specs. A ₹60,000 laptop can be either an excellent machine or a terrible waste of money — depending on your needs.</p>
              <p>At NextTop, we cut through the noise. Whether you're a student on a budget, a developer needing maximum RAM, a video editor needing color accuracy, or a gamer chasing FPS — we find the right match.</p>
              <p>We operate out of Ahmedabad and serve customers across Gujarat and pan-India via our online consultation service.</p>
            </div>
          </motion.div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {values.map((v, i) => (
              <ValueCard key={v.title} index={i} accentColor={i % 2 === 0 ? colors.cyan : colors.purple} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <GlowOrb color={colors.blue} size="500px" top="0%" left="50%" delay={1} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ position: "relative", zIndex: 10 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: 16 }}>Ready to Find Your Ideal Laptop?</h2>
          <p style={{ color: colors.textMuted, marginBottom: 40, fontSize: 18 }}>Takes 2 minutes. We reply within 30 minutes.</p>
          <Link href="/contact" style={{
            display: "inline-block", padding: "16px 40px", borderRadius: 100, fontWeight: 700, fontSize: 16, color: "#fff",
            background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue})`, boxShadow: `0 8px 30px ${colors.cyan}40`,
            textDecoration: "none", transition: "all 0.3s"
          }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${colors.cyan}60` }}
             onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 30px ${colors.cyan}40` }}>
            Get Free Expert Advice →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
