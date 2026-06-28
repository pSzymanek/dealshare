"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, FileText, LayoutDashboard, MessageSquare, Plus, Settings, Store } from "lucide-react";

const baseItems = [
  { href: "/panel", label: "Moje sprawy", icon: LayoutDashboard },
  { href: "/panel/nowa-potrzeba", label: "Nowa potrzeba", icon: Plus },
  { href: "/panel/dokumenty", label: "Dokumenty", icon: FileText },
  { href: "/panel/wiadomosci", label: "Wiadomości", icon: MessageSquare },
  { href: "/panel/ustawienia", label: "Ustawienia", icon: Settings }
];

export function PanelNav({ isPartner, isAdmin }: { isPartner: boolean; isAdmin: boolean }) {
  const pathname = usePathname();
  const items = [
    ...baseItems,
    ...(isPartner ? [{ href: "/panel/oferent", label: "Panel oferenta", icon: Store }] : []),
    ...(isAdmin ? [{ href: "/admin/sprawy", label: "Administracja", icon: BriefcaseBusiness }] : [])
  ];

  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0" aria-label="Panel użytkownika">
      {items.map((item) => {
        const active = item.href === "/panel" ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition ${active ? "bg-electric text-white" : "text-slate-600 hover:bg-slate-100 hover:text-navy"}`}>
            <Icon size={17} /> {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
