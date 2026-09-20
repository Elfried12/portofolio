"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAdmin } from "@/actions/auth.actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 flex-shrink-0 flex-col bg-accent text-accent-foreground">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary">
            <span className="text-xs font-bold text-primary-foreground">E</span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-bold">
              <span className="text-primary">&lt;</span>
              Admin
              <span className="text-primary"> /&gt;</span>
            </p>
            <p className="text-[11px] text-white/50">Portfolio CMS</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="mb-1 flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink size={15} />
          View site
        </Link>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}