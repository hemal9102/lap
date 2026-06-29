"use client";
import { colors } from "@/lib/theme";
import GlowOrb from "@/components/GlowOrb";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Laptop, Users, Settings, PlusCircle,
  Search, Activity, Trash2, Edit3, Eye, X, Check,
  ChevronRight, Tags, Upload
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";


const DEMO_LAPTOPS = [
  { id: 1, name: 'MacBook Pro 16" M4 Max', brand: "Apple", price: 349900, status: "published", views: 1240 },
  { id: 2, name: "Dell XPS 15 OLED", brand: "Dell", price: 179900, status: "published", views: 890 },
  { id: 3, name: "ASUS ROG Zephyrus G16", brand: "Asus", price: 159990, status: "published", views: 720 },
  { id: 4, name: "Lenovo ThinkPad X1 Carbon", brand: "Lenovo", price: 129990, status: "draft", views: 310 },
  { id: 5, name: "HP Spectre x360 14", brand: "HP", price: 169900, status: "published", views: 550 },
];

const STATS = [
  { label: "Total Revenue", value: "₹45.2L", icon: Activity, color: colors.blue },
  { label: "Laptops Listed", value: "8", icon: Laptop, color: colors.purple },
  { label: "New Leads", value: "12", icon: Users, color: colors.orange },
  { label: "Page Views", value: "3,241", icon: Eye, color: colors.green },
];

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", path: "/admin" },
  { icon: Laptop, label: "Catalog", id: "laptops", path: "/admin/laptops" },
  { icon: Users, label: "Leads", id: "leads", path: "/admin/leads" },
  { icon: Tags, label: "Categories", id: "categories", path: "/admin/categories" },
  { icon: Settings, label: "Settings", id: "settings", path: "/admin/settings" },
];


export default function AdminClient({ initialTab = "dashboard" }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Use pathname to determine active tab if possible, otherwise fallback to initialTab
  const currentTab = NAV.find(n => n.path === pathname)?.id || initialTab;
  
  const [activeTab, setActiveTab] = useState(currentTab);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [laptops, setLaptops] = useState(DEMO_LAPTOPS);
  const [leads, setLeads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newLaptop, setNewLaptop] = useState({ name: "", brand: "", category: "", price: "", imageUrl: "", description: "", specifications: "", status: "draft" });
  const [newCategoryName, setNewCategoryName] = useState("");

  // Keep activeTab in sync with URL if user navigates manually
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Fetch Leads
    fetch("http://localhost:5000/api/leads")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setLeads(data.data.map(lead => ({
            id: lead.id, name: lead.name, phone: lead.phone,
            budget: lead.message.split(' | ')[0]?.replace('Budget: ', '') || 'N/A',
            use: lead.message.split(' | ')[1]?.replace('Use: ', '') || 'N/A',
            time: new Date(lead.createdAt).toLocaleDateString('en-IN'),
            status: "new"
          })));
        }
      })
      .catch(console.error);

    // Fetch Laptops
    fetch("http://localhost:5000/api/laptops")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          // Map backend schema to frontend state structure
          setLaptops(data.data.map(laptop => ({
            id: laptop.id,
            name: laptop.name,
            brand: laptop.brand?.name || "Unknown",
            price: laptop.price,
            status: laptop.publishStatus,
            views: 0 // Defaulting views since it's not in the DB yet
          })));
        }
      })
      .catch(console.error);

    // Fetch Categories
    fetch("http://localhost:5000/api/admin/categories")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCategories(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const handleNavClick = (id, path) => {
    setActiveTab(id);
    router.push(path);
  };

  const filteredLaptops = laptops.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    if (confirm("Delete this laptop?")) setLaptops(prev => prev.filter(l => l.id !== id));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: newLaptop.name,
        brandName: newLaptop.brand,
        categoryName: newLaptop.category || "General",
        price: Number(newLaptop.price),
        images: newLaptop.imageUrl ? [newLaptop.imageUrl] : [],
        description: newLaptop.description || "Premium Laptop",
        specifications: newLaptop.specifications ? { details: newLaptop.specifications } : null
      };
      
      const res = await fetch("http://localhost:5000/api/admin/laptops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success && data.data) {
        const added = { 
          id: data.data.id, 
          name: data.data.name, 
          brand: newLaptop.brand, 
          price: data.data.price, 
          status: data.data.publishStatus,
          views: 0 
        };
        setLaptops(prev => [added, ...prev]);
        setNewLaptop({ name: "", brand: "", category: "", price: "", imageUrl: "", description: "", specifications: "", status: "draft" });
        setShowAddModal(false);
      } else {
        alert("Failed to add laptop: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error adding laptop to backend.");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/categories", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName })
      });
      const data = await res.json();
      if (data.success) {
        setCategories(prev => [...prev, data.data]);
        setNewCategoryName("");
      } else alert(data.message);
    } catch(err) { console.error(err); }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("Delete category?")) return;
    try {
      await fetch(`http://localhost:5000/api/admin/categories/${id}`, { method: "DELETE" });
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch(err) { console.error(err); }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewLaptop(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: colors.bg, color: colors.text, overflow: "hidden", position: "relative" }}>
      <GlowOrb color={colors.blue} size="500px" top="-10%" left="20%" delay={0} />
      <GlowOrb color={colors.purple} size="600px" top="40%" left="70%" delay={2} />

      {/* Sidebar */}
      <div style={{
        width: 280, background: colors.sidebar, backdropFilter: "blur(20px)",
        borderRight: `1px solid ${colors.border}`, display: "flex", flexDirection: "column",
        position: "relative", zIndex: 20
      }}>
        <div style={{ padding: "32px 24px", borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#fff" }}>
              N
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}>NextTop</h2>
              <p style={{ fontSize: 12, color: colors.cyan, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Admin Panel</p>
            </div>
          </div>
        </div>

        <nav style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          {NAV.map(n => {
            const active = activeTab === n.id;
            return (
              <button key={n.id} onClick={() => handleNavClick(n.id, n.path)} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderRadius: 16,
                background: active ? `linear-gradient(135deg, ${colors.blue}20, transparent)` : "transparent",
                border: active ? `1px solid ${colors.blue}40` : "1px solid transparent",
                color: active ? "#fff" : colors.textMuted, cursor: "pointer", transition: "all 0.3s",
                fontWeight: active ? 700 : 500, fontSize: 15, textAlign: "left"
              }}>
                <n.icon size={20} color={active ? colors.blue : colors.textMuted} />
                <span style={{ flex: 1 }}>{n.label}</span>
                {active && <ChevronRight size={16} color={colors.blue} />}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: 24, borderTop: `1px solid ${colors.border}` }}>
          <a href="/" target="_blank" style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderRadius: 16,
            background: "rgba(255,255,255,0.03)", color: colors.textMuted, textDecoration: "none", fontSize: 14, fontWeight: 600, transition: "all 0.3s", border: `1px solid ${colors.border}`
          }} onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
             onMouseLeave={e => { e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
            <Eye size={18} /> View Website
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "48px 56px", overflowY: "auto", position: "relative", zIndex: 10 }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
            
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Overview</h1>
                <p style={{ color: colors.textMuted, marginBottom: 40 }}>Welcome back to the NextTop control center.</p>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 48 }}>
                  {STATS.map(s => (
                    <div key={s.label} style={{
                      padding: 24, borderRadius: 24, background: "rgba(255,255,255,0.02)", border: `1px solid ${colors.border}`,
                      backdropFilter: "blur(10px)", display: "flex", flexDirection: "column", gap: 16
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 14, color: colors.textMuted, fontWeight: 600 }}>{s.label}</span>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <s.icon color={s.color} size={20} />
                        </div>
                      </div>
                      <div style={{ fontSize: 32, fontWeight: 800 }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${colors.border}`, borderRadius: 24, padding: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700 }}>Recent Leads</h2>
                    <button onClick={() => handleNavClick("leads", "/admin/leads")} style={{ background: "none", border: "none", color: colors.blue, cursor: "pointer", fontWeight: 600 }}>View all →</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {leads.slice(0, 3).map(l => (
                      <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "rgba(255,255,255,0.03)", borderRadius: 16 }}>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{l.name}</p>
                          <p style={{ fontSize: 13, color: colors.textMuted }}>{l.phone} · {l.budget}</p>
                        </div>
                        <span style={{ padding: "6px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: `${colors.orange}20`, color: colors.orange }}>New Lead</span>
                      </div>
                    ))}
                    {leads.length === 0 && <p style={{ color: colors.textMuted, fontStyle: "italic" }}>No new leads yet.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Laptops */}
            {activeTab === "laptops" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
                  <div>
                    <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Catalog</h1>
                    <p style={{ color: colors.textMuted }}>Manage your premium laptop inventory.</p>
                  </div>
                  <button onClick={() => setShowAddModal(true)} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 100,
                    background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue})`, color: "#fff",
                    fontWeight: 700, border: "none", cursor: "pointer", boxShadow: `0 8px 30px ${colors.blue}40`
                  }}>
                    <PlusCircle size={18} /> Add Laptop
                  </button>
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${colors.border}`, borderRadius: 24, overflow: "hidden" }}>
                  <div style={{ padding: 24, borderBottom: `1px solid ${colors.border}` }}>
                    <div style={{ position: "relative", maxWidth: 400 }}>
                      <Search size={18} color={colors.textMuted} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                      <input 
                        type="text" placeholder="Search laptops..." value={search} onChange={e => setSearch(e.target.value)}
                        style={{ width: "100%", padding: "14px 16px 14px 48px", borderRadius: 12, background: "rgba(0,0,0,0.4)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none" }}
                      />
                    </div>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead style={{ background: "rgba(0,0,0,0.2)", fontSize: 13, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px" }}>
                      <tr>
                        <th style={{ padding: "16px 24px", fontWeight: 600 }}>Product</th>
                        <th style={{ padding: "16px 24px", fontWeight: 600 }}>Brand</th>
                        <th style={{ padding: "16px 24px", fontWeight: 600 }}>Price</th>
                        <th style={{ padding: "16px 24px", fontWeight: 600 }}>Status</th>
                        <th style={{ padding: "16px 24px", fontWeight: 600 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLaptops.map(laptop => (
                        <tr key={laptop.id} style={{ borderBottom: `1px solid ${colors.border}`, transition: "background 0.3s" }} onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                          <td style={{ padding: "20px 24px", fontWeight: 600 }}>{laptop.name}</td>
                          <td style={{ padding: "20px 24px" }}><span style={{ padding: "6px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 100, fontSize: 12 }}>{laptop.brand}</span></td>
                          <td style={{ padding: "20px 24px", fontWeight: 700 }}>₹{isMounted ? laptop.price.toLocaleString('en-IN') : laptop.price}</td>
                          <td style={{ padding: "20px 24px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: laptop.status === "published" ? `${colors.green}15` : `${colors.orange}15`, color: laptop.status === "published" ? colors.green : colors.orange }}>
                              {laptop.status === "published" && <Check size={12}/>} {laptop.status}
                            </span>
                          </td>
                          <td style={{ padding: "20px 24px" }}>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button style={{ background: "rgba(255,255,255,0.05)", border: "none", padding: 8, borderRadius: 8, color: colors.textMuted, cursor: "pointer" }}><Edit3 size={16}/></button>
                              <button onClick={() => handleDelete(laptop.id)} style={{ background: `${colors.red}15`, border: "none", padding: 8, borderRadius: 8, color: colors.red, cursor: "pointer" }}><Trash2 size={16}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Leads */}
            {activeTab === "leads" && (
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Customer Leads</h1>
                <p style={{ color: colors.textMuted, marginBottom: 40 }}>Review and respond to incoming inquiries.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {leads.length === 0 && <p style={{ color: colors.textMuted, padding: 32, textAlign: "center", background: "rgba(255,255,255,0.02)", borderRadius: 24 }}>No leads found.</p>}
                  {leads.map(l => (
                    <div key={l.id} style={{ padding: 24, borderRadius: 24, background: "rgba(255,255,255,0.02)", border: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                        <div style={{ width: 48, height: 48, borderRadius: 16, background: `${colors.cyan}15`, color: colors.cyan, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800 }}>
                          {l.name[0]}
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{l.name}</p>
                          <p style={{ color: colors.textMuted, fontSize: 14 }}>{l.phone}</p>
                          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                            <span style={{ fontSize: 12, color: colors.textMuted, background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 100 }}>{l.budget}</span>
                            <span style={{ fontSize: 12, color: colors.textMuted, background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 100 }}>{l.use}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ padding: "6px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: `${colors.orange}20`, color: colors.orange }}>New Lead</span>
                        <a href={`https://wa.me/${l.phone.replace(/\D/g, '')}`} target="_blank" style={{ padding: "10px 20px", borderRadius: 100, background: colors.green, color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>WhatsApp</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {activeTab === "categories" && (
              <div style={{ maxWidth: 800 }}>
                <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Categories</h1>
                <p style={{ color: colors.textMuted, marginBottom: 40 }}>Manage laptop categories for organization.</p>
                
                <form onSubmit={handleAddCategory} style={{ display: "flex", gap: 16, marginBottom: 32, padding: 24, background: "rgba(255,255,255,0.02)", borderRadius: 24, border: `1px solid ${colors.border}` }}>
                  <input required placeholder="New Category Name (e.g. Gaming)" value={newCategoryName} onChange={e=>setNewCategoryName(e.target.value)} style={{ flex: 1, padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none" }} />
                  <button type="submit" style={{ padding: "0 24px", borderRadius: 12, background: colors.blue, color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Add Category</button>
                </form>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {categories.length === 0 && <p style={{ color: colors.textMuted }}>No categories yet.</p>}
                  {categories.map(c => (
                    <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", background: "rgba(255,255,255,0.03)", borderRadius: 16 }}>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{c.name}</p>
                        <p style={{ fontSize: 13, color: colors.textMuted }}>{c._count?.laptops || 0} Laptops</p>
                      </div>
                      <button onClick={() => handleDeleteCategory(c.id)} style={{ background: `${colors.red}15`, border: "none", padding: 10, borderRadius: 12, color: colors.red, cursor: "pointer" }}><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div style={{ maxWidth: 600 }}>
                <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 40 }}>Settings</h1>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { label: "Store Name", val: "NextTop Laptops" },
                    { label: "Contact Phone", val: "+91 98765 43210" },
                    { label: "Contact Email", val: "hello@nexttop.in" },
                  ].map(f => (
                    <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 14, fontWeight: 600, color: colors.textMuted }}>{f.label}</label>
                      <input defaultValue={f.val} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none" }} />
                    </div>
                  ))}
                  <button style={{ marginTop: 16, padding: "16px", borderRadius: 12, background: colors.blue, color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Save Changes</button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ width: "100%", maxWidth: 500, background: colors.sidebar, border: `1px solid ${colors.border}`, borderRadius: 32, padding: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800 }}>Add Laptop</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: "rgba(255,255,255,0.05)", border: "none", padding: 8, borderRadius: 100, color: colors.textMuted, cursor: "pointer" }}><X size={20}/></button>
            </div>
            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Name</label>
                <input required value={newLaptop.name} onChange={e=>setNewLaptop({...newLaptop, name:e.target.value})} style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Brand</label>
                  <input required value={newLaptop.brand} onChange={e=>setNewLaptop({...newLaptop, brand:e.target.value})} style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Category</label>
                  <select required value={newLaptop.category} onChange={e=>setNewLaptop({...newLaptop, category:e.target.value})} style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none", appearance: "none" }}>
                    <option value="" disabled>Select a Category...</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Price (₹)</label>
                  <input required type="number" value={newLaptop.price} onChange={e=>setNewLaptop({...newLaptop, price:e.target.value})} style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Image Upload</label>
                  <div style={{ position: "relative", height: 46 }}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ opacity: 0, position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }} />
                    <div style={{ position: "absolute", inset: 0, zIndex: 1, padding: "0 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", gap: 8, color: newLaptop.imageUrl ? colors.green : colors.textMuted }}>
                      <Upload size={16} /> {newLaptop.imageUrl ? "Image Selected" : "Choose File..."}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Description (Database mapping)</label>
                <textarea required rows={2} value={newLaptop.description} onChange={e=>setNewLaptop({...newLaptop, description:e.target.value})} style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none", resize: "none" }} />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.05)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: 16, borderRadius: 12, background: colors.blue, color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Add Laptop</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
