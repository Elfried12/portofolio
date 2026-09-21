"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { sendContactMessage } from "@/actions/contact.actions";

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await sendContactMessage(formData);
    setPending(false);

    if (result?.error) {
      setError(result.error);
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-10 text-center">
        <CheckCircle2 size={32} className="text-primary" />
        <h3 className="font-heading text-lg font-bold text-accent">
          Message envoyé
        </h3>
        <p className="text-sm text-muted-foreground">
          Merci ! Je vous répondrai dès que possible.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-accent">
          Nom
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-md border border-border bg-input px-3 py-2.5 text-sm text-accent outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Votre nom"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-accent">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-md border border-border bg-input px-3 py-2.5 text-sm text-accent outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="vous@exemple.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-accent">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="resize-y rounded-md border border-border bg-input px-3 py-2.5 text-sm text-accent outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Parlez-moi de votre projet ou de l’opportunité…"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-1 flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Send size={14} />
        {pending ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}