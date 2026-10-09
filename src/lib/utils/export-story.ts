import { DestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";
import { getSvgAsPngDataUrl } from "./export-svg";
import { SITE_DOMAIN } from "@/lib/seo/structured-data";

export interface ExportStoryOptions {
  matrix: DestinyMatrix;
  dateSlug: string;
  userName?: string | null;
  svgElement?: SVGSVGElement | null;
}

/**
 * Generates a 1080x1920 (9:16 vertical) canvas image optimized for
 * Instagram Stories, TikTok, and mobile status updates.
 */
export async function exportStoryModeImage({
  matrix,
  dateSlug,
  userName,
  svgElement,
}: ExportStoryOptions): Promise<string> {
  const width = 1080;
  const height = 1920;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not acquire 2D canvas context for Story mode export.");
  }

  // 1. Background: Luxurious velvet slate with subtle terracotta radial ambiance
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height * 0.45,
    100,
    width / 2,
    height / 2,
    width * 0.9
  );
  bgGrad.addColorStop(0, "#1F2937"); // subtle warm deep slate
  bgGrad.addColorStop(0.5, "#111827");
  bgGrad.addColorStop(1, "#0A0D12"); // deep ink canvas
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle decorative geometric framing borders
  ctx.strokeStyle = "rgba(194, 94, 62, 0.25)"; // Terracotta glow
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.strokeRect(52, 52, width - 104, height - 104);

  // 2. Header Brand & User Identification
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Top pill badge
  ctx.fillStyle = "rgba(194, 94, 62, 0.15)";
  ctx.beginPath();
  ctx.roundRect(width / 2 - 160, 90, 320, 44, 22);
  ctx.fill();
  ctx.strokeStyle = "rgba(194, 94, 62, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#E07A5F"; // Terracotta accent
  ctx.font = "bold 16px monospace";
  ctx.fillText("✦ MATRIX OF DESTINY ✦", width / 2, 112);

  // User Name / Title
  ctx.fillStyle = "#FAF8F5"; // Cream ink
  ctx.font = "bold 52px serif";
  const titleText = userName ? `${userName}'s Destiny Blueprint` : "Sacred Octagram Blueprint";
  ctx.fillText(titleText, width / 2, 185);

  // Formatted Birth Date
  const { day, month, year } = matrix.input;
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "24px sans-serif";
  ctx.fillText(`Born ${formattedDate} • 22 Major Arcana Modulo Modality`, width / 2, 235);

  // 3. Render High-Resolution Chart Octagram in Center
  let chartImgDataUrl: string | null = null;
  if (svgElement) {
    try {
      chartImgDataUrl = await getSvgAsPngDataUrl(svgElement, 2.5, "transparent");
    } catch (e) {
      console.warn("Could not capture live SVG, continuing with fallback rendering:", e);
    }
  }

  if (chartImgDataUrl) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const chartSize = 740;
        const chartX = (width - chartSize) / 2;
        const chartY = 300;
        ctx.drawImage(img, chartX, chartY, chartSize, chartSize);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = chartImgDataUrl!;
    });
  } else {
    // Fallback: draw glowing geometric mandala
    ctx.strokeStyle = "rgba(194, 94, 62, 0.4)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(width / 2, 650, 260, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 4. Soul Comfort Zone Pill (Center Point E)
  const centerPoint = matrix.points.find((p) => p.id === "comfortZone");
  const centerEnergy = centerPoint?.value || 10;
  const centerArcana = arcanaMeanings[centerEnergy];

  const comfortY = 1120;
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  ctx.beginPath();
  ctx.roundRect(80, comfortY, width - 160, 160, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.stroke();

  // Comfort Zone Number Badge
  ctx.fillStyle = "#C25E3E";
  ctx.beginPath();
  ctx.roundRect(110, comfortY + 30, 100, 100, 16);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 48px monospace";
  ctx.fillText(centerEnergy.toString(), 160, comfortY + 80);

  // Comfort Zone Text
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 14px monospace";
  ctx.fillText("SOUL SANCTUARY & COMFORT ZONE", 235, comfortY + 52);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px serif";
  ctx.fillText(`Energy ${centerEnergy}: ${centerArcana?.name || "Comfort Core"}`, 235, comfortY + 88);

  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.font = "18px sans-serif";
  const comfortQuote = centerArcana?.pullQuote
    ? `"${centerArcana.pullQuote.slice(0, 56)}..."`
    : "The central balance point of your spiritual stamina.";
  ctx.fillText(comfortQuote, 235, comfortY + 120);

  // 5. Karmic Tail Banner (Bottom Points D-D2-D1)
  const karmicY = 1310;
  const tailSignature = matrix.karmicTail.points.join("-");
  const tailName = matrix.karmicTail.name || "Karmic Lessons";

  ctx.fillStyle = "rgba(194, 94, 62, 0.08)";
  ctx.beginPath();
  ctx.roundRect(80, karmicY, width - 160, 160, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(194, 94, 62, 0.35)";
  ctx.stroke();

  // Karmic Tail Icon / Badge
  ctx.fillStyle = "rgba(194, 94, 62, 0.25)";
  ctx.beginPath();
  ctx.roundRect(110, karmicY + 30, 100, 100, 16);
  ctx.fill();
  ctx.fillStyle = "#E07A5F";
  ctx.font = "bold 20px monospace";
  ctx.textAlign = "center";
  ctx.fillText(tailSignature, 160, karmicY + 80);

  // Karmic Tail Text
  ctx.textAlign = "left";
  ctx.fillStyle = "#E07A5F";
  ctx.font = "bold 14px monospace";
  ctx.fillText("KARMIC TAIL DEBT & TRANSMUTATION", 235, karmicY + 52);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px serif";
  ctx.fillText(tailName.slice(0, 36), 235, karmicY + 88);

  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.font = "18px sans-serif";
  const tailTrap = "Your soul's primary recurring test and growth catalyst.";
  ctx.fillText(tailTrap, 235, karmicY + 120);

  // 6. 3 Core Purpose Pills Grid
  const purposeY = 1500;
  const personalPurpose = matrix.purposes.personal.total;
  const socialPurpose = matrix.purposes.social.total;
  const spiritualPurpose = matrix.purposes.spiritual.total;

  const pillWidth = (width - 160 - 30) / 3;
  const purposes = [
    { label: "Personal (Age 20-40)", val: personalPurpose },
    { label: "Social (Age 40-60)", val: socialPurpose },
    { label: "Spiritual (Age 60+)", val: spiritualPurpose },
  ];

  purposes.forEach((p, idx) => {
    const x = 80 + idx * (pillWidth + 15);
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.beginPath();
    ctx.roundRect(x, purposeY, pillWidth, 110, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "12px sans-serif";
    ctx.fillText(p.label, x + pillWidth / 2, purposeY + 35);

    ctx.fillStyle = "#FAF8F5";
    ctx.font = "bold 32px monospace";
    ctx.fillText(p.val.toString(), x + pillWidth / 2, purposeY + 75);
  });

  // 7. Footer Watermark & Call To Action
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "16px sans-serif";
  ctx.fillText("Discover your complete 22-energy Destiny Matrix chart at:", width / 2, 1750);

  ctx.fillStyle = "#E07A5F";
  ctx.font = "bold 24px monospace";
  ctx.fillText(SITE_DOMAIN, width / 2, 1785);

  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.font = "12px monospace";
  ctx.fillText("FREE CALCULATOR • ZERO PAYWALLS • AUTHENTIC NATALIA LADINI METHOD", width / 2, 1835);

  return canvas.toDataURL("image/png", 1.0);
}

/**
 * Triggers either the native Mobile Web Share API (with PNG file)
 * or initiates an immediate client-side file download.
 */
export async function downloadOrShareStoryMode(
  options: ExportStoryOptions
): Promise<{ shared: boolean; downloaded: boolean }> {
  const dataUrl = await exportStoryModeImage(options);

  // Convert DataURL to File Blob
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const fileName = `destiny-matrix-story-${options.dateSlug}.png`;
  const file = new File([blob], fileName, { type: "image/png" });

  // Check Web Share API with files support
  if (
    typeof navigator !== "undefined" &&
    navigator.canShare &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({
        title: "My Destiny Matrix Story",
        text: `Here is my Matrix of Destiny octagram chart for ${options.dateSlug}!`,
        files: [file],
      });
      return { shared: true, downloaded: false };
    } catch (shareErr: any) {
      // If user cancelled share sheet, do not force download
      if (shareErr.name === "AbortError") {
        return { shared: false, downloaded: false };
      }
    }
  }

  // Fallback: direct browser PNG download
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return { shared: false, downloaded: true };
}
