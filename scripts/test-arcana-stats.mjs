import { allArcanaMeanings } from "../src/content/arcana/index.ts";

console.log("Total Arcana loaded:", allArcanaMeanings.length);
for (const a of allArcanaMeanings) {
  const bodyText = [
    a.description,
    a.generalMeaning,
    a.positions.personality,
    a.positions.spirit,
    a.positions.socialRealization,
    a.positions.karmicTailRoot,
    a.positions.comfortZone,
    a.positions.loveEntrance,
    a.positions.moneyEntrance,
    a.loveMeaning,
    a.moneyMeaning,
    a.advice.join(" "),
  ].join(" ");
  const words = bodyText.trim().split(/\s+/).length;
  console.log(`Arcana ${a.number} (${a.name}): ${words} words, ${a.faqs?.length || 0} FAQs`);
}
