import Link from "next/link";
import {
  MapPin,
  Globe,
  Briefcase,
  Clock,
  PenLine,
  ArrowRight,
  Mail,
  Download,
} from "lucide-react";
import { PROFILE } from "@/config/profile";

const TIMELINE = [
  {
    year: "2024 — Aujourd’hui",
    title: "Projets full-stack & open source",
    description:
      "Conception d’applications prêtes pour la production avec Next.js, Node.js et PostgreSQL. Accent sur une architecture propre et des besoins utilisateurs concrets.",
  },
  {
    year: "2022 — 2024",
    title: "Apprendre en livrant",
    description:
      "Des premiers composants React aux applications full-stack : authentification, paiements, APIs et déploiement sur Vercel.",
  },
  {
    year: "2021 — 2022",
    title: "Fondations",
    description:
      "HTML, CSS, JavaScript et premiers pas vers les frameworks modernes. Création de petits outils pour apprendre en pratiquant.",
  },
];

const FACTS = [
  {
    icon: <MapPin size={13} />,
    label: "Localisation",
    value: "Paris, France",
  },
  {
    icon: <Globe size={13} />,
    label: "Langues",
    value: "Français (natif), Anglais (professionnel)",
  },
  {
    icon: <Briefcase size={13} />,
    label: "Disponibilité",
    value: "Immédiate — CDI ou stage",
  },
  {
    icon: <Clock size={13} />,
    label: "Expérience",
    value: "3+ ans de projets personnels",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background font-body">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-2 text-sm font-medium text-primary">À propos</p>
          <h1 className="font-heading text-3xl font-bold text-accent md:text-4xl">
            {PROFILE.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Développeur Full-Stack passionné par la création d’applications web
            fiables. J’accorde de l’importance à un code propre, une UX solide
            et des fonctionnalités qui répondent à de vrais besoins.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Je suis actuellement à la recherche d’une opportunité (CDI ou stage)
            au sein d’une équipe où je pourrai progresser et contribuer à des
            produits utiles.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-heading text-xl font-bold text-accent">
              Parcours
            </h2>
            <div className="relative flex flex-col gap-8 border-l border-border pl-6">
              {TIMELINE.map((item) => (
                <div key={item.year} className="relative">
                  <span className="absolute top-1.5 -left-[1.625rem] h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  <p className="mb-1 text-xs font-medium text-primary">
                    {item.year}
                  </p>
                  <h3 className="mb-1 text-base font-semibold text-accent">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-secondary text-secondary-foreground">
                    {fact.icon}
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                    <span className="flex-shrink-0 text-xs text-muted-foreground">
                      {fact.label}
                    </span>
                    <span className="text-sm font-medium text-accent">
                      {fact.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 rounded-lg bg-accent p-6">
              <PenLine size={20} className="text-primary" />
              <h3 className="font-heading text-base font-bold text-primary-foreground">
                J’écris sur ce que je construis
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Notes techniques sur l’architecture, les bases de données et les
                leçons tirées de vrais projets.
              </p>
              <Link
                href="/blog"
                className="mt-1 flex items-center gap-2 self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Lire le blog
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-12">
          <div>
            <h3 className="mb-1 font-heading text-xl font-bold text-accent">
              Prêt à échanger ?
            </h3>
            <p className="text-sm text-muted-foreground">
              Trouvons 30 minutes pour parler des défis de votre équipe et voir
              comment je peux contribuer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail size={14} />
              Envoyer un message
            </Link>
            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-accent hover:bg-muted"
            >
              <Download size={14} />
              Télécharger le CV
            </a>
            {PROFILE.linkedin && (
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-accent hover:bg-muted"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}