import "server-only";

import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { caseAssignments, cases, offers, organizationMembers, organizations, partnerProfiles } from "@/db/schema";

export async function getApprovedPartnerOrganization(userId: string) {
  const [result] = await db
    .select({ id: organizations.id, name: organizations.name })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .innerJoin(partnerProfiles, eq(partnerProfiles.organizationId, organizations.id))
    .where(and(eq(organizationMembers.userId, userId), eq(partnerProfiles.status, "approved")))
    .limit(1);
  return result ?? null;
}

export async function getPartnerOffers(organizationId: string) {
  return db.select().from(offers).where(eq(offers.partnerOrganizationId, organizationId)).orderBy(desc(offers.createdAt));
}

export async function getPartnerAssignments(organizationId: string) {
  return db
    .select({
      assignmentId: caseAssignments.id,
      assignmentStatus: caseAssignments.status,
      caseId: cases.id,
      caseNumber: cases.caseNumber,
      title: cases.title,
      category: cases.category,
      description: cases.description,
      caseStatus: cases.status,
      assignedAt: caseAssignments.assignedAt
    })
    .from(caseAssignments)
    .innerJoin(cases, eq(caseAssignments.caseId, cases.id))
    .where(eq(caseAssignments.partnerOrganizationId, organizationId))
    .orderBy(desc(caseAssignments.assignedAt));
}
