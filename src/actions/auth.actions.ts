"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginAdmin(formData: FormData) {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    redirect("/admin/login?error=1");
  }

  const { email, password } = parsed.data;

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    redirect("/admin/login?error=1");
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isValid) {
    redirect("/admin/login?error=1");
  }

  const session = await getSession();
  session.adminId = admin.id;
  session.email = admin.email;
  session.isLoggedIn = true;
  await session.save();

  redirect("/admin");
}

export async function logoutAdmin() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}