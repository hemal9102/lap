"use client";
import { motion } from "framer-motion";

export default function GlowOrb({ color, size, top, left, delay = 0 }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{
        position: "absolute", width: size, height: size, borderRadius: "50%",
        background: color, filter: "blur(120px)", top, left, pointerEvents: "none", zIndex: 0
      }}
    />
  );
}
