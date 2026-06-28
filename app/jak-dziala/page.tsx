import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Jak działa Dealshare", description: "Dwie drogi prowadzące firmę do właściwego rozwiązania." };
const sections = [
  ["Jawne oferty", "Sprawdzasz konkretny projekt, usługę albo propozycję partnerską. Gdy chcesz porozmawiać, tworzymy sprawę powiązaną z tą ofertą."],
  ["Indywidualny dobór", "Opisujesz sytuację firmy bez wybierania partnera. Najpierw rozumiemy potrzebę, później dobieramy właściwą ścieżkę."],
  ["Jak powstaje sprawa", "Po wysłaniu briefu zapisujemy zgłoszenie, nadajemy Case ID i udostępniamy je w panelu klienta."],
  ["Co widzisz w panelu", "Status sprawy, historię działań, prośby o uzupełnienia, dokumenty i informacje o kolejnych krokach."],
  ["Jak dobieramy partnera", "Nie pokazujemy przypadkowej listy firm. Weryfikujemy kontekst, zakres i gotowość obu stron do rozmowy."]
];
export default function HowItWorksPage() { return <main><section className="bg-navy py-16 text-white"><Container><p className="text-sm font-black uppercase tracking-[0.18em] text-cyan">Jak działa Dealshare</p><h1 className="mt-4 max-w-5xl text-4xl font-black sm:text-6xl">Dwie drogi. Jeden cel: właściwe rozwiązanie dla Twojej firmy.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">Nie pokazujemy przypadkowej listy firm. Najpierw rozumiemy potrzebę, potem dobieramy właściwą ścieżkę.</p></Container></section><section className="bg-white py-14 sm:py-20"><Container><div className="divide-y divide-slate-200 border-y border-slate-200">{sections.map(([title,text],index) => <article key={title} className="grid gap-3 py-7 md:grid-cols-[80px_260px_1fr]"><span className="font-mono font-black text-electric">0{index+1}</span><h2 className="text-xl font-black text-navy">{title}</h2><p className="max-w-2xl text-sm leading-7 text-slate-600">{text}</p></article>)}</div></Container></section></main>; }
