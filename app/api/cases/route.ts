import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "@/lib/auth";
import { caseSubmissionSchema } from "@/lib/case-validation";
import { createCase } from "@/lib/cases";
import { contactEmail, sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const submission = caseSubmissionSchema.parse(await request.json());
    const result = await createCase(submission, request);
    let accessEmailSent = false;

    try {
      await Promise.all([
        sendMail({
          to: submission.email,
          subject: `[Dealshare] Otrzymaliśmy zgłoszenie ${result.caseNumber}`,
          text: `Dzień dobry ${submission.fullName},\n\ndziękujemy za kontakt. Numer Twojego zgłoszenia to ${result.caseNumber}.\n\nPod bezpiecznym linkiem, który otrzymasz w osobnej wiadomości, możesz sprawdzić dalsze informacje i kontakt z Dealshare.\n\nDealshare`,
          html: `<div style="font-family:Arial,sans-serif;color:#10233f;line-height:1.6;max-width:620px"><p>Dzień dobry ${submission.fullName},</p><h1 style="color:#001f4d">Zgłoszenie ${result.caseNumber}</h1><p>Dziękujemy za kontakt. Zapoznamy się z informacjami i wrócimy z kolejnym krokiem.</p><p>Pod bezpiecznym linkiem, który otrzymasz w osobnej wiadomości, możesz sprawdzić dalsze informacje i kontakt z Dealshare.</p></div>`
        }),
        sendMail({
          to: contactEmail,
          replyTo: submission.email,
          subject: `[Dealshare] Nowe zgłoszenie ${result.caseNumber}: ${result.title}`,
          text: `Numer zgłoszenia: ${result.caseNumber}\nKlient: ${submission.fullName}\nFirma: ${submission.companyName}\nE-mail: ${submission.email}\nTelefon: ${submission.phone}\nPunkt wyjścia: ${submission.pathType === "public_offer" ? "wybrana oferta" : "potrzeba firmy"}\nTemat: ${submission.category}\n\n${submission.description}`
        })
      ]);
      await auth.api.signInMagicLink({
        headers: request.headers,
        body: {
          email: submission.email,
          name: submission.fullName,
          callbackURL: `/panel/sprawy/${result.caseNumber}`,
          newUserCallbackURL: `/panel/sprawy/${result.caseNumber}`,
          errorCallbackURL: "/logowanie?error=magic-link"
        }
      });
      accessEmailSent = true;
    } catch (error) {
      console.error("Case email delivery failed", error);
    }

    return NextResponse.json(
      {
        caseId: result.caseId,
        caseNumber: result.caseNumber,
        accessEmailSent,
        message: `Dziękujemy. Otrzymaliśmy Twoje zgłoszenie. Jego numer to ${result.caseNumber}.`
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Sprawdź dane formularza.", fields: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "RATE_LIMITED") {
      return NextResponse.json({ message: "Osiągnięto limit zgłoszeń. Spróbuj ponownie później." }, { status: 429 });
    }

    if (error instanceof Error && error.message === "OFFER_NOT_FOUND") {
      return NextResponse.json({ message: "Wybrana oferta nie jest dostępna." }, { status: 400 });
    }

    console.error("Case creation failed", error);
    return NextResponse.json({ message: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie później." }, { status: 503 });
  }
}
