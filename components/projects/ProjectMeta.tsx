import Link from "next/link";
import type { Project } from "@/data/projects";
import { StatusTag } from "@/components/ui/StatusTag";
import { cn } from "@/lib/utils";

export function ProjectMeta({ project, size = "lg", className, headingLevel = "h3" }: { project: Project; size?: "lg" | "md"; className?: string; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {project.category && <span className="text-label text-fg-3">{project.category}</span>}
        <StatusTag status={project.status} />
      </div>
      <H className={cn("mt-3 text-fg", size === "lg" ? "text-h1" : "text-h2")}>{project.name}</H>
      {project.tagline && <p className={cn("mt-3 text-fg-2", size === "lg" ? "max-w-[30ch] text-h3 font-normal" : "max-w-[34ch] text-body-lg")}>{project.tagline}</p>}
      {project.description && <p className="mt-5 max-w-[52ch] text-body text-fg-2">{project.description}</p>}
      {project.stack.length > 0 && (
        <div className="mt-6">
          {project.stackNote && <p className="mb-2 text-label text-fg-3">{project.stackNote}</p>}
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-tech text-fg-2">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
      <Link href={`/projects/${project.slug}`} className="link-underline mt-7 inline-block pb-0.5 text-label text-brass">
        View project<span className="sr-only"> {project.name}</span>
      </Link>
    </div>
  );
}
