import { ImageResponse } from "next/og";

// Next.js will use this to auto-generate /icon and /favicon
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#17171a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          color: "#d97757",
          fontSize: 34,
          fontWeight: 600,
          fontFamily: "system-ui",
          letterSpacing: -1,
        }}
      >
        LF
      </div>
    ),
    { ...size }
  );
}
