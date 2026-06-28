import { CaseForm } from "@/components/CaseForm";

export default function NewNeedPage() {
  return <div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Nowa sprawa</p><h1 className="mt-2 text-3xl font-black text-navy">Opisz nową potrzebę</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Każde zgłoszenie otrzymuje osobny Case ID i pojawi się na liście Twoich spraw.</p><div className="mt-8"><CaseForm compact /></div></div>;
}
