"use client";
import { colors } from "@/lib/theme";
import GlowOrb from "@/components/GlowOrb";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import LaptopCard from "@/components/ui/LaptopCard";
import { useEffect, useState, useRef } from "react";

/* ─── Reusable Style Objects ─── */


function FeatureCard({ icon, title, desc, accentColor, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "40px 32px",
        borderRadius: 24,
        background: hovered
          ? `linear-gradient(135deg, ${accentColor}10, ${colors.bgCard})`
          : colors.bgCard,
        border: `1px solid ${hovered ? accentColor + "30" : colors.border}`,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 60px ${accentColor}15, 0 0 0 1px ${accentColor}20`
          : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Glow effect on hover */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: accentColor,
          filter: "blur(80px)",
          opacity: hovered ? 0.15 : 0,
          transition: "opacity 0.5s",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: colors.text,
            marginBottom: 12,
            letterSpacing: "-0.3px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: hovered ? "#cbd5e1" : colors.textDim,
            transition: "color 0.4s",
          }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function HomeClient() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const features = [
    {
      icon: "⚡",
      title: "Quantum Speed",
      desc: "Latest gen processors with PCIe 5.0 NVMe SSDs and DDR5 RAM. Compile massive codebases, render 4K video — zero lag, zero waiting.",
      accentColor: colors.cyan,
    },
    {
      icon: "💎",
      title: "Aerospace Build",
      desc: "Machined from a single block of aerospace-grade aluminum. Military-grade durability meets featherweight portability.",
      accentColor: colors.purple,
    },
    {
      icon: "👁️",
      title: "Retina Reality",
      desc: "120Hz OLED panels with 100% DCI-P3 color gamut and ProMotion. Your code and creations, displayed in absolute truth.",
      accentColor: colors.emerald,
    },
  ];

  const [products, setProducts] = useState([]);
  const [isLidOpen, setIsLidOpen] = useState(false);
  const [showLaptops, setShowLaptops] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/laptops")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          // Format them to match LaptopCard expected props
          const formatted = data.data.slice(0, 10).map(l => ({
            id: l.id,
            name: l.name,
            brand: l.brand?.name || "Unknown",
            category: l.category?.name || "",
            desc: l.description,
            price: "₹" + l.price.toLocaleString("en-IN"),
            img: l.images ? JSON.parse(l.images)[0] : "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
            specs: l.specifications ? Object.values(JSON.parse(l.specifications)).join(" · ") : "",
          }));
          setProducts(formatted);
        }
      });
      
    // Trigger animation sequence
    setTimeout(() => {
      setIsLidOpen(true);
      setTimeout(() => {
        setShowLaptops(true);
      }, 1000);
    }, 1500);
  }, []);

  return (
    <>

      {/* ─── HERO ─── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 60px",
          overflow: "hidden",
        }}
      >
        {/* Background orbs */}
        <GlowOrb color={colors.purple} size="700px" top="-15%" left="-10%" delay={0} />
        <GlowOrb color={colors.cyan} size="500px" top="30%" left="70%" delay={2} />
        <GlowOrb color={colors.blue} size="400px" top="60%" left="20%" delay={4} />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto" }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 32,
              padding: "8px 20px",
              borderRadius: 100,
              border: "1px solid rgba(6, 182, 212, 0.2)",
              background: "rgba(6, 182, 212, 0.06)",
              backdropFilter: "blur(12px)",
              fontSize: 14,
              fontWeight: 500,
              color: colors.cyan,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: colors.cyan,
                boxShadow: `0 0 12px ${colors.cyan}`,
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            Introducing NextTop Gen-X Series
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontSize: "clamp(42px, 8vw, 96px)",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1.05,
              marginBottom: 24,
              color: colors.text,
            }}
          >
            Power Beyond
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue}, ${colors.purple})`,
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientShift 6s ease infinite",
              }}
            >
              Imagination.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "clamp(16px, 2.5vw, 22px)",
              color: colors.textMuted,
              maxWidth: 640,
              margin: "0 auto 48px",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            The ultimate portable workstations for developers, creators, and gamers.
            Uncompromising performance meets breathtaking design.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/laptops"
              style={{
                padding: "16px 36px",
                borderRadius: 16,
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                transition: "all 0.3s",
                boxShadow: "0 8px 30px rgba(6, 182, 212, 0.3)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(6, 182, 212, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(6, 182, 212, 0.3)";
              }}
            >
              Explore Catalog
            </Link>
            <Link
              href="/about"
              style={{
                padding: "16px 36px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                backdropFilter: "blur(12px)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Discover NextTop
            </Link>
          </motion.div>

          {/* 3D Laptop Opening Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              marginTop: 60,
              perspective: 1200,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: 300
            }}
          >
            {/* The Laptop */}
            <div style={{ position: "relative", width: 500, height: 300, transformStyle: "preserve-3d" }}>
              {/* Lid */}
              <motion.div
                initial={{ rotateX: -90 }}
                animate={{ rotateX: isLidOpen ? 0 : -90 }}
                transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: 300,
                  background: "#111",
                  borderRadius: "16px 16px 0 0",
                  border: "2px solid #333",
                  borderBottom: "none",
                  transformOrigin: "bottom",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 -10px 40px rgba(6, 182, 212, 0.2)",
                  backfaceVisibility: "hidden"
                }}
              >
                {/* Screen content */}
                <div style={{
                  position: "absolute",
                  inset: 8,
                  background: "#000",
                  borderRadius: "8px 8px 0 0",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {showLaptops && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                      style={{
                        color: colors.cyan,
                        fontSize: 24,
                        fontWeight: "bold",
                        textAlign: "center",
                        textShadow: `0 0 20px ${colors.cyan}`
                      }}
                    >
                      <span style={{ display: 'block', fontSize: 40, marginBottom: 10 }}>🚀</span>
                      SYSTEM ONLINE
                    </motion.div>
                  )}
                  {/* Screen Glare */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    pointerEvents: "none"
                  }} />
                </div>
              </motion.div>

              {/* Base */}
              <div style={{
                position: "absolute",
                bottom: -15,
                width: "104%",
                left: "-2%",
                height: 15,
                background: "#222",
                borderRadius: "0 0 16px 16px",
                borderTop: "2px solid #444",
                boxShadow: "0 20px 40px rgba(0,0,0,0.8)"
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 100,
                  height: 4,
                  background: "#444",
                  borderRadius: "0 0 4px 4px"
                }} />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11, color: colors.textDim, letterSpacing: "2px", textTransform: "uppercase" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 24,
              height: 40,
              borderRadius: 12,
              border: `2px solid ${colors.textDim}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: 4,
                height: 8,
                borderRadius: 2,
                background: colors.cyan,
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURES (BENTO GRID) ─── */}
      <section style={{ padding: "120px 24px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 80 }}
          >
            <h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16 }}>
              Masterfully{" "}
              <span style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.pink})`, WebkitBackgroundClip: "text"}}>
                Engineered
              </span>
            </h2>
            <p style={{ fontSize: 18, color: colors.textMuted, maxWidth: 560, margin: "0 auto", fontWeight: 300 }}>
              Every microchip, every curve — designed to eliminate bottlenecks and accelerate your workflow.
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gridAutoRows: "minmax(300px, auto)",
            gap: 24,
          }}>
            {/* Main Feature - Large Span */}
            <div style={{ gridColumn: "1 / -1", '@media (minWidth: 768px)': { gridColumn: "span 2" } }}>
               <FeatureCard index={0} icon="⚡" title="Quantum Speed & Thermal Dynamics" desc="Equipped with the latest gen Intel Core Ultra and Apple M-Series processors. We use liquid metal thermal compounds and vapor chamber cooling to ensure zero thermal throttling, even during 8K video renders." accentColor={colors.cyan} />
            </div>
            
            <FeatureCard index={1} icon="💎" title="Aerospace Build" desc="Machined from a single block of aerospace-grade aluminum. Military-grade durability meets featherweight portability." accentColor={colors.purple} />
            <FeatureCard index={2} icon="👁️" title="Retina Reality" desc="120Hz OLED panels with 100% DCI-P3 color gamut. Your code and creations, displayed in absolute truth." accentColor={colors.emerald} />
            <FeatureCard index={3} icon="🔋" title="Endless Battery" desc="High-density batteries paired with intelligent power management software. Go from dawn to dusk without carrying a charger." accentColor={colors.blue} />
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section
        style={{
          padding: "120px 24px",
          background: "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, #030712 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle accent */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: colors.blue,
            filter: "blur(180px)",
            opacity: 0.08,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 60,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  marginBottom: 8,
                }}
              >
                Elite Collection
              </h2>
              <p style={{ fontSize: 18, color: colors.textMuted, fontWeight: 300 }}>
                Curated masterpieces for those who demand the absolute best.
              </p>
            </div>
            <Link
              href="/laptops"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 100,
                background: `${colors.cyan}12`,
                border: `1px solid ${colors.cyan}30`,
                color: colors.cyan,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${colors.cyan}20`;
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${colors.cyan}12`;
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              View full arsenal →
            </Link>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: 28,
            }}
          >
            {products.map((p, i) => (
              <LaptopCard key={i} index={i} isHome={true} laptop={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        style={{
          padding: "120px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <GlowOrb color={colors.purple} size="500px" top="10%" left="60%" delay={1} />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            padding: "80px 40px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${colors.border}`,
            backdropFilter: "blur(20px)",
            overflow: "hidden",
          }}
        >
          {/* Gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "50%",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${colors.purple}, transparent)`,
              opacity: 0.5,
            }}
          />

          <h2
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Ready to Upgrade
            <br />
            Your Reality?
          </h2>
          <p
            style={{
              fontSize: 18,
              color: colors.textMuted,
              maxWidth: 500,
              margin: "0 auto 40px",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            Join thousands of professionals who already switched to uncompromised computing.
          </p>
          <Link
            href="/laptops"
            style={{
              display: "inline-block",
              padding: "18px 48px",
              borderRadius: 100,
              background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue}, ${colors.purple})`,
              backgroundSize: "200% 200%",
              animation: "gradientShift 4s ease infinite",
              color: "#fff",
              fontWeight: 800,
              fontSize: 18,
              textDecoration: "none",
              boxShadow: `0 12px 40px ${colors.purple}30`,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
              e.currentTarget.style.boxShadow = `0 20px 60px ${colors.purple}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = `0 12px 40px ${colors.purple}30`;
            }}
          >
            Shop the Future
          </Link>
        </motion.div>
      </section>

      {/* ─── SEO CONTENT ─── */}
      <section
        style={{
          padding: "80px 24px",
          borderTop: `1px solid ${colors.border}`,
          background: "rgba(15,23,42,0.3)",
        }}
      >
        <article style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 28,
              letterSpacing: "-0.5px",
            }}
          >
            Why Buy Your Next Laptop From NextTop?
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: colors.textDim,
              marginBottom: 20,
            }}
          >
            When searching for the <strong style={{ color: colors.textMuted }}>best high-performance laptops</strong> on
            the market, you need a retailer that understands the demanding requirements of modern software
            and heavy workloads. At NextTop, we don&apos;t just sell computers; we provide engineered
            solutions for peak productivity.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: colors.textDim,
            }}
          >
            Our meticulously curated catalog ensures that whether you are looking for a{" "}
            <em style={{ color: colors.textMuted }}>gaming laptop with an RTX 4090</em> or a{" "}
            <em style={{ color: colors.textMuted }}>lightweight ultrabook for travel</em>, you will receive
            a machine that has been thoroughly vetted for thermal performance, battery life, and build
            quality.
          </p>
        </article>
      </section>

    </>
  );
}
