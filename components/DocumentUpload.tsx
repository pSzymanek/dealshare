"use client";

import { FormEvent, useRef, useState } from "react";
import { Upload } from "lucide-react";

export function DocumentUpload({ caseNumber }: { caseNumber: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const formData = new FormData(event.currentTarget);
    formData.set("caseNumber", caseNumber);
    const response = await fetch("/api/documents", { method: "POST", body: formData });
    const data = (await response.json()) as { message?: string };
    setStatus(response.ok ? "success" : "error");
    setMessage(data.message ?? (response.ok ? "Dokument został zapisany." : "Nie udało się zapisać dokumentu."));
    if (response.ok) {
      formRef.current?.reset();
      window.location.reload();
    }
  }

  return <form ref={formRef} onSubmit={submit} className="mt-4 rounded-md border border-dashed border-slate-300 p-4"><label className="block text-sm font-bold text-navy">Dodaj dokument<input type="file" name="file" required accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" className="mt-3 block w-full text-sm text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-electric/10 file:px-3 file:py-2 file:font-bold file:text-electric"/></label><p className="mt-2 text-xs text-slate-500">PDF, JPG lub PNG, maksymalnie 10 MB.</p>{message?<p className={`mt-3 text-xs font-semibold ${status==="error"?"text-red-700":"text-teal"}`}>{message}</p>:null}<button disabled={status==="loading"} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded bg-navy px-4 text-sm font-bold text-white disabled:opacity-60"><Upload size={16}/>{status==="loading"?"Wysyłanie...":"Wyślij dokument"}</button></form>;
}
