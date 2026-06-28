import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "@/lib/auth";
import { contactEmail, sendMail } from "@/lib/mail";
import { createPartnerRequest } from "@/lib/partners";
import { partnerRequestSchema } from "@/lib/partner-validation";

export async function POST(request: Request) {
  try {
    const submission = partnerRequestSchema.parse(await request.json());
    const result = await createPartnerRequest(submission, request);
    let accessEmailSent = false;

    try {
      await Promise.all([
        sendMail({
          to: submission.email,
          subject: "[Dealshare] Dziękujemy za przedstawienie oferty",
          text: `Dzień dobry ${submission.fullName},\n\ndziękujemy za przedstawienie firmy i oferty. Zapoznamy się z informacjami i skontaktujemy się w sprawie możliwej współpracy.`,
          html: `<div style="font-family:Arial,sans-serif;color:#10233f;line-height:1.6;max-width:620px"><p>Dzień dobry ${submission.fullName},</p><h1 style="color:#001f4d">Dziękujemy za kontakt</h1><p>Zapoznamy się z informacjami o firmie i ofercie. Skontaktujemy się w sprawie możliwej współpracy.</p></div>`
        }),
        sendMail({
          to: contactEmail,
          replyTo: submission.email,
          subject: `[Dealshare] Nowa propozycja współpracy: ${submission.companyName}`,
          text: `ID zgłoszenia: ${result.requestId}\nOsoba: ${submission.fullName}\nFirma: ${submission.companyName}\nNIP: ${submission.nip || "Nie podano"}\nE-mail: ${submission.email}\nTelefon: ${submission.phone}\nKategorie: ${submission.categories.join(", ")}\n\n${submission.offerDescription}`
        })
      ]);
      await auth.api.signInMagicLink({
        headers: request.headers,
        body: {
          email: submission.email,
          name: submission.fullName,
          callbackURL: "/panel/oferent",
          newUserCallbackURL: "/panel/oferent",
          errorCallbackURL: "/logowanie?error=magic-link"
        }
      });
      accessEmailSent = true;
    } catch (error) {
      console.error("Partner request email delivery failed", error);
    }

    return NextResponse.json(
      {
        requestId: result.requestId,
        accessEmailSent,
        message: "Zapoznamy się z informacjami i skontaktujemy się w sprawie możliwej współpracy."
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Sprawdź dane formularza.", fields: error.flatten().fieldErrors }, { status: 400 });
    }
    if (error instanceof Error && error.message === "RATE_LIMITED") {
      return NextResponse.json({ message: "Osiągnięto limit zgłoszeń. Spróbuj ponownie później." }, { status: 429 });
    }
    console.error("Partner request creation failed", error);
    return NextResponse.json({ message: "Nie udało się wysłać formularza. Spróbuj ponownie później." }, { status: 503 });
  }
}
