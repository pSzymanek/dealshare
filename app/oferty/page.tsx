import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeading } from "@/components/SectionHeading";
import { offers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Oferty",
  description: "Aktualne oferty dostępne na platformie dealshare."
};

export default function OffersPage() {
  return (
    <main>
      <section className="bg-navy-gradient py-20 text-white">
        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Oferty</p>
            <h1 className="heading-title-enter mt-4 text-4xl font-black tracking-tight sm:text-6xl">Najlepsze możliwości w uporządkowanej formie.</h1>
            <p className="heading-copy-enter mt-6 max-w-2xl text-lg leading-8 text-white/74">
              Przeglądaj aktualne propozycje, porównuj kontekst i przechodź do szczegółów ofert bez dodatkowych kroków po drodze.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Aktualne oferty"
            title="Dostępne możliwości"
            description="Większość ofert dotyczy firm B2B. Kafelki oznaczone jako Inne/Indywidualne wyróżniają sprawy kierowane także do osób fizycznych."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection title="Chcesz dodać ofertę lub sprawdzić dopasowanie?" buttonLabel="Skontaktuj się" buttonHref="/kontakt" />
    </main>
  );
}
