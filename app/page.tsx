import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HeroBlogSlideshow } from "@/components/HeroBlogSlideshow";
import { HeroRotatingWord } from "@/components/HeroRotatingWord";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getStaticBlogPosts, type BlogPostSummary } from "@/lib/blog";
import { offers } from "@/lib/offers";

const benefits = [
  {
    title: "Wyselekcjonowane oferty",
    icon: "/dealshare_icon_wyselekcjonowane_oferty.svg",
    description: "Wybrane propozycje biznesowe w jednym miejscu, bez przypadkowego przeglądania niepasujących rozwiązań."
  },
  {
    title: "Mniej chaosu, więcej konkretów",
    icon: "/dealshare_icon_mniej_chaosu_wiecej_konkretow.svg",
    description: "Krótsza droga do rozmów, które mają jasny kontekst biznesowy i lepsze dopasowanie do potrzeb firmy."
  },
  {
    title: "Partnerzy B2B",
    icon: "/dealshare_icon_partnerzy_b2b.svg",
    description: "Dostęp do partnerów, usługodawców i projektów, które mogą realnie wspierać rozwój przedsiębiorstwa."
  },
  {
    title: "Rozwiązania dopasowane do firmy",
    icon: "/dealshare_ikona_suwaki.svg",
    description: "Oferty porządkowane według kategorii, profilu współpracy i sytuacji, w której znajduje się firma."
  }
];

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

function hashSlug(value: string) {
  let hash = 2166136261;

  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function getHeroBlogPosts(): BlogPostSummary[] {
  return getStaticBlogPosts()
    .map(({ id, slug, title, excerpt, category, tags, publishedAt, updatedAt, readingTime, heroImage, imageAlt }) => ({
      id,
      slug,
      title,
      excerpt,
      category,
      tags,
      publishedAt,
      updatedAt,
      readingTime,
      heroImage,
      imageAlt
    }))
    .sort((a, b) => hashSlug(`home-hero-blog:${a.slug}`) - hashSlug(`home-hero-blog:${b.slug}`))
    .slice(0, 7);
}

export default function HomePage() {
  const heroBlogPosts = getHeroBlogPosts();

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
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-cyan/10 blur-3xl" />
            <HeroBlogSlideshow posts={heroBlogPosts} />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card-glass soft-lift rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-electric/20 hover:shadow-card">
                <Image src={benefit.icon} alt="" width={52} height={52} className="h-12 w-12 object-contain" />
                <h2 className="mt-5 flex min-h-[3.5rem] items-start text-lg font-black tracking-tight text-navy">{benefit.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {benefit.description}
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
