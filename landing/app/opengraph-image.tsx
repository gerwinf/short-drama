import { ImageResponse } from "next/og";

export const alt = "Kilig — Ikaw ang bida sa sariling teleserye";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded 1200x630 share card (Open Graph). Uses only flexbox + colors +
// gradients so it renders reliably with the bundled default font.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          backgroundColor: "#1E0E24",
          backgroundImage:
            "radial-gradient(900px 520px at 12% -12%, rgba(255,61,104,0.38), transparent), radial-gradient(760px 520px at 108% 118%, rgba(255,182,39,0.20), transparent)",
          color: "#FFF6F2",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
              fontStyle: "italic",
              color: "#FF3D68",
            }}
          >
            kilig
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 22,
              fontSize: 26,
              color: "#FFB627",
              border: "2px solid rgba(255,182,39,0.55)",
              borderRadius: 999,
              padding: "7px 20px",
            }}
          >
            Para sa Pinoy
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 86,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -2,
          }}
        >
          <span>Ikaw ang</span>
          <span style={{ color: "#FFB627", marginLeft: 22 }}>bida</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -2,
          }}
        >
          sa sariling teleserye.
        </div>

        <div style={{ display: "flex", marginTop: 30, fontSize: 33, color: "#C9B8CF" }}>
          Interactive Filipino short dramas — teleserye × telenovela × K-drama.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            height: 12,
            width: 280,
            borderRadius: 999,
            backgroundImage: "linear-gradient(90deg,#FF3D68,#FF7A59,#FFB627)",
          }}
        />
        <div style={{ display: "flex", marginTop: 22, fontSize: 26, color: "#8A7790" }}>
          kilig.nueve.club · Get early access
        </div>
      </div>
    ),
    { ...size },
  );
}
