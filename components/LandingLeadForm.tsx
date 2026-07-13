import { CaseForm } from "@/components/CaseForm";

type LandingLeadFormProps = {
  offerSlug: string;
  offerTitle: string;
  defaultCategory: string;
  title: string;
  text: string;
};

export function LandingLeadForm({ offerSlug, offerTitle, defaultCategory, title, text }: LandingLeadFormProps) {
  return (
    <section id="formularz" className="scroll-mt-28 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="reveal-on-scroll rounded-lg border border-electric/15 bg-mist p-6 shadow-sm lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan">Kontakt</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-navy sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{text}</p>
            <div className="mt-6 rounded-lg border border-white bg-white/70 p-4 text-sm font-semibold leading-7 text-slate-700">
              Wypełnienie formularza nie zobowiązuje do dalszych działań. Najpierw sprawdzamy sytuację i wracamy z konkretnym kierunkiem.
            </div>
          </div>

          <div className="reveal-on-scroll">
            <CaseForm pathType="public_offer" offerSlug={offerSlug} offerTitle={offerTitle} defaultCategory={defaultCategory} />
          </div>
        </div>
      </div>
    </section>
  );
}
