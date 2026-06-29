import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqClient from "@/components/FaqClient";

export const metadata = {
  title: "Frequently Asked Questions | NextTop Support",
  description: "Find answers to common questions about NextTop's shipping, returns, warranties, and laptop customization options.",
  keywords: "NextTop FAQ, laptop returns policy, international shipping, warranty info"
};

export default function FAQ() {
  const faqs = [
    { q: "What is your return policy?", a: "We offer a 30-day return policy on all our laptops, provided they are in their original packaging and condition." },
    { q: "Do you offer international shipping?", a: "Yes, we ship globally. Shipping times and fees will vary depending on your location." },
    { q: "What kind of warranty comes with the laptops?", a: "Every laptop comes with a standard 1-year manufacturer warranty. You can purchase an extended 3-year warranty at checkout." },
    { q: "Can I customize the RAM and storage?", a: "Absolutely. Our 'Build Your Own' configurator allows you to customize RAM, SSD size, and GPU options." }
  ];

  return <FaqClient faqs={faqs} />;
}
