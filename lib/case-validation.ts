import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const caseSubmissionSchema = z
  .object({
    pathType: z.enum(["public_offer", "guided_matching"]),
    offerSlug: optionalText(180),
    fullName: z.string().trim().min(2, "Podaj imię i nazwisko.").max(160),
    email: z.email("Podaj poprawny adres e-mail.").max(254).transform((value) => value.toLowerCase()),
    phone: z.string().trim().min(6, "Podaj numer telefonu.").max(40),
    companyName: z.string().trim().min(2, "Podaj nazwę firmy.").max(200),
    nip: optionalText(20).refine((value) => !value || /^\d{10}$/.test(value.replace(/[\s-]/g, "")), "NIP powinien zawierać 10 cyfr."),
    category: z.string().trim().min(2, "Wybierz temat rozmowy.").max(160),
    description: z.string().trim().min(20, "Opisz sytuację w co najmniej 20 znakach.").max(8000),
    preferredContact: z.enum(["phone", "email", "whatsapp", "any"]),
    consent: z.literal(true, { error: "Zgoda na kontakt jest wymagana." }),
    sourceUrl: optionalText(1000),
    utmSource: optionalText(255),
    utmMedium: optionalText(255),
    utmCampaign: optionalText(255),
    website: z.string().max(0).optional(),
    answers: z
      .array(
        z.object({
          key: z.string().trim().min(1).max(160),
          value: z.string().trim().min(1).max(4000)
        })
      )
      .max(40)
      .default([])
  })
  .superRefine((data, context) => {
    if (data.pathType === "public_offer" && !data.offerSlug) {
      context.addIssue({ code: "custom", path: ["offerSlug"], message: "Nie wskazano oferty." });
    }
  });

export type CaseSubmission = z.infer<typeof caseSubmissionSchema>;
