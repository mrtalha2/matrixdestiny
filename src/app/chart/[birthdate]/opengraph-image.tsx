import { ImageResponse } from "next/og";
import { parseBirthDateSlug } from "@/lib/validations/birthdate";
import { calculateDestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { SITE_DOMAIN } from "@/lib/seo/structured-data";

export const runtime = "edge";

export const alt = "Matrix of Destiny Personal Chart Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { birthdate: string };
}) {
  const parsed = parseBirthDateSlug(params.birthdate);
  const birth = parsed || { day: 24, month: 8, year: 1995 };
  const matrix = calculateDestinyMatrix(birth);

  const centerNode = matrix.points.find((p) => p.id === "comfortZone") || matrix.points[0];
  const dayNode = matrix.points.find((p) => p.id === "personality") || matrix.points[1];
  const monthNode = matrix.points.find((p) => p.id === "spirit") || matrix.points[2];
  const yearNode = matrix.points.find((p) => p.id === "socialRealization") || matrix.points[3];

  const centerArcana = arcanaMeanings[centerNode.value] || arcanaMeanings[1];
  const dayArcana = arcanaMeanings[dayNode.value] || arcanaMeanings[1];
  const karmicStr = matrix.karmicTail.points.join(" - ");

  const dateObj = new Date(birth.year, birth.month - 1, birth.day);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 64px",
          backgroundColor: "#0C0E10",
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(194, 94, 62, 0.18) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(45, 70, 94, 0.25) 0%, transparent 50%)",
          fontFamily: "sans-serif",
          color: "#FAF8F5",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "20px",
                backgroundColor: "rgba(194, 94, 62, 0.2)",
                border: "1px solid rgba(194, 94, 62, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C25E3E",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              ✦
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  color: "#FAF8F5",
                }}
              >
                MATRIX OF DESTINY
              </span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "2px",
                  color: "#8C8880",
                  textTransform: "uppercase",
                }}
              >
                Architectural Numerology Blueprint
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: 600, color: "#FAF8F5" }}>
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Center Showcase: Soul Comfort Zone */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              maxWidth: "640px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "2.5px",
                color: "#C25E3E",
                textTransform: "uppercase",
              }}
            >
              Soul Comfort Zone Core
            </span>
            <div
              style={{
                display: "flex",
                fontSize: "52px",
                fontWeight: 700,
                letterSpacing: "-1px",
                color: "#FAF8F5",
                lineHeight: 1.1,
              }}
            >
              <span>Energy {centerNode.value}: {centerArcana.name}</span>
            </div>
            <span
              style={{
                fontSize: "20px",
                color: "#8C8880",
                fontWeight: 400,
                marginTop: "4px",
              }}
            >
              {centerArcana.archetype}
            </span>
          </div>

          {/* Large Emblem */}
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "32px",
              backgroundColor: "rgba(194, 94, 62, 0.12)",
              border: "2px solid rgba(194, 94, 62, 0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "68px",
                fontWeight: 800,
                color: "#C25E3E",
                lineHeight: 1,
              }}
            >
              {centerNode.value}
            </span>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
                color: "#8C8880",
                textTransform: "uppercase",
                marginTop: "6px",
              }}
            >
              Arcana
            </span>
          </div>
        </div>

        {/* Bottom Coordinates Strip */}
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
          <div style={{ display: "flex", gap: "36px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#8C8880", textTransform: "uppercase" }}>
                Persona (Day)
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#FAF8F5" }}>
                Arcana {dayNode.value}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#8C8880", textTransform: "uppercase" }}>
                Spirit (Month)
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#FAF8F5" }}>
                Arcana {monthNode.value}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#8C8880", textTransform: "uppercase" }}>
                Social (Year)
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#FAF8F5" }}>
                Arcana {yearNode.value}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#8C8880", textTransform: "uppercase" }}>
                Karmic Tail
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#C25E3E" }}>
                {karmicStr}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#8C8880", fontWeight: 500 }}>
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
