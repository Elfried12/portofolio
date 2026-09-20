import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Titre trop court"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide (ex: mon-projet)"),
  shortSummary: z.string().min(10, "Résumé trop court"),
  description: z.string().min(20, "Description trop courte"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED"]),
  featured: z.boolean(),
  demoUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  realizedAt: z.string().min(1, "Date requise"), // ISO date string
  tagIds: z.array(z.string()).default([]),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;