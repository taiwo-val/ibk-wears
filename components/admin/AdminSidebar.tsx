"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabaseBrowser.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const links = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
   {
  name: "Products",
  href: "/admin/products",
  icon: Package,
},
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-zinc-800 bg-zinc-950">

      <div className="border-b border-zinc-800 p-6">

        <h1 className="text-3xl font-black text-yellow-500">
          IBK WEARS
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Admin Panel
        </p>

      </div>

      <nav className="mt-6 flex flex-col">

        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`mx-3 mb-2 flex items-center gap-3 rounded-xl px-5 py-4 transition ${
                active
                  ? "bg-yellow-500 text-black"
                  : "text-white hover:bg-zinc-800"
              }`}
            >
              <Icon size={20} />

              {link.name}
            </Link>
          );
        })}

      </nav>

      <div className="absolute bottom-6 w-full px-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-500"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}