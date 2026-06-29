import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LaptopsClient from "@/components/LaptopsClient";

export const metadata = {
  title: "All Laptops — Dell, HP, Apple, Lenovo, Asus | NextTop",
  description: "Browse our complete catalog of premium laptops. Gaming, business, ultrabooks, workstations. Filter by brand and category.",
};

const ALL_LAPTOPS = [
  { id: 1, name: "MacBook Pro 16\" M4 Max", brand: "Apple", category: "Workstation", price: "₹3,49,900", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop", specs: "M4 Max · 36GB · 1TB", badge: "Best Seller", badgeColor: "bg-purple-500/20 text-purple-300" },
  { id: 2, name: "MacBook Air M3 13\"", brand: "Apple", category: "Ultrabook", price: "₹1,14,900", img: "https://images.unsplash.com/photo-1611186871525-a7abcd2a8c2d?w=600&auto=format&fit=crop", specs: "M3 · 16GB · 512GB", badge: "Most Popular", badgeColor: "bg-blue-500/20 text-blue-300" },
  { id: 3, name: "Dell XPS 15 OLED", brand: "Dell", category: "Business", price: "₹1,79,900", img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop", specs: "Core i9 · 32GB · 1TB · OLED", badge: "Premium Pick", badgeColor: "bg-cyan-500/20 text-cyan-300" },
  { id: 4, name: "Dell Inspiron 15 3520", brand: "Dell", category: "Budget", price: "₹52,990", img: "https://images.unsplash.com/photo-1588702547923-7183e0f82a34?w=600&auto=format&fit=crop", specs: "Core i5 · 16GB · 512GB", badge: "Great Value", badgeColor: "bg-green-500/20 text-green-300" },
  { id: 5, name: "HP Spectre x360 14", brand: "HP", category: "Ultrabook", price: "₹1,69,900", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop", specs: "Core Ultra 7 · 32GB · 2TB · OLED", badge: "Top Rated", badgeColor: "bg-pink-500/20 text-pink-300" },
  { id: 6, name: "Lenovo ThinkPad X1 Carbon", brand: "Lenovo", category: "Business", price: "₹1,29,990", img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop", specs: "Core Ultra 7 · 32GB · 1TB · 1.1kg", badge: "Lightest", badgeColor: "bg-orange-500/20 text-orange-300" },
  { id: 7, name: "ASUS ROG Zephyrus G16", brand: "Asus", category: "Gaming", price: "₹1,59,990", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop", specs: "RTX 4090 · Ryzen 9 · 32GB · 240Hz", badge: "Gaming King", badgeColor: "bg-red-500/20 text-red-300" },
  { id: 8, name: "Acer Nitro V 15", brand: "Acer", category: "Gaming", price: "₹79,990", img: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600&auto=format&fit=crop", specs: "RTX 4060 · Core i7 · 16GB · 144Hz", badge: "Budget Gaming", badgeColor: "bg-yellow-500/20 text-yellow-300" },
];

const BRANDS = ["All", "Apple", "Dell", "HP", "Lenovo", "Asus", "Acer"];

export default async function LaptopsPage() {
  let laptops = ALL_LAPTOPS;
  try {
    const res = await fetch("http://localhost:5000/api/laptops", { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        laptops = json.data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch laptops:", err);
  }

  return <LaptopsClient laptops={laptops} brands={BRANDS} />;
}
