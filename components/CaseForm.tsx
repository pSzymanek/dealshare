"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";

type CaseFormProps = {
  pathType?: "public_offer" | "guided_matching";
  offerSlug?: string;
  offerTitle?: string;
  defaultCategory?: string;
  compact?: boolean;
};

const categories = ["Finansowanie firmy", "Poprawa płynności", "Optymalizacja kosztów", "Uporządkowanie sytuacji firmy", "Rozwiązania prawno-finansowe", "Rozwój i inwestycje", "Inna potrzeba"];

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  nip: "",
  category: "",
  description: "",
  preferredContact: "phone",
  consent: false,
  website: ""
};

export function CaseForm({ pathType = "guided_matching", offerSlug, offerTitle, defaultCategory = "", compact = false }: CaseFormProps) {
  const [values, setValues] = useState({ ...initialValues, category: defaultCategory });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [caseNumber, setCaseNumber] = useState("");

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (status === "error") setStatus("idle");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const searchParams = new URLSearchParams(window.location.search);
    const response = await fetch("/api/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        pathType,
        offerSlug,
        category: values.category || offerTitle || "Inna potrzeba",
        sourceUrl: window.location.href,
        utmSource: searchParams.get("utm_source") || "",
        utmMedium: searchParams.get("utm_medium") || "",
        utmCampaign: searchParams.get("utm_campaign") || ""
      })
    });
    const data = (await response.json()) as { message?: string; caseNumber?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(data.message ?? "Nie udało się wysłać zgłoszenia. Spróbuj ponownie.");
      return;
    }

    setStatus("success");
    setCaseNumber(data.caseNumber ?? "");
    setMessage(data.message ?? "Dziękujemy. Otrzymaliśmy Twoje zgłoszenie.");
  }

  if (status === "success") {
    return (
      <div className="border-y border-teal/30 bg-teal/5 py-10 text-center">
        <CheckCircle2 className="mx-auto text-teal" size={42} />
        <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-teal">Dziękujemy za zgłoszenie</p>
        <h2 className="mt-2 text-3xl font-black text-navy">{caseNumber}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">{message} Na podany adres wysłaliśmy potwierdzenie i link, pod którym sprawdzisz dalsze informacje.</p>
        <Link href="/logowanie" className="mt-6 inline-flex min-h-11 items-center rounded-md bg-electric px-5 text-sm font-bold text-white hover:bg-navy">Sprawdź zgłoszenie</Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "grid gap-5" : "rounded-lg border border-slate-200 bg-white p-5 shadow-card sm:p-7"} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Imię i nazwisko" value={values.fullName} onChange={(value) => update("fullName", value)} autoComplete="name" required />
        <Field label="E-mail" type="email" value={values.email} onChange={(value) => update("email", value)} autoComplete="email" required />
        <Field label="Telefon" type="tel" value={values.phone} onChange={(value) => update("phone", value)} autoComplete="tel" required />
        <Field label="Nazwa firmy" value={values.companyName} onChange={(value) => update("companyName", value)} autoComplete="organization" required />
        <Field label="NIP" value={values.nip} onChange={(value) => update("nip", value)} inputMode="numeric" />
        <label className="block">
          <span className="text-sm font-bold text-navy">Czego dotyczy rozmowa? *</span>
          <select required value={values.category} onChange={(event) => update("category", event.target.value)} className="mt-2 h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm outline-none focus:border-electric focus:ring-4 focus:ring-electric/10">
            <option value="">Wybierz temat</option>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-bold text-navy">Opowiedz nam o sytuacji firmy *</span>
        <textarea required minLength={20} maxLength={8000} value={values.description} onChange={(event) => update("description", event.target.value)} className="mt-2 min-h-36 w-full rounded-md border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-electric focus:ring-4 focus:ring-electric/10" placeholder={offerTitle ? `Napisz, czego chcesz się dowiedzieć o ofercie „${offerTitle}”.` : "Co chcesz zmienić lub osiągnąć? Co jest dziś największą przeszkodą?"} />
      </label>

      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-navy">Jak najlepiej się z Tobą skontaktować?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[{ value: "phone", label: "Telefon" }, { value: "email", label: "E-mail" }, { value: "whatsapp", label: "WhatsApp" }, { value: "any", label: "Dowolny" }].map((option) => (
            <label key={option.value} className={`cursor-pointer rounded border px-3 py-2 text-sm font-bold ${values.preferredContact === option.value ? "border-electric bg-electric/5 text-electric" : "border-slate-200 text-slate-600"}`}>
              <input type="radio" className="sr-only" name="preferredContact" value={option.value} checked={values.preferredContact === option.value} onChange={() => update("preferredContact", option.value)} />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} className="hidden" aria-hidden="true" />
      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-600">
        <input type="checkbox" required checked={values.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-1 h-4 w-4 accent-electric" />
        <span>Wyrażam zgodę na kontakt w sprawie zgłoszenia i akceptuję zasady opisane w <Link href="/polityka-prywatnosci" className="font-bold text-electric">polityce prywatności</Link>.</span>
      </label>

      {status === "error" ? <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{message}</p> : null}
      <button type="submit" disabled={status === "loading"} className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-electric px-6 text-sm font-bold text-white transition hover:bg-navy disabled:opacity-60">
        <Send size={17} /> {status === "loading" ? "Wysyłamy..." : "Wyślij zgłoszenie"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, required, ...props }: Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="text-sm font-bold text-navy">{label}{required ? " *" : ""}</span><input {...props} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-slate-300 px-4 text-sm outline-none focus:border-electric focus:ring-4 focus:ring-electric/10" /></label>;
}
