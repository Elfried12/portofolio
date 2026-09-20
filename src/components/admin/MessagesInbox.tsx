"use client";

import { useState, useTransition } from "react";
import {
  CheckCheck,
  MailOpen,
  Reply,
  Trash2,
  ExternalLink,
  Send,
} from "lucide-react";
import {
  markMessageRead,
  markAllMessagesRead,
  deleteMessage,
} from "@/actions/contact.actions";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  receivedAt: string; // ISO string from server
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function preview(text: string, max = 80) {
  const oneLine = text.replace(/\s+/g, " ").trim();
  return oneLine.length > max ? oneLine.slice(0, max) + "…" : oneLine;
}

export function MessagesInbox({ messages }: { messages: Message[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    messages[0]?.id ?? null
  );
  const [pending, startTransition] = useTransition();

  const selected = messages.find((m) => m.id === selectedId) ?? null;
  const unreadCount = messages.filter((m) => !m.read).length;

  function selectMessage(msg: Message) {
    setSelectedId(msg.id);
    if (!msg.read) {
      startTransition(() => markMessageRead(msg.id));
    }
  }

  return (
    <div className="-m-6 flex h-[calc(100vh-3.5rem)] flex-col md:-m-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-xl font-bold text-accent">
            Messages
          </h1>
          {unreadCount > 0 && (
            <span className="rounded-sm bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {unreadCount} unread
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <form action={markAllMessagesRead}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-accent"
            >
              <CheckCheck size={12} />
              Mark all as read
            </button>
          </form>
        )}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Liste */}
        <div className="flex w-80 flex-shrink-0 flex-col border-r border-border">
          {messages.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-muted-foreground">
              Aucun message
            </div>
          ) : (
            messages.map((msg) => {
              const isActive = msg.id === selectedId;
              return (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => selectMessage(msg)}
                  className={`flex flex-col gap-1 border-b border-border px-5 py-4 text-left transition-colors ${
                    isActive
                      ? "bg-secondary"
                      : msg.read
                        ? "bg-background hover:bg-muted/40"
                        : "bg-card hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      {!msg.read && (
                        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      )}
                      <span
                        className={`truncate text-sm ${
                          msg.read
                            ? "font-medium text-muted-foreground"
                            : "font-semibold text-accent"
                        }`}
                      >
                        {msg.name}
                      </span>
                    </div>
                    <span className="flex-shrink-0 text-xs text-muted-foreground">
                      {formatDate(msg.receivedAt)}
                    </span>
                  </div>
                  <p
                    className={`truncate text-xs ${
                      msg.read
                        ? "text-muted-foreground"
                        : "font-medium text-accent"
                    }`}
                  >
                    {preview(msg.message, 50)}
                  </p>
                  <p className="truncate text-xs leading-snug text-muted-foreground">
                    {preview(msg.message, 90)}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Détail */}
        <div className="flex min-w-0 flex-1 flex-col">
          {!selected ? (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Sélectionne un message
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4 border-b border-border px-8 py-5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {!selected.read && (
                      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                    )}
                    <h3 className="font-heading text-lg font-bold text-accent">
                      Message from {selected.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="font-medium text-accent">
                      {selected.name}
                    </span>
                    <span>—</span>
                    <a
                      href={`mailto:${selected.email}`}
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      {selected.email}
                      <ExternalLink size={11} />
                    </a>
                    <span>·</span>
                    <span>
                      {new Date(selected.receivedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-shrink-0 items-center gap-2">
                  {!selected.read && (
                    <form action={markMessageRead.bind(null, selected.id)}>
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:text-accent"
                      >
                        <MailOpen size={13} />
                        Mark as read
                      </button>
                    </form>
                  )}
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your message`}
                    className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:text-accent"
                  >
                    <Reply size={13} />
                    Reply by email
                  </a>
                  <form
                    action={async () => {
                      await deleteMessage(selected.id);
                      setSelectedId(null);
                    }}
                  >
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-500"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </form>
                </div>
              </div>

              <div className="flex-1 overflow-auto px-8 py-6">
                <div className="max-w-2xl rounded-lg border border-border bg-card p-6">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {selected.message}
                  </p>
                </div>

                {/* Quick reply → ouvre le client mail */}
                <div className="mt-5 flex max-w-2xl flex-col gap-3 rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Reply size={13} />
                    Quick reply to{" "}
                    <span className="font-medium text-accent">
                      {selected.email}
                    </span>
                  </div>
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center justify-end gap-2 self-end rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
                  >
                    <Send size={13} />
                    Open email client
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}