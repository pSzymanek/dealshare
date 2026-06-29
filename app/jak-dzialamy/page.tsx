import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Jak działamy",
  description: "Od pierwszego pytania do właściwej rozmowy i konkretnego następnego kroku.",
  alternates: { canonical: "/jak-dzialamy" }
};

const sections = [
  ["Sprawdzasz konkretną propozycję", "Poznajesz projekt, usługę lub możliwość współpracy. Jeśli oferta Cię interesuje, przekazujesz nam najważniejsze informacje i zaczynamy rozmowę."],
  ["Opisujesz wyzwanie", "Nie musisz wskazywać firmy ani gotowego rozwiązania. Najpierw poznajemy Twoją sytuację i ustalamy, czego naprawdę potrzebujesz."],
  ["Otrzymujesz potwierdzenie", "Po wysłaniu formularza otrzymujesz numer zgłoszenia i dostęp do wszystkich informacji w swoim koncie."],
  ["Wiesz, co dzieje się dalej", "W jednym miejscu sprawdzasz postęp, wiadomości, dokumenty i informacje o kolejnym kroku."],
  ["Rozmawiasz z właściwymi osobami", "Bierzemy pod uwagę sytuację firmy, zakres wsparcia i gotowość obu stron. Łączymy tylko tam, gdzie widzimy realny sens rozmowy."]
];

export default function HowWeWorkPage() {
  return <main><section className="bg-navy py-16 text-white"><Container><p className="text-sm font-black uppercase tracking-[0.18em] text-cyan">Jak działamy</p><h1 className="mt-4 max-w-5xl text-4xl font-black sm:text-6xl">Od pierwszego pytania do właściwej rozmowy.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">Możesz zacząć od konkretnej propozycji lub od sytuacji swojej firmy. W obu przypadkach pomagamy przejść od zainteresowania do rozsądnej decyzji.</p></Container></section><section className="bg-white py-14 sm:py-20"><Container><div className="divide-y divide-slate-200 border-y border-slate-200">{sections.map(([title, text], index) => <article key={title} className="grid gap-3 py-7 md:grid-cols-[80px_260px_1fr]"><span className="font-mono font-black text-electric">0{index + 1}</span><h2 className="text-xl font-black text-navy">{title}</h2><p className="max-w-2xl text-sm leading-7 text-slate-600">{text}</p></article>)}</div></Container></section></main>;
}
