import type { Metadata } from "next";
import { CaseForm } from "@/components/CaseForm";
import { Container } from "@/components/Container";
import { getOfferBySlug } from "@/lib/offers";

export const metadata: Metadata = { title: "Opisz potrzebę firmy", description: "Utwórz sprawę w Dealshare i otrzymaj Case ID." };

export default async function NeedPage({ searchParams }: { searchParams: Promise<{ category?: string; offer?: string }> }) {
  const query = await searchParams;
  const offer = query.offer ? getOfferBySlug(query.offer) : null;
  return <main><section className="bg-navy py-14 text-white"><Container><p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Indywidualny dobór</p><h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-6xl">Opisz potrzebę firmy. My poprowadzimy sprawę dalej.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Nie musisz wiedzieć, którego partnera wybrać. Po wysłaniu briefu utworzymy sprawę, nadamy Case ID i rozpoczniemy analizę.</p></Container></section><section className="bg-white py-14 sm:py-20"><Container className="max-w-4xl"><CaseForm offerSlug={offer?.slug} offerTitle={offer?.title} defaultCategory={query.category ?? offer?.category ?? ""} /></Container></section></main>;
}
