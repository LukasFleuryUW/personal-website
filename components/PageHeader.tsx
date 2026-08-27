type Props = {
  eyebrow: string;
  section: string;
  title: string;
  description?: string;
};

export default function PageHeader({ eyebrow, section, title, description }: Props) {
  return (
    <div className="pt-8 md:pt-16">
      <div className="fade-up flex items-baseline gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle">
          {section}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          {eyebrow}
        </span>
      </div>
      <h1 className="title fade-up-1 mt-6 max-w-4xl text-balance text-5xl md:text-7xl">
        {title}
      </h1>
      {description ? (
        <p className="fade-up-2 mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
