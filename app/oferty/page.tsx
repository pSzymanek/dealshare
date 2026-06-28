import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { OfferCard } from "@/components/OfferCard";
import { guidedOffers, publicOffers } from "@/lib/offers";

export const metadata: Metadata = { title: "Możliwości dla firm", description: "Konkretne propozycje biznesowe oraz pomoc w znalezieniu rozwiązania dla Twojej firmy.", alternates: { canonical: "/oferty" } };

export default function OffersPage() {
  return <main>
    <section className="bg-navy py-16 text-white"><Container><p className="text-sm font-black uppercase tracking-[0.18em] text-cyan">Możliwości dla firm</p><h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-6xl">Sprawdź konkretną propozycję albo zacznij od rozmowy.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">Możesz od razu poznać szczegóły wybranych ofert. Jeśli Twoja sytuacja wymaga szerszego spojrzenia, opowiedz nam o niej, a pomożemy znaleźć właściwy kierunek.</p></Container></section>
    <section id="jawne-oferty" className="scroll-mt-28 bg-white py-14 sm:py-20"><Container><p className="text-sm font-black uppercase tracking-[0.18em] text-teal">Do sprawdzenia od razu</p><h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">Konkretne projekty i propozycje</h2><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">Poznaj zakres, warunki i najważniejsze informacje jeszcze przed pierwszą rozmową.</p><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{publicOffers.map((offer) => <OfferCard key={offer.slug} offer={offer} />)}</div></Container></section>
    <section id="indywidualny-dobor" className="scroll-mt-28 bg-mist py-14 sm:py-20"><Container><p className="text-sm font-black uppercase tracking-[0.18em] text-teal">Zacznij od wyzwania</p><h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">Nie musisz od razu znać rozwiązania</h2><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">Opisz sytuację swojej firmy. Przyjrzymy się jej i pomożemy ustalić, z kim oraz w jaki sposób warto porozmawiać.</p><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{guidedOffers.map((offer) => <OfferCard key={offer.slug} offer={offer} />)}</div><Link href="/potrzeba" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-electric px-5 text-sm font-bold text-white">Opowiedz nam o sytuacji <ArrowRight size={17} /></Link></Container></section>
  </main>;
}
