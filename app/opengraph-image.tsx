import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — deux pratiques, une même signature`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage : la composition en deux panneaux, réduite à l'essentiel. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#f5f2ea",
            color: "#17140f",
            padding: "56px 72px",
            flex: 1,
          }}
        >
          <div style={{ fontSize: 26, color: "#736c60", letterSpacing: 2 }}>{profile.name.toUpperCase()}</div>
          <div style={{ marginTop: 16, fontSize: 82, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1 }}>
            Deux pratiques,
          </div>
          <div style={{ fontSize: 82, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1, color: "#a52d10" }}>
            une même signature.
          </div>
        </div>

        <div style={{ display: "flex", height: 232 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: "#ece7db",
              color: "#17140f",
              padding: "0 72px 44px",
              borderTop: "1px solid #ded6c6",
            }}
          >
            <div style={{ fontSize: 22, color: "#a52d10", letterSpacing: 2 }}>01</div>
            <div style={{ marginTop: 10, fontSize: 40, fontWeight: 600, letterSpacing: -1.4 }}>Web & applications</div>
            <div style={{ marginTop: 8, fontSize: 24, color: "#4f4a42" }}>Sites, logiciels et produits numériques</div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: "#121419",
              color: "#edf0f5",
              padding: "0 72px 44px",
            }}
          >
            <div style={{ fontSize: 22, color: "#78a8ff", letterSpacing: 2 }}>02</div>
            <div style={{ marginTop: 10, fontSize: 40, fontWeight: 600, letterSpacing: -1.4 }}>Systèmes & réseaux</div>
            <div style={{ marginTop: 8, fontSize: 24, color: "#a9b2c0" }}>Infrastructure, sécurité et support</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
