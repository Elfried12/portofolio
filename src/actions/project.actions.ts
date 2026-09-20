"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { projectSchema } from "@/lib/validations/project.schema";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const raw = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string) || slugify(formData.get("title") as string),
    shortSummary: formData.get("shortSummary") as string,
    description: formData.get("description") as string,
    level: formData.get("level") as string,
    status: formData.get("status") as string,
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
    demoUrl: (formData.get("demoUrl") as string) || "",
    githubUrl: (formData.get("githubUrl") as string) || "",
    realizedAt: formData.get("realizedAt") as string,
    tagIds: formData.getAll("tagIds") as string[],
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const data = parsed.data;

  await prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug,
      shortSummary: data.shortSummary,
      description: data.description,
      level: data.level,
      status: data.status,
      featured: data.featured,
      demoUrl: data.demoUrl || null,
      githubUrl: data.githubUrl || null,
      realizedAt: new Date(data.realizedAt),
      tags: data.tagIds.length
        ? { connect: data.tagIds.map((id) => ({ id })) }
        : undefined,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin");
}

export async function addProjectImage(
  projectId: string,
  url: string,
  altText: string = ""
) {
  await requireAdmin();

  const maxOrder = await prisma.projectImage.aggregate({
    where: { projectId },
    _max: { order: true },
  });

  await prisma.projectImage.create({
    data: {
      projectId,
      url,
      altText: altText || "Project image",
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/projects/${projectId}/edit`);
}

export async function deleteProjectImage(imageId: string) {
  await requireAdmin();
  const image = await prisma.projectImage.findUnique({ where: { id: imageId } });
  if (!image) return;

  await prisma.projectImage.delete({ where: { id: imageId } });
  revalidatePath("/admin");
  revalidatePath(`/admin/projects/${image.projectId}/edit`);
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();

  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    shortSummary: formData.get("shortSummary") as string,
    description: formData.get("description") as string,
    level: formData.get("level") as string,
    status: formData.get("status") as string,
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
    demoUrl: (formData.get("demoUrl") as string) || "",
    githubUrl: (formData.get("githubUrl") as string) || "",
    realizedAt: formData.get("realizedAt") as string,
    tagIds: formData.getAll("tagIds") as string[],
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const data = parsed.data;

  await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      shortSummary: data.shortSummary,
      description: data.description,
      level: data.level,
      status: data.status,
      featured: data.featured,
      demoUrl: data.demoUrl || null,
      githubUrl: data.githubUrl || null,
      realizedAt: new Date(data.realizedAt),
      tags: {
        set: data.tagIds.map((id) => ({ id })),
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  redirect("/admin");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin");
}

export async function getProjectById(id: string) {
  await requireAdmin();
  return prisma.project.findUnique({
    where: { id },
    include: { tags: true, images: { orderBy: { order: "asc" } } },
  });
}

export async function getAllTags() {
  return prisma.tag.findMany({ orderBy: { name: "asc" } });
}