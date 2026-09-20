"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/projects", label: "Projets" },
  { href: "/skills", label: "Competences" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "A propos" },
];

function NavActions() {
  return (
    <>
      <ThemeToggle />
      <a 
        href="/cv.pdf"
        download
        className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <Download size={14} />
        Download CV
      </a>
    </>
  );
}
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <nav className="flex h-16 w-full items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="whitespace-nowrap font-mono text-lg font-bold tracking-tight text-accent"
        >
          <span className="text-primary">{"<"}</span>
          Elfried Alceo Tohouegnon BOTON
          <span className="text-primary">{" />"}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "text-sm font-medium text-primary transition-colors"
                      : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <NavActions />
        </div>

        <button
          type="button"
          className="text-accent md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-border px-6 py-3">
            <NavActions />
          </div>
        </div>
      )}
    </header>
  );
}