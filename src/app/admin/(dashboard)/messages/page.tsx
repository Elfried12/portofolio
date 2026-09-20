import { requireAdmin } from "@/lib/auth";
import { getMessages } from "@/actions/contact.actions";
import { MessagesInbox } from "@/components/admin/MessagesInbox";

export default async function AdminMessagesPage() {
  await requireAdmin();
  const messages = await getMessages();

  return (
    <MessagesInbox
      messages={messages.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        message: m.message,
        read: m.read,
        receivedAt: m.receivedAt.toISOString(),
      }))}
    />
  );
}