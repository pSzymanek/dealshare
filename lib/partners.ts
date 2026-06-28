import { randomUUID } from "crypto";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import {
  organizationMembers,
  organizations,
  partnerOfferRequests,
  submissionRateLimits,
  userRoles,
  users
} from "@/db/schema";
import type { PartnerRequestSubmission } from "@/lib/partner-validation";
import { checkRateLimit } from "@/lib/rate-limit";

export async function createPartnerRequest(submission: PartnerRequestSubmission, request: Request) {
  const rateLimit = await checkRateLimit({ request, identity: submission.email, action: "partner_request", maxAttempts: 3 });

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
        website: submission.websiteUrl || null,
        type: "client"
      });
    }

    await tx
      .insert(organizationMembers)
      .values({ userId, organizationId, role: "owner" })
      .onDuplicateKeyUpdate({ set: { role: "owner" } });

    const requestId = randomUUID();
    await tx.insert(partnerOfferRequests).values({
      id: requestId,
      userId,
      organizationId,
      companyName: submission.companyName,
      nip: normalizedNip,
      website: submission.websiteUrl || null,
      offerDescription: submission.offerDescription,
      categories: JSON.stringify(submission.categories),
      status: "pending"
    });
    await tx.insert(submissionRateLimits).values(rateLimit.record);

    return { requestId, userId, organizationId, isNewUser: !existingUser };
  });
}

export async function getPartnerRequestsForUser(userId: string) {
  return db.select().from(partnerOfferRequests).where(eq(partnerOfferRequests.userId, userId)).orderBy(desc(partnerOfferRequests.createdAt));
}
