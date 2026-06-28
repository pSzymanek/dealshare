"use client";

import { FormEvent, useState } from "react";
import { MessageSquareText } from "lucide-react";

export function CaseMessageForm({ caseNumber }: { caseNumber: string }) {
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading"); setMessage("");
    const response = await fetch(`/api/cases/${encodeURIComponent(caseNumber)}/messages`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body }) });
    const data = (await response.json()) as { message?: string };
    if (!response.ok) { setStatus("error"); setMessage(data.message ?? "Nie udało się wysłać wiadomości."); return; }
    setBody(""); window.location.reload();
  }

  return <form onSubmit={submit} className="mt-5"><label className="block text-sm font-bold text-navy">Napisz do nas<textarea required minLength={2} maxLength={5000} value={body} onChange={event=>setBody(event.target.value)} className="mt-2 min-h-24 w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-electric focus:ring-4 focus:ring-electric/10"/></label>{message?<p className="mt-2 text-xs font-semibold text-red-700">{message}</p>:null}<button disabled={status==="loading"} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded bg-electric px-4 text-sm font-bold text-white disabled:opacity-60"><MessageSquareText size={16}/>{status==="loading"?"Wysyłanie...":"Wyślij wiadomość"}</button></form>;
}
