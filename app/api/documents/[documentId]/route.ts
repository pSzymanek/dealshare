import { readFile } from "fs/promises";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { caseDocuments, cases } from "@/db/schema";
import { getAuthContext } from "@/lib/auth-guards";

export async function GET(_request: Request, { params }: { params: Promise<{ documentId: string }> }) {
  const context = await getAuthContext();
  if (!context) return NextResponse.json({ message: "Brak dostępu." }, { status: 401 });
  const { documentId } = await params;
  const isAdmin = context.roles.includes("admin");
  const [document] = await db.select({ filePath: caseDocuments.filePath, originalName: caseDocuments.originalName, mimeType: caseDocuments.mimeType, ownerId: cases.userId }).from(caseDocuments).innerJoin(cases, eq(caseDocuments.caseId, cases.id)).where(isAdmin ? eq(caseDocuments.id, documentId) : and(eq(caseDocuments.id, documentId), eq(cases.userId, context.session.user.id))).limit(1);
  if (!document) return NextResponse.json({ message: "Nie znaleziono dokumentu." }, { status: 404 });

  try {
    const file = await readFile(/* turbopackIgnore: true */ document.filePath);
    const safeName = document.originalName.replace(/[\r\n"]/g, "_");
    return new NextResponse(file, { headers: { "Content-Type": document.mimeType, "Content-Length": String(file.length), "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(safeName)}`, "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ message: "Plik nie jest dostępny." }, { status: 404 });
  }
}
