import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { laptopsData } from "@/lib/data";

// Generate dynamic SEO metadata based on the specific laptop
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const laptop = laptopsData.find(l => l.id === parseInt(resolvedParams.id));
  if (!laptop) return { title: 'Laptop Not Found | NextTop' };
  
  return {
    title: `${laptop.brand} ${laptop.model} | NextTop Laptops`,
    description: `Buy the ${laptop.brand} ${laptop.model} for $${laptop.price}. ${laptop.description}`,
    keywords: `${laptop.brand} ${laptop.model}, buy ${laptop.brand} laptop, ${laptop.specs[0]}, premium ${laptop.brand} computers, high performance`
  };
}

// Generate static routes for all 15 laptops (Blazing fast SEO load times)
export function generateStaticParams() {
  return laptopsData.map((laptop) => ({
    id: laptop.id.toString(),
  }));
}

export default async function LaptopDetails({ params }) {
  const resolvedParams = await params;
  const laptop = laptopsData.find(l => l.id === parseInt(resolvedParams.id));
  
  if (!laptop) return notFound();

  return (
    <>
      <Header />
      <div className="container slide-up" style={{ padding: '60px 0', minHeight: '80vh' }}>
        <Link href="/laptops" className="hover-link" style={{ display: 'inline-block', marginBottom: '32px', color: 'var(--accent-color)', fontWeight: 600 }}>&larr; Back to Catalog</Link>
        
        <article style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'start' }}>
          
          {/* Gallery Section */}
          <ImageGallery images={laptop.images} />
          
          {/* Details Section */}
          <div className="fade-in delay-2">
            <h1 className="heading-md">{laptop.brand} {laptop.model}</h1>
            <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-color)', margin: '16px 0' }}>${laptop.price}</p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '32px' }}>{laptop.description}</p>
            
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', fontWeight: 600 }}>Technical Specifications</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {laptop.specs.map((spec, i) => (
                <li key={i} className="glass" style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', marginRight: '16px' }}></span>
                  {spec}
                </li>
              ))}
            </ul>
            
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
