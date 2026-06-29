import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
