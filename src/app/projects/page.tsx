import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { getPublishedProjects, getProjectTags } from "@/actions/projects";

const LEVELS = [
  { value: "ALL", label: "All" },
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "EXPERT", label: "Expert" },
] as const;

const LEVEL_LABEL: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert",
};

type SearchParams = Promise<{ level?: string; tag?: string }>;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const level = params.level ?? "ALL";
  const tag = params.tag;

  const [projects, tags] = await Promise.all([
    getPublishedProjects({ level, tag }),
    getProjectTags(),
  ]);

  return (
    <main className="min-h-screen bg-background font-body">
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-primary">Portfolio</p>
          <h1 className="font-heading text-3xl font-bold text-accent md:text-4xl">
            Projects
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A selection of applications I&apos;ve built — from learning
            experiments to production-ready tools.
          </p>
        </div>

        {/* Filtres level */}
        <div className="mb-6 flex flex-wrap gap-2">
          {LEVELS.map((l) => {
            const active = level === l.value;
            const href =
              l.value === "ALL"
                ? tag
                  ? `/projects?tag=${tag}`
                  : "/projects"
                : tag
                  ? `/projects?level=${l.value}&tag=${tag}`
                  : `/projects?level=${l.value}`;

            return (
            <Link
                key={l.value}
                href={href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-accent hover:border-primary/40 hover:bg-secondary"
                }`}
                >
                {l.label}
            </Link>
            );
          })}
        </div>

        {/* Filtres tags */}
        {tags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            <Link
                href={level !== "ALL" ? `/projects?level=${level}` : "/projects"}
                className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${
                    !tag
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-accent hover:border-primary/40 hover:bg-secondary"
                }`}
                >
                All tech
            </Link>
            {tags.map((t) => {
              const active = tag === t.slug;
              const href =
                level !== "ALL"
                  ? `/projects?level=${level}&tag=${t.slug}`
                  : `/projects?tag=${t.slug}`;
              return (
                <Link
                    key={t.id}
                    href={href}
                    className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${
                        active
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-accent hover:border-primary/40 hover:bg-secondary"
                    }`}
                    >
                    {t.name}
                </Link>
              );
            })}
          </div>
        )}

        {/* Grille */}
        {projects.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Aucun projet publié pour ces filtres.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const cover = project.images[0]?.url;
              return (
                <article
                  key={project.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="relative h-44 bg-muted">
                    {cover ? (
                      <img
                        src={cover}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                        {LEVEL_LABEL[project.level] ?? project.level}
                      </span>
                      {project.featured && (
                        <span className="rounded-sm bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 font-heading text-base font-bold leading-snug text-accent">
                      {project.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {project.shortSummary}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span
                          key={t.id}
                          className="rounded-sm bg-tag px-2.5 py-1 text-xs font-medium text-tag-foreground"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 border-t border-border pt-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-primary"
                        >
                          <ExternalLink size={12} />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent"
                        >
                          Code
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-1.5 text-xs font-medium text-accent"
                      >
                        Details
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}