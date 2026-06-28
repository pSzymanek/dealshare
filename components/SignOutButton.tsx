"use client";

import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signOut();
        window.location.assign("/");
      }}
      className="inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-navy"
    >
      <LogOut size={17} /> Wyloguj
    </button>
  );
}
