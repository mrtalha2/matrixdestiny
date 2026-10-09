import { ImageResponse } from "next/og";
import { SITE_DOMAIN } from "@/lib/seo/structured-data";

export const runtime = "edge";

export const alt = "Matrix of Destiny - The Geometry of Personal Evolution";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#0C0E10",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(194, 94, 62, 0.22) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(45, 70, 94, 0.25) 0%, transparent 50%)",
          fontFamily: "sans-serif",
          color: "#FAF8F5",
        }}
      >
        {/* Top Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "22px",
                backgroundColor: "rgba(194, 94, 62, 0.2)",
                border: "1.5px solid rgba(194, 94, 62, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C25E3E",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              ✦
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                  color: "#FAF8F5",
                }}
              >
                MATRIX OF DESTINY
              </span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                  color: "#8C8880",
                  textTransform: "uppercase",
                }}
              >
                The Geometry of Personal Evolution
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: "24px",
              backgroundColor: "rgba(194, 94, 62, 0.15)",
              border: "1px solid rgba(194, 94, 62, 0.3)",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#C25E3E" }}>
              100% Free Calculator
            </span>
          </div>
        </div>

        {/* Center Pitch */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "900px",
            margin: "40px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: 700,
              letterSpacing: "-1.5px",
              color: "#FAF8F5",
              lineHeight: 1.1,
            }}
          >
            <span>Decode the 22 energetic archetypes shaping your fate, love, and money.</span>
          </div>
          <span
            style={{
              fontSize: "22px",
              color: "#8C8880",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Architectural numerology based on your exact birth date. Modulo-22 algorithm, 24+
            coordinates, zero mystical jargon, zero paywalls.
          </span>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 28px",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#C25E3E", fontSize: "16px" }}>✓</span>
              <span style={{ fontSize: "14px", color: "#FAF8F5", fontWeight: 500 }}>
                Instant Octagram Chart
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#C25E3E", fontSize: "16px" }}>✓</span>
              <span style={{ fontSize: "14px", color: "#FAF8F5", fontWeight: 500 }}>
                Karmic Tail & Past Burdens
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#C25E3E", fontSize: "16px" }}>✓</span>
              <span style={{ fontSize: "14px", color: "#FAF8F5", fontWeight: 500 }}>
                Relationship Compatibility
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "#8C8880", fontWeight: 600 }}>
              {SITE_DOMAIN}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
