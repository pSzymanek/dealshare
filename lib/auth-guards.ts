import "server-only";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/client";
import { userRoles } from "@/db/schema";
import { auth } from "@/lib/auth";

export type AppRole = "client" | "partner" | "admin";

export async function getAuthContext() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return null;

  const roleRows = await db.select({ role: userRoles.role }).from(userRoles).where(eq(userRoles.userId, session.user.id));

  return {
    session,
    roles: roleRows.map((row) => row.role) as AppRole[]
  };
}

export async function requireAuth() {
  const context = await getAuthContext();
  if (!context) redirect("/logowanie");
  return context;
}

export async function requireRole(role: AppRole) {
  const context = await requireAuth();
  if (!context.roles.includes(role)) redirect("/panel");
  return context;
}
