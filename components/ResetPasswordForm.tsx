"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return setMessage("Link jest nieprawidłowy albo wygasł.");
    setLoading(true);
    const result = await authClient.resetPassword({ newPassword: password, token });
    setLoading(false);
    setMessage(result.error ? result.error.message || "Nie udało się zmienić hasła." : "Hasło zostało zmienione. Możesz się zalogować.");
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-card">
      <h1 className="text-2xl font-black text-navy">Ustaw nowe hasło</h1>
      <label className="mt-5 block text-sm font-bold text-navy">
        Nowe hasło
        <input type="password" minLength={10} required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-slate-300 px-4 outline-none focus:border-electric focus:ring-4 focus:ring-electric/10" />
      </label>
      {message ? <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p> : null}
      <button type="submit" disabled={loading || !token} className="mt-6 min-h-11 w-full rounded-md bg-electric px-5 font-bold text-white disabled:opacity-60">
        {loading ? "Zapisywanie..." : "Zapisz hasło"}
      </button>
    </form>
  );
}
