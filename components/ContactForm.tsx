"use client";

import { FormEvent, useState } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: ""
};

export function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = values.name.trim() && values.email.includes("@") && values.message.trim().length >= 10;
    setStatus(isValid ? "success" : "error");
  }

  return (
    <form onSubmit={submitForm} className="card-glass rounded-lg border border-slate-200 bg-white p-6 shadow-card" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Imię i nazwisko" name="name" value={values.name} onChange={(value) => setValues({ ...values, name: value })} required />
        <Field label="E-mail" name="email" type="email" value={values.email} onChange={(value) => setValues({ ...values, email: value })} required />
        <Field label="Telefon" name="phone" value={values.phone} onChange={(value) => setValues({ ...values, phone: value })} />
        <Field label="Nazwa firmy" name="company" value={values.company} onChange={(value) => setValues({ ...values, company: value })} />
      </div>
      <label className="mt-5 block">
        <span className="text-sm font-bold text-navy">Wiadomość</span>
        <textarea
          name="message"
          value={values.message}
          onChange={(event) => setValues({ ...values, message: event.target.value })}
          className="mt-2 min-h-36 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition hover:border-slate-400 focus:border-electric focus:ring-4 focus:ring-electric/10"
          required
        />
      </label>
      {status === "success" ? (
        <p className="mt-5 rounded-md border border-teal/20 bg-teal/10 px-4 py-3 text-sm font-semibold text-teal">
          Dziękujemy. Formularz jest gotowy pod przyszłą integrację API.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-5 rounded-md border border-electric/20 bg-electric/10 px-4 py-3 text-sm font-semibold text-electric">
          Uzupełnij imię, poprawny e-mail i wiadomość minimum 10 znaków.
        </p>
      ) : null}
      <button type="submit" className="button-glass relative isolate mt-6 inline-flex min-h-11 items-center justify-center overflow-hidden rounded-md bg-deal-gradient px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5">
        Wyślij wiadomość
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  type?: string;
  onChange: (value: string) => void;
};

function Field({ label, name, value, onChange, required, type = "text" }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-navy">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-2 h-12 w-full rounded-md border border-slate-300 px-4 text-sm outline-none transition hover:border-slate-400 focus:border-electric focus:ring-4 focus:ring-electric/10"
      />
    </label>
  );
}
