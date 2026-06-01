import Image from "next/image";
import Link from "next/link";
import { Offer } from "@/lib/offers";
import { Badge } from "./Badge";

type OfferCardProps = {
  offer: Offer;
};

const offerIcons: Record<string, string> = {
  "farma-pv-bess": "/dealshare_farmy_energii_panel.svg",
  "infrastruktura-gpu": "/dealshare_infrastruktura_gpu_serwer.svg",
  "kontrakty-flotowe": "/dealshare_kontrakty_flotowe_fleet.svg",
  "kredyty-dla-firm": "/dealshare_kredyty_dla_firm_banknot.svg",
  restrukturyzacje: "/dealshare_restrukturyzacje_naprawa.svg",
  "optymalizacja-kosztow-energii": "/dealshare_umowy_na_energie_bolt.svg",
  "sankcja-kredytu-darmowego": "/dealshare_uniewaznienia_kredytow_cancel.svg"
};

export function OfferCard({ offer }: OfferCardProps) {
  const icon = offerIcons[offer.slug];

  return (
    <article className="card-glass offer-card soft-lift group flex min-h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-electric/30 hover:shadow-card">
      <div className="pointer-events-none !absolute bottom-4 right-4 !z-0 h-20 w-20 bg-[url('/sygnet.png')] bg-contain bg-center bg-no-repeat opacity-[0.035] transition group-hover:opacity-[0.08]" />
      {icon ? <Image src={icon} alt="" width={72} height={72} className="offer-card-icon relative h-16 w-16 object-contain" /> : null}

      <div className="relative mt-4 flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {offer.categories.map((category) => (
            <span
              key={category.slug}
              className={`inline-flex rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                category.slug === "inne-indywidualne" ? "border border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-700" : "text-teal"
              }`}
            >
              {category.name}
            </span>
          ))}
        </div>
        <Badge tone={offer.status === "Premium" || offer.status === "Nowe" ? "blue" : "dark"}>{offer.status}</Badge>
      </div>

      <h3 className="relative mt-5 text-xl font-black tracking-tight text-navy">{offer.title}</h3>
      <p className="relative mt-2 text-base font-black leading-7 text-ink">{offer.headline}</p>
      <p className="relative mt-3 text-sm leading-7 text-slate-600">{offer.description}</p>

      <ul className="relative mt-5 grid gap-2 text-sm font-semibold text-slate-700">
        {offer.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <Link href={`/oferty/${offer.slug}`} className="arrow-link relative mt-auto inline-flex pt-6 text-sm font-bold text-electric transition hover:text-teal">
        Sprawdź szczegóły
        <span aria-hidden="true" className="arrow-mark ml-2">
          →
        </span>
      </Link>
    </article>
  );
}
