import Link from "next/link";
import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import { PROFILE } from "@/config/profile";
import { getFeaturedProjects } from "@/actions/projects";

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <main>
      {/* ========== HERO ========== */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pt-20 pb-20 md:flex-row md:gap-16 md:px-12">
        {/* Texte */}
        <div className="flex-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Ouvert aux opportunités — Alternance ou stage
          </div>

          <h1 className="mb-5 font-heading text-4xl font-bold leading-tight text-accent md:text-5xl">
            {PROFILE.name}
            <br />
            <span className="text-primary">Full-Stack Developer</span>
          </h1>

          <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Je conçois des applications web fiables et scalables — du frontend
            React propre aux APIs Node.js robustes. Actuellement à la recherche
            d’une équipe avec qui grandir.
          </p>

          <div className="mb-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Voir mes projets
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-base font-medium text-accent transition-colors hover:bg-muted"
            >
              Me contacter
            </Link>
          </div>

          {/* Réseaux */}
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail size={16} />
              {PROFILE.email}
            </a>
          </div>
        </div>

        {/* Avatar + infos */}
        <div className="flex w-full max-w-xs flex-col items-center gap-4 md:w-auto">
          <div className="h-52 w-52 overflow-hidden rounded-xl bg-muted">
            <img
              src="/dex.jpg"
              alt={PROFILE.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-5 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
              <MapPin size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Basé à</p>
              <p className="text-sm font-medium text-accent">Paris, France</p>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-5 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
              <Briefcase size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Disponible</p>
              <p className="text-sm font-medium text-accent">Immédiatement</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="border-y border-border bg-card py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-6 md:px-12">
          {[
            { value: "9", label: "Projets déployés" },
            { value: "3+", label: "Années d'expérience" },
            { value: "15+", label: "Technologies maîtrisées" },
            { value: "12", label: "Articles de blog" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-heading text-4xl font-bold text-accent">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PROJECTS (dynamique) ========== */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              Travaux sélectionnés
            </p>
            <h2 className="font-heading text-3xl font-bold text-accent">
              Projets phares
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            Voir tous les projets
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => {
            const mainImage = project.images?.[0];

            return (
              <div
                key={project.id}
                className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm"
              >
                <div className="relative h-48 bg-muted">
                  {mainImage && (
                    <img
                      src={mainImage.url}
                      alt={mainImage.altText || project.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {project.featured && (
                    <span className="absolute top-3 left-3 rounded-sm bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-heading text-lg font-bold text-accent">
                    {project.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.shortSummary}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-sm bg-tag px-2.5 py-1 text-xs font-medium text-tag-foreground"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-accent"
                      >
                        
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== SKILLS ========== */}
      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-primary">
                Expertise technique
              </p>
              <h2 className="font-heading text-3xl font-bold text-accent">
                Compétences & Stack
              </h2>
            </div>
            <Link
              href="/skills"
              className="flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              Voir toutes les compétences
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Frontend",
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
              },
              {
                title: "Backend",
                skills: ["Node.js", "Express", "tRPC", "REST APIs", "WebSockets"],
              },
              {
                title: "Database",
                skills: ["PostgreSQL", "Prisma", "Redis", "MongoDB", "pgvector"],
              },
              {
                title: "DevOps & Tools",
                skills: ["Docker", "Vercel", "GitHub Actions", "Linux", "AWS S3"],
              },
            ].map((cat) => (
              <div
                key={cat.title}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3 className="mb-4 font-heading text-base font-bold text-accent">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-sm bg-input px-3 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOG ========== */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              Écriture technique
            </p>
            <h2 className="font-heading text-3xl font-bold text-accent">
              Derniers articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            Lire tous les articles
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              tag: "Architecture",
              date: "14 août 2026",
              read: "8 min",
              title:
                "Construire un moteur de recommandation avec PostgreSQL et pgvector",
              excerpt:
                "Comment j’ai implémenté la recherche de similarité vectorielle sans service ML externe.",
            },
            {
              tag: "React",
              date: "28 juil. 2026",
              read: "6 min",
              title:
                "Pourquoi je suis passé de REST à tRPC dans mes projets Next.js",
              excerpt:
                "La type-safety de bout en bout a changé ma façon de construire des APIs.",
            },
            {
              tag: "Database",
              date: "9 juil. 2026",
              read: "10 min",
              title: "Optimiser des requêtes PostgreSQL : de 2s à 80ms",
              excerpt:
                "Index, query planning et connection pooling en pratique.",
            },
          ].map((post) => (
            <Link
              key={post.title}
              href="/blog"
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-sm bg-tag px-2.5 py-1 text-xs font-medium text-tag-foreground">
                  {post.tag}
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.date} · {post.read}
                </span>
              </div>
              <h4 className="font-heading text-base font-bold leading-snug text-accent">
                {post.title}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <span className="mt-1 flex items-center gap-1 text-sm font-medium text-primary">
                Lire l’article
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="bg-accent py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-12">
          <div>
            <h2 className="mb-3 font-heading text-3xl font-bold text-primary-foreground">
              Travaillons ensemble
            </h2>
            <p className="max-w-md text-base text-muted-foreground">
              Je suis actuellement à la recherche d’un poste en Alternance ou d’un
              stage. Si vous avez un défi intéressant, parlons-en.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail size={16} />
              Envoyer un message
            </Link>
            <a
              href="/CV_BOTON_Elfried.pdf"
              download
              className="flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-white/10"
            >
              <Download size={16} />
              Télécharger le CV
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}