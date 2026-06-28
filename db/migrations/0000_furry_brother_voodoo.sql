CREATE TABLE `accounts` (
	`id` varchar(64) NOT NULL,
	`account_id` varchar(255) NOT NULL,
	`provider_id` varchar(80) NOT NULL,
	`user_id` varchar(64) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`scope` text,
	`password` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `accounts_provider_account_unique` UNIQUE(`provider_id`,`account_id`)
);
--> statement-breakpoint
CREATE TABLE `case_answers` (
	`id` varchar(64) NOT NULL,
	`case_id` varchar(64) NOT NULL,
	`field_key` varchar(160) NOT NULL,
	`field_value` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `case_answers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `case_assignments` (
	`id` varchar(64) NOT NULL,
	`case_id` varchar(64) NOT NULL,
	`partner_organization_id` varchar(64) NOT NULL,
	`status` enum('pending','accepted','rejected','expired','completed') NOT NULL DEFAULT 'pending',
	`assigned_at` timestamp NOT NULL DEFAULT (now()),
	`accepted_at` timestamp,
	`rejected_at` timestamp,
	`rejection_reason` text,
	CONSTRAINT `case_assignments_id` PRIMARY KEY(`id`),
	CONSTRAINT `case_assignments_case_partner_unique` UNIQUE(`case_id`,`partner_organization_id`)
);
--> statement-breakpoint
CREATE TABLE `case_documents` (
	`id` varchar(64) NOT NULL,
	`case_id` varchar(64) NOT NULL,
	`uploaded_by_user_id` varchar(64) NOT NULL,
	`file_path` varchar(1000) NOT NULL,
	`original_name` varchar(255) NOT NULL,
	`mime_type` varchar(160) NOT NULL,
	`file_size` int NOT NULL,
	`visibility` enum('client','internal','partner') NOT NULL DEFAULT 'client',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `case_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `case_events` (
	`id` varchar(64) NOT NULL,
	`case_id` varchar(64) NOT NULL,
	`actor_user_id` varchar(64),
	`event_type` varchar(100) NOT NULL,
	`message` text NOT NULL,
	`metadata_json` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `case_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `case_messages` (
	`id` varchar(64) NOT NULL,
	`case_id` varchar(64) NOT NULL,
	`author_user_id` varchar(64) NOT NULL,
	`visibility` enum('client','internal','partner') NOT NULL DEFAULT 'client',
	`body` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `case_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `case_sequences` (
	`year` int NOT NULL,
	`last_value` int NOT NULL DEFAULT 0,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `case_sequences_year` PRIMARY KEY(`year`)
);
--> statement-breakpoint
CREATE TABLE `cases` (
	`id` varchar(64) NOT NULL,
	`case_number` varchar(32) NOT NULL,
	`user_id` varchar(64) NOT NULL,
	`organization_id` varchar(64),
	`offer_id` varchar(64),
	`path_type` enum('public_offer','guided_matching') NOT NULL,
	`category` varchar(160) NOT NULL,
	`title` varchar(220) NOT NULL,
	`description` text NOT NULL,
	`status` enum('new','qualification','needs_info','matching','partner_pending','partner_accepted','contact_preparation','meeting_or_offer','decision','activated','billing','closed_won','closed_lost') NOT NULL DEFAULT 'new',
	`assigned_owner_user_id` varchar(64),
	`partner_revealed_at` timestamp,
	`source_url` varchar(1000),
	`utm_source` varchar(255),
	`utm_medium` varchar(255),
	`utm_campaign` varchar(255),
	`billing_status` enum('not_applicable','pending','ready','settled') NOT NULL DEFAULT 'not_applicable',
	`billing_notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cases_id` PRIMARY KEY(`id`),
	CONSTRAINT `cases_case_number_unique` UNIQUE(`case_number`)
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` varchar(64) NOT NULL,
	`partner_organization_id` varchar(64),
	`title` varchar(220) NOT NULL,
	`slug` varchar(180) NOT NULL,
	`category` varchar(160) NOT NULL,
	`short_description` text NOT NULL,
	`description` text,
	`status` enum('draft','pending_review','published','paused') NOT NULL DEFAULT 'draft',
	`visibility_mode` enum('public_offer','guided_matching') NOT NULL,
	`cta_label` varchar(100),
	`is_legacy_content` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `offers_id` PRIMARY KEY(`id`),
	CONSTRAINT `offers_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `organization_members` (
	`user_id` varchar(64) NOT NULL,
	`organization_id` varchar(64) NOT NULL,
	`role` enum('owner','member','manager') NOT NULL DEFAULT 'owner',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `organization_members_user_id_organization_id_pk` PRIMARY KEY(`user_id`,`organization_id`)
);
--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` varchar(64) NOT NULL,
	`name` varchar(200) NOT NULL,
	`nip` varchar(20),
	`type` enum('client','partner','internal') NOT NULL DEFAULT 'client',
	`industry` varchar(160),
	`website` varchar(500),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `organizations_id` PRIMARY KEY(`id`),
	CONSTRAINT `organizations_nip_unique` UNIQUE(`nip`)
);
--> statement-breakpoint
CREATE TABLE `partner_offer_requests` (
	`id` varchar(64) NOT NULL,
	`user_id` varchar(64) NOT NULL,
	`organization_id` varchar(64),
	`company_name` varchar(200) NOT NULL,
	`nip` varchar(20),
	`website` varchar(500),
	`offer_description` text NOT NULL,
	`categories` text NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`reviewed_by_user_id` varchar(64),
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partner_offer_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_profiles` (
	`id` varchar(64) NOT NULL,
	`organization_id` varchar(64) NOT NULL,
	`status` enum('pending','approved','rejected','suspended') NOT NULL DEFAULT 'pending',
	`partner_level` enum('network','verified','recommended','strategic') NOT NULL DEFAULT 'network',
	`categories` text,
	`regions` text,
	`description` text,
	`website` varchar(500),
	`contact_email` varchar(254),
	`contact_phone` varchar(40),
	`reviewed_by_user_id` varchar(64),
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partner_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `partner_profiles_org_unique` UNIQUE(`organization_id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(64) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`ip_address` varchar(64),
	`user_agent` text,
	`user_id` varchar(64) NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `sessions_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `submission_rate_limits` (
	`id` varchar(64) NOT NULL,
	`fingerprint_hash` varchar(64) NOT NULL,
	`action` varchar(80) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `submission_rate_limits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(64) NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(254) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`phone` varchar(40),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` varchar(64) NOT NULL,
	`user_id` varchar(64) NOT NULL,
	`role` enum('client','partner','admin') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_roles_user_role_unique` UNIQUE(`user_id`,`role`)
);
--> statement-breakpoint
CREATE TABLE `verifications` (
	`id` varchar(64) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `verifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `case_answers` ADD CONSTRAINT `case_answers_case_id_cases_id_fk` FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `case_assignments` ADD CONSTRAINT `case_assignments_case_id_cases_id_fk` FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `case_assignments` ADD CONSTRAINT `case_assignments_partner_organization_id_organizations_id_fk` FOREIGN KEY (`partner_organization_id`) REFERENCES `organizations`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `case_documents` ADD CONSTRAINT `case_documents_case_id_cases_id_fk` FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `case_documents` ADD CONSTRAINT `case_documents_uploaded_by_user_id_users_id_fk` FOREIGN KEY (`uploaded_by_user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `case_events` ADD CONSTRAINT `case_events_case_id_cases_id_fk` FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `case_events` ADD CONSTRAINT `case_events_actor_user_id_users_id_fk` FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `case_messages` ADD CONSTRAINT `case_messages_case_id_cases_id_fk` FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `case_messages` ADD CONSTRAINT `case_messages_author_user_id_users_id_fk` FOREIGN KEY (`author_user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cases` ADD CONSTRAINT `cases_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cases` ADD CONSTRAINT `cases_organization_id_organizations_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cases` ADD CONSTRAINT `cases_offer_id_offers_id_fk` FOREIGN KEY (`offer_id`) REFERENCES `offers`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cases` ADD CONSTRAINT `cases_assigned_owner_user_id_users_id_fk` FOREIGN KEY (`assigned_owner_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `offers` ADD CONSTRAINT `offers_partner_organization_id_organizations_id_fk` FOREIGN KEY (`partner_organization_id`) REFERENCES `organizations`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_members` ADD CONSTRAINT `organization_members_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_members` ADD CONSTRAINT `organization_members_organization_id_organizations_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_offer_requests` ADD CONSTRAINT `partner_offer_requests_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_offer_requests` ADD CONSTRAINT `partner_offer_requests_organization_id_organizations_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_offer_requests` ADD CONSTRAINT `partner_offer_requests_reviewed_by_user_id_users_id_fk` FOREIGN KEY (`reviewed_by_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_profiles` ADD CONSTRAINT `partner_profiles_organization_id_organizations_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_profiles` ADD CONSTRAINT `partner_profiles_reviewed_by_user_id_users_id_fk` FOREIGN KEY (`reviewed_by_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `accounts_user_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE INDEX `case_answers_case_idx` ON `case_answers` (`case_id`);--> statement-breakpoint
CREATE INDEX `case_documents_case_idx` ON `case_documents` (`case_id`);--> statement-breakpoint
CREATE INDEX `case_events_case_created_idx` ON `case_events` (`case_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `case_messages_case_created_idx` ON `case_messages` (`case_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `cases_user_idx` ON `cases` (`user_id`);--> statement-breakpoint
CREATE INDEX `cases_status_idx` ON `cases` (`status`);--> statement-breakpoint
CREATE INDEX `cases_offer_idx` ON `cases` (`offer_id`);--> statement-breakpoint
CREATE INDEX `offers_visibility_status_idx` ON `offers` (`visibility_mode`,`status`);--> statement-breakpoint
CREATE INDEX `organization_members_org_idx` ON `organization_members` (`organization_id`);--> statement-breakpoint
CREATE INDEX `partner_offer_requests_status_idx` ON `partner_offer_requests` (`status`);--> statement-breakpoint
CREATE INDEX `partner_offer_requests_user_idx` ON `partner_offer_requests` (`user_id`);--> statement-breakpoint
CREATE INDEX `partner_profiles_status_idx` ON `partner_profiles` (`status`);--> statement-breakpoint
CREATE INDEX `sessions_user_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `submission_rate_limits_lookup_idx` ON `submission_rate_limits` (`fingerprint_hash`,`action`,`created_at`);--> statement-breakpoint
CREATE INDEX `verifications_identifier_idx` ON `verifications` (`identifier`);
--> statement-breakpoint
INSERT INTO `offers` (`id`, `title`, `slug`, `category`, `short_description`, `description`, `status`, `visibility_mode`, `cta_label`, `is_legacy_content`) VALUES
('offer-kredyty-dla-firm', 'Kredyty dla firm', 'kredyty-dla-firm', 'Finansowanie', 'Finansowanie na rozwój, inwestycje, płynność albo konsolidację. Zaczynamy od analizy i wybieramy kierunek, który realnie zwiększa szanse na dobrą decyzję.', NULL, 'published', 'guided_matching', 'Opisz potrzebę', true),
('offer-restrukturyzacje', 'Restrukturyzacje', 'restrukturyzacje', 'Obsługa Prawna', 'Pomagamy firmom odzyskać kontrolę nad zadłużeniem, uporządkować zobowiązania i przygotować realny plan rozmów z wierzycielami.', NULL, 'published', 'guided_matching', 'Opisz potrzebę', true),
('offer-infrastruktura-gpu', 'Infrastruktura GPU', 'infrastruktura-gpu', 'Inwestycje', 'Inwestycja w zaplecze obliczeniowe dla rynku AI. Model oparty na realnej infrastrukturze, obsłudze technicznej po stronie partnera i warunkach kontraktowych.', NULL, 'published', 'public_offer', 'Zobacz ofertę', true),
('offer-farma-pv-bess', 'Farmy i magazyny energii', 'farma-pv-bess', 'Inwestycje', 'Projekt PV + BESS łączący fotowoltaikę, magazyn energii, arbitraż cenowy i usługi systemowe. Energia, elastyczność i trading w jednym modelu.', NULL, 'published', 'public_offer', 'Zobacz ofertę', true),
('offer-kontrakty-flotowe', 'Kontrakty flotowe', 'kontrakty-flotowe', 'Kontrakty B2B', 'Model oparty na pojazdach pracujących w zarządzanej flocie. Operator odpowiada za obsługę, serwis i wykorzystanie pojazdów, a inwestor korzysta z warunków kontraktu.', NULL, 'published', 'public_offer', 'Zobacz ofertę', true),
('offer-sankcja-kredytu-darmowego', 'Unieważnienia kredytów', 'sankcja-kredytu-darmowego', 'Obsługa Prawna', 'Sprawdzamy kredyty gotówkowe, konsumenckie i walutowe: frankowe, eurowe i dolarowe. Możliwy jest zwrot kosztów, nadpłat albo dochodzenie nieważności umowy po analizie dokumentów.', NULL, 'published', 'guided_matching', 'Opisz potrzebę', true),
('offer-optymalizacja-kosztow-energii', 'Umowy na energię', 'optymalizacja-kosztow-energii', 'Energia i optymalizacja kosztów', 'Analiza faktur, umów i opłat dodatkowych, żeby znaleźć oszczędności i zabezpieczyć firmę przed niekontrolowanymi kosztami energii.', NULL, 'published', 'guided_matching', 'Opisz potrzebę', true);
