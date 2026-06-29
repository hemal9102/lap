"use client";
import { colors } from "@/lib/theme";
import GlowOrb from "@/components/GlowOrb";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";



function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(index === 0);
  const accent = index % 2 === 0 ? colors.cyan : colors.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: open ? `linear-gradient(135deg, ${accent}15, ${colors.bgCard})` : "rgba(255,255,255,0.02)",
        border: `1px solid ${open ? accent + "40" : colors.border}`,
        borderRadius: 24, overflow: "hidden", transition: "all 0.4s",
        boxShadow: open ? `0 10px 30px ${accent}20` : "none"
      }}
    >
      <button 
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "transparent", border: "none", color: colors.text, cursor: "pointer", textAlign: "left"
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 700 }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ color: accent }}>
          <ChevronDown size={24} />
        </motion.div>
      </button>
      
      <motion.div 
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div style={{ padding: "0 32px 32px", color: colors.textMuted, fontSize: 16, lineHeight: 1.6 }}>
          {a}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FaqClient({ faqs }) {
  return (
    <div style={{ minHeight: "100vh", background: colors.bg, overflow: "hidden", position: "relative" }}>
      <GlowOrb color={colors.purple} size="600px" top="-10%" left="20%" delay={0} />
      <GlowOrb color={colors.pink} size="400px" top="40%" left="70%" delay={2} />

      <section style={{ paddingTop: 160, paddingBottom: 60, textAlign: "center", position: "relative", zIndex: 10, paddingLeft: 24, paddingRight: 24 }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 900, marginBottom: 16, letterSpacing: "-1px" }}
        >
          Frequently Asked <span style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.pink})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 18, color: colors.textMuted, maxWidth: 600, margin: "0 auto", fontWeight: 300 }}
        >
          Everything you need to know about our products, shipping, and support.
        </motion.p>
      </section>

      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 120px", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: 20 }}>
        {faqs.map((faq, idx) => (
          <FaqItem key={idx} index={idx} q={faq.q} a={faq.a} />
        ))}
      </section>
    </div>
  );
}
