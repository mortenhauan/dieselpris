import { ImageResponse } from "next/og";

export const alt = "Dieselpris.no – veiledende dieselpriser i Norge";
export const contentType = "image/png";
export const size = { height: 630, width: 1200 };

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-start",
        background:
          "linear-gradient(145deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        padding: 72,
        width: "100%",
      }}
    >
      <div
        style={{
          background: "linear-gradient(90deg, #22c55e, #16a34a)",
          borderRadius: 6,
          height: 8,
          marginBottom: 36,
          width: 120,
        }}
      />
      <div
        style={{
          color: "#f8fafc",
          display: "flex",
          fontSize: 68,
          fontWeight: 700,
          letterSpacing: -1,
          lineHeight: 1.05,
        }}
      >
        Dieselpris.no
      </div>
      <div
        style={{
          color: "#94a3b8",
          display: "flex",
          fontSize: 28,
          fontWeight: 500,
          lineHeight: 1.35,
          marginTop: 20,
          maxWidth: 900,
        }}
      >
        Veiledende dieselpriser og avgifter i Norge
      </div>
    </div>,
    { ...size }
  );
}
