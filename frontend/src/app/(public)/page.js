import Link from "next/link";
import LaptopCard from "@/components/ui/LaptopCard";
import { colors } from "@/lib/theme";

// Generate dynamic metadata for SEO
export const metadata = {
  title: "Premium Laptops & Professional IT Services | NextTop",
  description: "Discover the best high-performance laptops and professional IT services including repairs, AMC, and data recovery. Your ultimate IT partner.",
  openGraph: {
    title: "Premium Laptops & Professional IT Services | NextTop",
    description: "Discover the best high-performance laptops and professional IT services including repairs, AMC, and data recovery.",
    url: "https://nexttop.com",
    siteName: "NextTop",
    locale: "en_US",
    type: "website",
  },
};

// Fetch data on the server (Server Component)
async function getLaptops() {
  try {
    const res = await fetch("http://localhost:5000/api/laptops", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.success) return [];
    
    return data.data.slice(0, 10).map(l => ({
      id: l.id,
      name: l.name,
      brand: l.brand?.name || "Unknown",
      category: l.category?.name || "",
      desc: l.description,
      price: "₹" + l.price.toLocaleString("en-IN"),
      img: l.images ? JSON.parse(l.images)[0] : "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      specs: l.specifications ? Object.values(JSON.parse(l.specifications)).join(" · ") : "",
    }));
  } catch (err) {
    return [];
  }
}

async function getServices() {
  try {
    const res = await fetch("http://localhost:5000/api/services", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  const products = await getLaptops();
  const services = await getServices();

  // Create JSON-LD schema for LocalBusiness
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NextTop Laptop Store",
    "description": "Premium laptops and professional IT services.",
    "url": "https://nexttop.com",
    "telephone": "+91-9876543210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Avenue",
      "addressLocality": "Ahmedabad",
      "postalCode": "380001",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* ─── HERO (Server Rendered) ─── */}
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 60px",
          background: "linear-gradient(180deg, #030712 0%, #0f172a 100%)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "clamp(42px, 8vw, 72px)",
              fontWeight: 900,
              letterSpacing: "-1px",
              lineHeight: 1.1,
              marginBottom: 24,
              color: "#fff",
            }}
          >
            Power Beyond <br/>
            <span style={{ color: "#06b6d4" }}>Imagination.</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 22px)",
              color: "#94a3b8",
              maxWidth: 640,
              margin: "0 auto 48px",
              lineHeight: 1.6,
            }}
          >
            The ultimate portable workstations for developers, creators, and gamers. 
            Coupled with professional IT services and repair solutions.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/laptops"
              style={{
                padding: "16px 36px",
                borderRadius: 8,
                background: "#06b6d4",
                color: "#fff",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Explore Laptops
            </Link>
            <Link
              href="/services"
              style={{
                padding: "16px 36px",
                borderRadius: 8,
                background: "#334155",
                color: "#fff",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SERVICES SECTION (SEO Focused) ─── */}
      <section style={{ padding: "80px 24px", background: "#0f172a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, color: "#fff", marginBottom: 12, fontWeight: 800 }}>Professional IT Services</h2>
          <p style={{ color: "#94a3b8", fontSize: 18, marginBottom: 40 }}>Expert repairs, maintenance, and IT support for your business and personal devices.</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {services.length > 0 ? services.map(service => (
              <div key={service.id} style={{ background: "#1e293b", padding: 32, borderRadius: 12, border: "1px solid #334155" }}>
                <h3 style={{ fontSize: 22, color: "#fff", marginBottom: 12 }}>{service.title}</h3>
                <p style={{ color: "#94a3b8", lineHeight: 1.6, marginBottom: 20 }}>{service.shortDesc || service.description}</p>
                <Link href={`/services/${service.slug}`} style={{ color: "#06b6d4", fontWeight: 600, textDecoration: "none" }}>Learn more →</Link>
              </div>
            )) : (
              // Fallback Services for MVP
              <>
                <div style={{ background: "#1e293b", padding: 32, borderRadius: 12, border: "1px solid #334155" }}>
                  <h3 style={{ fontSize: 22, color: "#fff", marginBottom: 12 }}>Laptop Repair & Upgrade</h3>
                  <p style={{ color: "#94a3b8", lineHeight: 1.6, marginBottom: 20 }}>Screen replacements, battery swaps, and RAM/SSD upgrades performed by certified technicians.</p>
                  <Link href="/contact" style={{ color: "#06b6d4", fontWeight: 600, textDecoration: "none" }}>Get a Quote →</Link>
                </div>
                <div style={{ background: "#1e293b", padding: 32, borderRadius: 12, border: "1px solid #334155" }}>
                  <h3 style={{ fontSize: 22, color: "#fff", marginBottom: 12 }}>Annual Maintenance (AMC)</h3>
                  <p style={{ color: "#94a3b8", lineHeight: 1.6, marginBottom: 20 }}>Comprehensive IT maintenance contracts for offices and startups to ensure zero downtime.</p>
                  <Link href="/contact" style={{ color: "#06b6d4", fontWeight: 600, textDecoration: "none" }}>Get a Quote →</Link>
                </div>
                <div style={{ background: "#1e293b", padding: 32, borderRadius: 12, border: "1px solid #334155" }}>
                  <h3 style={{ fontSize: 22, color: "#fff", marginBottom: 12 }}>Data Recovery</h3>
                  <p style={{ color: "#94a3b8", lineHeight: 1.6, marginBottom: 20 }}>Professional data extraction from crashed drives, liquid-damaged laptops, and corrupted partitions.</p>
                  <Link href="/contact" style={{ color: "#06b6d4", fontWeight: 600, textDecoration: "none" }}>Get a Quote →</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── LAPTOPS SECTION (Server Rendered) ─── */}
      <section style={{ padding: "80px 24px", background: "#030712" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
            <div>
              <h2 style={{ fontSize: 36, color: "#fff", marginBottom: 8, fontWeight: 800 }}>Featured Laptops</h2>
              <p style={{ color: "#94a3b8", fontSize: 18 }}>High-performance machines ready for deployment.</p>
            </div>
            <Link href="/laptops" style={{ color: "#06b6d4", fontWeight: 600, textDecoration: "none" }}>View all laptops →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {products.map((p, i) => (
              <LaptopCard key={i} index={i} isHome={true} laptop={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO TEXT SECTION ─── */}
      <section style={{ padding: "80px 24px", background: "#0f172a" }}>
        <article style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, color: "#fff", marginBottom: 24 }}>Your Trusted Partner for Laptops and IT Services</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: 20 }}>
            Finding the right <strong>high-performance laptop</strong> or reliable <strong>IT repair service</strong> shouldn't be a gamble. At NextTop, we specialize in offering a curated selection of premium workstations, gaming rigs, and ultrabooks from top brands like Apple, Dell, Lenovo, and HP.
          </p>
          <p style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
            Beyond sales, our certified technicians provide comprehensive <strong>laptop repair services, data recovery, and corporate AMC contracts</strong>. We ensure your devices run at peak performance, minimizing downtime and maximizing your productivity. Contact us today for a free consultation or hardware diagnostic.
          </p>
        </article>
      </section>
    </>
  );
}
