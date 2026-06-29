import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Page Not Found | NextTop',
};

export default function NotFound() {
  return (
    <div style={{ background: "#030712", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header />
      
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px", position: "relative" }}>
        
        {/* Glow Effects */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, background: "#8b5cf6", filter: "blur(200px)", opacity: 0.15, pointerEvents: "none", zIndex: 0 }} />
        
        <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
          <h1 style={{ fontSize: "clamp(80px, 15vw, 150px)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-5px", marginBottom: 24, textShadow: "0 0 40px rgba(6, 182, 212, 0.3)" }}>
            404
          </h1>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, color: "#f8fafc", marginBottom: 16 }}>
            Looks like you're lost in cyberspace.
          </h2>
          <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 500, margin: "0 auto 40px" }}>
            The page you are looking for doesn't exist, has been moved, or you might be looking for a feature we haven't built yet!
          </p>
          
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 100,
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff", textDecoration: "none",
              fontWeight: 700, fontSize: 16, boxShadow: "0 8px 30px rgba(59, 130, 246, 0.4)"
            }}>
              Return to Home
            </Link>
            <Link href="/laptops" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 100,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#f8fafc", textDecoration: "none", fontWeight: 700, fontSize: 16
            }}>
              <ShoppingBag size={18} /> Browse Laptops
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
