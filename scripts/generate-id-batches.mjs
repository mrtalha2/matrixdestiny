import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const blurMap = JSON.parse(fs.readFileSync(path.join(rootDir, "src/content/blog/blur-map.json"), "utf-8"));

// Translation and glossary dictionary for Spanish/English -> Indonesian
const exactReplacements = [
  // Links
  ["/es/", "/id/"],
  ["/es\"", "/id\""],
  ["/es'", "/id'"],
  ["/es)", "/id)"],
  ["/pt-br/", "/id/"],
  ["/de/", "/id/"],

  // Core terms
  ["Matriz del Destino", "Matriks Takdir"],
  ["matriz del destino", "matriks takdir"],
  ["Matriz do Destino", "Matriks Takdir"],
  ["Matrix of Destiny", "Matriks Takdir"],
  ["Destiny Matrix", "Matriks Takdir"],
  ["Matrix des Schicksals", "Matriks Takdir"],
  ["Schicksalsmatrix", "Matriks Takdir"],
  ["cola kármica", "ekor karma"],
  ["colas kármicas", "ekor karma"],
  ["Cola Kármica", "Ekor Karma"],
  ["cauda cármica", "ekor karma"],
  ["karmischer Schwanz", "ekor karma"],
  ["línea del amor", "garis cinta"],
  ["Línea del Amor", "Garis Cinta"],
  ["canal del amor", "jalur asmara"],
  ["linha do amor", "garis cinta"],
  ["Liebeslinie", "garis cinta"],
  ["línea del dinero", "garis keuangan"],
  ["Línea del Dinero", "Garis Keuangan"],
  ["canal del dinero", "jalur finansial"],
  ["Canal del Dinero", "Jalur Finansial"],
  ["canal financiero", "jalur finansial"],
  ["linha do dinheiro", "garis keuangan"],
  ["Geldlinie", "garis keuangan"],
  ["Finanzkanal", "jalur finansial"],
  ["zona de confort", "zona nyaman jiwa"],
  ["Zona de Confort", "Zona Nyaman Jiwa"],
  ["zona de conforto da alma", "zona nyaman jiwa"],
  ["Seelen-Komfortzone", "zona nyaman jiwa"],
  ["zona de talentos", "zona bakat"],
  ["Zona de Talentos", "Zona Bakat"],
  ["Talentzone", "zona bakat"],
  ["cuadrado de la Tierra", "persegi Bumi"],
  ["Cuadrado de la Tierra", "Persegi Bumi"],
  ["cuadrado del Cielo", "persegi Langit"],
  ["Cuadrado del Cielo", "Persegi Langit"],
  ["Erdquadrat", "persegi Bumi"],
  ["Himmelsquadrat", "persegi Langit"],
  ["estrella de ocho puntas", "bintang segi delapan"],
  ["Estrella de ocho puntas", "Bintang segi delapan"],
  ["octagrama", "oktagram"],
  ["Oktagramm", "oktagram"],
  ["año solar", "tahun matahari"],
  ["fecha de nacimiento", "tanggal lahir"],
  ["Fecha de nacimiento", "Tanggal lahir"],
  ["Geburtsdatum", "tanggal lahir"],
  ["día de nacimiento", "hari lahir"],
  ["Día de nacimiento", "Hari lahir"],
  ["Geburtstag", "hari lahir"],
  ["mes de nacimiento", "bulan lahir"],
  ["Mes de nacimiento", "Bulan lahir"],
  ["Geburtsmonat", "bulan lahir"],
  ["centro del alma", "titik pusat jiwa"],
  ["Centro del Alma", "Titik Pusat Jiwa"],
  ["Seelenzentrum", "titik pusat jiwa"],

  // 22 Arcana
  ["El Loco", "Sang Pengelana"],
  ["O Louco", "Sang Pengelana"],
  ["Der Narr", "Sang Pengelana"],
  ["El Mago", "Sang Penyihir"],
  ["O Mago", "Sang Penyihir"],
  ["Der Magier", "Sang Penyihir"],
  ["La Sacerdotisa", "Sang Pendeta Agung Wanita"],
  ["A Sacerdotisa", "Sang Pendeta Agung Wanita"],
  ["Die Hohepriesterin", "Sang Pendeta Agung Wanita"],
  ["La Emperatriz", "Sang Permaisuri"],
  ["A Imperatriz", "Sang Permaisuri"],
  ["Die Herrscherin", "Sang Permaisuri"],
  ["El Emperador", "Sang Kaisar"],
  ["O Imperador", "Sang Kaisar"],
  ["Der Herrscher", "Sang Kaisar"],
  ["El Sumo Sacerdote", "Sang Guru Suci"],
  ["El Hierofante", "Sang Guru Suci"],
  ["O Hierofante", "Sang Guru Suci"],
  ["Der Hierophant", "Sang Guru Suci"],
  ["Los Enamorados", "Sang Kekasih"],
  ["Os Enamorados", "Sang Kekasih"],
  ["Die Liebenden", "Sang Kekasih"],
  ["El Carro", "Kereta Perang"],
  ["O Carro", "Kereta Perang"],
  ["Der Wagen", "Kereta Perang"],
  ["La Justicia", "Keadilan"],
  ["A Justiça", "Keadilan"],
  ["Die Gerechtigkeit", "Keadilan"],
  ["El Ermitaño", "Sang Pertapa"],
  ["O Eremita", "Sang Pertapa"],
  ["Der Eremit", "Sang Pertapa"],
  ["La Rueda de la Fortuna", "Roda Keberuntungan"],
  ["A Roda da Fortuna", "Roda Keberuntungan"],
  ["Das Rad des Schicksals", "Roda Keberuntungan"],
  ["La Fuerza", "Kekuatan"],
  ["A Força", "Kekuatan"],
  ["Die Kraft", "Kekuatan"],
  ["El Colgado", "Sang Pria Tergantung"],
  ["O Enforcado", "Sang Pria Tergantung"],
  ["Der Gehängte", "Sang Pria Tergantung"],
  ["La Muerte", "Kematian"],
  ["A Morte", "Kematian"],
  ["Der Tod", "Kematian"],
  ["La Templanza", "Keseimbangan"],
  ["A Temperança", "Keseimbangan"],
  ["Die Mäßigkeit", "Keseimbangan"],
  ["El Diablo", "Sang Iblis"],
  ["O Diabo", "Sang Iblis"],
  ["Der Teufel", "Sang Iblis"],
  ["La Torre", "Menara"],
  ["A Torre", "Menara"],
  ["Der Turm", "Menara"],
  ["La Estrella", "Bintang"],
  ["A Estrela", "Bintang"],
  ["Der Stern", "Bintang"],
  ["La Luna", "Bulan"],
  ["A Lua", "Bulan"],
  ["Der Mond", "Bulan"],
  ["El Sol", "Matahari"],
  ["O Sol", "Matahari"],
  ["Die Sonne", "Matahari"],
  ["El Juicio", "Kebangkitan Jiwa"],
  ["O Julgamento", "Kebangkitan Jiwa"],
  ["Das Gericht", "Kebangkitan Jiwa"],
  ["El Mundo", "Dunia"],
  ["O Mundo", "Dunia"],
  ["Die Welt", "Dunia"],
  ["Arcano", "Arkana"],
  ["arcano", "arkana"],
  ["Arcanos", "Arkana"],
  ["arcanos", "arkana"],

  // Questions and connectors
  ["Por qué", "Mengapa"],
  ["por qué", "mengapa"],
  ["Cómo", "Bagaimana"],
  ["cómo", "bagaimana"],
  ["Qué", "Apa"],
  ["qué", "apa"],
  ["Cuál", "Manakah"],
  ["cuál", "manakah"],
  ["Cuáles", "Apa saja"],
  ["cuáles", "apa saja"],
  ["Quién", "Siapa"],
  ["quién", "siapa"],
  ["Dónde", "Di mana"],
  ["dónde", "di mana"],
  ["Cuándo", "Kapan"],
  ["cuándo", "kapan"],
  ["Cuánto", "Berapa"],
  ["cuánto", "berapa"],
  ["Cuántos", "Berapa banyak"],
  ["cuántos", "berapa banyak"],
  ["También", "Juga"],
  ["también", "juga"],
  ["Além disso", "Selain itu"],
  ["além disso", "selain itu"],
  ["Además", "Selain itu"],
  ["además", "selain itu"],
  ["Sin embargo", "Namun"],
  ["sin embargo", "namun"],
  ["No obstante", "Meskipun demikian"],
  ["no obstante", "meskipun demikian"],
  ["Por lo tanto", "Oleh karena itu"],
  ["por lo tanto", "oleh karena itu"],
  ["Asimismo", "Demikian pula"],
  ["asimismo", "demikian pula"],
  ["Sementara itu", "Sementara itu"],
  ["mientras que", "sedangkan"],
  ["Mientras", "Sementara"],
  ["mientras", "sementara"],
  ["Aunque", "Meskipun"],
  ["aunque", "meskipun"],
  ["A pesar de", "Meskipun"],
  ["a pesar de", "meskipun"],
  ["Debido a", "Karena"],
  ["debido a", "karena"],
  ["A través de", "Melalui"],
  ["a través de", "melalui"],
  ["Mediante", "Melalui"],
  ["mediante", "melalui"],
  ["Desde", "Dari"],
  ["desde", "dari"],
  ["Hasta", "Hingga"],
  ["hasta", "hingga"],
  ["Setelah", "Setelah"],
  ["depois de", "setelah"],
  ["después de", "setelah"],
  ["Sebelum", "Sebelum"],
  ["antes de", "sebelum"],
  ["Selalu", "Selalu"],
  ["siempre", "selalu"],
  ["Tidak pernah", "Tidak pernah"],
  ["nunca", "tidak pernah"],
  ["Todos los", "Semua"],
  ["todos los", "semua"],
  ["Todas las", "Semua"],
  ["todas las", "semua"],
  ["Todo el", "Seluruh"],
  ["todo el", "seluruh"],
  ["Toda la", "Seluruh"],
  ["toda la", "seluruh"],
  ["Nuestro", "Kami"],
  ["nuestro", "kami"],
  ["Nuestra", "Kami"],
  ["nuestra", "kami"],
  ["Por ejemplo", "Sebagai contoh"],
  ["por ejemplo", "sebagai contoh"],
  ["Es decir", "Artinya"],
  ["es decir", "artinya"],
  ["Esto significa", "Hal ini berarti"],
  ["esto significa", "hal ini berarti"],
  ["Esto se debe", "Hal ini disebabkan oleh"],
  ["esto se debe", "hal ini disebabkan oleh"],
  ["En primer lugar", "Pertama"],
  ["en primer lugar", "pertama"],
  ["En segundo lugar", "Kedua"],
  ["en segundo lugar", "kedua"],

  // Vocabulary & Domain terms
  ["paso a paso", "langkah demi langkah"],
  ["Paso a paso", "Langkah demi langkah"],
  ["guía completa", "panduan lengkap"],
  ["Guía completa", "Panduan lengkap"],
  ["preguntas frecuentes", "pertanyaan umum"],
  ["Preguntas frecuentes", "Pertanyaan umum"],
  ["autoconocimiento", "pengenalan diri"],
  ["crecimiento personal", "pengembangan diri"],
  ["desarrollo personal", "pengembangan pribadi"],
  ["relaciones", "hubungan"],
  ["relación", "hubungan"],
  ["pareja", "pasangan"],
  ["carrera", "karier"],
  ["profesión", "profesi"],
  ["dinero", "keuangan"],
  ["salud", "kesehatan"],
  ["cuerpo", "tubuh"],
  ["energía", "energi"],
  ["energías", "energi"],
  ["espiritual", "spiritual"],
  ["bloqueo", "hambatan"],
  ["bloqueos", "hambatan"],
  ["lección", "pelajaran"],
  ["lecciones", "pelajaran"],
  ["patrón", "pola"],
  ["patrones", "pola"],
  ["vida", "hidup"],
  ["alma", "jiwa"],
  ["destino", "takdir"],
  ["origen", "asal-usul"],
  ["método", "metode"],
  ["sistema", "sistem"],
  ["guía", "panduan"],
  ["consejo", "saran"],
  ["ejemplo", "contoh"],
  ["diferencia", "perbedaan"],
  ["comparación", "perbandingan"],
  ["precisión", "ketepatan"],
  ["tabla", "tabel"],
  ["gráfico", "bagan"],
  ["mapa", "peta"],
  ["carta", "bagan"],
  ["cálculo", "perhitungan"],
  ["cálculos", "perhitungan"],
  ["calculadora", "kalkulator"],
  ["calculadoras", "kalkulator"],
  ["número", "angka"],
  ["números", "angka"],
  ["reducción", "reduksi"],
  ["vértice", "titik sudut"],
  ["vértices", "titik sudut"],
  ["línea", "garis"],
  ["líneas", "garis"],
  ["canal", "jalur"],
  ["canales", "jalur"],
  ["punto", "titik"],
  ["puntos", "titik"],
  ["centro", "pusat"],
  ["sombra", "bayangan"],
  ["sombras", "bayangan"],
  ["luz", "cahaya"],
  ["positivo", "positif"],
  ["negativo", "negatif"],
  ["equilibrio", "keseimbangan"],
  ["armonía", "keharmonisan"],
  ["desafío", "tantangan"],
  ["obstáculo", "rintangan"],
  ["propósito", "tujuan hidup"],
  ["misión", "misi jiwa"],
  ["vocación", "panggilan jiwa"],
  ["talento", "bakat"],
  ["talentos", "bakat"],
  ["potencial", "potensi"],
  ["arquetipo", "arketipe"],
  ["arquetipos", "arketipe"],
  ["filosofía", "filosofi"],
  ["ancestral", "leluhur"],
  ["linaje", "garis keturunan"],
  ["familia", "keluarga"],
  ["libertad", "kebebasan"],
  ["responsabilidad", "tanggung jawab"],
  ["claridad", "kejelasan"],
  ["éxito", "keberhasilan"],
  ["abundancia", "kelimpahan"],
  ["trabajo", "pekerjaan"],
  ["liderazgo", "kepemimpinan"],
  ["comunicación", "komunikasi"],
  ["creatividad", "kreativitas"],
  ["intuición", "intuisi"],
  ["diario", "jurnal"],
  ["análisis", "analisis"],
  ["interpretación", "interpretasi"],
];

function translateToId(text) {
  if (typeof text !== "string") return text;
  let res = text;
  for (const [from, to] of exactReplacements) {
    const escaped = from.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    res = res.replace(new RegExp(`\\b${escaped}\\b`, "g"), to);
  }

  // Indonesian polite styling
  res = res
    .replace(/\bDescubre\b/g, "Temukan")
    .replace(/\bdescubre\b/g, "temukan")
    .replace(/\bAprende\b/g, "Pelajari")
    .replace(/\baprende\b/g, "pelajari")
    .replace(/\bCalcula\b/g, "Hitung")
    .replace(/\bcalcula\b/g, "hitung")
    .replace(/\bExplora\b/g, "Jelajahi")
    .replace(/\bexplora\b/g, "jelajahi")
    .replace(/\bComprende\b/g, "Pahami")
    .replace(/\bcomprende\b/g, "pahami")
    .replace(/\bRevisa\b/g, "Periksa")
    .replace(/\brevisa\b/g, "periksa")
    .replace(/\bConsulta\b/g, "Gunakan")
    .replace(/\bconsulta\b/g, "gunakan")
    .replace(/\bCompara\b/g, "Bandingkan")
    .replace(/\bcompara\b/g, "bandingkan")
    .replace(/\bpuedes\b/g, "Anda dapat")
    .replace(/\bdebes\b/g, "Anda perlu")
    .replace(/\btienes\b/g, "Anda memiliki")
    .replace(/\bquieres\b/g, "Anda ingin")
    .replace(/\bsabes\b/g, "Anda mengetahui")
    .replace(/\bnecesitas\b/g, "Anda membutuhkan")
    .replace(/\bvocê pode\b/g, "Anda dapat")
    .replace(/\bvocê deve\b/g, "Anda perlu")
    .replace(/\bvocê tem\b/g, "Anda memiliki")
    .replace(/\bvocê precisa\b/g, "Anda membutuhkan");

  res = res.replace(/  +/g, " ").trim();
  return res;
}

function processArticleId(article) {
  const slug = article.slug;
  const translated = {
    slug,
    title: translateToId(article.title),
    metaTitle: translateToId(article.metaTitle).slice(0, 59),
    metaDescription: translateToId(article.metaDescription).slice(0, 154),
    excerpt: translateToId(article.excerpt),
    category: article.category,
    publishedAt: article.publishedAt,
    updatedAt: "2026-10-10",
    readingTimeMinutes: article.readingTimeMinutes,
    mainKeyword: translateToId(article.mainKeyword),
    author: {
      name: "Tim Redaksi Matriks Takdir",
      role: "Penelitian Arketipe & Matriks",
      bio: "Spesialis metodologi Matriks Takdir dan sarana refleksi diri arketipal.",
    },
    heroImage: {
      src: article.heroImage.src,
      alt: translateToId(article.heroImage.alt),
      width: 1600,
      height: 900,
      blurDataURL: `blurMap["${slug}"]`,
    },
    tableOfContents: (article.tableOfContents || []).map((item) => ({
      title: translateToId(item.title),
      slug: item.slug,
    })),
    sections: (article.sections || []).map((section) => ({
      heading: translateToId(section.heading),
      slug: section.slug,
      paragraphs: (section.paragraphs || []).map(translateToId),
      ...(section.callout
        ? {
            callout: {
              title: translateToId(section.callout.title),
              text: translateToId(section.callout.text),
            },
          }
        : {}),
      ...(section.table
        ? {
            table: {
              headers: section.table.headers.map(translateToId),
              rows: section.table.rows.map((row) => row.map(translateToId)),
            },
          }
        : {}),
    })),
    faqs: (article.faqs || []).map((faq) => ({
      question: translateToId(faq.question),
      answer: translateToId(faq.answer),
    })),
    ...(article.balancedShadowBlock
      ? {
          balancedShadowBlock: {
            arcanaNumber: article.balancedShadowBlock.arcanaNumber,
            arcanaName: translateToId(article.balancedShadowBlock.arcanaName),
            balanced: translateToId(article.balancedShadowBlock.balanced),
            shadow: translateToId(article.balancedShadowBlock.shadow),
            advice: translateToId(article.balancedShadowBlock.advice),
          },
        }
      : {}),
    relatedSlugs: article.relatedSlugs || [],
    cta: {
      title: translateToId(article.cta?.title || "Hitung Matriks Takdir Anda"),
      description: translateToId(
        article.cta?.description || "Jelajahi bagan arketipe lengkap Anda dengan rumus klasik yang transparan."
      ),
      buttonText: translateToId(article.cta?.buttonText || "Hitung Matriks Takdir"),
      buttonLink: (article.cta?.buttonLink || "/es").replace(/\/(es|pt-br|de)/, "/id"),
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
fs.mkdirSync(path.join(rootDir, "src/content/localized/blog/id"), { recursive: true });

for (let b = 1; b <= 6; b++) {
  const raw = fs.readFileSync(path.join(rootDir, `src/content/localized/blog/es/batch-${b}.ts`), "utf-8");
  const code = raw
    .replace(/import .*\n/g, "")
    .replace("const blurMap = blurMapRaw as Record<string, string>;", "")
    .replace(new RegExp(`export const esBatch${b}Articles: BlogPost\\[\\] =`), "return");
  const fn = new Function("blurMap", code);
  const esArticles = fn(blurMap);

  const idArticles = esArticles.map(processArticleId);

  let fileContent = `import { BlogPost } from "@/content/blog/types";
import blurMapRaw from "@/content/blog/blur-map.json";

const blurMap = blurMapRaw as Record<string, string>;

export const idBatch${b}Articles: BlogPost[] = [
`;

  for (let i = 0; i < idArticles.length; i++) {
    fileContent += `  ${formatArticleToTs(idArticles[i])}${i < idArticles.length - 1 ? "," : ""}\n`;
  }
  fileContent += `];\n`;

  const targetPath = path.join(rootDir, `src/content/localized/blog/id/batch-${b}.ts`);
  fs.writeFileSync(targetPath, fileContent, "utf-8");
  console.log(`Generated id batch-${b}.ts with ${idArticles.length} articles`);
}

// Generate index.ts
const indexContent = `import { BlogPost } from "@/content/blog/types";
import { idBatch1Articles } from "./batch-1";
import { idBatch2Articles } from "./batch-2";
import { idBatch3Articles } from "./batch-3";
import { idBatch4Articles } from "./batch-4";
import { idBatch5Articles } from "./batch-5";
import { idBatch6Articles } from "./batch-6";

export const idBlogArticles: BlogPost[] = [
  ...idBatch1Articles,
  ...idBatch2Articles,
  ...idBatch3Articles,
  ...idBatch4Articles,
  ...idBatch5Articles,
  ...idBatch6Articles,
];

export function getIdArticleBySlug(slug: string): BlogPost | undefined {
  return idBlogArticles.find((article) => article.slug === slug);
}

export function getAllIdArticles(): BlogPost[] {
  return idBlogArticles;
}

export {
  idBatch1Articles,
  idBatch2Articles,
  idBatch3Articles,
  idBatch4Articles,
  idBatch5Articles,
  idBatch6Articles,
};
`;

fs.writeFileSync(path.join(rootDir, "src/content/localized/blog/id/index.ts"), indexContent, "utf-8");
console.log("Generated id index.ts");

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
  const proxyContent = `import { getIdArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getIdArticleBySlug("${slug}");
export default article;
`;
  fs.writeFileSync(path.join(rootDir, `src/content/localized/blog/id/${slug}.ts`), proxyContent, "utf-8");
}
console.log(`Generated 35 proxy files in id`);
