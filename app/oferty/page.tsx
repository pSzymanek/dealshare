import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeading } from "@/components/SectionHeading";
import { offerCategories } from "@/lib/categories";
import { offers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Oferty",
  description: "Kategorie i wybrane oferty B2B dostępne na platformie dealshare."
};

type OffersPageProps = {
  searchParams?: {
    category?: string;
  };
};

export default function OffersPage({ searchParams }: OffersPageProps) {
  const selectedCategory = searchParams?.category;
  const filteredOffers = selectedCategory ? offers.filter((offer) => offer.categorySlug === selectedCategory) : offers;

  return (
    <main>
      <section className="bg-navy-gradient py-20 text-white">
        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Oferty i kategorie</p>
            <h1 className="heading-title-enter mt-4 text-4xl font-black tracking-tight sm:text-6xl">Najlepsze możliwości biznesowe w uporządkowanej formie.</h1>
            <p className="heading-copy-enter mt-6 max-w-2xl text-lg leading-8 text-white/74">
              Przeglądaj kategorie, porównuj kontekst i przechodź do szczegółów ofert przygotowanych z myślą o firmach B2B.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading title="Kategorie" description="Wybierz obszar, który najlepiej odpowiada temu, czego aktualnie szukasz dla swojej firmy." />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {offerCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow={selectedCategory ? "Przefiltrowane" : "Wszystkie"}
            title={selectedCategory ? "Oferty w wybranej kategorii" : "Aktualne oferty"}
            description="Sprawdź dostępne możliwości lub wróć wkrótce po kolejne propozycje."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOffers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection title="Chcesz dodać ofertę lub sprawdzić dopasowanie?" buttonLabel="Skontaktuj się" buttonHref="/kontakt" />
    </main>
  );
}
