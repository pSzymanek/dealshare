import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { OfferCard } from "@/components/OfferCard";
import { guidedOffers, publicOffers } from "@/lib/offers";

export const metadata: Metadata = { title: "Oferty i indywidualny dobór", description: "Jawne oferty biznesowe oraz indywidualny dobór rozwiązań przez Dealshare.", alternates: { canonical: "/oferty" } };

export default function OffersPage() {
  return <main>
    <section className="bg-navy py-16 text-white"><Container><p className="text-sm font-black uppercase tracking-[0.18em] text-cyan">Dwie drogi</p><h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-6xl">Sprawdź konkretną ofertę albo opisz potrzebę firmy.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">Dealshare porządkuje możliwości bez tworzenia przypadkowego katalogu. Jawne oferty możesz ocenić od razu, a w pozostałych obszarach prowadzimy indywidualny dobór.</p></Container></section>
    <section id="jawne-oferty" className="scroll-mt-28 bg-white py-14 sm:py-20"><Container><p className="text-sm font-black uppercase tracking-[0.18em] text-teal">Jawne oferty</p><h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">Konkretne projekty i możliwości</h2><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">Oferty, których zakres możesz sprawdzić przed rozmową i utworzyć sprawę powiązaną z wybraną propozycją.</p><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{publicOffers.map((offer) => <OfferCard key={offer.slug} offer={offer} />)}</div></Container></section>
    <section id="indywidualny-dobor" className="scroll-mt-28 bg-mist py-14 sm:py-20"><Container><p className="text-sm font-black uppercase tracking-[0.18em] text-teal">Indywidualny dobór przez Dealshare</p><h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">Zacznij od sytuacji firmy, nie od wyboru partnera</h2><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">Nie musisz wiedzieć, którego partnera wybrać. Opisz sytuację firmy, a Dealshare dobierze właściwą ścieżkę.</p><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{guidedOffers.map((offer) => <OfferCard key={offer.slug} offer={offer} />)}</div><Link href="/potrzeba" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-electric px-5 text-sm font-bold text-white">Opisz inną potrzebę <ArrowRight size={17} /></Link></Container></section>
  </main>;
}
