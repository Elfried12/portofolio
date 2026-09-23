import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getSession } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  projectImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const session = await getSession();
      if (!session.isLoggedIn || !session.adminId) {
        throw new Error("Unauthorized");
      }
      return { adminId: session.adminId };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl ?? file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;