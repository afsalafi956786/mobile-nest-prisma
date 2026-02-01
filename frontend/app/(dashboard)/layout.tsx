// app/(dashboard)/layout.tsx
import Sidebar from "@/components/UI/Sidebar";
import { SidebarProvider } from "@/components/SidebarContext";
import Navbar from "@/components/UI/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto p-4">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
