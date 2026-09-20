import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionOptions, SessionData, defaultSession } from "./session";

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function requireAdmin() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.adminId) {
    redirect("/admin/login");
  }

  return session;
}