import AdminClient from "@/components/AdminClient";

export const metadata = {
  title: "Admin Leads | NextTop",
  description: "Manage your NextTop store leads.",
};

export default function AdminLeadsPage() {
  return <AdminClient initialTab="leads" />;
}
