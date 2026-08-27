import { Mail, Phone, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

const items = [
  {
    label: "Email",
    value: "lfleury@uwaterloo.ca",
    href: "mailto:lfleury@uwaterloo.ca",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "(647) 923-5077",
    href: "tel:+16479235077",
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "in/lukas-fleury",
    href: "https://www.linkedin.com/in/lukas-fleury-269b77350/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    value: "@lukas_fleury_",
    href: "https://www.instagram.com/lukas_fleury_/",
    icon: Instagram,
  },
];

export default function Footer() {
  return (
    <footer id="connect" className="relative border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle">
            §05
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            let&apos;s connect
          </span>
        </div>
        <h2 className="title mt-4 max-w-3xl text-balance text-3xl md:text-5xl">
          Let&apos;s build something.
        </h2>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-ink-muted transition group-hover:text-accent" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                    {label}
                  </div>
                  <div className="text-sm text-ink">{value}</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/5 pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Lukas Fleury · Cambridge, ON</span>
          <span className="font-mono">designed &amp; built by me</span>
        </div>
      </div>
    </footer>
  );
}
