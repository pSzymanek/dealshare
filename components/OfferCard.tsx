import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Offer } from "@/lib/offers";
import { getOfferVisibility } from "@/lib/offers";

const offerIcons: Record<string, string> = { "farma-pv-bess": "/dealshare_farmy_energii_panel.svg", "infrastruktura-gpu": "/dealshare_infrastruktura_gpu_serwer.svg", "kontrakty-flotowe": "/dealshare_kontrakty_flotowe_fleet.svg", "kredyty-dla-firm": "/dealshare_kredyty_dla_firm_banknot.svg", restrukturyzacje: "/dealshare_restrukturyzacje_naprawa.svg", "optymalizacja-kosztow-energii": "/dealshare_umowy_na_energie_bolt.svg", "sankcja-kredytu-darmowego": "/dealshare_uniewaznienia_kredytow_cancel.svg" };

export function OfferCard({ offer }: { offer: Offer }) {
  const visibility = getOfferVisibility(offer.slug);
  const isPublic = visibility === "public_offer";
  const actionHref = isPublic ? `/oferty/${offer.slug}` : `/potrzeba?category=${encodeURIComponent(offer.category)}&offer=${offer.slug}`;
  return <article className="flex min-h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-electric/30 hover:shadow-card sm:p-6">
    <div className="flex items-start justify-between gap-4">{offerIcons[offer.slug] ? <Image src={offerIcons[offer.slug]} alt="" width={56} height={56} className="h-12 w-12 object-contain" /> : <span /> }<span className={`rounded px-2.5 py-1 text-xs font-black uppercase ${isPublic ? 'bg-electric/10 text-electric' : 'bg-teal/10 text-teal'}`}>{isPublic ? 'Oferta jawna' : 'Dobór przez Dealshare'}</span></div>
    <p className="mt-5 text-xs font-black uppercase text-teal">{offer.category}</p><h3 className="mt-2 text-xl font-black text-navy">{offer.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{offer.description}</p>
    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6"><Link href={actionHref} className="inline-flex items-center gap-2 text-sm font-black text-electric hover:text-navy">{isPublic ? 'Zobacz ofertę' : 'Opisz potrzebę'} <ArrowRight size={16} /></Link>{!isPublic ? <Link href={`/oferty/${offer.slug}`} className="text-sm font-bold text-slate-500 hover:text-navy">Szczegóły obszaru</Link> : null}</div>
  </article>;
}
