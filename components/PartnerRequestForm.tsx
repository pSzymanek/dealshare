"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";

const categoryOptions = ["Finansowanie", "Prawo i restrukturyzacja", "Energia", "Technologia", "Inwestycje", "Koszty firmowe", "Inne usługi B2B"];

export function PartnerRequestForm() {
  const [values, setValues] = useState({ fullName: "", email: "", phone: "", companyName: "", nip: "", websiteUrl: "", offerDescription: "", categories: [] as string[], consent: false, website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(key: keyof typeof values, value: string | string[] | boolean) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading"); setMessage("");
    const response = await fetch("/api/partner-requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    const data = (await response.json()) as { message?: string };
    setStatus(response.ok ? "success" : "error");
    setMessage(data.message ?? (response.ok ? "Zgłoszenie zostało zapisane." : "Nie udało się zapisać zgłoszenia."));
  }

  if (status === "success") return <div className="border-y border-teal/30 bg-teal/5 py-10 text-center"><CheckCircle2 className="mx-auto text-teal" size={42} /><h2 className="mt-4 text-2xl font-black text-navy">Zgłoszenie przyjęte</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">{message}</p></div>;

  return (
    <form onSubmit={submit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        {([['fullName','Imię i nazwisko','text'],['email','E-mail','email'],['phone','Telefon','tel'],['companyName','Nazwa firmy','text'],['nip','NIP','text'],['websiteUrl','Strona WWW','url']] as const).map(([key,label,type]) => <label key={key} className="block"><span className="text-sm font-bold text-navy">{label}{!['nip','websiteUrl'].includes(key) ? ' *' : ''}</span><input type={type} required={!['nip','websiteUrl'].includes(key)} value={values[key]} onChange={(event) => update(key,event.target.value)} className="mt-2 h-12 w-full rounded-md border border-slate-300 px-4 text-sm outline-none focus:border-electric focus:ring-4 focus:ring-electric/10" /></label>)}
      </div>
      <fieldset><legend className="text-sm font-bold text-navy">Kategorie oferty *</legend><div className="mt-3 flex flex-wrap gap-2">{categoryOptions.map((category) => { const active = values.categories.includes(category); return <button key={category} type="button" onClick={() => update('categories', active ? values.categories.filter((item) => item !== category) : [...values.categories, category])} className={`rounded border px-3 py-2 text-sm font-bold ${active ? 'border-electric bg-electric/5 text-electric' : 'border-slate-200 text-slate-600'}`}>{category}</button>; })}</div></fieldset>
      <label><span className="text-sm font-bold text-navy">Opis oferty *</span><textarea required minLength={40} maxLength={10000} value={values.offerDescription} onChange={(event) => update('offerDescription',event.target.value)} className="mt-2 min-h-40 w-full rounded-md border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-electric focus:ring-4 focus:ring-electric/10" placeholder="Co oferujesz, dla jakich firm i jaki problem rozwiązujesz?" /></label>
      <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update('website',event.target.value)} className="hidden" aria-hidden="true" />
      <label className="flex items-start gap-3 text-sm leading-6 text-slate-600"><input type="checkbox" required checked={values.consent} onChange={(event) => update('consent',event.target.checked)} className="mt-1 h-4 w-4 accent-electric" /><span>Wyrażam zgodę na kontakt i akceptuję <Link href="/polityka-prywatnosci" className="font-bold text-electric">politykę prywatności</Link>.</span></label>
      {status === 'error' ? <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{message}</p> : null}
      <button type="submit" disabled={status === 'loading'} className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md bg-electric px-6 text-sm font-bold text-white hover:bg-navy disabled:opacity-60"><Send size={17} />{status === 'loading' ? 'Zapisywanie...' : 'Wyślij do weryfikacji'}</button>
    </form>
  );
}
