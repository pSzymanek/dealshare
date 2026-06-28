import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { caseDocuments, cases } from "@/db/schema";
import { getAuthContext } from "@/lib/auth-guards";

const maxFileSize = 10 * 1024 * 1024;
const allowedTypes: Record<string, string> = { "application/pdf": ".pdf", "image/png": ".png", "image/jpeg": ".jpg" };

export async function POST(request: Request) {
  const context = await getAuthContext();
  if (!context) return NextResponse.json({ message: "Zaloguj się, aby dodać dokument." }, { status: 401 });
  const uploadRoot = process.env.UPLOAD_DIR;
  if (!uploadRoot) return NextResponse.json({ message: "Magazyn dokumentów nie jest jeszcze skonfigurowany." }, { status: 503 });

  const formData = await request.formData();
  const file = formData.get("file");
  const caseNumber = String(formData.get("caseNumber") ?? "");
  if (!(file instanceof File) || !caseNumber) return NextResponse.json({ message: "Nie wybrano dokumentu lub sprawy." }, { status: 400 });
  const extension = allowedTypes[file.type];
  if (!extension || file.size <= 0 || file.size > maxFileSize) return NextResponse.json({ message: "Dozwolone są pliki PDF, JPG i PNG do 10 MB." }, { status: 400 });

  const [caseData] = await db.select().from(cases).where(and(eq(cases.caseNumber, caseNumber), eq(cases.userId, context.session.user.id))).limit(1);
  if (!caseData) return NextResponse.json({ message: "Nie znaleziono sprawy." }, { status: 404 });

  const documentId = randomUUID();
  const root = path.resolve(/* turbopackIgnore: true */ uploadRoot);
  const caseDirectory = path.resolve(/* turbopackIgnore: true */ root, caseData.id);
  if (!caseDirectory.startsWith(`${root}${path.sep}`)) return NextResponse.json({ message: "Nieprawidłowa ścieżka dokumentu." }, { status: 400 });
  await mkdir(/* turbopackIgnore: true */ caseDirectory, { recursive: true });
  const storedPath = path.join(/* turbopackIgnore: true */ caseDirectory, `${documentId}${extension}`);
  await writeFile(/* turbopackIgnore: true */ storedPath, Buffer.from(await file.arrayBuffer()), { flag: "wx" });
  await db.insert(caseDocuments).values({ id: documentId, caseId: caseData.id, uploadedByUserId: context.session.user.id, filePath: storedPath, originalName: file.name.slice(0, 255), mimeType: file.type, fileSize: file.size, visibility: "client" });

  return NextResponse.json({ message: "Dokument został bezpiecznie zapisany.", documentId }, { status: 201 });
}
