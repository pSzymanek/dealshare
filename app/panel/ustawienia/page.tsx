import { requireAuth } from "@/lib/auth-guards";

export default async function SettingsPage() {
  const { session } = await requireAuth();
  return <div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Konto</p><h1 className="mt-2 text-3xl font-black text-navy">Ustawienia</h1><dl className="mt-8 divide-y divide-slate-100 border-y border-slate-200"><div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]"><dt className="text-sm font-bold text-slate-500">Imię i nazwisko</dt><dd className="text-sm font-semibold text-navy">{session.user.name}</dd></div><div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]"><dt className="text-sm font-bold text-slate-500">E-mail</dt><dd className="text-sm font-semibold text-navy">{session.user.email}</dd></div></dl></div>;
}
