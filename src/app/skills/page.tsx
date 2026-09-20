import Link from "next/link";
import {
  Code2,
  Server,
  Database,
  Wrench,
  PenLine,
  Kanban,
  MessageSquare,
  Folder,
  ArrowRight,
  Download,
  Layers,
  Globe,
  Terminal,
} from "lucide-react";

type SkillLevel = "Maîtrisé" | "Confirmé" | "Intermédiaire";

type Skill = {
  name: string;
  level: SkillLevel;
  projects: number;
  icon: React.ReactNode;
};

type Category = {
  title: string;
  description: string;
  skills: Skill[];
};

const LEVEL_CLASS: Record<SkillLevel, string> = {
  Maîtrisé: "bg-primary text-primary-foreground",
  Confirmé: "bg-tag text-tag-foreground",
  Intermédiaire: "bg-secondary text-secondary-foreground",
};

const CATEGORIES: Category[] = [
  {
    title: "Frontend",
    description: "Interfaces modernes, accessibles et performantes.",
    skills: [
      {
        name: "React / Next.js",
        level: "Maîtrisé",
        projects: 9,
        icon: <Code2 size={16} />,
      },
      {
        name: "TypeScript",
        level: "Maîtrisé",
        projects: 8,
        icon: <Terminal size={16} />,
      },
      {
        name: "Tailwind CSS",
        level: "Maîtrisé",
        projects: 9,
        icon: <Layers size={16} />,
      },
      {
        name: "HTML / CSS",
        level: "Maîtrisé",
        projects: 12,
        icon: <Globe size={16} />,
      },
    ],
  },
  {
    title: "Backend",
    description: "APIs robustes, auth et logique métier.",
    skills: [
      {
        name: "Node.js",
        level: "Maîtrisé",
        projects: 7,
        icon: <Server size={16} />,
      },
      {
        name: "Express / Nest",
        level: "Confirmé",
        projects: 5,
        icon: <Server size={16} />,
      },
      {
        name: "REST / tRPC",
        level: "Confirmé",
        projects: 6,
        icon: <Globe size={16} />,
      },
    ],
  },
  {
    title: "Data & Infra",
    description: "Persistance, déploiement et outillage.",
    skills: [
      {
        name: "PostgreSQL",
        level: "Maîtrisé",
        projects: 6,
        icon: <Database size={16} />,
      },
      {
        name: "Prisma",
        level: "Maîtrisé",
        projects: 5,
        icon: <Database size={16} />,
      },
      {
        name: "Docker / Vercel",
        level: "Confirmé",
        projects: 4,
        icon: <Wrench size={16} />,
      },
    ],
  },
  {
    title: "Soft skills",
    description: "Collaboration et livraison en conditions réelles.",
    skills: [
      {
        name: "Rédaction technique",
        level: "Maîtrisé",
        projects: 9,
        icon: <PenLine size={16} />,
      },
      {
        name: "Gestion de projet",
        level: "Confirmé",
        projects: 3,
        icon: <Kanban size={16} />,
      },
      {
        name: "Communication client",
        level: "Confirmé",
        projects: 2,
        icon: <MessageSquare size={16} />,
      },
    ],
  },
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-background font-body">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-2 text-sm font-medium text-primary">Expertise</p>
          <h1 className="font-heading text-3xl font-bold text-accent md:text-4xl">
            Skills
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Stack technique et compétences utilisées sur des projets concrets —
            du prototype à la prod.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-14">
          {CATEGORIES.map((category) => (
            <section key={category.title}>
              <div className="mb-5">
                <h2 className="font-heading text-xl font-bold text-accent">
                  {category.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                        {skill.icon}
                      </div>
                      <span className="text-sm font-medium text-accent">
                        {skill.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-sm px-2.5 py-1 text-xs font-medium ${LEVEL_CLASS[skill.level]}`}
                      >
                        {skill.level}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Folder size={11} />
                        {skill.projects}
                      </span>
                      <ArrowRight
                        size={13}
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-12">
          <div>
            <h3 className="mb-1 font-heading text-xl font-bold text-accent">
              Want to see it in action?
            </h3>
            <p className="text-sm text-muted-foreground">
              Browse the projects where these skills were applied in real-world
              contexts.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View all projects
              <ArrowRight size={14} />
            </Link>
            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-muted"
            >
              <Download size={14} />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}