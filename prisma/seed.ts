import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "ADMIN_EMAIL et ADMIN_PASSWORD sont requis. Exemple :\n" +
        "  ADMIN_EMAIL=toi@example.com ADMIN_PASSWORD=un-mot-de-passe-fort npx prisma db seed"
    );
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log("Admin verifie/cree :");
  console.log("  Email :", admin.email);
  console.log("  ID    :", admin.id);
  const tags = [
    { name: "React", slug: "react" },
    { name: "Next.js", slug: "nextjs" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Tailwind", slug: "tailwind" },
    { name: "Node.js", slug: "nodejs" },
    { name: "Express", slug: "express" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Prisma", slug: "prisma" },
    { name: "Redis", slug: "redis" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "Stripe", slug: "stripe" },
    { name: "Vercel", slug: "vercel" },
    { name: "Docker", slug: "docker" },
    { name: "GitHub Actions", slug: "github-actions" },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }

  console.log(`✅ ${tags.length} tags créés`);
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });