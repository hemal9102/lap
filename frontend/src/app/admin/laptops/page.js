import AdminClient from "@/components/AdminClient";

export const metadata = {
  title: "Admin Laptops | NextTop",
  description: "Manage your NextTop store inventory.",
};

export default function AdminLaptopsPage() {
  return <AdminClient initialTab="laptops" />;
}
