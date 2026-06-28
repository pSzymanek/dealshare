import type { Metadata } from "next";
import { CaseForm } from "@/components/CaseForm";
import { Container } from "@/components/Container";
import { getOfferBySlug } from "@/lib/offers";

export const metadata: Metadata = { title: "Porozmawiajmy o Twojej firmie", description: "Opisz sytuację firmy i otrzymaj konkretny następny krok." };

export default async function NeedPage({ searchParams }: { searchParams: Promise<{ category?: string; offer?: string }> }) {
  const query = await searchParams;
  const offer = query.offer ? getOfferBySlug(query.offer) : null;
  return <main><section className="bg-navy py-14 text-white"><Container><p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Zacznijmy od rozmowy</p><h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-6xl">Opowiedz nam o sytuacji swojej firmy.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Nie musisz znać gotowego rozwiązania ani wybierać partnera. Przekaż nam najważniejsze informacje, a wrócimy z konkretnym następnym krokiem.</p></Container></section><section className="bg-white py-14 sm:py-20"><Container className="max-w-4xl"><CaseForm offerSlug={offer?.slug} offerTitle={offer?.title} defaultCategory={query.category ?? offer?.category ?? ""} /></Container></section></main>;
}
