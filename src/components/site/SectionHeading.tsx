interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeading = ({ eyebrow, title, subtitle, align = "center" }: Props) => (
  <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
    {eyebrow && (
      <p className="uppercase tracking-[0.35em] text-xs text-primary mb-4">{eyebrow}</p>
    )}
    <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-muted-foreground leading-relaxed">{subtitle}</p>
    )}
  </div>
);
