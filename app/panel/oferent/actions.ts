"use server";

import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db/client";
import { caseAssignments, caseEvents, cases, offers } from "@/db/schema";
import { requireRole } from "@/lib/auth-guards";
import { getApprovedPartnerOrganization } from "@/lib/partner-dashboard";

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createPartnerOfferAction(formData: FormData) {
  const { session } = await requireRole("partner");
  const organization = await getApprovedPartnerOrganization(session.user.id);
  if (!organization) return;
  const input = z.object({ title: z.string().trim().min(4).max(220), category: z.string().trim().min(2).max(160), shortDescription: z.string().trim().min(30).max(2000), visibilityMode: z.enum(["public_offer", "guided_matching"]) }).parse(Object.fromEntries(formData));
  await db.insert(offers).values({ id: randomUUID(), partnerOrganizationId: organization.id, title: input.title, slug: `${slugify(input.title)}-${randomUUID().slice(0, 8)}`, category: input.category, shortDescription: input.shortDescription, description: input.shortDescription, status: "pending_review", visibilityMode: input.visibilityMode, ctaLabel: input.visibilityMode === "public_offer" ? "Sprawdź szczegóły" : "Porozmawiaj z nami" });
  revalidatePath("/panel/oferent/oferty");
  revalidatePath("/admin/oferty");
}

export async function reviewAssignmentAction(formData: FormData) {
  const { session } = await requireRole("partner");
  const organization = await getApprovedPartnerOrganization(session.user.id);
  if (!organization) return;
  const assignmentId = z.string().min(1).parse(formData.get("assignmentId"));
  const decision = z.enum(["accepted", "rejected"]).parse(formData.get("decision"));
  const reason = z.string().trim().max(2000).optional().parse(formData.get("reason") || undefined);
  const [assignment] = await db.select().from(caseAssignments).where(and(eq(caseAssignments.id, assignmentId), eq(caseAssignments.partnerOrganizationId, organization.id))).limit(1);
  if (!assignment) return;
  await db.transaction(async tx => {
    await tx.update(caseAssignments).set(decision === "accepted" ? { status: "accepted", acceptedAt: new Date(), rejectedAt: null, rejectionReason: null } : { status: "rejected", rejectedAt: new Date(), rejectionReason: reason || "Brak uzasadnienia" }).where(eq(caseAssignments.id, assignmentId));
    await tx.update(cases).set({ status: decision === "accepted" ? "partner_accepted" : "matching" }).where(eq(cases.id, assignment.caseId));
    await tx.insert(caseEvents).values({ id: randomUUID(), caseId: assignment.caseId, actorUserId: session.user.id, eventType: `partner_${decision}`, message: decision === "accepted" ? "Znaleźliśmy firmę, z którą przygotowujemy kontakt." : "Nadal szukamy najlepszego rozwiązania dla Twojej firmy." });
  });
  revalidatePath("/panel/oferent/sprawy");
  revalidatePath("/admin/sprawy");
}
