"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Store
} from "lucide-react";
import { Container } from "@/components/Container";

type DemoView = "cases" | "documents" | "messages" | "settings" | "partner";

const navigation = [
  { id: "cases" as const, label: "Moje zgłoszenia", icon: LayoutDashboard },
  { id: "documents" as const, label: "Dokumenty", icon: FileText },
  { id: "messages" as const, label: "Wiadomości", icon: MessageSquare },
  { id: "settings" as const, label: "Ustawienia", icon: Settings },
  { id: "partner" as const, label: "Współpraca", icon: Store }
];

const demoCases = [
  {
    number: "DS-2026-0042",
    title: "Finansowanie rozwoju firmy",
    category: "Finansowanie firmy",
    date: "24 czerwca 2026",
    status: "Analizujemy sytuację",
    description: "Szukamy finansowania zakupu nowej linii produkcyjnej i chcemy porównać dostępne możliwości przed podjęciem decyzji.",
    nextStep: "Do 30 czerwca wrócimy z pierwszym podsumowaniem możliwości.",
    events: [
      ["Dzisiaj, 10:20", "Analizujemy przekazane informacje."],
      ["24 czerwca, 14:05", "Otrzymaliśmy zgłoszenie."]
    ]
  },
  {
    number: "DS-2026-0038",
    title: "Optymalizacja kosztów energii",
    category: "Optymalizacja kosztów",
    date: "18 czerwca 2026",
    status: "Przygotowujemy kontakt",
    description: "Chcemy sprawdzić umowę na energię dla trzech lokalizacji i ocenić możliwości obniżenia kosztów w kolejnym okresie.",
    nextStep: "Potwierdzamy termin rozmowy z wybraną firmą.",
    events: [
      ["26 czerwca, 09:15", "Znaleźliśmy firmę, z którą przygotowujemy kontakt."],
      ["20 czerwca, 12:40", "Porównaliśmy dostępne rozwiązania."],
      ["18 czerwca, 16:22", "Otrzymaliśmy zgłoszenie."]
    ]
  }
];

export function DemoPanel() {
  const [view, setView] = useState<DemoView>("cases");
  const [selectedCase, setSelectedCase] = useState(demoCases[0]);

  return (
    <main className="min-h-screen bg-slate-50 text-ink">
      <div className="border-b border-amber-200 bg-amber-50">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
          <p className="font-semibold text-amber-900"><strong>Podgląd demonstracyjny.</strong> Wszystkie dane są przykładowe, a działania są wyłączone.</p>
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-navy hover:text-electric"><ArrowLeft size={16} /> Wróć na stronę</Link>
        </Container>
      </div>

      <Container className="py-8 sm:py-12">
        <header className="flex flex-wrap items-end justify-between gap-5 border-b border-slate-200 pb-7">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Konto demonstracyjne</p>
            <h1 className="mt-2 text-3xl font-black text-navy">Dzień dobry, Anna</h1>
            <p className="mt-2 text-sm text-slate-600">Nova Produkcja sp. z o.o.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded bg-teal/10 px-3 py-2 text-sm font-bold text-teal"><CheckCircle2 size={17} /> Konto aktywne</span>
        </header>

        <div className="mt-7 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:content-start lg:overflow-visible" aria-label="Podgląd konta">
            {navigation.map((item) => {
              const Icon = item.icon;
              return <button key={item.id} type="button" onClick={() => setView(item.id)} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-bold transition ${view === item.id ? "bg-electric text-white" : "bg-white text-slate-600 hover:bg-slate-100 hover:text-navy"}`}><Icon size={17} /> {item.label}</button>;
            })}
          </nav>

          <section aria-live="polite">
            {view === "cases" ? <CasesView selectedCase={selectedCase} onSelect={setSelectedCase} /> : null}
            {view === "documents" ? <DocumentsView /> : null}
            {view === "messages" ? <MessagesView /> : null}
            {view === "settings" ? <SettingsView /> : null}
            {view === "partner" ? <PartnerView /> : null}
          </section>
        </div>
      </Container>
    </main>
  );
}

function CasesView({ selectedCase, onSelect }: { selectedCase: typeof demoCases[number]; onSelect: (item: typeof demoCases[number]) => void }) {
  return <div>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Moje konto</p><h2 className="mt-2 text-3xl font-black text-navy">Twoje zgłoszenia</h2></div><button type="button" disabled className="min-h-10 rounded-md bg-slate-200 px-4 text-sm font-bold text-slate-500">Nowe zgłoszenie</button></div>
    <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,0.85fr)_minmax(360px,1.15fr)]">
      <div className="divide-y divide-slate-100 border-y border-slate-200 bg-white">
        {demoCases.map((item) => <button key={item.number} type="button" onClick={() => onSelect(item)} className={`block w-full px-4 py-5 text-left transition hover:bg-slate-50 ${selectedCase.number === item.number ? "border-l-4 border-electric bg-electric/5" : "border-l-4 border-transparent"}`}><p className="font-mono text-xs font-black text-electric">{item.number}</p><h3 className="mt-2 font-black text-navy">{item.title}</h3><p className="mt-2 text-xs text-slate-500">{item.category} · {item.date}</p><span className="mt-3 inline-flex rounded bg-teal/10 px-2.5 py-1 text-xs font-bold text-teal">{item.status}</span></button>)}
      </div>
      <div className="border-t-4 border-electric bg-white px-5 py-6 sm:px-7">
        <p className="font-mono text-xs font-black text-electric">{selectedCase.number}</p>
        <h3 className="mt-2 text-2xl font-black text-navy">{selectedCase.title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-700">{selectedCase.description}</p>
        <div className="mt-6 border-y border-slate-200 py-5"><p className="flex items-center gap-2 text-sm font-black text-navy"><Clock3 size={17} className="text-teal" /> Następny krok</p><p className="mt-2 text-sm leading-6 text-slate-600">{selectedCase.nextStep}</p></div>
        <h4 className="mt-6 font-black text-navy">Co dzieje się ze zgłoszeniem</h4>
        <ol className="mt-4 border-l-2 border-slate-200 pl-5">{selectedCase.events.map(([date, message]) => <li key={`${date}-${message}`} className="relative pb-5 last:pb-0"><span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-electric"/><p className="text-sm font-bold text-navy">{message}</p><p className="mt-1 text-xs text-slate-500">{date}</p></li>)}</ol>
      </div>
    </div>
  </div>;
}

function DocumentsView() {
  const documents = [["brief-finansowanie.pdf", "DS-2026-0042", "248 KB"], ["faktura-energia-czerwiec.pdf", "DS-2026-0038", "612 KB"]];
  return <div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Moje konto</p><h2 className="mt-2 text-3xl font-black text-navy">Dokumenty</h2><div className="mt-7 divide-y divide-slate-100 border-y border-slate-200 bg-white">{documents.map(([name, number, size]) => <div key={name} className="grid gap-2 px-4 py-5 sm:grid-cols-[1fr_180px_auto] sm:items-center"><div><p className="text-sm font-bold text-navy">{name}</p><p className="mt-1 text-xs text-slate-500">{size}</p></div><p className="font-mono text-xs font-bold text-electric">{number}</p><FileText size={18} className="text-slate-400" /></div>)}</div></div>;
}

function MessagesView() {
  return <div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Moje konto</p><h2 className="mt-2 text-3xl font-black text-navy">Wiadomości</h2><div className="mt-7 divide-y divide-slate-100 border-y border-slate-200 bg-white"><article className="px-4 py-5"><p className="text-sm font-black text-navy">Potwierdzenie zakresu finansowania</p><p className="mt-2 text-sm leading-7 text-slate-600">Dziękujemy za dokumenty. Analizujemy możliwości i wrócimy z podsumowaniem do 30 czerwca.</p><p className="mt-2 text-xs text-slate-500">Dzisiaj, 10:20 · DS-2026-0042</p></article><article className="px-4 py-5"><p className="text-sm font-black text-navy">Termin rozmowy</p><p className="mt-2 text-sm leading-7 text-slate-600">Wybrana firma potwierdziła gotowość do rozmowy. Wkrótce prześlemy propozycje terminów.</p><p className="mt-2 text-xs text-slate-500">26 czerwca, 09:15 · DS-2026-0038</p></article></div></div>;
}

function SettingsView() {
  return <div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Moje konto</p><h2 className="mt-2 text-3xl font-black text-navy">Dane konta</h2><dl className="mt-7 divide-y divide-slate-100 border-y border-slate-200 bg-white"><Row label="Imię i nazwisko" value="Anna Kowalska"/><Row label="E-mail" value="anna@example.com"/><Row label="Firma" value="Nova Produkcja sp. z o.o."/><Row label="Telefon" value="+48 500 000 000"/></dl></div>;
}

function PartnerView() {
  return <div><p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Współpraca z Dealshare</p><h2 className="mt-2 text-3xl font-black text-navy">Oferty i zapytania</h2><div className="mt-7 grid gap-6 md:grid-cols-2"><article className="border-t-4 border-electric bg-white p-5"><Building2 className="text-electric"/><p className="mt-4 text-xs font-bold uppercase text-slate-500">Opublikowana</p><h3 className="mt-2 text-lg font-black text-navy">Automatyzacja procesów produkcyjnych</h3><p className="mt-2 text-sm leading-6 text-slate-600">Audyt, projekt i wdrożenie automatyzacji dla firm produkcyjnych.</p></article><article className="border-t-4 border-teal bg-white p-5"><MessageSquare className="text-teal"/><p className="mt-4 text-xs font-bold uppercase text-slate-500">Nowe zapytanie</p><h3 className="mt-2 text-lg font-black text-navy">Modernizacja linii pakującej</h3><p className="mt-2 text-sm leading-6 text-slate-600">Firma szuka sposobu na zwiększenie wydajności i ograniczenie przestojów.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-electric">Zobacz kontekst <ArrowRight size={16}/></span></article></div></div>;
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="grid gap-1 px-4 py-5 sm:grid-cols-[180px_1fr]"><dt className="text-sm font-bold text-slate-500">{label}</dt><dd className="text-sm font-semibold text-navy">{value}</dd></div>;
}
