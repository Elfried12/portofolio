"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const schema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Message trop court"),
});

export async function sendContactMessage(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  await prisma.contactMessage.create({ data: parsed.data });
  revalidatePath("/admin/messages");
  return { success: true };
}
export async function getMessages() {
  await requireAdmin();
  return prisma.contactMessage.findMany({
    orderBy: { receivedAt: "desc" },
  });
}

export async function markMessageRead(id: string) {
  await requireAdmin();
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function markAllMessagesRead() {
  await requireAdmin();
  await prisma.contactMessage.updateMany({
    where: { read: false },
    data: { read: true },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

