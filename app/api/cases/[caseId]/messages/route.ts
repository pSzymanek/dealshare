import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";
import { caseEvents, caseMessages, cases } from "@/db/schema";
import { getAuthContext } from "@/lib/auth-guards";

export async function POST(request: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const context = await getAuthContext();
  if (!context) return NextResponse.json({ message: "Zaloguj się, aby wysłać wiadomość." }, { status: 401 });
  const { caseId: caseNumber } = await params;
  const input = z.object({ body: z.string().trim().min(2).max(5000) }).safeParse(await request.json());
  if (!input.success) return NextResponse.json({ message: "Wiadomość jest nieprawidłowa." }, { status: 400 });
  const [caseData] = await db.select().from(cases).where(and(eq(cases.caseNumber, caseNumber), eq(cases.userId, context.session.user.id))).limit(1);
  if (!caseData) return NextResponse.json({ message: "Nie znaleziono zgłoszenia." }, { status: 404 });
  await db.transaction(async tx => {
    await tx.insert(caseMessages).values({ id: randomUUID(), caseId: caseData.id, authorUserId: context.session.user.id, visibility: "client", body: input.data.body });
    await tx.insert(caseEvents).values({ id: randomUUID(), caseId: caseData.id, actorUserId: context.session.user.id, eventType: "client_message", message: "Wysłano dodatkową wiadomość." });
  });
  return NextResponse.json({ message: "Wiadomość została dodana." }, { status: 201 });
}
