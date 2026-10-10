import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const blurMap = JSON.parse(fs.readFileSync(path.join(rootDir, "src/content/blog/blur-map.json"), "utf-8"));

// Translation and glossary dictionary for Spanish -> German
const exactReplacements = [
  // Links
  ["/es/", "/de/"],
  ["/es\"", "/de\""],
  ["/es'", "/de'"],
  ["/es)", "/de)"],
  ["/pt-br/", "/de/"],

  // Core terms
  ["Matriz del Destino", "Matrix des Schicksals"],
  ["matriz del destino", "Matrix des Schicksals"],
  ["Matriz do Destino", "Matrix des Schicksals"],
  ["matriz do destino", "Matrix des Schicksals"],
  ["Destiny Matrix", "Schicksalsmatrix"],
  ["Matrix of Destiny", "Matrix des Schicksals"],
  ["cola kármica", "karmischer Schwanz"],
  ["colas kármicas", "karmische Schwänze"],
  ["Cola Kármica", "Karmischer Schwanz"],
  ["cauda cármica", "karmischer Schwanz"],
  ["Cauda Cármica", "Karmischer Schwanz"],
  ["línea del amor", "Liebeslinie"],
  ["Línea del Amor", "Liebeslinie"],
  ["canal del amor", "Liebeskanal"],
  ["linha do amor", "Liebeslinie"],
  ["línea del dinero", "Geldlinie"],
  ["Línea del Dinero", "Geldlinie"],
  ["canal del dinero", "Finanzkanal"],
  ["Canal del Dinero", "Finanzkanal"],
  ["canal financiero", "Finanzkanal"],
  ["linha do dinheiro", "Geldlinie"],
  ["zona de confort", "Seelen-Komfortzone"],
  ["Zona de Confort", "Seelen-Komfortzone"],
  ["zona de conforto da alma", "Seelen-Komfortzone"],
  ["zona de talentos", "Talentzone"],
  ["Zona de Talentos", "Talentzone"],
  ["cuadrado de la Tierra", "Erdquadrat"],
  ["Cuadrado de la Tierra", "Erdquadrat"],
  ["cuadrado del Cielo", "Himmelsquadrat"],
  ["Cuadrado del Cielo", "Himmelsquadrat"],
  ["quadrado da Terra", "Erdquadrat"],
  ["quadrado do Céu", "Himmelsquadrat"],
  ["estrella de ocho puntas", "achtzackiger Stern"],
  ["Estrella de ocho puntas", "Achtzackiger Stern"],
  ["octagrama", "Oktagramm"],
  ["año solar", "Sonnenjahr"],
  ["fecha de nacimiento", "Geburtsdatum"],
  ["Fecha de nacimiento", "Geburtsdatum"],
  ["data de nascimento", "Geburtsdatum"],
  ["día de nacimiento", "Geburtstag"],
  ["Día de nacimiento", "Geburtstag"],
  ["mes de nacimiento", "Geburtsmonat"],
  ["Mes de nacimiento", "Geburtsmonat"],
  ["centro del alma", "Seelenzentrum"],
  ["Centro del Alma", "Seelenzentrum"],
  ["centro da alma", "Seelenzentrum"],

  // 22 Arcana
  ["El Loco", "Der Narr"],
  ["O Louco", "Der Narr"],
  ["El Mago", "Der Magier"],
  ["O Mago", "Der Magier"],
  ["La Sacerdotisa", "Die Hohepriesterin"],
  ["A Sacerdotisa", "Die Hohepriesterin"],
  ["La Papisa", "Die Hohepriesterin"],
  ["La Emperatriz", "Die Herrscherin"],
  ["A Imperatriz", "Die Herrscherin"],
  ["El Emperador", "Der Herrscher"],
  ["O Imperador", "Der Herrscher"],
  ["El Sumo Sacerdote", "Der Hierophant"],
  ["El Hierofante", "Der Hierophant"],
  ["O Hierofante", "Der Hierophant"],
  ["Los Enamorados", "Die Liebenden"],
  ["Os Enamorados", "Die Liebenden"],
  ["El Carro", "Der Wagen"],
  ["O Carro", "Der Wagen"],
  ["La Justicia", "Die Gerechtigkeit"],
  ["A Justiça", "Die Gerechtigkeit"],
  ["El Ermitaño", "Der Eremit"],
  ["O Eremita", "Der Eremit"],
  ["La Rueda de la Fortuna", "Das Rad des Schicksals"],
  ["A Roda da Fortuna", "Das Rad des Schicksals"],
  ["La Fuerza", "Die Kraft"],
  ["A Força", "Die Kraft"],
  ["El Colgado", "Der Gehängte"],
  ["O Enforcado", "Der Gehängte"],
  ["La Muerte", "Der Tod"],
  ["A Morte", "Der Tod"],
  ["La Templanza", "Die Mäßigkeit"],
  ["A Temperança", "Die Mäßigkeit"],
  ["El Diablo", "Der Teufel"],
  ["O Diabo", "Der Teufel"],
  ["La Torre", "Der Turm"],
  ["A Torre", "Der Turm"],
  ["La Estrella", "Der Stern"],
  ["A Estrela", "Der Stern"],
  ["La Luna", "Der Mond"],
  ["A Lua", "Der Mond"],
  ["El Sol", "Die Sonne"],
  ["O Sol", "Die Sonne"],
  ["El Juicio", "Das Gericht"],
  ["O Julgamento", "Das Gericht"],
  ["El Mundo", "Die Welt"],
  ["O Mundo", "Die Welt"],
  ["Arcano", "Arkana"],
  ["arcano", "Arkana"],
  ["Arcanos", "Arkana"],
  ["arcanos", "Arkana"],

  // Questions and connectors
  ["Por qué", "Warum"],
  ["por qué", "warum"],
  ["Cómo", "Wie"],
  ["cómo", "wie"],
  ["Qué", "Was"],
  ["qué", "was"],
  ["Cuál", "Welcher"],
  ["cuál", "welcher"],
  ["Cuáles", "Welche"],
  ["cuáles", "welche"],
  ["Quién", "Wer"],
  ["quién", "wer"],
  ["Dónde", "Wo"],
  ["dónde", "wo"],
  ["Cuándo", "Wann"],
  ["cuándo", "wann"],
  ["Cuánto", "Wie viel"],
  ["cuánto", "wie viel"],
  ["Cuántos", "Wie viele"],
  ["cuántos", "wie viele"],
  ["También", "Auch"],
  ["también", "auch"],
  ["Además", "Darüber hinaus"],
  ["además", "darüber hinaus"],
  ["Sin embargo", "Jedoch"],
  ["sin embargo", "jedoch"],
  ["No obstante", "Dennoch"],
  ["no obstante", "dennoch"],
  ["Por lo tanto", "Daher"],
  ["por lo tanto", "daher"],
  ["Asimismo", "Ebenso"],
  ["asimismo", "ebenso"],
  ["Mientras que", "Während"],
  ["mientras que", "während"],
  ["Mientras", "Während"],
  ["mientras", "während"],
  ["Aunque", "Obwohl"],
  ["aunque", "obwohl"],
  ["A pesar de", "Trotz"],
  ["a pesar de", "trotz"],
  ["Debido a", "Aufgrund von"],
  ["debido a", "aufgrund von"],
  ["A través de", "Durch"],
  ["a través de", "durch"],
  ["Mediante", "Mittels"],
  ["mediante", "mittels"],
  ["Desde", "Von"],
  ["desde", "von"],
  ["Hasta", "Bis"],
  ["hasta", "bis"],
  ["Después de", "Nach"],
  ["después de", "nach"],
  ["Antes de", "Vor"],
  ["antes de", "vor"],
  ["Siempre", "Immer"],
  ["siempre", "immer"],
  ["Nunca", "Niemals"],
  ["nunca", "niemals"],
  ["Jamás", "Nie"],
  ["jamás", "nie"],
  ["Todos los", "Alle"],
  ["todos los", "alle"],
  ["Todas las", "Alle"],
  ["todas las", "alle"],
  ["Todo el", "Das gesamte"],
  ["todo el", "das gesamte"],
  ["Toda la", "Die gesamte"],
  ["toda la", "die gesamte"],
  ["Nuestro", "Unser"],
  ["nuestro", "unser"],
  ["Nuestra", "Unsere"],
  ["nuestra", "unsere"],
  ["Nuestros", "Unsere"],
  ["nuestros", "unsere"],
  ["Nuestras", "Unsere"],
  ["nuestras", "unsere"],
  ["De hecho", "Tatsächlich"],
  ["de hecho", "tatsächlich"],
  ["En realidad", "In Wirklichkeit"],
  ["en realidad", "in Wirklichkeit"],
  ["Por ejemplo", "Zum Beispiel"],
  ["por ejemplo", "zum Beispiel"],
  ["Es decir", "Das bedeutet"],
  ["es decir", "das bedeutet"],
  ["Esto significa", "Das bedeutet"],
  ["esto significa", "das bedeutet"],
  ["Esto se debe", "Dies liegt daran"],
  ["esto se debe", "dies liegt daran"],
  ["En primer lugar", "Erstens"],
  ["en primer lugar", "erstens"],
  ["En segundo lugar", "Zweitens"],
  ["en segundo lugar", "zweitens"],

  // Vocabulary & Domain terms
  ["paso a paso", "Schritt für Schritt"],
  ["Paso a paso", "Schritt für Schritt"],
  ["guía completa", "vollständiger Leitfaden"],
  ["Guía completa", "Vollständiger Leitfaden"],
  ["preguntas frecuentes", "Häufige Fragen"],
  ["Preguntas frecuentes", "Häufige Fragen"],
  ["autoconocimiento", "Selbsterkenntnis"],
  ["crecimiento personal", "persönliches Wachstum"],
  ["desarrollo personal", "Persönlichkeitsentwicklung"],
  ["relaciones", "Beziehungen"],
  ["relación", "Beziehung"],
  ["pareja", "Partnerschaft"],
  ["carrera", "Karriere"],
  ["profesión", "Berufung"],
  ["dinero", "Finanzen"],
  ["salud", "Gesundheit"],
  ["cuerpo", "Körper"],
  ["energía", "Energie"],
  ["energías", "Energien"],
  ["espiritual", "spirituell"],
  ["bloqueo", "Blockade"],
  ["bloqueos", "Blockaden"],
  ["lección", "Lektion"],
  ["lecciones", "Lektionen"],
  ["patrón", "Muster"],
  ["patrones", "Muster"],
  ["vida", "Leben"],
  ["alma", "Seele"],
  ["destino", "Schicksal"],
  ["origen", "Ursprung"],
  ["método", "Methode"],
  ["sistema", "System"],
  ["guía", "Leitfaden"],
  ["consejo", "Empfehlung"],
  ["ejemplo", "Beispiel"],
  ["diferencia", "Unterschied"],
  ["comparación", "Vergleich"],
  ["precisión", "Präzision"],
  ["tabla", "Tabelle"],
  ["gráfico", "Chart"],
  ["mapa", "Matrix-Chart"],
  ["carta", "Chart"],
  ["cálculo", "Berechnung"],
  ["cálculos", "Berechnungen"],
  ["calculadora", "Rechner"],
  ["calculadoras", "Rechner"],
  ["número", "Zahl"],
  ["números", "Zahlen"],
  ["reducción", "Reduktion"],
  ["vértice", "Scheitelpunkt"],
  ["vértices", "Scheitelpunkte"],
  ["línea", "Linie"],
  ["líneas", "Linien"],
  ["canal", "Kanal"],
  ["canales", "Kanäle"],
  ["punto", "Punkt"],
  ["puntos", "Punkte"],
  ["centro", "Mitte"],
  ["sombra", "Schatten"],
  ["sombras", "Schatten"],
  ["luz", "Licht"],
  ["positivo", "positiv"],
  ["negativo", "negativ"],
  ["equilibrio", "Gleichgewicht"],
  ["armonía", "Harmonie"],
  ["desafío", "Herausforderung"],
  ["obstáculo", "Hindernis"],
  ["propósito", "Lebenssinn"],
  ["misión", "Lebensaufgabe"],
  ["vocación", "Berufung"],
  ["talento", "Begabung"],
  ["talentos", "Talente"],
  ["potencial", "Potenzial"],
  ["arquetipo", "Archetyp"],
  ["arquetipos", "Archetypen"],
  ["filosofía", "Philosophie"],
  ["ancestral", "ahnenbezogen"],
  ["linaje", "Ahnenlinie"],
  ["familia", "Familie"],
  ["libertad", "Freiheit"],
  ["responsabilidad", "Verantwortung"],
  ["claridad", "Klarheit"],
  ["éxito", "Erfolg"],
  ["abundancia", "Fülle"],
  ["trabajo", "Arbeit"],
  ["liderazgo", "Führung"],
  ["comunicación", "Kommunikation"],
  ["creatividad", "Kreativität"],
  ["intuición", "Intuition"],
  ["diario", "Tagebuch"],
  ["análisis", "Analyse"],
  ["interpretación", "Interpretation"],
];

function translateToDe(text) {
  if (typeof text !== "string") return text;
  let res = text;
  for (const [from, to] of exactReplacements) {
    const escaped = from.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    res = res.replace(new RegExp(`\\b${escaped}\\b`, "g"), to);
  }

  // Common phrase adjustments for natural German
  res = res
    .replace(/\bEn conclusión\b/gi, "Zusammenfassend")
    .replace(/\bEn resumen\b/gi, "Im Überblick")
    .replace(/\bVale la pena notar\b/gi, "Bemerkenswert ist")
    .replace(/\bEs importante destacar\b/gi, "Wichtig ist")
    .replace(/\bDescubre\b/g, "Entdecke")
    .replace(/\bdescubre\b/g, "entdecke")
    .replace(/\bAprende\b/g, "Lerne")
    .replace(/\baprende\b/g, "lerne")
    .replace(/\bCalcula\b/g, "Berechne")
    .replace(/\bcalcula\b/g, "berechne")
    .replace(/\bExplora\b/g, "Erkunde")
    .replace(/\bexplora\b/g, "erkunde")
    .replace(/\bComprende\b/g, "Verstehe")
    .replace(/\bcomprende\b/g, "verstehe")
    .replace(/\bRevisa\b/g, "Prüfe")
    .replace(/\brevisa\b/g, "prüfe")
    .replace(/\bConsulta\b/g, "Nutze")
    .replace(/\bconsulta\b/g, "nutze")
    .replace(/\bCompara\b/g, "Vergleiche")
    .replace(/\bcompara\b/g, "vergleiche")
    .replace(/\bpuedes\b/g, "du kannst")
    .replace(/\bdebes\b/g, "du solltest")
    .replace(/\btienes\b/g, "du hast")
    .replace(/\bquieres\b/g, "du möchtest")
    .replace(/\bsabes\b/g, "du weißt")
    .replace(/\bnecesitas\b/g, "du brauchst")
    .replace(/\bvocê pode\b/g, "du kannst")
    .replace(/\bvocê deve\b/g, "du solltest")
    .replace(/\bvocê tem\b/g, "du hast")
    .replace(/\bvocê precisa\b/g, "du brauchst");

  res = res.replace(/  +/g, " ").trim();
  return res;
}

function processArticleDe(article) {
  const slug = article.slug;
  const translated = {
    slug,
    title: translateToDe(article.title),
    metaTitle: translateToDe(article.metaTitle).slice(0, 59),
    metaDescription: translateToDe(article.metaDescription).slice(0, 154),
    excerpt: translateToDe(article.excerpt),
    category: article.category,
    publishedAt: article.publishedAt,
    updatedAt: "2026-10-10",
    readingTimeMinutes: article.readingTimeMinutes,
    mainKeyword: translateToDe(article.mainKeyword),
    author: {
      name: "Redaktion der Matrix des Schicksals",
      role: "Archetypen- & Matrix-Forschung",
      bio: "Spezialisten für die Schicksalsmatrix-Methodik und Werkzeuge zur bewussten Selbsterkenntnis.",
    },
    heroImage: {
      src: article.heroImage.src,
      alt: translateToDe(article.heroImage.alt),
      width: 1600,
      height: 900,
      blurDataURL: `blurMap["${slug}"]`,
    },
    tableOfContents: (article.tableOfContents || []).map((item) => ({
      title: translateToDe(item.title),
      slug: item.slug,
    })),
    sections: (article.sections || []).map((section) => ({
      heading: translateToDe(section.heading),
      slug: section.slug,
      paragraphs: (section.paragraphs || []).map(translateToDe),
      ...(section.callout
        ? {
            callout: {
              title: translateToDe(section.callout.title),
              text: translateToDe(section.callout.text),
            },
          }
        : {}),
      ...(section.table
        ? {
            table: {
              headers: section.table.headers.map(translateToDe),
              rows: section.table.rows.map((row) => row.map(translateToDe)),
            },
          }
        : {}),
    })),
    faqs: (article.faqs || []).map((faq) => ({
      question: translateToDe(faq.question),
      answer: translateToDe(faq.answer),
    })),
    ...(article.balancedShadowBlock
      ? {
          balancedShadowBlock: {
            arcanaNumber: article.balancedShadowBlock.arcanaNumber,
            arcanaName: translateToDe(article.balancedShadowBlock.arcanaName),
            balanced: translateToDe(article.balancedShadowBlock.balanced),
            shadow: translateToDe(article.balancedShadowBlock.shadow),
            advice: translateToDe(article.balancedShadowBlock.advice),
          },
        }
      : {}),
    relatedSlugs: article.relatedSlugs || [],
    cta: {
      title: translateToDe(article.cta?.title || "Berechne deine Matrix des Schicksals"),
      description: translateToDe(
        article.cta?.description || "Erforsche dein vollständiges Chart mit transparenten, klassischen Formeln."
      ),
      buttonText: translateToDe(article.cta?.buttonText || "Matrix des Schicksals berechnen"),
      buttonLink: (article.cta?.buttonLink || "/es").replace(/\/(es|pt-br)/, "/de"),
    },
  };
  return translated;
}

function formatArticleToTs(art) {
  let json = JSON.stringify(art, null, 2);
  json = json.replace(new RegExp(`"blurDataURL": "blurMap\\[\\\\"${art.slug}\\\\"\\]"`, "g"), `"blurDataURL": blurMap["${art.slug}"]`);
  return json;
}

// Ensure target directory exists
fs.mkdirSync(path.join(rootDir, "src/content/localized/blog/de"), { recursive: true });

for (let b = 1; b <= 6; b++) {
  const raw = fs.readFileSync(path.join(rootDir, `src/content/localized/blog/es/batch-${b}.ts`), "utf-8");
  const code = raw
    .replace(/import .*\n/g, "")
    .replace("const blurMap = blurMapRaw as Record<string, string>;", "")
    .replace(new RegExp(`export const esBatch${b}Articles: BlogPost\\[\\] =`), "return");
  const fn = new Function("blurMap", code);
  const esArticles = fn(blurMap);

  const deArticles = esArticles.map(processArticleDe);

  let fileContent = `import { BlogPost } from "@/content/blog/types";
import blurMapRaw from "@/content/blog/blur-map.json";

const blurMap = blurMapRaw as Record<string, string>;

export const deBatch${b}Articles: BlogPost[] = [
`;

  for (let i = 0; i < deArticles.length; i++) {
    fileContent += `  ${formatArticleToTs(deArticles[i])}${i < deArticles.length - 1 ? "," : ""}\n`;
  }
  fileContent += `];\n`;

  const targetPath = path.join(rootDir, `src/content/localized/blog/de/batch-${b}.ts`);
  fs.writeFileSync(targetPath, fileContent, "utf-8");
  console.log(`Generated de batch-${b}.ts with ${deArticles.length} articles`);
}

// Generate index.ts
const indexContent = `import { BlogPost } from "@/content/blog/types";
import { deBatch1Articles } from "./batch-1";
import { deBatch2Articles } from "./batch-2";
import { deBatch3Articles } from "./batch-3";
import { deBatch4Articles } from "./batch-4";
import { deBatch5Articles } from "./batch-5";
import { deBatch6Articles } from "./batch-6";

export const deBlogArticles: BlogPost[] = [
  ...deBatch1Articles,
  ...deBatch2Articles,
  ...deBatch3Articles,
  ...deBatch4Articles,
  ...deBatch5Articles,
  ...deBatch6Articles,
];

export function getDeArticleBySlug(slug: string): BlogPost | undefined {
  return deBlogArticles.find((article) => article.slug === slug);
}

export function getAllDeArticles(): BlogPost[] {
  return deBlogArticles;
}

export {
  deBatch1Articles,
  deBatch2Articles,
  deBatch3Articles,
  deBatch4Articles,
  deBatch5Articles,
  deBatch6Articles,
};
`;

fs.writeFileSync(path.join(rootDir, "src/content/localized/blog/de/index.ts"), indexContent, "utf-8");
console.log("Generated de index.ts");

// Generate 35 proxy files
const allSlugs = [
  "what-does-arcana-7-mean-destiny-matrix",
  "how-destiny-matrix-is-calculated",
  "karmic-tail-destiny-matrix-meaning",
  "destiny-matrix-compatibility-chart-guide",
  "money-channel-destiny-matrix-guide",
  "matrix-of-destiny-vs-destiny-matrix-vs-matrix-of-fate",
  "why-destiny-matrix-calculators-give-different-numbers",
  "how-to-calculate-destiny-matrix-by-hand",
  "how-to-read-destiny-matrix-chart-step-by-step",
  "destiny-matrix-center-number-comfort-zone",
  "is-the-destiny-matrix-accurate",
  "is-destiny-matrix-based-on-astrology",
  "where-did-matrix-of-destiny-come-from",
  "destiny-matrix-vs-human-design",
  "destiny-matrix-vs-life-path-number",
  "mirrored-destiny-matrix-meaning",
  "same-arcana-repeated-in-destiny-matrix",
  "destiny-matrix-lines-explained",
  "talent-zone-destiny-matrix",
  "destiny-matrix-yearly-forecast-explained",
  "age-periods-life-cycles-destiny-matrix",
  "chakra-table-destiny-matrix-guide",
  "ancestral-lines-destiny-matrix",
  "blind-spots-in-destiny-matrix",
  "common-mistakes-reading-destiny-matrix",
  "destiny-matrix-love-line-how-to-read",
  "destiny-matrix-compatibility-centers-and-patterns",
  "child-destiny-matrix-how-to-read",
  "parent-child-balance-destiny-matrix",
  "money-blocks-in-destiny-matrix",
  "money-and-love-balance-destiny-matrix",
  "life-purpose-destiny-matrix-stages",
  "inner-self-vs-outer-self-destiny-matrix",
  "destiny-matrix-for-career-choices",
  "destiny-matrix-journaling-prompts",
];

for (const slug of allSlugs) {
  const proxyContent = `import { getDeArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getDeArticleBySlug("${slug}");
export default article;
`;
  fs.writeFileSync(path.join(rootDir, `src/content/localized/blog/de/${slug}.ts`), proxyContent, "utf-8");
}
console.log(`Generated 35 proxy files in de`);
