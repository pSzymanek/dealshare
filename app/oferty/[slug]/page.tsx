import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { getOfferBySlug, offers } from "@/lib/offers";

type OfferDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export function generateMetadata({ params }: OfferDetailPageProps): Metadata {
  const offer = getOfferBySlug(params.slug);
  return {
    title: offer?.title ?? "Oferta",
    description: offer?.description ?? "Szczegóły oferty na platformie dealshare."
  };
}

export default function OfferDetailPage({ params }: OfferDetailPageProps) {
  const offer = getOfferBySlug(params.slug);

  if (!offer) {
    notFound();
  }

  return (
    <main>
      <section className="bg-navy-gradient py-20 text-white">
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="teal">{offer.category}</Badge>
              <Badge tone="blue">{offer.status}</Badge>
            </div>
            <h1 className="heading-title-enter mt-6 text-4xl font-black tracking-tight sm:text-6xl">{offer.title}</h1>
            <p className="heading-copy-enter mt-6 max-w-2xl text-lg leading-8 text-white/74">{offer.intro}</p>
            <div className="mt-8">
              <Button href="/kontakt" variant="secondary">
                Zapytaj o ofertę
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoBlock title="Dla kogo?" items={offer.audience} />
            <InfoBlock title="Co obejmuje?" items={offer.scope} />
            <InfoBlock title="Jak wygląda proces?" items={offer.process} />
            <InfoBlock title="Najważniejsze korzyści" items={offer.benefits} />
          </div>
        </Container>
      </section>

      <CTASection
        title="Chcesz sprawdzić, czy ta oferta pasuje do Twojej firmy?"
        description="Napisz kilka zdań o sytuacji firmy. W kolejnym kroku można podpiąć ten formularz do API lub CRM."
        buttonLabel="Przejdź do kontaktu"
        buttonHref="/kontakt"
      />
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card-glass soft-lift rounded-lg border border-slate-200 bg-mist p-7 hover:border-electric/20 hover:shadow-card">
      <h2 className="text-2xl font-black tracking-tight text-navy">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-sm bg-deal-gradient" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
