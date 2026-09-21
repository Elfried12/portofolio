import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  BarChart2,
  Layers,
  Star,
} from "lucide-react";
import {
  getProjectBySlug,
  getAdjacentProjects,
} from "@/actions/projects";

const LEVEL_LABEL: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug);
  const cover = project.images[0];
  const gallery = project.images.slice(1);

  return (
    <main className="min-h-screen bg-background font-body">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
        {/* Back */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} />
          Tous les projets
        </Link>

        {/* Title */}
        <div className="mb-8 max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              {LEVEL_LABEL[project.level] ?? project.level}
            </span>
            {project.featured && (
              <span className="rounded-sm bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                Featured
              </span>
            )}
          </div>
          <h1 className="font-heading text-3xl font-bold text-accent md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {project.shortSummary}
          </p>
        </div>

        {/* Cover */}
        {cover && (
          <div className="mb-10 overflow-hidden rounded-xl border border-border">
            <img
              src={cover.url}
              alt={cover.altText || project.title}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Contenu */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-heading text-xl font-bold text-accent">
              Description
            </h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {project.description.split("\n").map((para, i) =>
                para.trim() ? (
                  <p key={i} className="mb-4 leading-relaxed">
                    {para}
                  </p>
                ) : null
              )}
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {gallery.map((img) => (
                  <div
                    key={img.id}
                    className="overflow-hidden rounded-lg border border-border"
                  >
                    <img
                      src={img.url}
                      alt={img.altText}
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Meta */}
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-secondary">
                  <Calendar size={13} className="text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-accent">
                    {project.realizedAt.toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-secondary">
                  <BarChart2 size={13} className="text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Niveau</p>
                  <p className="text-sm font-medium text-accent">
                    {LEVEL_LABEL[project.level] ?? project.level}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-secondary">
                  <Layers size={13} className="text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Stack</p>
                  <p className="text-sm font-medium text-accent">
                    {project.tags.length} technologie
                    {project.tags.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {project.featured && (
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-secondary">
                    <Star size={13} className="text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Statut</p>
                    <p className="text-sm font-medium text-accent">
                      Projet mis en avant
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-1 font-heading text-sm font-bold text-accent">
                Liens
              </h3>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <ExternalLink size={14} />
                  Voir la démo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-muted"
                >
                  Code source
                </a>
              )}
              {!project.demoUrl && !project.githubUrl && (
                <p className="text-xs text-muted-foreground">
                  Aucun lien public pour ce projet.
                </p>
              )}
            </div>

            {/* Stack tags */}
            {project.tags.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-heading text-sm font-bold text-accent">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-sm bg-tag px-2.5 py-1 text-xs font-medium text-tag-foreground"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-14 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <ArrowLeft size={18} className="flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="mb-0.5 text-xs text-muted-foreground">
                  Projet précédent
                </p>
                <p className="text-sm font-medium text-accent">{prev.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="flex items-center justify-end gap-4 rounded-lg border border-border bg-card p-5 text-right transition-colors hover:border-primary/30"
            >
              <div>
                <p className="mb-0.5 text-xs text-muted-foreground">
                  Projet suivant
                </p>
                <p className="text-sm font-medium text-accent">{next.title}</p>
              </div>
              <ArrowRight size={18} className="flex-shrink-0 text-muted-foreground" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}