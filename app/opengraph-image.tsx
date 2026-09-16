import { ImageResponse } from "next/og";
import { profile, company } from "@/data/profile";

export const alt = `${profile.name}, ${company.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f7f4",
          color: "#111318",
          padding: 76,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#555a64" }}>
          <div style={{ width: 26, height: 26, border: "4px solid #1b3f8b" }} />
          {profile.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.headline}</div>
          <div style={{ marginTop: 22, fontSize: 40, color: "#555a64" }}>{profile.subheadline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#7c828d" }}>
          <span>Systèmes · Réseaux · Produits numériques</span>
          <span style={{ color: "#1b3f8b" }}>{company.name}</span>
        </div>
      </div>
    ),
    size
  );
}
