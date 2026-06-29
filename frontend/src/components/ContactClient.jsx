"use client";
import { colors } from "@/lib/theme";
import GlowOrb from "@/components/GlowOrb";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare, Clock, CheckCircle } from "lucide-react";


const BUDGET_RANGES = ["Under ₹50,000", "₹50,000–₹1,00,000", "₹1,00,000–₹1,50,000", "₹1,50,000–₹2,50,000", "Above ₹2,50,000"];
const USE_CASES = ["Office / Business", "Gaming", "Video Editing / Design", "Programming / Coding", "Student Use", "General Use"];


export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", budget: "", useCase: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form)
      });
      if (res.ok) setSubmitted(true);
      else alert("Something went wrong. Please try again.");
    } catch (err) {
      alert("Failed to submit inquiry. Check network connection.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, overflow: "hidden", position: "relative" }}>
      <GlowOrb color={colors.blue} size="600px" top="-10%" left="-10%" delay={0} />
      <GlowOrb color={colors.cyan} size="500px" top="40%" left="70%" delay={2} />

      <section style={{ paddingTop: 160, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 100, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", color: colors.green, fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors.green, boxShadow: `0 0 10px ${colors.green}`, animation: "pulse-glow 2s infinite" }} />
          Replies within 30 minutes
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, marginBottom: 16, letterSpacing: "-1px" }}>
          Get Free <span style={{ background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Expert Advice</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ color: colors.textMuted, fontSize: 18, maxWidth: 600, margin: "0 auto", fontWeight: 300 }}>
          Tell us your budget and use-case. Our experts will guide you to the perfect machine — absolutely free.
        </motion.p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 120px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40 }}>
          
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ flex: 3, background: "rgba(255,255,255,0.02)", border: `1px solid ${colors.border}`, backdropFilter: "blur(20px)", borderRadius: 32, padding: 40, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <CheckCircle size={64} color={colors.green} style={{ margin: "0 auto 24px" }} />
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Inquiry Received! 🎉</h2>
                <p style={{ color: colors.textMuted, marginBottom: 32 }}>We will contact you via WhatsApp within 30 minutes with our top recommendations.</p>
                <Link href="/laptops" style={{ display: "inline-block", padding: "16px 32px", borderRadius: 12, background: colors.blue, color: "#fff", fontWeight: 700, textDecoration: "none" }}>Browse Catalog</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Send Your Inquiry</h2>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Your Name *</label>
                    <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none" }} placeholder="Rahul Mehta" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Phone / WhatsApp *</label>
                    <input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none" }} placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Email (optional)</label>
                  <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none" }} placeholder="rahul@email.com" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Your Budget *</label>
                    <select required value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none", appearance: "none" }}>
                      <option value="">Select range</option>
                      {BUDGET_RANGES.map(b=><option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Primary Use *</label>
                    <select required value={form.useCase} onChange={e=>setForm({...form,useCase:e.target.value})} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none", appearance: "none" }}>
                      <option value="">Select use case</option>
                      {USE_CASES.map(u=><option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Additional Requirements</label>
                  <textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${colors.border}`, color: "#fff", outline: "none", resize: "none" }} placeholder="Any specific brand? Needed features?" />
                </div>

                <button disabled={loading} style={{
                  padding: "18px", borderRadius: 12, fontWeight: 800, fontSize: 16, border: "none", cursor: loading ? "not-allowed" : "pointer",
                  background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue})`, color: "#fff", boxShadow: `0 8px 30px ${colors.cyan}40`, marginTop: 16
                }}>
                  {loading ? "Sending..." : "Send Inquiry — Get Free Advice 🚀"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info Side */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ flex: 2, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ padding: 32, borderRadius: 32, background: "rgba(255,255,255,0.02)", border: `1px solid ${colors.border}` }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Contact Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${colors.blue}15`, border: `1px solid ${colors.blue}30`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.blue }}><Phone size={20} /></div>
                  <div><p style={{ fontWeight: 700, fontSize: 16 }}>+91 98765 43210</p><p style={{ fontSize: 13, color: colors.textMuted }}>Call or WhatsApp</p></div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${colors.purple}15`, border: `1px solid ${colors.purple}30`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.purple }}><Mail size={20} /></div>
                  <div><p style={{ fontWeight: 700, fontSize: 16 }}>hello@nexttop.in</p><p style={{ fontSize: 13, color: colors.textMuted }}>Email us anytime</p></div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${colors.green}15`, border: `1px solid ${colors.green}30`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.green }}><MapPin size={20} /></div>
                  <div><p style={{ fontWeight: 700, fontSize: 16 }}>Ahmedabad, Gujarat</p><p style={{ fontSize: 13, color: colors.textMuted }}>Visit by appointment</p></div>
                </div>
              </div>
            </div>

            <div style={{ padding: 32, borderRadius: 32, background: `linear-gradient(to bottom, ${colors.blue}20, rgba(255,255,255,0.02))`, border: `1px solid ${colors.blue}30` }}>
              <MessageSquare size={32} color={colors.cyan} style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>What happens next?</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: colors.textMuted }}>
                <li><span style={{ color: colors.cyan, fontWeight: 700, marginRight: 8 }}>1.</span>You submit this form</li>
                <li><span style={{ color: colors.cyan, fontWeight: 700, marginRight: 8 }}>2.</span>Our expert reviews it</li>
                <li><span style={{ color: colors.cyan, fontWeight: 700, marginRight: 8 }}>3.</span>We WhatsApp you in 30m</li>
                <li><span style={{ color: colors.cyan, fontWeight: 700, marginRight: 8 }}>4.</span>Compare with zero pressure</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
