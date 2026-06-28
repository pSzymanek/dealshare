"use server";

import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db/client";
import { caseAssignments, caseEvents, caseMessages, cases, offers, organizations, partnerOfferRequests, partnerProfiles, userRoles, users } from "@/db/schema";
import { requireRole } from "@/lib/auth-guards";
import { caseStatusOrder, getClientCaseStatus } from "@/lib/case-status";
import { sendMail } from "@/lib/mail";

const idSchema = z.string().min(1).max(64);

export async function updateCaseStatusAction(formData: FormData) {
  const { session } = await requireRole("admin");
  const caseId = idSchema.parse(formData.get("caseId"));
  const status = z.enum(caseStatusOrder as [typeof caseStatusOrder[number], ...typeof caseStatusOrder]).parse(formData.get("status"));
  await db.transaction(async (tx) => {
    await tx.update(cases).set({ status }).where(eq(cases.id, caseId));
    await tx.insert(caseEvents).values({ id: randomUUID(), caseId, actorUserId: session.user.id, eventType: "status_changed", message: getClientCaseStatus(status) });
  });
  revalidatePath("/admin/sprawy");
  revalidatePath("/panel");
}

export async function assignPartnerAction(formData: FormData) {
  const { session } = await requireRole("admin");
  const caseId = idSchema.parse(formData.get("caseId"));
  const organizationId = idSchema.parse(formData.get("organizationId"));
  await db.transaction(async (tx) => {
    await tx.insert(caseAssignments).values({ id: randomUUID(), caseId, partnerOrganizationId: organizationId, status: "pending" }).onDuplicateKeyUpdate({ set: { status: "pending", rejectedAt: null, rejectionReason: null } });
    await tx.update(cases).set({ status: "partner_pending" }).where(eq(cases.id, caseId));
    await tx.insert(caseEvents).values({ id: randomUUID(), caseId, actorUserId: session.user.id, eventType: "partner_assigned", message: "Sprawdzamy dostępność właściwej firmy." });
  });
  revalidatePath("/admin/sprawy");
}

export async function reviewPartnerRequestAction(formData: FormData) {
  const { session } = await requireRole("admin");
  const requestId = idSchema.parse(formData.get("requestId"));
  const decision = z.enum(["approved", "rejected"]).parse(formData.get("decision"));
  const [request] = await db.select().from(partnerOfferRequests).where(eq(partnerOfferRequests.id, requestId)).limit(1);
  if (!request) return;

  await db.transaction(async (tx) => {
    await tx.update(partnerOfferRequests).set({ status: decision, reviewedByUserId: session.user.id, reviewedAt: new Date() }).where(eq(partnerOfferRequests.id, requestId));
    if (decision === "approved" && request.organizationId) {
      await tx.update(organizations).set({ type: "partner" }).where(eq(organizations.id, request.organizationId));
      await tx.insert(partnerProfiles).values({ id: randomUUID(), organizationId: request.organizationId, status: "approved", categories: request.categories, description: request.offerDescription, website: request.website, reviewedByUserId: session.user.id, reviewedAt: new Date() }).onDuplicateKeyUpdate({ set: { status: "approved", reviewedByUserId: session.user.id, reviewedAt: new Date() } });
      await tx.insert(userRoles).values({ id: randomUUID(), userId: request.userId, role: "partner" }).onDuplicateKeyUpdate({ set: { role: "partner" } });
    }
  });

  try {
    const [{ email, name }] = await db.select({ email: users.email, name: users.name }).from(users).where(eq(users.id, request.userId));
    await sendMail({ to: email, subject: decision === "approved" ? "[Dealshare] Możemy rozpocząć współpracę" : "[Dealshare] Porozmawiajmy jeszcze o Twojej ofercie", text: decision === "approved" ? `Dzień dobry ${name},\n\nmożemy rozpocząć współpracę. W swoim koncie znajdziesz teraz miejsce na oferty i zapytania przekazywane przez Dealshare.` : `Dzień dobry ${name},\n\nna tym etapie potrzebujemy dodatkowych informacji, zanim rozpoczniemy współpracę. Skontaktuj się z Dealshare, aby omówić ofertę.` });
  } catch (error) {
    console.error("Partner review email failed", error);
  }
  revalidatePath("/admin/oferenci");
  revalidatePath("/panel");
}

export async function updateOfferStatusAction(formData: FormData) {
  await requireRole("admin");
  const offerId = idSchema.parse(formData.get("offerId"));
  const status = z.enum(["draft", "pending_review", "published", "paused"]).parse(formData.get("status"));
  await db.update(offers).set({ status }).where(eq(offers.id, offerId));
  revalidatePath("/admin/oferty");
}

export async function addCaseMessageAction(formData: FormData) {
  const { session } = await requireRole("admin");
  const caseId = idSchema.parse(formData.get("caseId"));
  const visibility = z.enum(["client", "partner", "internal"]).parse(formData.get("visibility"));
  const body = z.string().trim().min(2).max(5000).parse(formData.get("body"));
  await db.transaction(async tx => {
    await tx.insert(caseMessages).values({ id: randomUUID(), caseId, authorUserId: session.user.id, visibility, body });
    if (visibility === "client") await tx.insert(caseEvents).values({ id: randomUUID(), caseId, actorUserId: session.user.id, eventType: "dealshare_message", message: "Masz nową wiadomość od Dealshare." });
  });
  revalidatePath("/admin/sprawy");
  revalidatePath("/panel");
}
