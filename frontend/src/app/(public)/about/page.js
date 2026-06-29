import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutClient from "@/components/AboutClient";

export const metadata = {
  title: "About NextTop — Your Trusted Laptop Experts",
  description: "NextTop is a premium laptop advisory store. We help you choose the right laptop for your budget and needs with zero pressure.",
};

const STATS = [
  { value: "500+", label: "Happy Customers" },
  { value: "6+", label: "Top Brands" },
  { value: "30 min", label: "Avg. Response Time" },
  { value: "100%", label: "Free Consultation" },
];

const VALUES = [
  { icon: "🎯", title: "Honest Advice", desc: "We recommend what's best for YOU, not what's most expensive. Our experts explain pros and cons of every model clearly." },
  { icon: "🔬", title: "Deep Knowledge", desc: "Every product in our catalog is tested and reviewed by our team. We know every benchmark, every thermal limitation." },
  { icon: "🤝", title: "No Pressure", desc: "Zero hard selling. Take all the time you need. Ask 100 questions. We're here to educate and empower your decision." },
  { icon: "🌟", title: "After-Sale Support", desc: "Bought from us? We're still available. Setup help, software issues, warranty guidance — we stay with you." },
];

export default function AboutPage() {
  return <AboutClient stats={STATS} values={VALUES} />;
}
