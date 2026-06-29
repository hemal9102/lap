import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#030712',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient line at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, #06b6d4, #8b5cf6, transparent)',
          opacity: 0.5,
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 60,
            marginBottom: 60,
          }}
        >
          {/* Brand Column */}
          <div style={{ minWidth: 260 }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 20 }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 14, color: '#fff',
                }}
              >N</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
                Next<span style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Top</span>
              </span>
            </Link>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 24, marginTop: 16 }}>
              Premium laptops engineered for modern professionals. Experience true performance without compromise.
            </p>
            <address style={{ fontStyle: 'normal', color: '#94a3b8', fontSize: 13, lineHeight: 1.8 }}>
              <strong style={{ color: '#f8fafc', fontWeight: 600 }}>NextTop Laptops Inc.</strong><br />
              1234 Silicon Avenue, Suite 400<br />
              San Francisco, CA 94107<br />
              <a href="tel:+14155552671" style={{ color: '#06b6d4', textDecoration: 'none' }}>+1 (415) 555-2671</a><br />
              <a href="mailto:contact@nexttop.com" style={{ color: '#06b6d4', textDecoration: 'none' }}>contact@nexttop.com</a>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: '#f8fafc', fontSize: 14, fontWeight: 600, marginBottom: 20, letterSpacing: '1px', textTransform: 'uppercase' }}>Quick Links</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/laptops', label: 'Catalog' },
                { href: '/about', label: 'About Us' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Support' },
              ].map((link) => (
                <li key={link.label}><Link href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14 }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ color: '#f8fafc', fontSize: 14, fontWeight: 600, marginBottom: 20, letterSpacing: '1px', textTransform: 'uppercase' }}>Legal</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/legal', label: 'Privacy Policy' },
                { href: '/legal', label: 'Terms of Service' },
              ].map((link) => (
                <li key={link.label}><Link href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14 }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 style={{ color: '#f8fafc', fontSize: 14, fontWeight: 600, marginBottom: 20, letterSpacing: '1px', textTransform: 'uppercase' }}>Social</h3>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Twitter', icon: '𝕏' },
                { label: 'LinkedIn', icon: 'in' },
                { label: 'Instagram', icon: '📷' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94a3b8', fontSize: 14, fontWeight: 700, textDecoration: 'none',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
          &copy; {currentYear} NextTop Laptops Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
