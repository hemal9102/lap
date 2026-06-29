"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/laptops", label: "Catalog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Support" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: scrolled
            ? "rgba(3, 7, 18, 0.85)"
            : "rgba(3, 7, 18, 0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 16,
                color: "#fff",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
              }}
            >
              N
            </div>
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#fff",
              }}
            >
              Next<span style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Top</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 36,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  letterSpacing: "0.3px",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              aria-label="Search"
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: "none",
                background: "rgba(255,255,255,0.04)",
                color: "#94a3b8",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#94a3b8"; }}
            >
              <Search size={18} />
            </button>
            <Link
              href="/admin"
              aria-label="Admin Dashboard"
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                color: "#94a3b8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#94a3b8"; }}
            >
              <User size={18} />
            </Link>
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: "none",
                background: "rgba(255,255,255,0.04)",
                color: "#94a3b8",
                cursor: "pointer",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
              className="mobile-menu-btn"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: "rgba(3, 7, 18, 0.95)",
            backdropFilter: "blur(30px)",
            display: "flex",
            flexDirection: "column",
            padding: "40px 24px",
            gap: 8,
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: "#f8fafc",
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                opacity: 0,
                animation: `slideUp 0.4s ease-out ${i * 0.1}s forwards`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
