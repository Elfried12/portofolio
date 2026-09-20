import { requireAdmin } from "@/lib/auth";
import { getAllTags, createProject } from "@/actions/project.actions";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  await requireAdmin();
  const tags = await getAllTags();

  return (
    <ProjectForm mode="create" tags={tags} action={createProject} />
  );
}