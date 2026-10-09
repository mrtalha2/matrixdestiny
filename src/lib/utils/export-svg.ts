/**
 * Utility to export an SVG DOM Element to a high-resolution PNG image client-side.
 * 
 * Accurately inlines CSS styles and theme variables so the exported PNG
 * matches the exact colors, typography, and contrast visible on screen.
 */

/**
 * Convert an SVG DOM Element to a high-resolution PNG Base64 Data URL.
 */
export async function getSvgAsPngDataUrl(
  svgElement: SVGSVGElement,
  scale: number = 2,
  forcedBgColor?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // 1. Clone the SVG so we do not mutate live DOM
      const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

      // 2. Inline computed styles (critical for CSS variables)
      const originalElements = Array.from(svgElement.querySelectorAll("*"));
      const clonedElements = Array.from(clonedSvg.querySelectorAll("*"));

      originalElements.forEach((origEl, idx) => {
        const clonedEl = clonedElements[idx];
        if (!clonedEl) return;

        const computed = window.getComputedStyle(origEl);

        const fill = computed.getPropertyValue("fill");
        const stroke = computed.getPropertyValue("stroke");
        const strokeWidth = computed.getPropertyValue("stroke-width");
        const strokeDasharray = computed.getPropertyValue("stroke-dasharray");
        const opacity = computed.getPropertyValue("opacity");
        const fontSize = computed.getPropertyValue("font-size");
        const fontFamily = computed.getPropertyValue("font-family");
        const fontWeight = computed.getPropertyValue("font-weight");

        if (fill && fill !== "none") clonedEl.setAttribute("fill", fill);
        if (stroke && stroke !== "none") clonedEl.setAttribute("stroke", stroke);
        if (strokeWidth) clonedEl.setAttribute("stroke-width", strokeWidth);
        if (strokeDasharray && strokeDasharray !== "none")
          clonedEl.setAttribute("stroke-dasharray", strokeDasharray);
        if (opacity) clonedEl.setAttribute("opacity", opacity);
        if (fontSize) clonedEl.setAttribute("font-size", fontSize);
        if (fontFamily) clonedEl.setAttribute("font-family", fontFamily);
        if (fontWeight) clonedEl.setAttribute("font-weight", fontWeight);
      });

      // 3. Ensure width and height match viewBox
      const viewBox = svgElement.viewBox.baseVal;
      const width = viewBox.width || 1000;
      const height = viewBox.height || 1000;
      clonedSvg.setAttribute("width", width.toString());
      clonedSvg.setAttribute("height", height.toString());

      const isDark = document.documentElement.classList.contains("dark");
      const bgColor = forcedBgColor || (isDark ? "#0C0E10" : "#FAF8F5");

      // 4. Serialize to XML string
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(clonedSvg);
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const blobUrl = URL.createObjectURL(svgBlob);

      // 5. Draw onto Canvas
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width * scale;
        canvas.height = height * scale;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(blobUrl);
          reject(new Error("Could not acquire 2D canvas context"));
          return;
        }

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(blobUrl);

        try {
          const dataUrl = canvas.toDataURL("image/png", 1.0);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = (err) => {
        URL.revokeObjectURL(blobUrl);
        reject(err);
      };

      img.src = blobUrl;
    } catch (e) {
      reject(e);
    }
  });
}

export async function exportSvgToPng(
  svgElement: SVGSVGElement,
  fileName: string = "matrix-of-destiny.png",
  scale: number = 2
): Promise<void> {
  const dataUrl = await getSvgAsPngDataUrl(svgElement, scale);
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

