"use client";

import { FormEvent, useMemo, useState } from "react";
import type { BriefConfig } from "@/lib/briefs";

type LandingLeadFormProps = {
  config: BriefConfig;
  title: string;
  text: string;
};

type ContactValues = {
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  nip: string;
  customContactDateTime: string;
  additionalInfo: string;
};

type ContactErrors = Partial<Record<keyof ContactValues | "preferredContactMethod" | "preferredContactTime", string>>;

const initialContact: ContactValues = {
  fullName: "",
  phone: "",
  email: "",
  companyName: "",
  nip: "",
  customContactDateTime: "",
  additionalInfo: ""
};

const preferredContactMethods = ["Telefon", "E-mail", "WhatsApp", "SMS", "Wszystko jedno"];
const preferredContactTimes = ["9:00-12:00", "12:00-16:00", "16:00-18:00", "Konkretna data i godzina"];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function validateContact(values: ContactValues, preferredContactMethod: string[], preferredContactTime: string[]) {
  const errors: ContactErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Wpisz imię i nazwisko.";
  if (!values.phone.trim()) errors.phone = "Wpisz numer telefonu.";
  if (!values.email.trim()) {
    errors.email = "Wpisz adres e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Wpisz poprawny adres e-mail.";
  }
  if (preferredContactMethod.length === 0) errors.preferredContactMethod = "Wybierz przynajmniej jedną formę kontaktu.";
  if (preferredContactTime.length === 0) errors.preferredContactTime = "Wybierz, kiedy najlepiej się odezwać.";
  if (preferredContactTime.includes("Konkretna data i godzina") && !values.customContactDateTime.trim()) {
    errors.customContactDateTime = "Wpisz preferowaną datę i godzinę kontaktu.";
  }

  return errors;
}

export function LandingLeadForm({ config, title, text }: LandingLeadFormProps) {
  const [contact, setContact] = useState(initialContact);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [preferredContactMethod, setPreferredContactMethod] = useState<string[]>([]);
  const [preferredContactTime, setPreferredContactTime] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const errors = showErrors ? validateContact(contact, preferredContactMethod, preferredContactTime) : {};

  const submittedAnswers = useMemo(
    () =>
      config.steps
        .map((step) => ({
          stepTitle: step.stepTitle,
          question: step.question,
          selectedOptions: answers[step.question] ?? []
        }))
        .filter((answer) => answer.selectedOptions.length > 0),
    [answers, config.steps]
  );

  function updateContact(name: keyof ContactValues, value: string) {
    setContact({ ...contact, [name]: value });

    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  }

  function toggleAnswer(question: string, option: string, type: "multi" | "single") {
    const selected = answers[question] ?? [];

    if (type === "single") {
      setAnswers({ ...answers, [question]: selected.includes(option) ? [] : [option] });
      return;
    }

    setAnswers({
      ...answers,
      [question]: selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]
    });
  }

  function toggleListValue(value: string, selected: string[], setter: (next: string[]) => void) {
    setter(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  }

  function toggleContactMethod(value: string) {
    if (value === "Wszystko jedno") {
      setPreferredContactMethod(preferredContactMethod.includes(value) ? [] : [value]);
      return;
    }

    const withoutAny = preferredContactMethod.filter((item) => item !== "Wszystko jedno");
    setPreferredContactMethod(withoutAny.includes(value) ? withoutAny.filter((item) => item !== value) : [...withoutAny, value]);
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrors(true);

    const nextErrors = validateContact(contact, preferredContactMethod, preferredContactTime);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFeedback("Uzupełnij zaznaczone pola kontaktowe.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "brief",
          offerId: config.offerId,
          offerTitle: config.offerTitle,
          answers: submittedAnswers,
          contact,
          preferredContactMethod,
          preferredContactTime,
          customContactDateTime: contact.customContactDateTime,
          additionalInfo: contact.additionalInfo,
          sourceUrl: window.location.href
        })
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(data.message ?? "Nie udało się wysłać zgłoszenia.");

      setStatus("success");
      setFeedback(data.message ?? "Dziękujemy. Zgłoszenie zostało wysłane.");
      setContact(initialContact);
      setAnswers({});
      setPreferredContactMethod([]);
      setPreferredContactTime([]);
      setShowErrors(false);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Nie udało się wysłać zgłoszenia.");
    }
  }

  return (
    <section id="formularz" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="reveal-on-scroll rounded-lg border border-electric/15 bg-mist p-6 shadow-sm lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan">Kontakt</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-navy sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{text}</p>
            <div className="mt-6 rounded-lg border border-white bg-white/70 p-4 text-sm font-semibold leading-7 text-slate-700">
              Wypełnienie formularza nie zobowiązuje do dalszych działań. Najpierw sprawdzamy sytuację i wracamy z konkretnym kierunkiem.
            </div>
          </div>

          <form onSubmit={submitForm} className="reveal-on-scroll rounded-lg border border-slate-200 bg-white p-5 shadow-card sm:p-7" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Imię i nazwisko" value={contact.fullName} error={errors.fullName} onChange={(value) => updateContact("fullName", value)} required />
              <Field label="Telefon" value={contact.phone} error={errors.phone} onChange={(value) => updateContact("phone", value)} required />
              <Field label="E-mail" type="email" value={contact.email} error={errors.email} onChange={(value) => updateContact("email", value)} required />
              <Field label="Nazwa firmy" value={contact.companyName} onChange={(value) => updateContact("companyName", value)} />
              <div>
                <Field label="NIP" value={contact.nip} onChange={(value) => updateContact("nip", value)} />
                <p className="mt-1 text-xs font-semibold text-slate-500">Opcjonalnie, ale może przyspieszyć analizę.</p>
              </div>
            </div>

            <ChipGroup title="Preferowana forma kontaktu" options={preferredContactMethods} selected={preferredContactMethod} error={errors.preferredContactMethod} onToggle={toggleContactMethod} />
            <ChipGroup title="Kiedy najlepiej się odezwać?" options={preferredContactTimes} selected={preferredContactTime} error={errors.preferredContactTime} onToggle={(value) => toggleListValue(value, preferredContactTime, setPreferredContactTime)} />

            {preferredContactTime.includes("Konkretna data i godzina") ? (
              <Field label="Konkretna data i godzina kontaktu" value={contact.customContactDateTime} error={errors.customContactDateTime} onChange={(value) => updateContact("customContactDateTime", value)} placeholder="Np. wtorek po 14:00" />
            ) : null}

            <div className="mt-7 rounded-lg border border-slate-200 bg-mist/70">
              <div className="border-b border-slate-200 p-4">
                <p className="text-sm font-black text-navy">Kilka informacji, które przyspieszą analizę</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Możesz uzupełnić teraz albo zostawić szczegóły na rozmowę.</p>
              </div>
              <div className="divide-y divide-slate-200">
                {config.steps.map((step, index) => (
                  <details key={step.question} className="group p-4" open={index < 2}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-navy">
                      {step.question}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-electric transition group-open:rotate-180">⌄</span>
                    </summary>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{step.type === "single" ? "Wybierz jedną odpowiedź" : "Możesz wybrać kilka odpowiedzi"}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.options.map((option) => {
                        const isSelected = (answers[step.question] ?? []).includes(option);

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleAnswer(step.question, option, step.type)}
                            className={cx(
                              "rounded-full border px-4 py-2 text-sm font-bold transition",
                              isSelected ? "border-cyan bg-deal-gradient text-white shadow-sm" : "border-slate-200 bg-white text-navy hover:border-electric/30 hover:bg-electric/5"
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-navy">Dodatkowe informacje</span>
              <textarea
                value={contact.additionalInfo}
                onChange={(event) => updateContact("additionalInfo", event.target.value)}
                placeholder="Możesz dopisać, co jest najważniejsze w Twojej sytuacji."
                className="mt-2 min-h-28 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition hover:border-slate-400 focus:border-electric focus:ring-4 focus:ring-electric/10"
              />
            </label>

            {status === "success" ? <p className="mt-5 rounded-md border border-teal/20 bg-teal/10 px-4 py-3 text-sm font-semibold text-teal">{feedback}</p> : null}
            {status === "error" ? <p className="mt-5 rounded-md border border-electric/20 bg-electric/10 px-4 py-3 text-sm font-semibold text-electric">{feedback}</p> : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="button-glass mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-deal-gradient px-6 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === "loading" ? "Wysyłanie..." : config.cta}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ChipGroup({ title, options, selected, error, onToggle }: { title: string; options: string[]; selected: string[]; error?: string; onToggle: (value: string) => void }) {
  return (
    <div className="mt-6">
      <p className="text-sm font-bold text-navy">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={cx("rounded-full border px-4 py-2 text-sm font-bold transition", isSelected ? "border-cyan bg-deal-gradient text-white shadow-sm" : "border-slate-200 bg-white text-navy hover:border-electric/30 hover:bg-electric/5")}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 text-xs font-semibold text-teal">{error}</p> : null}
    </div>
  );
}

function Field({ label, value, onChange, error, type = "text", required, placeholder }: { label: string; value: string; onChange: (value: string) => void; error?: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-navy">
        {label}
        {required ? <span className="text-cyan"> *</span> : null}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cx(
          "mt-2 h-12 w-full rounded-md border px-4 text-sm outline-none transition hover:border-slate-400 focus:border-electric focus:ring-4 focus:ring-electric/10",
          error ? "border-cyan bg-cyan/5 ring-4 ring-cyan/10" : "border-slate-300"
        )}
      />
      {error ? <p className="mt-2 text-xs font-semibold text-teal">{error}</p> : null}
    </label>
  );
}
