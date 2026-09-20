"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  ExternalLink,
  Calendar,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { ProjectImageUploader } from "@/components/admin/ProjectImageUploader";

type Tag = { id: string; name: string; slug: string };

type ProjectData = {
  id?: string;
  title: string;
  slug: string;
  shortSummary: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED";
  featured: boolean;
  demoUrl: string | null;
  githubUrl: string | null;
  realizedAt: string;
  tagIds: string[];
};

type Props = {
  mode: "create" | "edit";
  initialData?: ProjectData;
  tags: Tag[];
  action: (formData: FormData) => Promise<{ error?: string } | void>;
  deleteAction?: () => Promise<void>;
  projectId?: string;
  images?: { id: string; url: string; altText: string }[];
};

const LEVELS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "EXPERT", label: "Expert" },
] as const;

export function ProjectForm({
  mode,
  initialData,
  tags,
  action,
  deleteAction,
  projectId,
  images,
}: Props) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [status, setStatus] = useState(initialData?.status ?? "DRAFT");
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [level, setLevel] = useState(initialData?.level ?? "INTERMEDIATE");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tagIds ?? []
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function autoSlug(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function toggleTag(id: string) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);

    formData.set("status", status);
    formData.set("featured", featured ? "true" : "false");
    formData.set("level", level);
    formData.delete("tagIds");
    selectedTags.forEach((id) => formData.append("tagIds", id));

    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-accent"
          >
            <ArrowLeft size={14} />
          </Link>
          <div>
            <h1 className="font-heading text-xl font-bold text-accent">
              {mode === "create" ? "New project" : "Edit project"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {mode === "create"
                ? "Add a new project to your portfolio"
                : "Update project details"}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        action={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {/* ========== COLONNE GAUCHE ========== */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          {/* Infos principales */}
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-accent">Title</label>
              <input
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (mode === "create") setSlug(autoSlug(e.target.value));
                }}
                required
                className="rounded-md border border-border bg-input px-3 py-2.5 text-sm text-accent outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="E-Commerce Platform"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-accent">Slug</label>
              <input
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="rounded-md border border-border bg-input px-3 py-2.5 font-mono text-sm text-accent outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="ecommerce-platform"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-accent">
                Short summary
              </label>
              <textarea
                name="shortSummary"
                defaultValue={initialData?.shortSummary}
                required
                rows={2}
                className="resize-none rounded-md border border-border bg-input px-3 py-2.5 text-sm text-accent outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Brief description shown on cards..."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-accent">
                Full description
              </label>
              <textarea
                name="description"
                defaultValue={initialData?.description}
                required
                rows={8}
                className="resize-y rounded-md border border-border bg-input px-3 py-2.5 text-sm text-accent outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Detailed project description..."
              />
            </div>
          </div>

          {/* Images */}
          {mode === "edit" && projectId ? (
            <ProjectImageUploader
              projectId={projectId}
              images={images ?? []}
            />
          ) : (
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
              <h3 className="font-heading text-sm font-bold text-accent">
                Images
              </h3>
              <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-6">
                <UploadCloud size={24} className="text-muted-foreground" />
                <p className="text-sm font-medium text-accent">
                  Save the project first to upload images
                </p>
                <p className="text-xs text-muted-foreground">
                  Images can be added after creation
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========== COLONNE DROITE ========== */}
        <div className="flex flex-col gap-5">
          {/* Publication */}
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
            <h3 className="font-heading text-sm font-bold text-accent">
              Publication
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <div className="flex items-center gap-0.5 rounded-md border border-border bg-background p-0.5">
                <button
                  type="button"
                  onClick={() => setStatus("DRAFT")}
                  className={`rounded-sm px-3 py-1 text-xs font-medium ${
                    status === "DRAFT"
                      ? "bg-card text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("PUBLISHED")}
                  className={`rounded-sm px-3 py-1 text-xs font-medium ${
                    status === "PUBLISHED"
                      ? "bg-card text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  Published
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-accent">
                  Featured project
                </p>
                <p className="text-xs text-muted-foreground">
                  Shown on homepage
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFeatured(!featured)}
                className={`flex h-6 w-10 items-center rounded-full px-1 transition-colors ${
                  featured ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                    featured ? "ml-auto" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col gap-2 border-t border-border pt-3">
              <button
                type="submit"
                disabled={pending}
                onClick={() => setStatus("PUBLISHED")}
                className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                <Globe size={14} />
                {pending ? "Saving..." : "Publish"}
              </button>
              <button
                type="submit"
                disabled={pending}
                onClick={() => setStatus("DRAFT")}
                className="flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-accent hover:bg-muted disabled:opacity-50"
              >
                Save draft
              </button>
            </div>
          </div>

          {/* Level */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
            <h3 className="font-heading text-sm font-bold text-accent">
              Project level
            </h3>
            <div className="flex flex-col gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLevel(l.value)}
                  className={`flex items-center gap-3 rounded-md border px-3 py-2.5 ${
                    level === l.value
                      ? "border-primary bg-secondary"
                      : "border-border bg-background"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                      level === l.value
                        ? "border-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {level === l.value && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      level === l.value
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
            <h3 className="font-heading text-sm font-bold text-accent">
              Tech stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const active = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`rounded-sm border px-2.5 py-1 text-xs font-medium ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
              {tags.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Aucun tag en base. Crée-en via seed ou Prisma Studio.
                </p>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
            <h3 className="font-heading text-sm font-bold text-accent">
              Links{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </h3>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">
                Live demo URL
              </label>
              <div className="relative">
                <ExternalLink
                  size={12}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  name="demoUrl"
                  type="url"
                  defaultValue={initialData?.demoUrl ?? ""}
                  placeholder="https://..."
                  className="w-full rounded-sm border border-border bg-input py-2 pr-3 pl-8 font-mono text-xs text-accent outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">
                GitHub repository
              </label>
              <div className="relative">
                <input
                  name="githubUrl"
                  type="url"
                  defaultValue={initialData?.githubUrl ?? ""}
                  placeholder="https://github.com/..."
                  className="w-full rounded-sm border border-border bg-input py-2 pr-3 pl-8 font-mono text-xs text-accent outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
            <h3 className="font-heading text-sm font-bold text-accent">
              Completion date
            </h3>
            <div className="relative">
              <Calendar
                size={14}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
              />
              <input
                name="realizedAt"
                type="date"
                required
                defaultValue={initialData?.realizedAt}
                className="w-full rounded-sm border border-border bg-input px-4 py-2.5 text-sm text-accent outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Delete (edit only) */}
          {mode === "edit" && deleteAction && (
            <button
              type="button"
              onClick={() => {
                if (confirm("Supprimer ce projet définitivement ?")) {
                  deleteAction();
                }
              }}
              className="flex items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600"
            >
              <Trash2 size={14} />
              Delete this project
            </button>
          )}
        </div>
      </form>
    </div>
  );
}