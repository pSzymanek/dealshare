import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleHelp, Handshake, Search, Target } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Kontakt", description: "Powiedz nam, w czym możemy pomóc Twojej firmie.", alternates: { canonical: "/kontakt" } };

const paths = [
  { title: "Szukam rozwiązania dla firmy", text: "Opisz sytuację, a pomożemy ustalić właściwy następny krok.", href: "/potrzeba", icon: Target },
  { title: "Chcę zapytać o konkretną ofertę", text: "Wybierz jawną ofertę i przejdź do szczegółów.", href: "/oferty#jawne-oferty", icon: Search },
  { title: "Chcę przedstawić swoją ofertę", text: "Pokaż nam, jak pomagasz firmom i rozpocznij rozmowę o współpracy.", href: "/dla-partnerow#zglos-oferte", icon: Handshake }
];

export default function ContactPage() {
  return <main><section className="bg-navy py-16 text-white"><Container><p className="text-sm font-black uppercase tracking-[0.18em] text-cyan">Kontakt</p><h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-6xl">Powiedz nam, w czym możemy pomóc.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Wybierz temat, który najlepiej opisuje Twoją sytuację. Dzięki temu od razu trafisz we właściwe miejsce.</p></Container></section><section className="bg-white py-14 sm:py-20"><Container><div className="grid gap-5 md:grid-cols-3">{paths.map(({title,text,href,icon:Icon})=><Link key={title} href={href} className="group border-t-4 border-electric py-6"><Icon size={25} className="text-electric"/><h2 className="mt-5 text-xl font-black text-navy">{title}</h2><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-electric">Wybieram ten temat <ArrowRight size={16}/></span></Link>)}</div></Container></section><section className="bg-mist py-14 sm:py-20"><Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><CircleHelp size={28} className="text-teal"/><p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-teal">Inny temat</p><h2 className="mt-3 text-3xl font-black text-navy">Napisz do nas</h2><p className="mt-4 text-sm leading-7 text-slate-600">Masz pytanie, którego nie obejmują powyższe opcje? Wyślij wiadomość, a skierujemy ją do właściwej osoby.</p></div><ContactForm/></Container></section></main>;
}
