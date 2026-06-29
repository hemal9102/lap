import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";

async function getLaptop(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/laptops/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (e) {
    return null;
  }
}

// Generate dynamic SEO metadata based on the specific laptop
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const laptop = await getLaptop(resolvedParams.id);
  if (!laptop) return { title: 'Laptop Not Found | NextTop' };
  
  const brandName = laptop.brand?.name || "Unknown";
  return {
    title: `${brandName} ${laptop.name} | NextTop Laptops`,
    description: `Buy the ${brandName} ${laptop.name} for ₹${laptop.price}. ${laptop.shortDesc || laptop.description.substring(0,100)}`,
    keywords: `${brandName} ${laptop.name}, buy ${brandName} laptop, premium computers, high performance`
  };
}

export default async function LaptopDetails({ params }) {
  const resolvedParams = await params;
  const laptop = await getLaptop(resolvedParams.id);
  
  if (!laptop) return notFound();

  const brandName = laptop.brand?.name || "Unknown";
  const specs = laptop.specifications ? Object.entries(JSON.parse(laptop.specifications)).map(([k,v]) => `${k}: ${v}`) : [];
  const images = laptop.images ? JSON.parse(laptop.images) : ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"];

  return (
    <>
      <Header />
      <div className="container slide-up" style={{ padding: '60px 0', minHeight: '80vh' }}>
        <Link href="/laptops" className="hover-link" style={{ display: 'inline-block', marginBottom: '32px', color: 'var(--accent-color)', fontWeight: 600 }}>&larr; Back to Catalog</Link>
        
        <article style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'start' }}>
          
          {/* Gallery Section */}
          <ImageGallery images={images} />
          
          {/* Details Section */}
          <div className="fade-in delay-2">
            <h1 className="heading-md">{brandName} {laptop.name}</h1>
            <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-color)', margin: '16px 0' }}>₹{laptop.price.toLocaleString('en-IN')}</p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '32px' }}>{laptop.description}</p>
            
            {specs.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', fontWeight: 600 }}>Technical Specifications</h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                  {specs.map((spec, i) => (
                    <li key={i} className="glass" style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', marginRight: '16px' }}></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </>
            )}
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ flex: 1, minWidth: '200px', padding: '16px' }}>Add to Cart</button>
              <button className="btn-secondary" style={{ padding: '16px' }}>Save for Later</button>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}
