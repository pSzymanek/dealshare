"use client";

import { FormEvent, useState } from "react";
import { KeyRound, Link2, LogIn, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type Mode = "login" | "register" | "magic" | "forgot";

const modeLabels: Record<Mode, string> = {
  login: "Zaloguj się",
  register: "Załóż konto",
  magic: "Link do logowania",
  forgot: "Odzyskaj hasło"
};

export function AuthScreen() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setStatus("idle");
    setMessage("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      if (mode === "register") {
        const result = await authClient.signUp.email({ name, email, password, callbackURL: "/panel" });
        if (result.error) throw new Error(result.error.message);
        setStatus("success");
        setMessage("Konto zostało utworzone. Sprawdź e-mail i potwierdź adres.");
        return;
      }

      if (mode === "magic") {
        const result = await authClient.signIn.magicLink({ email, callbackURL: "/panel", errorCallbackURL: "/logowanie?error=magic-link" });
        if (result.error) throw new Error(result.error.message);
        setStatus("success");
        setMessage("Wysłaliśmy bezpieczny link do logowania. Sprawdź skrzynkę e-mail.");
        return;
      }

      if (mode === "forgot") {
        const result = await authClient.requestPasswordReset({ email, redirectTo: "/reset-hasla" });
        if (result.error) throw new Error(result.error.message);
        setStatus("success");
        setMessage("Jeśli konto istnieje, wysłaliśmy link do ustawienia nowego hasła.");
        return;
      }

      const result = await authClient.signIn.email({ email, password, callbackURL: "/panel" });
      if (result.error) throw new Error(result.error.message);
      window.location.assign("/panel");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Nie udało się wykonać operacji.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="grid grid-cols-2 gap-2 rounded-md bg-slate-100 p-1" role="tablist" aria-label="Dostęp do konta">
        <ModeButton active={mode === "login"} onClick={() => changeMode("login")} icon={LogIn} label="Logowanie" />
        <ModeButton active={mode === "register"} onClick={() => changeMode("register")} icon={UserPlus} label="Rejestracja" />
      </div>

      <form onSubmit={submit} className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-card">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Konto Dealshare</p>
        <h1 className="mt-2 text-2xl font-black text-navy">{modeLabels[mode]}</h1>

        {mode === "register" ? <AuthField label="Imię i nazwisko" value={name} onChange={setName} autoComplete="name" required /> : null}
        <AuthField label="E-mail" type="email" value={email} onChange={setEmail} autoComplete="email" required />
        {mode === "login" || mode === "register" ? (
          <AuthField label="Hasło" type="password" value={password} onChange={setPassword} autoComplete={mode === "register" ? "new-password" : "current-password"} minLength={10} required />
        ) : null}

        {message ? (
          <p className={`mt-5 rounded-md border px-4 py-3 text-sm font-semibold ${status === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-teal/20 bg-teal/10 text-teal"}`}>
            {message}
          </p>
        ) : null}

        <button type="submit" disabled={status === "loading"} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-electric px-5 py-3 text-sm font-bold text-white transition hover:bg-navy disabled:opacity-60">
          {status === "loading" ? "Proszę czekać..." : modeLabels[mode]}
        </button>

        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold">
          {mode !== "magic" ? (
            <button type="button" onClick={() => changeMode("magic")} className="inline-flex items-center gap-2 text-electric hover:text-navy">
              <Link2 size={16} /> Magic link
            </button>
          ) : null}
          {mode !== "forgot" ? (
            <button type="button" onClick={() => changeMode("forgot")} className="inline-flex items-center gap-2 text-electric hover:text-navy">
              <KeyRound size={16} /> Nie pamiętam hasła
            </button>
          ) : null}
          {mode === "magic" || mode === "forgot" ? (
            <button type="button" onClick={() => changeMode("login")} className="text-electric hover:text-navy">
              Wróć do logowania
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function ModeButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof LogIn; label: string }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} className={`inline-flex min-h-10 items-center justify-center gap-2 rounded px-3 text-sm font-bold transition ${active ? "bg-white text-navy shadow-sm" : "text-slate-500 hover:text-navy"}`}>
      <Icon size={17} /> {label}
    </button>
  );
}

function AuthField({
  label,
  value,
  onChange,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-5 block">
      <span className="text-sm font-bold text-navy">{label}</span>
      <input {...props} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-electric focus:ring-4 focus:ring-electric/10" />
    </label>
  );
}
