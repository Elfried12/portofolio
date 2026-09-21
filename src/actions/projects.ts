"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: {
      status: "PUBLISHED",
      featured: true,
    },
    orderBy: {
      realizedAt: "desc",
    },
    take: 3,
    include: {
      tags: true,
      images: {
        orderBy: { order: "asc" },
        take: 1, // image principale
      },
    },
  });
}

export async function getPublishedProjects(filters?: {
  level?: string;
  tag?: string;
}) {
  return prisma.project.findMany({
    where: {
      status: "PUBLISHED",
      ...(filters?.level && filters.level !== "ALL"
        ? { level: filters.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT" }
        : {}),
      ...(filters?.tag
        ? { tags: { some: { slug: filters.tag } } }
        : {}),
    },
    orderBy: { realizedAt: "desc" },
    include: {
      tags: true,
      images: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
  });
}

export async function getProjectTags() {
  return prisma.tag.findMany({
    where: {
      projects: { some: { status: "PUBLISHED" } },
    },
    orderBy: { name: "asc" },
  });
}

export async function getAllProjects() {
  return prisma.project.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      realizedAt: "desc",
    },
    include: {
      tags: true,
      images: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      tags: true,
      images: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getAdjacentProjects(slug: string) {
  const all = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { realizedAt: "desc" },
    select: { slug: true, title: true },
  });

  const index = all.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : null,
  };
}

// --- Admin actions (on les utilisera plus tard) ---

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const shortSummary = formData.get("shortSummary") as string;
  const description = formData.get("description") as string;
  const level = formData.get("level") as any;
  const demoUrl = (formData.get("demoUrl") as string) || null;
  const githubUrl = (formData.get("githubUrl") as string) || null;
  const featured = formData.get("featured") === "on";
  const status = (formData.get("status") as any) || "DRAFT";
  const realizedAt = new Date(formData.get("realizedAt") as string);

  await prisma.project.create({
    data: {
      title,
      slug,
      shortSummary,
      description,
      level,
      demoUrl,
      githubUrl,
      featured,
      status,
      realizedAt,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}