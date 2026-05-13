import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z dealshare w sprawie ofert, partnerstw i współpracy B2B."
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-navy-gradient py-20 text-white">
        <Container>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Kontakt</p>
          <h1 className="heading-title-enter mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Porozmawiajmy o możliwościach dla Twojej firmy.</h1>
          <p className="heading-copy-enter mt-6 max-w-2xl text-lg leading-8 text-white/74">
            Napisz, czy szukasz ofert, chcesz dodać rozwiązanie dla firm, czy interesuje Cię współpraca partnerska.
          </p>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading title="Dane kontaktowe" description="Napisz do nas przez formularz lub skorzystaj z poniższych kanałów kontaktu." />
              <div className="mt-8 grid gap-4 text-sm leading-7 text-slate-700">
                <p>
                  <strong className="text-navy">E-mail:</strong> biuro@dealshare.pl
                </p>
                <p>
                  <strong className="text-navy">Telefon:</strong> Już wkrótce
                </p>
                <p>
                  <strong className="text-navy">Współpraca:</strong> partnerzy@dealshare.pl
                </p>
              </div>
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Social media</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {siteConfig.socials.map((item) => (
                    <Link key={item.label} href={item.href} className="soft-lift rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-navy transition hover:border-electric hover:bg-electric/5 hover:text-electric">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="card-glass soft-lift mt-8 rounded-lg border border-electric/20 bg-electric/5 p-5 hover:border-electric/30 hover:shadow-card">
                <Image src="/sygnet.png" alt="" width={42} height={42} className="mb-4" />
                <h2 className="text-lg font-black text-navy">Dla firm z ofertą B2B</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Jeśli chcesz zaprezentować swoją ofertę przedsiębiorcom, opisz krótko kategorię, profil klienta i model współpracy.
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
