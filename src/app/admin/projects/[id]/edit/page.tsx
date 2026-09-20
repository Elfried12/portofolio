import { requireAdmin } from "@/lib/auth";
import {
  getProjectById,
  getAllTags,
  updateProject,
  deleteProject,
} from "@/actions/project.actions";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [project, tags] = await Promise.all([
    getProjectById(id),
    getAllTags(),
  ]);

  if (!project) notFound();

  const initialData = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    shortSummary: project.shortSummary,
    description: project.description,
    level: project.level,
    status: project.status,
    featured: project.featured,
    demoUrl: project.demoUrl,
    githubUrl: project.githubUrl,
    realizedAt: project.realizedAt.toISOString().slice(0, 10),
    tagIds: project.tags.map((t) => t.id),
  };

  return (
    <ProjectForm
      mode="edit"
      initialData={initialData}
      tags={tags}
      action={updateProject.bind(null, id)}
      deleteAction={deleteProject.bind(null, id)}
      projectId={project.id}
  images={project.images.map((img) => ({
    id: img.id,
    url: img.url,
    altText: img.altText,
    }))}
    />
  );
}