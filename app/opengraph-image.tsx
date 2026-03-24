import { ImageResponse } from "next/og";

export const alt =
  "Dieselpris.no – forstå bedre råvarepriser og avgifter på diesel i Norge";
export const contentType = "image/png";
export const size = { height: 630, width: 1200 };

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(145deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        justifyContent: "space-between",
        padding: 72,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "60%",
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
            flexDirection: "column",
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 1.35,
            marginTop: 20,
          }}
        >
          <div>Forstå bedre råvarepriser og avgifter på diesel i Norge.</div>
          <div
            style={{
              color: "#64748b",
              fontSize: 22,
              fontWeight: 500,
              marginTop: 12,
            }}
          >
            Se sammenhengen mellom råvare, avgifter og utviklingen over tid.
          </div>
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <svg
          width="360"
          height="240"
          viewBox="0 0 360 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="40"
            x2="360"
            y2="40"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <line
            x1="0"
            y1="120"
            x2="360"
            y2="120"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <line
            x1="0"
            y1="200"
            x2="360"
            y2="200"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          <path
            d="M 20 180 L 100 100 L 180 140 L 260 60 L 340 80"
            stroke="#22c55e"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="20"
            cy="180"
            r="8"
            fill="#0f172a"
            stroke="#22c55e"
            strokeWidth="4"
          />
          <circle
            cx="100"
            cy="100"
            r="8"
            fill="#0f172a"
            stroke="#22c55e"
            strokeWidth="4"
          />
          <circle
            cx="180"
            cy="140"
            r="8"
            fill="#0f172a"
            stroke="#22c55e"
            strokeWidth="4"
          />
          <circle
            cx="260"
            cy="60"
            r="8"
            fill="#0f172a"
            stroke="#22c55e"
            strokeWidth="4"
          />
          <circle cx="340" cy="80" r="8" fill="#22c55e" />
        </svg>
      </div>
    </div>,
    { ...size }
  );
}
