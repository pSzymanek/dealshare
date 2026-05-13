import Link from "next/link";
import { Offer } from "@/lib/offers";
import { Badge } from "./Badge";

type OfferCardProps = {
  offer: Offer;
};

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <article className="card-glass soft-lift group rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-electric/30 hover:shadow-card">
      <div className="absolute right-5 top-5 h-20 w-20 bg-[url('/sygnet.png')] bg-contain bg-center bg-no-repeat opacity-[0.035] transition group-hover:opacity-[0.08]" />
      <div className="relative flex items-start justify-between gap-4">
        <p className="text-sm font-bold text-teal">{offer.category}</p>
        <Badge tone={offer.status === "Premium" ? "blue" : offer.status === "Nowe" ? "teal" : "dark"}>{offer.status}</Badge>
      </div>
      <h3 className="relative mt-5 text-xl font-black tracking-tight text-navy">{offer.title}</h3>
      <p className="relative mt-3 min-h-20 text-sm leading-7 text-slate-600">{offer.description}</p>
      <Link href={`/oferty/${offer.slug}`} className="arrow-link relative mt-6 inline-flex text-sm font-bold text-electric transition hover:text-teal">
        Sprawdź szczegóły
        <span aria-hidden="true" className="arrow-mark ml-2">
          →
        </span>
      </Link>
    </article>
  );
}
