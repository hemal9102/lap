"use client";
import { colors } from "@/lib/theme";
import GlowOrb from "@/components/GlowOrb";

import { motion } from "framer-motion";



export default function LegalClient() {
  return (
    <div style={{ minHeight: "100vh", background: colors.bg, overflow: "hidden", position: "relative" }}>
      <GlowOrb color={colors.blue} size="600px" top="-10%" left="-10%" delay={0} />
      <GlowOrb color={colors.cyan} size="500px" top="60%" left="70%" delay={2} />

      <section style={{ paddingTop: 160, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, marginBottom: 16, letterSpacing: "-1px" }}
        >
          Terms & <span style={{ background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Privacy</span>
        </motion.h1>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 120px", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: 32 }}>
        
        {/* Privacy Policy */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${colors.border}`, backdropFilter: "blur(20px)", borderRadius: 32, padding: "48px" }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: colors.text }}>Privacy Policy</h2>
          <div style={{ color: colors.textMuted, fontSize: 16, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 16 }}>
            <p>We take your privacy seriously. We only collect the minimum amount of data required to process your orders and provide a seamless browsing experience. We will never sell your data to third parties.</p>
            <p>For any data deletion requests, please contact our support team securely via the contact page.</p>
          </div>
        </motion.div>

        {/* Terms of Service */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${colors.border}`, backdropFilter: "blur(20px)", borderRadius: 32, padding: "48px" }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: colors.text }}>Terms of Service</h2>
          <div style={{ color: colors.textMuted, fontSize: 16, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 16 }}>
            <p>By using this website, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern NextTop's relationship with you.</p>
          </div>
        </motion.div>

      </section>
    </div>
  );
}
