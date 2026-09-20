import { loginAdmin } from "@/actions/auth.actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Shield,
  Mail,
  EyeOff,
  Info,
  LogIn,
  ArrowLeft,
  CircleAlert,
} from "lucide-react";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;

  if (session.isLoggedIn) {
    redirect("/admin");
  }

  const hasError = params.error === "1";

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between border-b border-border bg-card px-6 md:px-12">
        <div className="flex items-center gap-2 text-sm font-medium text-accent">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-accent">
            <Lock size={12} className="text-accent-foreground" />
          </div>
          <span className="font-heading font-bold">
            <span className="text-primary">&lt;</span>
            Elfried Alceo Tohouegnon BOTON
            <span className="text-primary"> /&gt;</span>
          </span>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft size={13} />
          Back to site
        </Link>
      </div>

      {/* Formulaire centré */}
      <div className="flex items-center justify-center px-4 pt-24 pb-16">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
              <Shield size={22} className="text-primary" />
            </div>
            <h1 className="mb-1 font-heading text-2xl font-bold text-accent">
              Admin access
            </h1>
            <p className="text-center text-sm text-muted-foreground">
              This area is restricted to the site owner.
            </p>
          </div>

          {/* Card */}
          <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-8">
            {/* Erreur */}
            {hasError && (
              <div className="flex items-center gap-2.5 rounded-md border border-red-200 bg-red-50 px-4 py-3">
                <CircleAlert size={15} className="flex-shrink-0 text-red-500" />
                <p className="text-sm text-red-600">
                  Incorrect credentials. Please try again.
                </p>
              </div>
            )}

            <form action={loginAdmin} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-accent"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="admin@exemple.com"
                    className="w-full rounded-md border border-border bg-input py-3 pr-4 pl-10 text-sm text-accent outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-accent"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={14}
                    className="absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    className="w-full rounded-md border border-border bg-input py-3 pr-10 pl-10 text-sm text-accent outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <EyeOff
                    size={14}
                    className="absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </div>

              {/* Info rate limit */}
              <div className="flex items-start gap-2.5 rounded-md bg-secondary px-4 py-3">
                <Info
                  size={14}
                  className="mt-0.5 flex-shrink-0 text-primary"
                />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  5 failed attempts will temporarily lock this form for 15
                  minutes.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                <LogIn size={15} />
                Sign in
              </button>
            </form>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Session lasts 7 days. Secured with httpOnly + sameSite cookie.
          </p>
        </div>
      </div>
    </div>
  );
}