import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { requireAuth } from "@/lib/auth-guards";
import { getCasesForUser } from "@/lib/cases";
import { getClientCaseStatus } from "@/lib/case-status";

export default async function PanelPage() {
  const { session } = await requireAuth();
  const userCases = await getCasesForUser(session.user.id);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Moje sprawy</p>
          <h1 className="mt-2 text-3xl font-black text-navy">Sprawy prowadzone przez Dealshare</h1>
        </div>
        <Link href="/panel/nowa-potrzeba" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-electric px-4 text-sm font-bold text-white hover:bg-navy">
          <Plus size={18} /> Nowa potrzeba
        </Link>
      </div>

      {userCases.length ? (
        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {userCases.map((item) => (
            <article key={item.id} className="grid gap-4 border-b border-slate-100 p-5 last:border-0 md:grid-cols-[140px_minmax(0,1fr)_180px_auto] md:items-center">
              <p className="font-mono text-sm font-black text-electric">{item.caseNumber}</p>
              <div className="min-w-0">
                <h2 className="font-black text-navy">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{item.category} · {item.createdAt.toLocaleDateString("pl-PL")}</p>
              </div>
              <span className="w-fit rounded bg-teal/10 px-2.5 py-1 text-xs font-bold text-teal">{getClientCaseStatus(item.status)}</span>
              <Link href={`/panel/sprawy/${item.caseNumber}`} className="inline-flex items-center gap-2 text-sm font-bold text-electric hover:text-navy">
                Szczegóły <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 border-y border-slate-200 py-12 text-center">
          <h2 className="text-xl font-black text-navy">Nie masz jeszcze żadnej sprawy</h2>
          <p className="mt-2 text-sm text-slate-600">Opisz potrzebę firmy, a utworzymy pierwszą sprawę i nadamy jej Case ID.</p>
        </div>
      )}
    </div>
  );
}
