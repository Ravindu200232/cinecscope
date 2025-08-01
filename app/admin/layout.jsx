
import AdminSidebar from "@/components/ui/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import UserNav from "@/components/user-nav";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      {/* 1. Sidebar Section */}
      <AdminSidebar />

      {/* 2. Main Content Section */}
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>

            {/* 3. User Dropdown Navigation */}
            <UserNav />
          </div>
        </header>
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}