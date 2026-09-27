import Image from "next/image";
import VideoBlock from "./VideoBlock";

export type MediaImage = { type?: "image"; src: string; alt: string };
export type MediaVideo = {
  type: "video";
  src: string;
  poster?: string;
  alt: string;
  hasSound?: boolean;
};
export type Media = MediaImage | MediaVideo;

export type Experience = {
  role: string;
  org: string;
  place: string;
  period: string;
  bullets: string[];
  tags?: string[];
  image?: { src: string; alt: string };
  video?: {
    src: string;
    poster?: string;
    alt: string;
    hasSound?: boolean;
  };
  imageLayout?: "side" | "wide";
  mediaAspect?: string; // Tailwind aspect class for the side-by-side media strip
};

function MediaTile({
  media,
  aspect,
  sizes,
  className,
}: {
  media: Media;
  aspect: string;
  sizes: string;
  className?: string;
}) {
  const cls = `relative w-full overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] ${aspect} ${className ?? ""}`;
  if (media.type === "video") {
    return (
      <div className={cls}>
        <VideoBlock
          src={media.src}
          poster={media.poster}
          alt={media.alt}
          hasSound={media.hasSound}
          fit="cover"
        />
      </div>
    );
  }
  return (
    <div className={cls}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

export default function ExperienceCard({
  index,
  data,
}: {
  index: number;
  data: Experience;
}) {
  const layout = data.imageLayout ?? "side";

  const hasImage = !!data.image;
  const hasVideo = !!data.video;
  const hasBoth = hasImage && hasVideo;

  const imageMedia: Media | null = data.image
    ? { type: "image", src: data.image.src, alt: data.image.alt }
    : null;
  const videoMedia: Media | null = data.video
    ? {
        type: "video",
        src: data.video.src,
        poster: data.video.poster,
        alt: data.video.alt,
        hasSound: data.video.hasSound,
      }
    : null;

  const stripAspect = data.mediaAspect ?? "aspect-[4/5]";

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

        {hasBoth ? (
          /* Bullets on top, then a 2-column media strip (photo + video) below */
          <>
            <ul className="mt-6 space-y-2 text-ink-muted">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-white/20" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:max-w-[85%]">
              {imageMedia ? (
                <MediaTile
                  media={imageMedia}
                  aspect={stripAspect}
                  sizes="(min-width: 768px) 340px, 100vw"
                />
              ) : null}
              {videoMedia ? (
                <MediaTile
                  media={videoMedia}
                  aspect={stripAspect}
                  sizes="(min-width: 768px) 340px, 100vw"
                />
              ) : null}
            </div>
          </>
        ) : layout === "side" ? (
          <div className="mt-6 grid gap-6 md:grid-cols-[280px_1fr] md:gap-8">
            {(imageMedia || videoMedia) ? (
              <MediaTile
                media={(videoMedia ?? imageMedia)!}
                aspect="aspect-[4/3] md:aspect-[3/4] md:max-w-[280px]"
                sizes="(min-width: 768px) 280px, 100vw"
              />
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
            {(imageMedia || videoMedia) ? (
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/8 bg-white/[0.02]">
                {(videoMedia ?? imageMedia)!.type === "video" ? (
                  <VideoBlock
                    src={videoMedia!.src}
                    poster={videoMedia!.poster}
                    alt={videoMedia!.alt}
                    hasSound={videoMedia!.hasSound}
                    fit="contain"
                  />
                ) : (
                  <Image
                    src={imageMedia!.src}
                    alt={imageMedia!.alt}
                    fill
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="object-contain"
                  />
                )}
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
