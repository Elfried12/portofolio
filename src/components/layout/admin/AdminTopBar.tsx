import { getSession } from "@/lib/auth";
import { Bell } from "lucide-react";

export async function AdminTopBar() {
  const session = await getSession();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <h1 className="font-heading text-sm font-semibold text-accent">
          Dashboard
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage your portfolio content
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-accent"
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
            {session.email?.charAt(0).toUpperCase() ?? "A"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-accent">Admin</p>
            <p className="text-xs text-muted-foreground">{session.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}