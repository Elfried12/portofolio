"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, UploadCloud } from "lucide-react";
import { addProjectImage, deleteProjectImage } from "@/actions/project.actions";

type Image = { id: string; url: string; altText: string };

export function ProjectImageUploader({
  projectId,
  images,
}: {
  projectId: string;
  images: Image[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");

        await addProjectImage(projectId, data.url, file.name);
      }
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur upload");
    } finally {
      setUploading(false);
    }
  }

  function handleDelete(imageId: string) {
    startTransition(async () => {
      await deleteProjectImage(imageId);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
      <h3 className="font-heading text-sm font-bold text-accent">Images</h3>

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
              {/* PAS de <form> ici */}
              <button
                type="button"
                disabled={pending}
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-sm border border-border bg-background text-red-400 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-50"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-6 hover:bg-muted/40 disabled:opacity-50"
      >
        <UploadCloud size={24} className="text-muted-foreground" />
        <p className="text-sm font-medium text-accent">
          {uploading ? "Upload en cours…" : "Clique pour uploader"}
        </p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, WebP — max 5 MB
        </p>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
    </div>
  );
}