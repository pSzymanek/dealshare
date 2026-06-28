import Link from "next/link";
import { BriefcaseBusiness, Handshake, ListChecks, Users } from "lucide-react";

const items = [{ href: "/admin/sprawy", label: "Zgłoszenia", icon: BriefcaseBusiness }, { href: "/admin/oferenci", label: "Współpraca", icon: Handshake }, { href: "/admin/oferty", label: "Oferty", icon: ListChecks }, { href: "/admin/uzytkownicy", label: "Użytkownicy", icon: Users }];
export function AdminNav(){return <nav className="flex gap-2 overflow-x-auto" aria-label="Administracja">{items.map(({href,label,icon:Icon})=><Link key={href} href={href} className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-navy hover:border-electric/30 hover:text-electric"><Icon size={17}/>{label}</Link>)}</nav>}
