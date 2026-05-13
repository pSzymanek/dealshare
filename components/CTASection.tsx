import Image from "next/image";
import { Button } from "./Button";
import { Container } from "./Container";

type CTASectionProps = {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
};

export function CTASection({ title, description, buttonLabel, buttonHref }: CTASectionProps) {
  return (
    <section className="bg-navy-gradient py-20 text-white">
      <Container>
        <div className="card-glass reveal-on-load reveal-delay-1 relative rounded-lg border border-white/12 px-6 py-12 shadow-glow sm:px-10 lg:px-14">
          <Image src="/sygnet.svg" alt="" width={220} height={220} className="absolute -right-12 -top-12 opacity-10" />
          <div className="relative max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
            {description ? <p className="mt-4 text-base leading-8 text-white/72">{description}</p> : null}
            <div className="mt-8">
              <Button href={buttonHref} variant="secondary">
                {buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
