"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Store,
  Menu,
  LogOut,
  Loader2,
  MessageSquareQuote,
  Image,
  Info,
  BarChart3,
  User,
  ClipboardCheck,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/approval", label: "Persetujuan", icon: ClipboardCheck },
  { href: "/admin/umkm", label: "Kelola UMKM", icon: Store },
  { href: "/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/banners", label: "Hero Banners", icon: Image },
  { href: "/about", label: "Tentang", icon: Info },
  { href: "/metrics", label: "Statistik", icon: BarChart3 },
];

function UserSection() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-3 px-3 py-2.5">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        <div className="space-y-0.5">
          <div className="h-3 w-24 bg-muted rounded animate-pulse" />
          <div className="h-2.5 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high">
        <User className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {session.user.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {session.user.email}
        </p>
      </div>
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function handleLogout() {
    setLoading(true);
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface-container-high hover:text-foreground transition-colors duration-150"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      {loading ? "Keluar..." : "Keluar"}
    </button>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebar = (
    <>
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link
          href="/admin"
          className="text-sm font-display font-normal tracking-tight text-foreground"
        >
          UMKM Pedurungan Tengah Admin
        </Link>
      </div>
      <div className="border-b border-border">
        <UserSection />
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-150 ${
              pathname === item.href || pathname.startsWith(item.href + "/")
                ? "bg-surface-container-high font-medium text-foreground"
                : "text-muted-foreground hover:bg-surface-container-high hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <LogoutButton />
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 border-r border-border bg-background lg:flex lg:flex-col">
        {sidebar}
      </aside>

      {/* Mobile layout */}
      <div className="flex flex-1 flex-col lg:hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4">
          <Link
            href="/admin"
            className="text-sm font-display font-normal tracking-tight text-foreground"
          >
            UMKM Pedurungan Tengah Admin
          </Link>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-background">
              {sidebar}
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Desktop main */}
      <main className="hidden flex-1 p-8 lg:block">{children}</main>
    </div>
  );
}
