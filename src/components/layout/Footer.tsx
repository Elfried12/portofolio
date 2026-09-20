import Link from "next/link";
import {  Mail, Download } from "lucide-react";
import { PROFILE } from "@/config/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-12">
        {/* Identité */}
        <div>
          <div className="mb-1 font-mono text-xl font-bold tracking-tight">
            <span className="text-primary">{"<"}</span>
            {PROFILE.name}
            <span className="text-primary">{" />"}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {PROFILE.title}
          </p>
        </div>

        {/* Liens sociaux + CV */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand-foreground"
          >
            
            GitHub
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand-foreground"
          >
            
            LinkedIn
          </a>

          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand-foreground"
          >
            <Mail size={16} />
            Email
          </a>

          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download size={14} />
            Download CV
          </a>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-white/10 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center md:flex-row md:justify-between md:px-12 md:text-left">
          <p className="text-xs text-muted-foreground">
            © {year} {PROFILE.name} — Tous droits réservés.
          </p>
          <Link
            href="/mentions-legales"
            className="text-xs text-muted-foreground transition-colors hover:text-brand-foreground"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}