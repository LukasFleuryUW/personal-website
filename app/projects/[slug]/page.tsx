import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExperienceCard from "@/components/ExperienceCard";
import DroneAssembly from "@/components/DroneAssembly";
import { projects, slug, getProject } from "@/lib/projects";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: slug(p.role) }));
}

export function generateMetadata({ params }: Params): Metadata {
  const found = getProject(params.slug);
  if (!found) return { title: "Project | Lukas Fleury" };
  const { project } = found;
  return {
    title: `${project.role} | Lukas Fleury`,
    description: project.bullets[0],
  };
}

export default function ProjectDetailPage({ params }: Params) {
  const found = getProject(params.slug);
  if (!found) notFound();
  const { project, index } = found;

  return (
    <div className="pt-8 md:pt-16">
      <Link
        href="/projects"
        className="fade-up group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-accent transition hover:border-accent hover:bg-accent/20"
      >
        <span
          aria-hidden
          className="transition group-hover:-translate-x-0.5"
        >
          &larr;
        </span>
        All projects
      </Link>

      <div className="fade-up-1 mt-6 flex items-baseline gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle">
          §03
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          {project.place}
        </span>
      </div>

      <div className="fade-up-2 mt-6">
        <ExperienceCard index={index + 1} data={project} />
        {index === 0 ? <DroneAssembly /> : null}
      </div>
    </div>
  );
}
