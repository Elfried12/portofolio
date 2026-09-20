"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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