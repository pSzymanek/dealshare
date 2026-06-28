import { z } from "zod";

export const partnerRequestSchema = z.object({
  fullName: z.string().trim().min(2).max(160),
  email: z.email().max(254).transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(6).max(40),
  companyName: z.string().trim().min(2).max(200),
  nip: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || /^\d{10}$/.test(value.replace(/[\s-]/g, "")), "NIP powinien zawierać 10 cyfr."),
  websiteUrl: z.url("Podaj pełny adres strony, np. https://firma.pl").max(500).optional().or(z.literal("")),
  offerDescription: z.string().trim().min(40, "Opisz ofertę w co najmniej 40 znakach.").max(10000),
  categories: z.array(z.string().trim().min(2).max(100)).min(1).max(12),
  consent: z.literal(true, { error: "Zgoda na kontakt jest wymagana." }),
  website: z.string().max(0).optional()
});

export type PartnerRequestSubmission = z.infer<typeof partnerRequestSchema>;
