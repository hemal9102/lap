"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="fade-in delay-1">
      <div className="glass" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', padding: '16px' }}>
        <Image src={activeImage} alt="Main Product Gallery Image" fill style={{ objectFit: 'cover', transition: 'all 0.3s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
        {images.map((img, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveImage(img)}
            className="glass"
            style={{ 
              position: 'relative', width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
              border: activeImage === img ? '2px solid var(--accent-color)' : '1px solid var(--border-glass)',
              opacity: activeImage === img ? 1 : 0.6,
              transition: 'all 0.2s ease'
            }}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
