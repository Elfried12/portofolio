import Link from "next/link";
import { PenLine, ArrowRight, Mail, Sparkles } from "lucide-react";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background font-body">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center md:px-12 md:py-32">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles size={12} className="text-primary" />
          En cours de rédaction
        </div>

        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
          <PenLine size={28} className="text-primary" />
        </div>

        {/* Title */}
        <h1 className="mb-4 font-heading text-3xl font-bold tracking-tight text-accent md:text-4xl">
          Le blog arrive bientôt
        </h1>

        <p className="mb-10 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          Des notes techniques sur l’architecture, Next.js, les bases de
          données et les leçons tirées de vrais projets.  
          Premiers articles en préparation.
        </p>

        {/* Preview cards (placeholders) */}
        <div className="mb-12 grid w-full gap-4 sm:grid-cols-3">
          {["Architecture", "Performance", "Retours d’expérience"].map(
            (topic) => (
              <div
                key={topic}
                className="rounded-lg border border-dashed border-border bg-card/50 px-4 py-6"
              >
                <div className="mx-auto mb-3 h-2 w-12 rounded-full bg-muted" />
                <p className="text-sm font-medium text-muted-foreground">
                  {topic}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Bientôt
                </p>
              </div>
            )
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Voir les projets
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-muted"
          >
            <Mail size={14} />
            Me contacter
          </Link>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          En attendant, explorez le portfolio ou écrivez-moi.
        </p>
      </section>
    </main>
  );
}