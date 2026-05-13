import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CategoryCard } from "@/components/CategoryCard";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HeroRotatingWord } from "@/components/HeroRotatingWord";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeading } from "@/components/SectionHeading";
import { WordPressPostGrid } from "@/components/WordPressPostGrid";
import { offerCategories } from "@/lib/categories";
import { offers } from "@/lib/offers";
import { getLatestPosts } from "@/lib/wordpress";

const benefits = [
  "Wyselekcjonowane oferty",
  "Mniej chaosu, więcej konkretów",
  "Partnerzy B2B",
  "Rozwiązania dopasowane do firmy"
];

export default async function HomePage() {
  const posts = await getLatestPosts(3);

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
            <div className="hero-panel relative rounded-lg border border-white/12 bg-white/8 p-6 shadow-glow backdrop-blur">
              <Image src="/sygnet-white.png" alt="" width={120} height={120} className="mb-8 opacity-90" />
              <div className="grid gap-4">
                {["Finansowanie", "Kontrakty", "Technologia", "Partnerzy"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-md border border-white/12 bg-white/8 p-4">
                    <span className="font-bold">{item}</span>
                    <span className="text-sm text-cyan">0{index + 1}</span>
                  </div>
                ))}
              </div>
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

      <section className="bg-white py-20">
        <Container>
          <SectionHeading
            eyebrow="Kategorie"
            title="Obszary, w których firmy najczęściej szukają konkretnych możliwości"
            description="Od finansowania i kontraktów po technologie, koszty i doradztwo. Wybierz obszar, który najlepiej pasuje do aktualnych potrzeb firmy."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Wybrane oferty" title="Aktualne możliwości dla przedsiębiorców" />
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

      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Blog" title="Najnowsze wpisy" description="Praktyczne materiały, inspiracje i kontekst dla firm. Kolejne publikacje już wkrótce." />
            <Link href="/blog" className="arrow-link text-sm font-bold text-electric transition hover:text-teal">
              Przejdź do bloga <span aria-hidden="true" className="arrow-mark ml-1">&rarr;</span>
            </Link>
          </div>
          <div className="mt-10">
            <WordPressPostGrid posts={posts} />
          </div>
        </Container>
      </section>

      <CTASection title="Masz ofertę albo szukasz możliwości dla swojej firmy?" buttonLabel="Porozmawiajmy" buttonHref="/kontakt" />
    </main>
  );
}
