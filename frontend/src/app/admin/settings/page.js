import AdminClient from "@/components/AdminClient";

export const metadata = {
  title: "Admin Settings | NextTop",
  description: "Manage your NextTop store settings.",
};

export default function AdminSettingsPage() {
  return <AdminClient initialTab="settings" />;
}
