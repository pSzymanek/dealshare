import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { OfferCard } from "@/components/OfferCard";
import { PartnerOfferCard } from "@/components/PartnerOfferCard";
import { SectionHeading } from "@/components/SectionHeading";
import { offers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Oferty biznesowe",
  description: "Oferty biznesowe Dealshare: finansowanie, inwestycje, energia, restrukturyzacja, kontrakty i sprawy kredytowe.",
  alternates: {
    canonical: "/oferty"
  }
};

export default function OffersPage() {
  return (
    <main>
      <section className="bg-white py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Oferty</p>
              <h1 className="heading-title-enter mt-4 text-4xl font-black tracking-tight text-navy sm:text-6xl">Oferty biznesowe w uporządkowanej formie</h1>
              <p className="heading-copy-enter mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Wybierz obszar, który pasuje do Twojej sytuacji: finansowanie, inwestycje, energia, restrukturyzacja, kontrakty B2B albo sprawy kredytowe.
                Dealshare pomaga szybko sprawdzić, czy dana możliwość ma sens i jaki powinien być kolejny krok.
              </p>
            </div>
            <div className="rounded-lg border border-electric/15 bg-electric/5 p-6">
              <h2 className="text-xl font-black text-navy">Nie wiesz, od której oferty zacząć?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Opisz krótko sytuację. Wskażemy, który kierunek warto sprawdzić w pierwszej kolejności.</p>
              <div className="mt-5">
                <Button href="/kontakt" variant="ghost">
                  Opisz swoją sytuację
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16">
        <Container>
          <SectionHeading
            eyebrow="Aktualne oferty"
            title="Wybierz konkretny obszar"
            description="Każda oferta prowadzi do uporządkowanej podstrony: problem, zakres, proces, dokumenty, punkty kontrolne i kolejny krok."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
            <PartnerOfferCard />
          </div>
        </Container>
      </section>
    </main>
  );
}
