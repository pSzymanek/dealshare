type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal">{eyebrow}</p> : null}
      <h2 className="heading-title-enter text-3xl font-black tracking-tight text-navy sm:text-4xl">{title}</h2>
      {description ? <p className="heading-copy-enter mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}
