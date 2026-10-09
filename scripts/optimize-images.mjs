import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const imageConfigs = [
  {
    path: "public/images/calculators/karmic-rebirth.webp",
    maxWidth: 960,
  },
  {
    path: "public/images/calculators/love-union.webp",
    maxWidth: 960,
  },
  {
    path: "public/images/calculators/money-abundance.webp",
    maxWidth: 960,
  },
  {
    path: "public/images/calculators/talent-superpowers.webp",
    maxWidth: 960,
  },
  {
    path: "public/images/hero/cosmic-octagram-hero.webp",
    maxWidth: 1200,
  },
  {
    path: "public/og-image.webp",
    maxWidth: 1200,
  },
];

async function run() {
  for (const config of imageConfigs) {
    const fullPath = path.resolve(config.path);
    const buffer = await fs.readFile(fullPath);

    // Optimize WebP: resize and compress with maximum effort
    const optimizedWebp = await sharp(buffer)
      .resize({
        width: config.maxWidth,
        withoutEnlargement: true,
      })
      .webp({
        quality: 75,
        effort: 6,
      })
      .toBuffer();

    await fs.writeFile(fullPath, optimizedWebp);

    console.log(
      `${config.path} -> WebP: ${(optimizedWebp.length / 1024).toFixed(1)} KB`
    );
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
