import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon (home-screen / bookmark): Kilig Glow square with a "k".
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg,#FF3D68,#FF7A59,#FFB627)",
          color: "#FFF6F2",
          fontSize: 120,
          fontWeight: 800,
        }}
      >
        k
      </div>
    ),
    { ...size },
  );
}
