import Image from 'next/image';

export default function MediaAssets() {
  const images = [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop'
  ];

  return (
    <div className="slide-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="heading-md" style={{ marginBottom: '8px' }}>Media Assets</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your main images and banners.</p>
        </div>
        <button className="btn-primary">Upload Image</button>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
        {images.map((src, i) => (
          <div key={i} className={`glass fade-in delay-${(i % 3) + 1}`} style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '12px', overflow: 'hidden' }}>
            <Image src={src} alt="asset" fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
