import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Search, Users } from "lucide-react";
import { Container } from "@/components/Container";
import { OfferCard } from "@/components/OfferCard";
import { publicOffers } from "@/lib/offers";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const processSteps = [
  "Wybierasz możliwość lub opisujesz wyzwanie",
  "Otrzymujesz numer zgłoszenia",
  "Poznajemy sytuację Twojej firmy",
  "Łączymy Cię z właściwym rozwiązaniem",
  "Pomagamy przejść do konkretnej decyzji"
];

export default function HomePage() {
  return (
    <main>
      <section className="bg-navy py-16 text-white sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan">Biznes bez kompleksów</p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">Znajdź właściwą możliwość dla swojej firmy.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 sm:text-xl">Przeglądaj konkretne propozycje biznesowe albo opowiedz nam, czego potrzebuje Twoja firma. Pomożemy Ci znaleźć rozwiązanie i dotrzeć do właściwych ludzi.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/oferty#jawne-oferty" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan px-6 text-sm font-black text-navy transition hover:bg-white">Przeglądaj możliwości <ArrowRight size={18} /></Link>
              <Link href="/potrzeba" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-6 text-sm font-black text-white transition hover:bg-white/10">Porozmawiajmy o Twojej firmie <ArrowRight size={18} /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <PathBlock icon={Search} eyebrow="Gdy wiesz, czego szukasz" title="Przeglądaj konkretne propozycje" text="Sprawdź projekty, usługi i możliwości współpracy dostępne dla firm." href="/oferty#jawne-oferty" action="Zobacz możliwości" />
            <PathBlock icon={Users} eyebrow="Gdy potrzebujesz kierunku" title="Opowiedz nam o wyzwaniu" text="Nie musisz znać rynku ani wybierać partnera. Poznamy sytuację i pomożemy znaleźć rozsądny następny krok." href="/potrzeba" action="Opisz sytuację" />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-14 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm font-black uppercase tracking-[0.18em] text-teal">Aktualne możliwości</p><h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">Konkretne propozycje dla firm</h2></div>
            <Link href="/oferty" className="inline-flex items-center gap-2 text-sm font-bold text-electric">Zobacz wszystkie <ArrowRight size={17} /></Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{publicOffers.map((offer) => <OfferCard key={offer.slug} offer={offer} />)}</div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl"><p className="text-sm font-black uppercase tracking-[0.18em] text-teal">Jak pomagamy</p><h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">Od pierwszej rozmowy do konkretnego kroku</h2></div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:grid-cols-5">
            {processSteps.map((step, index) => <li key={step} className="bg-white p-5"><span className="font-mono text-sm font-black text-electric">0{index + 1}</span><p className="mt-3 text-sm font-bold leading-6 text-navy">{step}</p></li>)}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/jak-dziala" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-electric px-5 text-sm font-bold text-white">Zobacz, jak to działa <ArrowRight size={17} /></Link><Link href="/dla-partnerow" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-300 px-5 text-sm font-bold text-navy"><BriefcaseBusiness size={17} /> Współpraca z Dealshare</Link></div>
        </Container>
      </section>
    </main>
  );
}

function PathBlock({ icon: Icon, eyebrow, title, text, href, action }: { icon: typeof Search; eyebrow: string; title: string; text: string; href: string; action: string }) {
  return <article className="border-t-4 border-electric pt-6"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-md bg-electric/10 text-electric"><Icon size={23} /></span><p className="text-xs font-black uppercase tracking-[0.18em] text-teal">{eyebrow}</p></div><h2 className="mt-5 text-3xl font-black text-navy">{title}</h2><p className="mt-3 max-w-xl text-base leading-8 text-slate-600">{text}</p><Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-electric hover:text-navy">{action} <ArrowRight size={17} /></Link></article>;
}
