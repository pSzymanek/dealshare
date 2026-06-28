import { notFound } from "next/navigation";
import Link from "next/link";
import { Download } from "lucide-react";
import { DocumentUpload } from "@/components/DocumentUpload";
import { CaseMessageForm } from "@/components/CaseMessageForm";
import { requireAuth } from "@/lib/auth-guards";
import { getCaseForUser } from "@/lib/cases";
import { getClientCaseStatus } from "@/lib/case-status";

export default async function CaseDetailPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const { session } = await requireAuth();
  const caseData = await getCaseForUser(session.user.id, caseId);

  if (!caseData) notFound();

  return (
    <div>
      <div className="border-b border-slate-200 pb-6">
        <p className="font-mono text-sm font-black text-electric">{caseData.caseNumber}</p>
        <h1 className="mt-2 text-3xl font-black text-navy">{caseData.title}</h1>
        <span className="mt-4 inline-flex rounded bg-teal/10 px-3 py-1.5 text-sm font-bold text-teal">{getClientCaseStatus(caseData.status)}</span>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h2 className="text-lg font-black text-navy">Twoja wiadomość do Dealshare</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{caseData.description}</p>

          {caseData.answers.length ? (
            <div className="mt-8">
              <h2 className="text-lg font-black text-navy">Dodatkowe informacje</h2>
              <dl className="mt-4 divide-y divide-slate-100 border-y border-slate-200">
                {caseData.answers.map((answer) => (
                  <div key={answer.id} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="text-xs font-bold uppercase text-slate-500">{answer.fieldKey.replaceAll("_", " ")}</dt>
                    <dd className="text-sm text-slate-700">{answer.fieldValue}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          <div className="mt-8">
            <h2 className="text-lg font-black text-navy">Dokumenty</h2>
            {caseData.documents.length ? <div className="mt-4 divide-y divide-slate-100 border-y border-slate-200">{caseData.documents.map(document => <Link key={document.id} href={`/api/documents/${document.id}`} className="flex items-center justify-between gap-4 py-3 text-sm font-bold text-navy hover:text-electric"><span className="truncate">{document.originalName}</span><Download size={17}/></Link>)}</div> : <p className="mt-3 text-sm text-slate-500">Nie dodano jeszcze żadnych dokumentów.</p>}
            <DocumentUpload caseNumber={caseData.caseNumber} />
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-black text-navy">Wiadomości</h2>
            {caseData.messages.length ? <div className="mt-4 divide-y divide-slate-100 border-y border-slate-200">{caseData.messages.map(message => <article key={message.id} className="py-4"><p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{message.body}</p><p className="mt-1 text-xs text-slate-500">{message.createdAt.toLocaleString("pl-PL")}</p></article>)}</div> : <p className="mt-3 text-sm text-slate-500">Nie ma jeszcze żadnych wiadomości.</p>}
            <CaseMessageForm caseNumber={caseData.caseNumber} />
          </div>
        </div>

        <aside>
          <h2 className="text-lg font-black text-navy">Co dzieje się ze zgłoszeniem</h2>
          <ol className="mt-4 border-l-2 border-slate-200 pl-5">
            {caseData.events.map((event) => (
              <li key={event.id} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-electric" />
                <p className="text-sm font-bold text-navy">{event.message}</p>
                <p className="mt-1 text-xs text-slate-500">{event.createdAt.toLocaleString("pl-PL")}</p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
