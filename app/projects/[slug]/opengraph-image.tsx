import { ImageResponse } from "next/og";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? "Projet";
  const accent = project?.accent ?? "#c9994f";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#080c14", color: "#ebe7df", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#aab0bb" }}>
          <div style={{ width: 16, height: 16, background: accent }} />
          {project?.category ?? "Projet"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{name}</div>
          {project?.tagline && <div style={{ marginTop: 24, fontSize: 38, color: "#aab0bb", maxWidth: 900 }}>{project.tagline}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#7f8795" }}>
          <span>{profile.name}</span>
          <span style={{ color: "#c9994f" }}>Harmony Solutions</span>
        </div>
      </div>
    ),
    size
  );
}
