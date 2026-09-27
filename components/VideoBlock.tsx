"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";

type Props = {
  src: string;
  poster?: string;
  alt: string;
  hasSound?: boolean;
  fit?: "cover" | "contain";
};

/**
 * A <video> with a live "sound on/off" badge that tracks the element's
 * muted state. Uses the native `volumechange` event so any interaction with
 * the built-in controls updates the label immediately.
 */
export default function VideoBlock({
  src,
  poster,
  alt,
  hasSound,
  fit = "cover",
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    setMuted(v.muted);
    const onVolume = () => setMuted(v.muted);
    v.addEventListener("volumechange", onVolume);
    return () => v.removeEventListener("volumechange", onVolume);
  }, []);

  return (
    <>
      <video
        ref={ref}
        className={clsx(
          "h-full w-full",
          fit === "contain" ? "object-contain" : "object-cover"
        )}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        aria-label={alt}
      />
      {hasSound ? (
        <span
          className={clsx(
            "pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur-sm transition-colors",
            muted
              ? "border-white/15 text-ink-muted"
              : "border-accent/40 text-accent"
          )}
        >
          {muted ? (
            <VolumeX className="h-3 w-3" />
          ) : (
            <Volume2 className="h-3 w-3" />
          )}
          sound {muted ? "off" : "on"}
        </span>
      ) : null}
    </>
  );
}
