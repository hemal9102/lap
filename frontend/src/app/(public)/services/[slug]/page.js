import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getService(slug) {
  try {
    const res = await fetch(`http://localhost:5000/api/services/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);
  if (!service) return { title: 'Service Not Found | NextTop' };
  
  return {
    title: `${service.seoTitle || service.title} | NextTop IT Services`,
    description: service.metaDescription || service.shortDesc || service.description.substring(0,100),
    keywords: service.keywords || `${service.title}, NextTop services, IT support`
  };
}

export default async function ServiceDetails({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);
  
  if (!service) return notFound();

  // Create JSON-LD schema for Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "NextTop Laptop Store"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <div className="container slide-up" style={{ padding: '80px 24px', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" className="hover-link" style={{ display: 'inline-block', marginBottom: '32px', color: 'var(--accent-color)', fontWeight: 600 }}>&larr; Back to Home</Link>
        
        <article className="fade-in delay-2">
          <h1 className="heading-lg" style={{ fontSize: '3rem', marginBottom: '16px' }}>{service.title}</h1>
          {service.price && <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-color)', margin: '16px 0' }}>Starting at ₹{service.price.toLocaleString('en-IN')}</p>}
          
          <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border-color)', marginTop: '40px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
              {service.description}
            </p>
          </div>
          
          <div style={{ marginTop: '60px', padding: '40px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))', borderRadius: '24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Need this service?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Contact our expert technicians today for a consultation or quote.</p>
            <Link href="/contact" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', display: 'inline-block', textDecoration: 'none' }}>
              Request Quote
            </Link>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}
