import { randomUUID } from "crypto";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db/client";
import {
  caseAnswers,
  caseDocuments,
  caseEvents,
  caseMessages,
  cases,
  caseSequences,
  offers,
  organizationMembers,
  organizations,
  submissionRateLimits,
  userRoles,
  users
} from "@/db/schema";
import type { CaseSubmission } from "@/lib/case-validation";
import { checkRateLimit } from "@/lib/rate-limit";

export async function createCase(submission: CaseSubmission, request: Request) {
  const rateLimit = await checkRateLimit({ request, identity: submission.email, action: "create_case" });

  return db.transaction(async (tx) => {
    const [existingUser] = await tx.select().from(users).where(eq(users.email, submission.email)).limit(1);
    const userId = existingUser?.id ?? randomUUID();

    if (!existingUser) {
      await tx.insert(users).values({
        id: userId,
        name: submission.fullName,
        email: submission.email,
        phone: submission.phone,
        emailVerified: false
      });
      await tx.insert(userRoles).values({ id: randomUUID(), userId, role: "client" });
    } else {
      await tx.update(users).set({ name: submission.fullName, phone: submission.phone }).where(eq(users.id, userId));
    }

    const normalizedNip = submission.nip?.replace(/[\s-]/g, "") || null;
    const [existingOrganization] = normalizedNip
      ? await tx.select().from(organizations).where(eq(organizations.nip, normalizedNip)).limit(1)
      : [];
    const organizationId = existingOrganization?.id ?? randomUUID();

    if (!existingOrganization) {
      await tx.insert(organizations).values({
        id: organizationId,
        name: submission.companyName,
        nip: normalizedNip,
        type: "client"
      });
    }

    await tx
      .insert(organizationMembers)
      .values({ userId, organizationId, role: "owner" })
      .onDuplicateKeyUpdate({ set: { role: "owner" } });

    const [linkedOffer] = submission.offerSlug
      ? await tx.select().from(offers).where(eq(offers.slug, submission.offerSlug)).limit(1)
      : [];

    if (submission.pathType === "public_offer" && !linkedOffer) {
      throw new Error("OFFER_NOT_FOUND");
    }

    const year = new Date().getUTCFullYear();
    await tx
      .insert(caseSequences)
      .values({ year, lastValue: 1 })
      .onDuplicateKeyUpdate({ set: { lastValue: sql`${caseSequences.lastValue} + 1` } });
    const [sequence] = await tx.select().from(caseSequences).where(eq(caseSequences.year, year)).limit(1);
    const caseNumber = `DS-${year}-${String(sequence.lastValue).padStart(4, "0")}`;
    const caseId = randomUUID();

    await tx.insert(cases).values({
      id: caseId,
      caseNumber,
      userId,
      organizationId,
      offerId: linkedOffer?.id,
      pathType: submission.pathType,
      category: submission.category,
      title: linkedOffer?.title ?? `Potrzeba: ${submission.category}`,
      description: submission.description,
      sourceUrl: submission.sourceUrl || null,
      utmSource: submission.utmSource || null,
      utmMedium: submission.utmMedium || null,
      utmCampaign: submission.utmCampaign || null
    });

    const answers = [
      ...submission.answers,
      { key: "preferred_contact", value: submission.preferredContact }
    ];
    await tx.insert(caseAnswers).values(
      answers.map((answer) => ({
        id: randomUUID(),
        caseId,
        fieldKey: answer.key,
        fieldValue: answer.value
      }))
    );
    await tx.insert(caseEvents).values({
      id: randomUUID(),
      caseId,
      actorUserId: userId,
      eventType: "case_created",
      message: "Sprawa została utworzona i otrzymała Case ID."
    });
    await tx.insert(submissionRateLimits).values({
      ...rateLimit.record
    });

    return {
      caseId,
      caseNumber,
      userId,
      isNewUser: !existingUser,
      title: linkedOffer?.title ?? submission.category
    };
  });
}

export async function getCasesForUser(userId: string) {
  return db.select().from(cases).where(eq(cases.userId, userId)).orderBy(desc(cases.createdAt));
}

export async function getCaseForUser(userId: string, caseNumber: string) {
  const [result] = await db
    .select()
    .from(cases)
    .where(and(eq(cases.userId, userId), eq(cases.caseNumber, caseNumber)))
    .limit(1);

  if (!result) return null;

  const [answers, events, documents, messages] = await Promise.all([
    db.select().from(caseAnswers).where(eq(caseAnswers.caseId, result.id)),
    db.select().from(caseEvents).where(eq(caseEvents.caseId, result.id)).orderBy(desc(caseEvents.createdAt)),
    db.select().from(caseDocuments).where(and(eq(caseDocuments.caseId, result.id), eq(caseDocuments.visibility, "client"))).orderBy(desc(caseDocuments.createdAt)),
    db.select().from(caseMessages).where(and(eq(caseMessages.caseId, result.id), eq(caseMessages.visibility, "client"))).orderBy(desc(caseMessages.createdAt))
  ]);

  return { ...result, answers, events, documents, messages };
}

export async function getDocumentsForUser(userId: string) {
  return db
    .select({ id: caseDocuments.id, originalName: caseDocuments.originalName, mimeType: caseDocuments.mimeType, fileSize: caseDocuments.fileSize, createdAt: caseDocuments.createdAt, caseNumber: cases.caseNumber, caseTitle: cases.title })
    .from(caseDocuments)
    .innerJoin(cases, eq(caseDocuments.caseId, cases.id))
    .where(and(eq(cases.userId, userId), eq(caseDocuments.visibility, "client")))
    .orderBy(desc(caseDocuments.createdAt));
}

export async function getMessagesForUser(userId: string) {
  return db
    .select({ id: caseMessages.id, body: caseMessages.body, createdAt: caseMessages.createdAt, caseNumber: cases.caseNumber, caseTitle: cases.title, authorUserId: caseMessages.authorUserId })
    .from(caseMessages)
    .innerJoin(cases, eq(caseMessages.caseId, cases.id))
    .where(and(eq(cases.userId, userId), eq(caseMessages.visibility, "client")))
    .orderBy(desc(caseMessages.createdAt));
}
