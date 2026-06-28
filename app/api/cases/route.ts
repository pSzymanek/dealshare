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
          subject: `[Dealshare] Przyjęliśmy sprawę ${result.caseNumber}`,
          text: `Dzień dobry ${submission.fullName},\n\nprzyjęliśmy zgłoszenie i nadaliśmy mu Case ID: ${result.caseNumber}.\n\nSprawę możesz śledzić w panelu Dealshare. Za chwilę otrzymasz osobny, bezpieczny link do pierwszego wejścia.\n\nDealshare`,
          html: `<div style="font-family:Arial,sans-serif;color:#10233f;line-height:1.6;max-width:620px"><p>Dzień dobry ${submission.fullName},</p><h1 style="color:#001f4d">Sprawa ${result.caseNumber}</h1><p>Przyjęliśmy zgłoszenie i rozpoczęliśmy analizę.</p><p>Sprawę możesz śledzić w panelu Dealshare. Za chwilę otrzymasz osobny, bezpieczny link do pierwszego wejścia.</p></div>`
        }),
        sendMail({
          to: contactEmail,
          replyTo: submission.email,
          subject: `[Dealshare] Nowa sprawa ${result.caseNumber}: ${result.title}`,
          text: `Case ID: ${result.caseNumber}\nKlient: ${submission.fullName}\nFirma: ${submission.companyName}\nE-mail: ${submission.email}\nTelefon: ${submission.phone}\nŚcieżka: ${submission.pathType}\nKategoria: ${submission.category}\n\n${submission.description}`
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
        message: `Dziękujemy. Utworzyliśmy sprawę ${result.caseNumber}.`
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
    return NextResponse.json({ message: "Nie udało się utworzyć sprawy. Spróbuj ponownie później." }, { status: 503 });
  }
}
