import Link from "next/link";
import { Download } from "lucide-react";
import { requireAuth } from "@/lib/auth-guards";
import { getDocumentsForUser } from "@/lib/cases";

export default async function DocumentsPage(){const {session}=await requireAuth();const documents=await getDocumentsForUser(session.user.id);return <div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Panel</p><h1 className="mt-2 text-3xl font-black text-navy">Dokumenty</h1><div className="mt-8 divide-y divide-slate-100 border-y border-slate-200">{documents.length?documents.map(document=><Link key={document.id} href={`/api/documents/${document.id}`} className="grid gap-2 py-4 sm:grid-cols-[1fr_220px_auto] sm:items-center"><div><p className="truncate text-sm font-bold text-navy">{document.originalName}</p><p className="mt-1 text-xs text-slate-500">{Math.ceil(document.fileSize/1024)} KB</p></div><p className="text-sm text-slate-600">{document.caseNumber} · {document.caseTitle}</p><Download size={17} className="text-electric"/></Link>):<p className="py-8 text-sm text-slate-600">Nie dodano jeszcze dokumentów.</p>}</div></div>}
