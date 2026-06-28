import { CaseForm } from "@/components/CaseForm";

export default function NewNeedPage() {
  return <div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Nowe zgłoszenie</p><h1 className="mt-2 text-3xl font-black text-navy">O czym chcesz z nami porozmawiać?</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Po wysłaniu formularza otrzymasz osobny numer, a dalsze informacje znajdziesz na liście swoich zgłoszeń.</p><div className="mt-8"><CaseForm compact /></div></div>;
}
