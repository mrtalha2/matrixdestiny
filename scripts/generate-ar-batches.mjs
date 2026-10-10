import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const blurMap = JSON.parse(fs.readFileSync(path.join(rootDir, "src/content/blog/blur-map.json"), "utf-8"));

// Translation and glossary dictionary for Spanish/English -> Arabic
const exactReplacements = [
  // Links
  ["/es/", "/ar/"],
  ["/es\"", "/ar\""],
  ["/es'", "/ar'"],
  ["/es)", "/ar)"],
  ["/pt-br/", "/ar/"],
  ["/de/", "/ar/"],
  ["/id/", "/ar/"],

  // Core terms
  ["Matriz del Destino", "مصفوفة القدر"],
  ["matriz del destino", "مصفوفة القدر"],
  ["Matriz do Destino", "مصفوفة القدر"],
  ["Matrix of Destiny", "مصفوفة القدر"],
  ["Destiny Matrix", "مصفوفة القدر"],
  ["Matrix des Schicksals", "مصفوفة القدر"],
  ["Schicksalsmatrix", "مصفوفة القدر"],
  ["Matriks Takdir", "مصفوفة القدر"],
  ["cola kármica", "الذيل الكارمي"],
  ["colas kármicas", "الذيول الكارمية"],
  ["Cola Kármica", "الذيل الكارمي"],
  ["cauda cármica", "الذيل الكارمي"],
  ["karmischer Schwanz", "الذيل الكارمي"],
  ["ekor karma", "الذيل الكارمي"],
  ["línea del amor", "خط الحب"],
  ["Línea del Amor", "خط الحب"],
  ["canal del amor", "قناة العلاقات"],
  ["linha do amor", "خط الحب"],
  ["Liebeslinie", "خط الحب"],
  ["garis cinta", "خط الحب"],
  ["línea del dinero", "خط المال"],
  ["Línea del Dinero", "خط المال"],
  ["canal del dinero", "قناة الوفرة"],
  ["Canal del Dinero", "قناة الوفرة"],
  ["canal financiero", "قناة المال"],
  ["linha do dinheiro", "خط المال"],
  ["Geldlinie", "خط المال"],
  ["Finanzkanal", "قناة الوفرة"],
  ["garis keuangan", "خط المال"],
  ["zona de confort", "منطقة راحة الروح"],
  ["Zona de Confort", "منطقة راحة الروح"],
  ["zona de conforto da alma", "منطقة راحة الروح"],
  ["Seelen-Komfortzone", "منطقة راحة الروح"],
  ["zona nyaman jiwa", "منطقة راحة الروح"],
  ["zona de talentos", "منطقة المواهب"],
  ["Zona de Talentos", "منطقة المواهب"],
  ["Talentzone", "منطقة المواهب"],
  ["zona bakat", "منطقة المواهب"],
  ["cuadrado de la Tierra", "مربع الأرض"],
  ["Cuadrado de la Tierra", "مربع الأرض"],
  ["cuadrado del Cielo", "مربع السماء"],
  ["Cuadrado del Cielo", "مربع السماء"],
  ["Erdquadrat", "مربع الأرض"],
  ["Himmelsquadrat", "مربع السماء"],
  ["persegi Bumi", "مربع الأرض"],
  ["persegi Langit", "مربع السماء"],
  ["estrella de ocho puntas", "النجمة الثمانية"],
  ["Estrella de ocho puntas", "النجمة الثمانية"],
  ["octagrama", "الأوكتغرام"],
  ["Oktagramm", "الأوكتغرام"],
  ["oktagram", "الأوكتغرام"],
  ["año solar", "السنة الشمسية"],
  ["fecha de nacimiento", "تاريخ الميلاد"],
  ["Fecha de nacimiento", "تاريخ الميلاد"],
  ["Geburtsdatum", "تاريخ الميلاد"],
  ["tanggal lahir", "تاريخ الميلاد"],
  ["día de nacimiento", "يوم الميلاد"],
  ["Día de nacimiento", "يوم الميلاد"],
  ["Geburtstag", "يوم الميلاد"],
  ["hari lahir", "يوم الميلاد"],
  ["mes de nacimiento", "شهر الميلاد"],
  ["Mes de nacimiento", "شهر الميلاد"],
  ["Geburtsmonat", "شهر الميلاد"],
  ["bulan lahir", "شهر الميلاد"],
  ["centro del alma", "المركز الروحي"],
  ["Centro del Alma", "المركز الروحي"],
  ["Seelenzentrum", "المركز الروحي"],
  ["titik pusat jiwa", "المركز الروحي"],

  // 22 Arcana
  ["El Loco", "الرحالة"],
  ["O Louco", "الرحالة"],
  ["Der Narr", "الرحالة"],
  ["Sang Pengelana", "الرحالة"],
  ["El Mago", "الساحر"],
  ["O Mago", "الساحر"],
  ["Der Magier", "الساحر"],
  ["Sang Penyihir", "الساحر"],
  ["La Sacerdotisa", "الكاهنة الكبرى"],
  ["A Sacerdotisa", "الكاهنة الكبرى"],
  ["Die Hohepriesterin", "الكاهنة الكبرى"],
  ["Sang Pendeta Agung Wanita", "الكاهنة الكبرى"],
  ["La Emperatriz", "الإمبراطورة"],
  ["A Imperatriz", "الإمبراطورة"],
  ["Die Herrscherin", "الإمبراطورة"],
  ["Sang Permaisuri", "الإمبراطورة"],
  ["El Emperador", "الإمبراطور"],
  ["O Imperador", "الإمبراطور"],
  ["Der Herrscher", "الإمبراطور"],
  ["Sang Kaisar", "الإمبراطور"],
  ["El Sumo Sacerdote", "الحكيم الروحي"],
  ["El Hierofante", "الحكيم الروحي"],
  ["O Hierofante", "الحكيم الروحي"],
  ["Der Hierophant", "الحكيم الروحي"],
  ["Sang Guru Suci", "الحكيم الروحي"],
  ["Los Enamorados", "العشاق"],
  ["Os Enamorados", "العشاق"],
  ["Die Liebenden", "العشاق"],
  ["Sang Kekasih", "العشاق"],
  ["El Carro", "العربة"],
  ["O Carro", "العربة"],
  ["Der Wagen", "العربة"],
  ["Kereta Perang", "العربة"],
  ["La Justicia", "العدالة"],
  ["A Justiça", "العدالة"],
  ["Die Gerechtigkeit", "العدالة"],
  ["Keadilan", "العدالة"],
  ["El Ermitaño", "الناسك"],
  ["O Eremita", "الناسك"],
  ["Der Eremit", "الناسك"],
  ["Sang Pertapa", "الناسك"],
  ["La Rueda de la Fortuna", "عجلة الحظ"],
  ["A Roda da Fortuna", "عجلة الحظ"],
  ["Das Rad des Schicksals", "عجلة الحظ"],
  ["Roda Keberuntungan", "عجلة الحظ"],
  ["La Fuerza", "القوة"],
  ["A Força", "القوة"],
  ["Die Kraft", "القوة"],
  ["Kekuatan", "القوة"],
  ["El Colgado", "المعلق"],
  ["O Enforcado", "المعلق"],
  ["Der Gehängte", "المعلق"],
  ["Sang Pria Tergantung", "المعلق"],
  ["La Muerte", "الموت والتحول"],
  ["A Morte", "الموت والتحول"],
  ["Der Tod", "الموت والتحول"],
  ["Kematian", "الموت والتحول"],
  ["La Templanza", "الاعتدال"],
  ["A Temperança", "الاعتدال"],
  ["Die Mäßigkeit", "الاعتدال"],
  ["Keseimbangan", "الاعتدال"],
  ["El Diablo", "الشيطان"],
  ["O Diabo", "الشيطان"],
  ["Der Teufel", "الشيطان"],
  ["Sang Iblis", "الشيطان"],
  ["La Torre", "البرج"],
  ["A Torre", "البرج"],
  ["Der Turm", "البرج"],
  ["Menara", "البرج"],
  ["La Estrella", "النجم"],
  ["A Estrela", "النجم"],
  ["Der Stern", "النجم"],
  ["Bintang", "النجم"],
  ["La Luna", "القمر"],
  ["A Lua", "القمر"],
  ["Der Mond", "القمر"],
  ["Bulan", "القمر"],
  ["El Sol", "الشمس"],
  ["O Sol", "الشمس"],
  ["Die Sonne", "الشمس"],
  ["Matahari", "الشمس"],
  ["El Juicio", "القيامة الروحية"],
  ["O Julgamento", "القيامة الروحية"],
  ["Das Gericht", "القيامة الروحية"],
  ["Kebangkitan Jiwa", "القيامة الروحية"],
  ["El Mundo", "العالم"],
  ["O Mundo", "العالم"],
  ["Die Welt", "العالم"],
  ["Dunia", "العالم"],
  ["Arcano", "الأركانا"],
  ["arcano", "الأركانا"],
  ["Arcanos", "الأركانا"],
  ["arcanos", "الأركانا"],

  // Connectors and questions
  ["Por qué", "لماذا"],
  ["por qué", "لماذا"],
  ["Cómo", "كيف"],
  ["cómo", "كيف"],
  ["Qué", "ماذا"],
  ["qué", "ما"],
  ["Cuál", "ما هو"],
  ["cuál", "ما هي"],
  ["Cuáles", "ما هي"],
  ["cuáles", "ما هي"],
  ["Quién", "من"],
  ["quién", "من"],
  ["Dónde", "أين"],
  ["dónde", "أين"],
  ["Cuándo", "متى"],
  ["cuándo", "متى"],
  ["Cuánto", "كم"],
  ["cuánto", "كم"],
  ["Cuántos", "كم عدد"],
  ["cuántos", "كم عدد"],
  ["También", "أيضاً"],
  ["también", "أيضاً"],
  ["Además", "بالإضافة إلى ذلك"],
  ["además", "بالإضافة إلى ذلك"],
  ["Sin embargo", "ومع ذلك"],
  ["sin embargo", "ومع ذلك"],
  ["No obstante", "غير أن"],
  ["no obstante", "غير أن"],
  ["Por lo tanto", "وبالتالي"],
  ["por lo tanto", "وبالتالي"],
  ["Asimismo", "كذلك"],
  ["asimismo", "كذلك"],
  ["Mientras que", "في حين أن"],
  ["mientras que", "في حين أن"],
  ["Mientras", "بينما"],
  ["mientras", "بينما"],
  ["Aunque", "على الرغم من أن"],
  ["aunque", "على الرغم من أن"],
  ["A pesar de", "على الرغم من"],
  ["a pesar de", "على الرغم من"],
  ["Debido a", "بسبب"],
  ["debido a", "بسبب"],
  ["A través de", "من خلال"],
  ["a través de", "من خلال"],
  ["Mediante", "بواسطة"],
  ["mediante", "بواسطة"],
  ["Desde", "من"],
  ["desde", "من"],
  ["Hasta", "حتى"],
  ["hasta", "حتى"],
  ["Después de", "بعد"],
  ["después de", "بعد"],
  ["Antes de", "قبل"],
  ["antes de", "قبل"],
  ["Siempre", "دائماً"],
  ["siempre", "دائماً"],
  ["Nunca", "أبداً"],
  ["nunca", "أبداً"],
  ["Todos los", "جميع"],
  ["todos los", "جميع"],
  ["Todas las", "كافة"],
  ["todas las", "كافة"],
  ["Todo el", "كامل"],
  ["todo el", "كامل"],
  ["Toda la", "كامل"],
  ["toda la", "كامل"],
  ["Nuestro", "فريقنا"],
  ["nuestro", "لدينا"],
  ["Nuestra", "منصتنا"],
  ["nuestra", "لدينا"],
  ["Por ejemplo", "على سبيل المثال"],
  ["por ejemplo", "على سبيل المثال"],
  ["Es decir", "أي"],
  ["es decir", "أي"],
  ["Esto significa", "يعني هذا"],
  ["esto significa", "يعني هذا"],
  ["Esto se debe", "يرجع هذا إلى"],
  ["esto se debe", "يرجع هذا إلى"],
  ["En primer lugar", "أولاً"],
  ["en primer lugar", "أولاً"],
  ["En segundo lugar", "ثانياً"],
  ["en segundo lugar", "ثانياً"],

  // Domain terms & vocabulary
  ["paso a paso", "خطوة بخطوة"],
  ["Paso a paso", "خطوة بخطوة"],
  ["guía completa", "دليل شامل"],
  ["Guía completa", "دليل شامل"],
  ["preguntas frecuentes", "الأسئلة الشائعة"],
  ["Preguntas frecuentes", "الأسئلة الشائعة"],
  ["autoconocimiento", "الوعي الذاتي"],
  ["crecimiento personal", "التطور الشخصي"],
  ["desarrollo personal", "تطوير الذات"],
  ["relaciones", "العلاقات"],
  ["relación", "العلاقة"],
  ["pareja", "الشريك"],
  ["carrera", "المسار المهني"],
  ["profesión", "المهنة"],
  ["dinero", "المال والوفرة"],
  ["salud", "الصحة"],
  ["cuerpo", "الجسد"],
  ["energía", "الطاقة"],
  ["energías", "الطاقات"],
  ["espiritual", "روحي"],
  ["bloqueo", "العائق"],
  ["bloqueos", "العوائق"],
  ["lección", "الدرس"],
  ["lecciones", "الدروس الكارمية"],
  ["patrón", "النمط"],
  ["patrones", "الأنماط النفسية"],
  ["vida", "الحياة"],
  ["alma", "الروح"],
  ["destino", "القدر"],
  ["origen", "الأصل والنشأة"],
  ["método", "المنهج"],
  ["sistema", "النظام"],
  ["guía", "الدليل"],
  ["consejo", "النصيحة"],
  ["ejemplo", "مثال"],
  ["diferencia", "الفرق"],
  ["comparación", "المقارنة"],
  ["precisión", "الدقة الحسابية"],
  ["tabla", "جدول"],
  ["gráfico", "المخطط"],
  ["mapa", "الخريطة"],
  ["carta", "المخطط"],
  ["cálculo", "الحساب"],
  ["cálculos", "الحسابات"],
  ["calculadora", "حاسبة"],
  ["calculadoras", "حاسبات"],
  ["número", "الرقم"],
  ["números", "الأرقام"],
  ["reducción", "الاختزال الحسابي"],
  ["vértice", "نقطة الرأس"],
  ["vértices", "نقاط الرؤوس"],
  ["línea", "خط"],
  ["líneas", "المحاور"],
  ["canal", "قناة"],
  ["canales", "القنوات"],
  ["punto", "نقطة"],
  ["puntos", "النقاط"],
  ["centro", "المركز"],
  ["sombra", "الظل"],
  ["sombras", "حالات الظل"],
  ["luz", "النور"],
  ["positivo", "إيجابي"],
  ["negativo", "سلبي"],
  ["equilibrio", "التوازن"],
  ["armonía", "الانسجام"],
  ["desafío", "التحدي"],
  ["obstáculo", "العقبة"],
  ["propósito", "الغاية الحياتية"],
  ["misión", "رسالة الروح"],
  ["vocación", "الشغف والنداء الداخلي"],
  ["talento", "الموهبة"],
  ["talentos", "المواهب الكامنة"],
  ["potencial", "الإمكانات"],
  ["arquetipo", "النموذج الأصلي"],
  ["arquetipos", "النماذج النفسية الأصلية"],
  ["filosofía", "الفلسفة الرمزية"],
  ["ancestral", "الأسلافي"],
  ["linaje", "سلالة الأجداد"],
  ["familia", "العائلة"],
  ["libertad", "حرية الإرادة"],
  ["responsabilidad", "المسؤولية الفردية"],
  ["claridad", "الوضوح"],
  ["éxito", "النجاح"],
  ["abundancia", "الوفرة والازدهار"],
  ["trabajo", "العمل"],
  ["liderazgo", "القيادة"],
  ["comunicación", "التواصل"],
  ["creatividad", "الإبداع"],
  ["intuición", "الحدس"],
  ["diario", "اليوميات التأملية"],
  ["análisis", "التحليل"],
  ["interpretación", "التفسير"],
];

function translateToAr(text) {
  if (typeof text !== "string") return text;
  let res = text;
  for (const [from, to] of exactReplacements) {
    const escaped = from.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    res = res.replace(new RegExp(`\\b${escaped}\\b`, "g"), to);
  }

  // Common Arabic action verbs
  res = res
    .replace(/\bDescubre\b/g, "اكتشف")
    .replace(/\bdescubre\b/g, "اكتشف")
    .replace(/\bAprende\b/g, "تعرف على")
    .replace(/\baprende\b/g, "تعرف على")
    .replace(/\bCalcula\b/g, "احسب")
    .replace(/\bcalcula\b/g, "احسب")
    .replace(/\bExplora\b/g, "استكشف")
    .replace(/\bexplora\b/g, "استكشف")
    .replace(/\bComprende\b/g, "افهم")
    .replace(/\bcomprende\b/g, "افهم")
    .replace(/\bRevisa\b/g, "راجع")
    .replace(/\brevisa\b/g, "راجع")
    .replace(/\bConsulta\b/g, "استخدم")
    .replace(/\bconsulta\b/g, "استخدم")
    .replace(/\bCompara\b/g, "قارن")
    .replace(/\bcompara\b/g, "قارن")
    .replace(/\bpuedes\b/g, "يمكنك")
    .replace(/\bdebes\b/g, "ينبغي عليك")
    .replace(/\btienes\b/g, "لديك")
    .replace(/\bquieres\b/g, "ترغب في")
    .replace(/\bsabes\b/g, "تعلم")
    .replace(/\bnecesitas\b/g, "تحتاج إلى");

  res = res.replace(/  +/g, " ").trim();
  return res;
}

function processArticleAr(article) {
  const slug = article.slug;
  const translated = {
    slug,
    title: translateToAr(article.title),
    metaTitle: translateToAr(article.metaTitle).slice(0, 59),
    metaDescription: translateToAr(article.metaDescription).slice(0, 154),
    excerpt: translateToAr(article.excerpt),
    category: article.category,
    publishedAt: article.publishedAt,
    updatedAt: "2026-10-10",
    readingTimeMinutes: article.readingTimeMinutes,
    mainKeyword: translateToAr(article.mainKeyword),
    author: {
      name: "فريق تحرير مصفوفة القدر",
      role: "أبحاث النماذج النفسية والمصفوفة",
      bio: "متخصصون في منهجية مصفوفة القدر وأدوات التأمل والوعي الذاتي الأصيل.",
    },
    heroImage: {
      src: article.heroImage.src,
      alt: translateToAr(article.heroImage.alt),
      width: 1600,
      height: 900,
      blurDataURL: `blurMap["${slug}"]`,
    },
    tableOfContents: (article.tableOfContents || []).map((item) => ({
      title: translateToAr(item.title),
      slug: item.slug,
    })),
    sections: (article.sections || []).map((section) => ({
      heading: translateToAr(section.heading),
      slug: section.slug,
      paragraphs: (section.paragraphs || []).map(translateToAr),
      ...(section.callout
        ? {
            callout: {
              title: translateToAr(section.callout.title),
              text: translateToAr(section.callout.text),
            },
          }
        : {}),
      ...(section.table
        ? {
            table: {
              headers: section.table.headers.map(translateToAr),
              rows: section.table.rows.map((row) => row.map(translateToAr)),
            },
          }
        : {}),
    })),
    faqs: (article.faqs || []).map((faq) => ({
      question: translateToAr(faq.question),
      answer: translateToAr(faq.answer),
    })),
    ...(article.balancedShadowBlock
      ? {
          balancedShadowBlock: {
            arcanaNumber: article.balancedShadowBlock.arcanaNumber,
            arcanaName: translateToAr(article.balancedShadowBlock.arcanaName),
            balanced: translateToAr(article.balancedShadowBlock.balanced),
            shadow: translateToAr(article.balancedShadowBlock.shadow),
            advice: translateToAr(article.balancedShadowBlock.advice),
          },
        }
      : {}),
    relatedSlugs: article.relatedSlugs || [],
    cta: {
      title: translateToAr(article.cta?.title || "احسب مصفوفة القدر الخاصة بك"),
      description: translateToAr(
        article.cta?.description || "استكشف خريطتك الرمزية الكاملة مع الخوارزمية الكلاسيكية الشفافة مجاناً."
      ),
      buttonText: translateToAr(article.cta?.buttonText || "احسب مصفوفة القدر الآن"),
      buttonLink: (article.cta?.buttonLink || "/es").replace(/\/(es|pt-br|de|id)/, "/ar"),
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
fs.mkdirSync(path.join(rootDir, "src/content/localized/blog/ar"), { recursive: true });

for (let b = 1; b <= 6; b++) {
  const raw = fs.readFileSync(path.join(rootDir, `src/content/localized/blog/es/batch-${b}.ts`), "utf-8");
  const code = raw
    .replace(/import .*\n/g, "")
    .replace("const blurMap = blurMapRaw as Record<string, string>;", "")
    .replace(new RegExp(`export const esBatch${b}Articles: BlogPost\\[\\] =`), "return");
  const fn = new Function("blurMap", code);
  const esArticles = fn(blurMap);

  const arArticles = esArticles.map(processArticleAr);

  let fileContent = `import { BlogPost } from "@/content/blog/types";
import blurMapRaw from "@/content/blog/blur-map.json";

const blurMap = blurMapRaw as Record<string, string>;

export const arBatch${b}Articles: BlogPost[] = [
`;

  for (let i = 0; i < arArticles.length; i++) {
    fileContent += `  ${formatArticleToTs(arArticles[i])}${i < arArticles.length - 1 ? "," : ""}\n`;
  }
  fileContent += `];\n`;

  const targetPath = path.join(rootDir, `src/content/localized/blog/ar/batch-${b}.ts`);
  fs.writeFileSync(targetPath, fileContent, "utf-8");
  console.log(`Generated ar batch-${b}.ts with ${arArticles.length} articles`);
}

// Generate index.ts
const indexContent = `import { BlogPost } from "@/content/blog/types";
import { arBatch1Articles } from "./batch-1";
import { arBatch2Articles } from "./batch-2";
import { arBatch3Articles } from "./batch-3";
import { arBatch4Articles } from "./batch-4";
import { arBatch5Articles } from "./batch-5";
import { arBatch6Articles } from "./batch-6";

export const arBlogArticles: BlogPost[] = [
  ...arBatch1Articles,
  ...arBatch2Articles,
  ...arBatch3Articles,
  ...arBatch4Articles,
  ...arBatch5Articles,
  ...arBatch6Articles,
];

export function getArArticleBySlug(slug: string): BlogPost | undefined {
  return arBlogArticles.find((article) => article.slug === slug);
}

export function getAllArArticles(): BlogPost[] {
  return arBlogArticles;
}

export {
  arBatch1Articles,
  arBatch2Articles,
  arBatch3Articles,
  arBatch4Articles,
  arBatch5Articles,
  arBatch6Articles,
};
`;

fs.writeFileSync(path.join(rootDir, "src/content/localized/blog/ar/index.ts"), indexContent, "utf-8");
console.log("Generated ar index.ts");

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
  const proxyContent = `import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("${slug}");
export default article;
`;
  fs.writeFileSync(path.join(rootDir, `src/content/localized/blog/ar/${slug}.ts`), proxyContent, "utf-8");
}
console.log(`Generated 35 proxy files in ar`);
