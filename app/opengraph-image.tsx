import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, Harmony Solutions`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#080c14", color: "#ebe7df", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#aab0bb" }}>
          <div style={{ width: 28, height: 28, border: "4px solid #c9994f" }} />
          {profile.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.headline}</div>
          <div style={{ marginTop: 24, fontSize: 36, color: "#aab0bb" }}>{profile.subheadline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#7f8795" }}>
          <span>Systems / Networks / Digital products</span>
          <span style={{ color: "#c9994f" }}>Harmony Solutions</span>
        </div>
      </div>
    ),
    size
  );
}
