import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Premium Laptops | NextTop — Next Gen Performance",
  description: "Discover the best laptops for work, gaming, and creativity. Smooth performance, elegant design, pushing boundaries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} style={{ background: "#030712", color: "#f8fafc", margin: 0 }}>
        <main>{children}</main>
      </body>
    </html>
  );
}
