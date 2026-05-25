import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HeroOfferTicker } from "@/components/HeroOfferTicker";
import { HeroRotatingWord } from "@/components/HeroRotatingWord";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeading } from "@/components/SectionHeading";
import { offers } from "@/lib/offers";

const benefits = [
  "Wyselekcjonowane oferty",
  "Mniej chaosu, więcej konkretów",
  "Partnerzy B2B",
  "Rozwiązania dopasowane do firmy"
];

const heroOffers = offers.slice(0, 7);

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-navy-gradient text-white">
        <Container className="relative grid min-h-[680px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="heading-title-enter max-w-4xl text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
              <HeroRotatingWord /> <br /> W jednym miejscu.
            </h1>
            <p className="heading-copy-enter mt-6 max-w-2xl text-lg leading-8 text-white/76">
              dealshare pomaga przedsiębiorcom szybciej docierać do sprawdzonych ofert, partnerów, kontraktów i rozwiązań biznesowych.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/oferty">Zobacz oferty</Button>
              <Button href="/kontakt" variant="secondary">
                Skontaktuj się
              </Button>
            </div>
          </div>
          <div className="reveal-on-load reveal-delay-1 relative">
            <div className="absolute -inset-8 rounded-full bg-cyan/10 blur-3xl" />
            <div className="hero-panel relative overflow-hidden rounded-lg border border-white/16 bg-white/8 p-5 shadow-glow backdrop-blur sm:p-6">
              <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-cyan/10 blur-3xl" />
              <div className="relative flex items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <Image src="/sygnet-white.png" alt="" width={72} height={72} className="h-14 w-14 opacity-88 sm:h-16 sm:w-16" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan">Najnowsze oferty</p>
                  </div>
                </div>
                <Link href="/oferty" className="arrow-link hidden text-sm font-bold text-cyan transition hover:text-white sm:inline-flex">
                  Sprawdź więcej <span aria-hidden="true" className="arrow-mark ml-1">&rarr;</span>
                </Link>
              </div>
              <HeroOfferTicker offers={heroOffers} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={benefit} className="card-glass soft-lift rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-electric/20 hover:shadow-card">
                <p className="text-sm font-black text-teal">0{index + 1}</p>
                <h2 className="mt-4 text-lg font-black tracking-tight text-navy">{benefit}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Krótsza droga do rozmów, które mają jasny kontekst biznesowy i lepsze dopasowanie do potrzeb firmy.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Wybrane oferty" title="Aktualne oferty dla przedsiębiorców" />
            <Link href="/oferty" className="arrow-link text-sm font-bold text-electric transition hover:text-teal">
              Wszystkie oferty <span aria-hidden="true" className="arrow-mark ml-1">&rarr;</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.slice(0, 3).map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection title="Masz ofertę albo szukasz możliwości dla swojej firmy?" buttonLabel="Porozmawiajmy!" buttonHref="/kontakt" />
    </main>
  );
}
