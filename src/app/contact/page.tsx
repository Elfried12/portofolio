import Link from "next/link";
import {
  Mail,
  ExternalLink,
  Download,
  Check,
  Clock,
} from "lucide-react";
import { ContactForm } from "@/components/contact/contactForm";
import { PROFILE } from "@/config/profile";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background font-body">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        {/* Header */}
        <div className="mb-12 max-w-xl">
          <p className="mb-2 text-sm font-medium text-primary">Contact</p>
          <h1 className="font-heading text-3xl font-bold text-accent md:text-4xl">
            Entrons en contact
          </h1>
          <p className="mt-3 text-muted-foreground">
            Une opportunité, une question technique ou simplement envie
            d’échanger — écrivez-moi.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Formulaire */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <h2 className="mb-6 font-heading text-lg font-bold text-accent">
                Envoyer un message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {/* Réseaux */}
            <div className="flex flex-col gap-3">
              {PROFILE.email && (
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-accent">Email</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {PROFILE.email}
                    </p>
                  </div>
                  <ExternalLink size={13} className="text-muted-foreground" />
                </a>
              )}

              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-input text-muted-foreground">
                    <span className="text-xs font-bold">in</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-accent">LinkedIn</p>
                    <p className="truncate text-xs text-muted-foreground">
                      Profil LinkedIn
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">
                      Ouvert aux messages
                    </span>
                    <ExternalLink size={13} className="text-muted-foreground" />
                  </div>
                </a>
              )}

              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-input text-muted-foreground">
                    <span className="text-xs font-bold">GH</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-accent">GitHub</p>
                    <p className="truncate text-xs text-muted-foreground">
                      Voir les dépôts
                    </p>
                  </div>
                  <ExternalLink size={13} className="text-muted-foreground" />
                </a>
              )}
            </div>

            {/* Disponibilité */}
            <div className="flex flex-col gap-3 rounded-lg bg-accent p-6">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-medium text-primary-foreground">
                  Disponible maintenant
                </span>
              </div>
              <h3 className="font-heading text-base font-bold text-primary-foreground">
                Je suis en recherche active
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ouvert aux postes en Alternance et aux stages, à Paris ou en remote.
                Disponibilité : immédiate.
              </p>
              <div className="mt-1 flex flex-col gap-2">
                {[
                  "Développeur full-stack",
                  "Poste orienté frontend",
                  "Stage de 6 mois",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check size={13} className="flex-shrink-0 text-primary" />
                    <span className="text-xs text-primary-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="/cv.pdf"
                download
                className="mt-2 flex items-center gap-2 self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download size={14} />
                Télécharger le CV
              </a>
            </div>

            {/* Temps de réponse */}
            <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <Clock size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-accent">
                  Temps de réponse
                </p>
                <p className="text-xs text-muted-foreground">
                  En général sous 24 h.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}