"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { addProjectImage, deleteProjectImage } from "@/actions/project.actions";
import { Trash2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";

type Image = {
  id: string;
  url: string;
  altText: string;
};

type Props = {
  projectId: string;
  images: Image[];
};

export function ProjectImageUploader({ projectId, images }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
      <h3 className="font-heading text-sm font-bold text-accent">Images</h3>

      {/* Liste des images existantes */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-md border border-border"
            >
              <img
                src={img.url}
                alt={img.altText}
                className="h-28 w-full object-cover"
              />
              <form
                action={async () => {
                  await deleteProjectImage(img.id);
                  router.refresh();
                }}
                className="absolute top-2 right-2"
              >
                <button
                  type="submit"
                  className="flex h-7 w-7 items-center justify-center rounded-sm border border-border bg-background text-red-400 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 size={12} />
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      {/* Dropzone UploadThing */}
      <UploadDropzone
        endpoint="projectImage"
        appearance={{
          container:
            "border-2 border-dashed border-border rounded-lg bg-background ut-ready:bg-background ut-uploading:opacity-70",
          label: "text-sm font-medium text-accent",
          allowedContent: "text-xs text-muted-foreground",
          button:
            "bg-primary text-primary-foreground text-sm font-medium rounded-md ut-ready:bg-primary ut-uploading:bg-primary/70",
        }}
        content={{
          label: "Drop images here or click to upload",
          allowedContent: "PNG, JPG, WebP — max 4 MB",
        }}
        onClientUploadComplete={async (res) => {
          if (!res) return;
          for (const file of res) {
            const url = file.ufsUrl ?? file.url;
            await addProjectImage(projectId, url, file.name ?? "Project image");
          }
          router.refresh();
        }}
        onUploadError={(err) => {
          alert(`Upload error: ${err.message}`);
        }}
      />
    </div>
  );
}