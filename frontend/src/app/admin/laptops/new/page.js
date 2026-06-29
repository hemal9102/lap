export default function PushLaptop() {
  return (
    <div className="slide-up">
      <h1 className="heading-md" style={{ marginBottom: '8px' }}>Push New Laptop</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Add a new laptop listing to the catalog.</p>
      
      <form className="glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Brand</label>
            <input type="text" style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', color: 'white', border: '1px solid var(--border-glass)', borderRadius: '8px', outline: 'none' }} placeholder="e.g. Apple" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Model Name</label>
            <input type="text" style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', color: 'white', border: '1px solid var(--border-glass)', borderRadius: '8px', outline: 'none' }} placeholder="e.g. MacBook Pro 16" />
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Price ($)</label>
            <input type="number" style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', color: 'white', border: '1px solid var(--border-glass)', borderRadius: '8px', outline: 'none' }} placeholder="2499" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Main Image URL</label>
            <input type="url" style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', color: 'white', border: '1px solid var(--border-glass)', borderRadius: '8px', outline: 'none' }} placeholder="https://images.unsplash.com/..." />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Description</label>
          <textarea style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', color: 'white', border: '1px solid var(--border-glass)', borderRadius: '8px', outline: 'none', minHeight: '120px' }} placeholder="Detailed product description..."></textarea>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Specifications (Comma separated)</label>
          <input type="text" style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', color: 'white', border: '1px solid var(--border-glass)', borderRadius: '8px', outline: 'none' }} placeholder="M3 Max, 36GB RAM, 1TB SSD" />
        </div>

        <button type="button" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '16px' }}>Publish Laptop</button>
      </form>
    </div>
  );
}
