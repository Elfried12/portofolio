import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FolderKanban,
  FileText,
  Mail,
  Pencil,
  Eye,
  EyeOff,
  Trash2,
  Star,
  ArrowRight,
  Plus,
} from "lucide-react";
import { deleteProject } from "@/actions/project.actions";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [projects, unreadMessages, publishedCount, draftCount] =
    await Promise.all([
      prisma.project.findMany({
        orderBy: { realizedAt: "desc" },
        take: 20,
      }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.project.count({ where: { status: "PUBLISHED" } }),
      prisma.project.count({ where: { status: "DRAFT" } }),
    ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-accent">
            Projects
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus size={15} />
          New project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total projects" value={projects.length} />
        <StatCard label="Published" value={publishedCount} />
        <StatCard label="Drafts" value={draftCount} />
        <StatCard label="Unread messages" value={unreadMessages} />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="grid grid-cols-12 border-b border-border bg-muted/40 px-5 py-3 text-xs font-medium text-muted-foreground">
          <div className="col-span-4">Project</div>
          <div className="col-span-2">Level</div>
          <div className="col-span-1 text-center">Featured</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {projects.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            Aucun projet pour le moment.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-12 items-center border-b border-border px-5 py-3.5 text-sm last:border-b-0"
            >
              <div className="col-span-4 min-w-0">
                <p className="truncate font-medium text-accent">
                  {project.title}
                </p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {project.slug}
                </p>
              </div>

              <div className="col-span-2">
                <LevelBadge level={project.level} />
              </div>

              <div className="col-span-1 flex justify-center">
                <Star
                  size={16}
                  className={
                    project.featured
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }
                />
              </div>

              <div className="col-span-2">
                <StatusBadge status={project.status} />
              </div>

              <div className="col-span-2 text-xs text-muted-foreground">
                {project.realizedAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <div className="col-span-1 flex items-center justify-end gap-2">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="flex h-7 w-7 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground hover:text-accent"
                >
                  <Pencil size={13} />
                </Link>
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="flex h-7 w-7 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground hover:text-accent"
                >
                  {project.status === "PUBLISHED" ? (
                    <Eye size={13} />
                  ) : (
                    <EyeOff size={13} />
                  )}
                </Link>
                <form action={deleteProject.bind(null, project.id)}>
                  <button
                    type="submit"
                    className="flex h-7 w-7 items-center justify-center rounded-sm border border-border bg-background text-red-400 hover:bg-red-50"
                  >
                    <Trash2 size={13} />
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <QuickAction
          href="/admin/projects/new"
          icon={<FolderKanban size={16} className="text-primary" />}
          iconBg="bg-secondary"
          title="New project"
          subtitle="Add to portfolio"
        />
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 opacity-60">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-tag">
            <FileText size={16} className="text-tag-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-accent">New article</p>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </div>
          <ArrowRight size={14} className="ml-auto text-muted-foreground" />
        </div>
        <QuickAction
          href="/admin/messages"
          icon={<Mail size={16} className="text-primary-foreground" />}
          iconBg="bg-primary"
          title="Messages"
          subtitle={`${unreadMessages} unread`}
        />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-heading text-2xl font-bold text-accent">{value}</p>
    </div>
  );
}

function LevelBadge({ level }: { level: string }) {
  const map: Record<string, { label: string; className: string }> = {
    BEGINNER: {
      label: "Beginner",
      className: "bg-secondary text-secondary-foreground",
    },
    INTERMEDIATE: {
      label: "Intermediate",
      className: "bg-tag text-tag-foreground",
    },
    ADVANCED: {
      label: "Advanced",
      className: "bg-primary/10 text-primary",
    },
    EXPERT: {
      label: "Expert",
      className: "bg-accent text-accent-foreground",
    },
  };
  const cfg = map[level] ?? {
    label: level,
    className: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`rounded-sm px-2.5 py-1 text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "PUBLISHED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Published
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-input px-2.5 py-1 text-xs font-medium text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
      Draft
    </span>
  );
}

function QuickAction({
  href,
  icon,
  iconBg,
  title,
  subtitle,
}: {
  href: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-md ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-accent">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <ArrowRight size={14} className="ml-auto text-muted-foreground" />
    </Link>
  );
}