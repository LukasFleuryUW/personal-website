import Image from "next/image";

export type Experience = {
  role: string;
  org: string;
  place: string;
  period: string;
  bullets: string[];
  tags?: string[];
  image?: { src: string; alt: string };
  imageLayout?: "side" | "wide";
};

export default function ExperienceCard({
  index,
  data,
}: {
  index: number;
  data: Experience;
}) {
  const layout = data.imageLayout ?? "side";

  return (
    <article className="grid gap-6 border-t border-white/5 py-10 md:grid-cols-[140px_1fr] md:gap-12">
      <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle md:flex-col md:items-start md:gap-2">
        <span>{String(index).padStart(2, "0")}</span>
        <span className="text-ink-muted">{data.period}</span>
      </div>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="title text-2xl text-ink md:text-3xl">
            {data.role}
          </h3>
          <span className="text-ink-subtle">·</span>
          <span className="text-lg text-ink-muted">{data.org}</span>
        </div>

        {layout === "side" ? (
          <div className="mt-6 grid gap-6 md:grid-cols-[280px_1fr] md:gap-8">
            {data.image ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] md:aspect-[3/4] md:max-w-[280px]">
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  fill
                  sizes="(min-width: 768px) 280px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            <ul className="space-y-2 text-ink-muted">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-white/20" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <ul className="mt-6 space-y-2 text-ink-muted">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-white/20" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {data.image ? (
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/8 bg-white/[0.02]">
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  fill
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-contain"
                />
              </div>
            ) : null}
          </>
        )}

        {data.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {data.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
