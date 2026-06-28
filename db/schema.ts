import {
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core";

const id = (name = "id") => varchar(name, { length: 64 });
const createdAt = () => timestamp("created_at", { mode: "date" }).defaultNow().notNull();
const updatedAt = () => timestamp("updated_at", { mode: "date" }).defaultNow().onUpdateNow().notNull();

export const users = mysqlTable(
  "users",
  {
    id: id().primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    email: varchar("email", { length: 254 }).notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    phone: varchar("phone", { length: 40 }),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)]
);

export const sessions = mysqlTable(
  "sessions",
  {
    id: id().primaryKey(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
    ipAddress: varchar("ip_address", { length: 64 }),
    userAgent: text("user_agent"),
    userId: id("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
  },
  (table) => [uniqueIndex("sessions_token_unique").on(table.token), index("sessions_user_idx").on(table.userId)]
);

export const accounts = mysqlTable(
  "accounts",
  {
    id: id().primaryKey(),
    accountId: varchar("account_id", { length: 255 }).notNull(),
    providerId: varchar("provider_id", { length: 80 }).notNull(),
    userId: id("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: "date" }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: "date" }),
    scope: text("scope"),
    password: text("password"),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  },
  (table) => [
    uniqueIndex("accounts_provider_account_unique").on(table.providerId, table.accountId),
    index("accounts_user_idx").on(table.userId)
  ]
);

export const verifications = mysqlTable(
  "verifications",
  {
    id: id().primaryKey(),
    identifier: varchar("identifier", { length: 255 }).notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)]
);

export const userRoles = mysqlTable(
  "user_roles",
  {
    id: id().primaryKey(),
    userId: id("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: mysqlEnum("role", ["client", "partner", "admin"]).notNull(),
    createdAt: createdAt()
  },
  (table) => [uniqueIndex("user_roles_user_role_unique").on(table.userId, table.role)]
);

export const organizations = mysqlTable(
  "organizations",
  {
    id: id().primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    nip: varchar("nip", { length: 20 }),
    type: mysqlEnum("type", ["client", "partner", "internal"]).default("client").notNull(),
    industry: varchar("industry", { length: 160 }),
    website: varchar("website", { length: 500 }),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  },
  (table) => [uniqueIndex("organizations_nip_unique").on(table.nip)]
);

export const organizationMembers = mysqlTable(
  "organization_members",
  {
    userId: id("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    organizationId: id("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    role: mysqlEnum("role", ["owner", "member", "manager"]).default("owner").notNull(),
    createdAt: createdAt()
  },
  (table) => [primaryKey({ columns: [table.userId, table.organizationId] }), index("organization_members_org_idx").on(table.organizationId)]
);

export const partnerProfiles = mysqlTable(
  "partner_profiles",
  {
    id: id().primaryKey(),
    organizationId: id("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    status: mysqlEnum("status", ["pending", "approved", "rejected", "suspended"]).default("pending").notNull(),
    partnerLevel: mysqlEnum("partner_level", ["network", "verified", "recommended", "strategic"]).default("network").notNull(),
    categories: text("categories"),
    regions: text("regions"),
    description: text("description"),
    website: varchar("website", { length: 500 }),
    contactEmail: varchar("contact_email", { length: 254 }),
    contactPhone: varchar("contact_phone", { length: 40 }),
    reviewedByUserId: id("reviewed_by_user_id").references(() => users.id, { onDelete: "set null" }),
    reviewedAt: timestamp("reviewed_at", { mode: "date" }),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  },
  (table) => [uniqueIndex("partner_profiles_org_unique").on(table.organizationId), index("partner_profiles_status_idx").on(table.status)]
);

export const offers = mysqlTable(
  "offers",
  {
    id: id().primaryKey(),
    partnerOrganizationId: id("partner_organization_id").references(() => organizations.id, { onDelete: "set null" }),
    title: varchar("title", { length: 220 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull(),
    category: varchar("category", { length: 160 }).notNull(),
    shortDescription: text("short_description").notNull(),
    description: text("description"),
    status: mysqlEnum("status", ["draft", "pending_review", "published", "paused"]).default("draft").notNull(),
    visibilityMode: mysqlEnum("visibility_mode", ["public_offer", "guided_matching"]).notNull(),
    ctaLabel: varchar("cta_label", { length: 100 }),
    isLegacyContent: boolean("is_legacy_content").default(false).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  },
  (table) => [uniqueIndex("offers_slug_unique").on(table.slug), index("offers_visibility_status_idx").on(table.visibilityMode, table.status)]
);

export const caseSequences = mysqlTable("case_sequences", {
  year: int("year").primaryKey(),
  lastValue: int("last_value").default(0).notNull(),
  updatedAt: updatedAt()
});

export const cases = mysqlTable(
  "cases",
  {
    id: id().primaryKey(),
    caseNumber: varchar("case_number", { length: 32 }).notNull(),
    userId: id("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    organizationId: id("organization_id").references(() => organizations.id, { onDelete: "set null" }),
    offerId: id("offer_id").references(() => offers.id, { onDelete: "set null" }),
    pathType: mysqlEnum("path_type", ["public_offer", "guided_matching"]).notNull(),
    category: varchar("category", { length: 160 }).notNull(),
    title: varchar("title", { length: 220 }).notNull(),
    description: text("description").notNull(),
    status: mysqlEnum("status", [
      "new",
      "qualification",
      "needs_info",
      "matching",
      "partner_pending",
      "partner_accepted",
      "contact_preparation",
      "meeting_or_offer",
      "decision",
      "activated",
      "billing",
      "closed_won",
      "closed_lost"
    ])
      .default("new")
      .notNull(),
    assignedOwnerUserId: id("assigned_owner_user_id").references(() => users.id, { onDelete: "set null" }),
    partnerRevealedAt: timestamp("partner_revealed_at", { mode: "date" }),
    sourceUrl: varchar("source_url", { length: 1000 }),
    utmSource: varchar("utm_source", { length: 255 }),
    utmMedium: varchar("utm_medium", { length: 255 }),
    utmCampaign: varchar("utm_campaign", { length: 255 }),
    billingStatus: mysqlEnum("billing_status", ["not_applicable", "pending", "ready", "settled"]).default("not_applicable").notNull(),
    billingNotes: text("billing_notes"),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  },
  (table) => [
    uniqueIndex("cases_case_number_unique").on(table.caseNumber),
    index("cases_user_idx").on(table.userId),
    index("cases_status_idx").on(table.status),
    index("cases_offer_idx").on(table.offerId)
  ]
);

export const caseAnswers = mysqlTable(
  "case_answers",
  {
    id: id().primaryKey(),
    caseId: id("case_id")
      .notNull()
      .references(() => cases.id, { onDelete: "cascade" }),
    fieldKey: varchar("field_key", { length: 160 }).notNull(),
    fieldValue: text("field_value").notNull(),
    createdAt: createdAt()
  },
  (table) => [index("case_answers_case_idx").on(table.caseId)]
);

export const caseDocuments = mysqlTable(
  "case_documents",
  {
    id: id().primaryKey(),
    caseId: id("case_id")
      .notNull()
      .references(() => cases.id, { onDelete: "cascade" }),
    uploadedByUserId: id("uploaded_by_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    filePath: varchar("file_path", { length: 1000 }).notNull(),
    originalName: varchar("original_name", { length: 255 }).notNull(),
    mimeType: varchar("mime_type", { length: 160 }).notNull(),
    fileSize: int("file_size").notNull(),
    visibility: mysqlEnum("visibility", ["client", "internal", "partner"]).default("client").notNull(),
    createdAt: createdAt()
  },
  (table) => [index("case_documents_case_idx").on(table.caseId)]
);

export const caseAssignments = mysqlTable(
  "case_assignments",
  {
    id: id().primaryKey(),
    caseId: id("case_id")
      .notNull()
      .references(() => cases.id, { onDelete: "cascade" }),
    partnerOrganizationId: id("partner_organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "restrict" }),
    status: mysqlEnum("status", ["pending", "accepted", "rejected", "expired", "completed"]).default("pending").notNull(),
    assignedAt: timestamp("assigned_at", { mode: "date" }).defaultNow().notNull(),
    acceptedAt: timestamp("accepted_at", { mode: "date" }),
    rejectedAt: timestamp("rejected_at", { mode: "date" }),
    rejectionReason: text("rejection_reason")
  },
  (table) => [uniqueIndex("case_assignments_case_partner_unique").on(table.caseId, table.partnerOrganizationId)]
);

export const caseEvents = mysqlTable(
  "case_events",
  {
    id: id().primaryKey(),
    caseId: id("case_id")
      .notNull()
      .references(() => cases.id, { onDelete: "cascade" }),
    actorUserId: id("actor_user_id").references(() => users.id, { onDelete: "set null" }),
    eventType: varchar("event_type", { length: 100 }).notNull(),
    message: text("message").notNull(),
    metadataJson: text("metadata_json"),
    createdAt: createdAt()
  },
  (table) => [index("case_events_case_created_idx").on(table.caseId, table.createdAt)]
);

export const caseMessages = mysqlTable(
  "case_messages",
  {
    id: id().primaryKey(),
    caseId: id("case_id")
      .notNull()
      .references(() => cases.id, { onDelete: "cascade" }),
    authorUserId: id("author_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    visibility: mysqlEnum("visibility", ["client", "internal", "partner"]).default("client").notNull(),
    body: text("body").notNull(),
    createdAt: createdAt()
  },
  (table) => [index("case_messages_case_created_idx").on(table.caseId, table.createdAt)]
);

export const partnerOfferRequests = mysqlTable(
  "partner_offer_requests",
  {
    id: id().primaryKey(),
    userId: id("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    organizationId: id("organization_id").references(() => organizations.id, { onDelete: "set null" }),
    companyName: varchar("company_name", { length: 200 }).notNull(),
    nip: varchar("nip", { length: 20 }),
    website: varchar("website", { length: 500 }),
    offerDescription: text("offer_description").notNull(),
    categories: text("categories").notNull(),
    status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
    reviewedByUserId: id("reviewed_by_user_id").references(() => users.id, { onDelete: "set null" }),
    reviewedAt: timestamp("reviewed_at", { mode: "date" }),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  },
  (table) => [index("partner_offer_requests_status_idx").on(table.status), index("partner_offer_requests_user_idx").on(table.userId)]
);

export const submissionRateLimits = mysqlTable(
  "submission_rate_limits",
  {
    id: id().primaryKey(),
    fingerprintHash: varchar("fingerprint_hash", { length: 64 }).notNull(),
    action: varchar("action", { length: 80 }).notNull(),
    createdAt: createdAt()
  },
  (table) => [index("submission_rate_limits_lookup_idx").on(table.fingerprintHash, table.action, table.createdAt)]
);

// Better Auth expects these model names in the Drizzle schema object.
export const user = users;
export const session = sessions;
export const account = accounts;
export const verification = verifications;
