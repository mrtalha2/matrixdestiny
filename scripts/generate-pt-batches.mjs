import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const blurMap = JSON.parse(fs.readFileSync(path.join(rootDir, "src/content/blog/blur-map.json"), "utf-8"));

// Domain and grammar glossary for Spanish -> Brazilian Portuguese
const exactReplacements = [
  // Links
  ["/es/", "/pt-br/"],
  ["/es\"", "/pt-br\""],
  ["/es'", "/pt-br'"],
  ["/es)", "/pt-br)"],

  // Core terms
  ["Matriz del Destino", "Matriz do Destino"],
  ["matriz del destino", "matriz do destino"],
  ["cola kármica", "cauda cármica"],
  ["colas kármicas", "caudas cármicas"],
  ["Cola Kármica", "Cauda Cármica"],
  ["Colas Kármicas", "Caudas Cármicas"],
  ["línea del amor", "linha do amor"],
  ["Línea del Amor", "Linha do Amor"],
  ["línea del dinero", "linha do dinheiro"],
  ["Línea del Dinero", "Linha do Dinheiro"],
  ["canal del dinero", "linha do dinheiro"],
  ["Canal del Dinero", "Canal Financeiro"],
  ["canal financiero", "canal financeiro"],
  ["Canal Financiero", "Canal Financeiro"],
  ["zona de confort", "zona de conforto da alma"],
  ["Zona de Confort", "Zona de Conforto da Alma"],
  ["zona de talentos", "zona de talentos"],
  ["Zona de Talentos", "Zona de Talentos"],
  ["cuadrado de la Tierra", "quadrado da Terra"],
  ["Cuadrado de la Tierra", "Quadrado da Terra"],
  ["cuadrado del Cielo", "quadrado do Céu"],
  ["Cuadrado del Cielo", "Quadrado do Céu"],
  ["estrella de ocho puntas", "estrela de oito pontas"],
  ["Estrella de ocho puntas", "Estrela de oito pontas"],
  ["año solar", "ano solar"],
  ["fecha de nacimiento", "data de nascimento"],
  ["Fecha de nacimiento", "Data de nascimento"],
  ["día de nacimiento", "dia de nascimento"],
  ["Día de nacimiento", "Dia de nascimento"],
  ["mes de nacimiento", "mês de nascimento"],
  ["Mes de nacimiento", "Mês de nascimento"],
  ["centro del alma", "centro da alma"],
  ["Centro del Alma", "Centro da Alma"],

  // Arcana names
  ["El Loco", "O Louco"],
  ["El Mago", "O Mago"],
  ["La Sacerdotisa", "A Sacerdotisa"],
  ["La Papisa", "A Papisa"],
  ["La Emperatriz", "A Imperatriz"],
  ["El Emperador", "O Imperador"],
  ["El Sumo Sacerdote", "O Hierofante"],
  ["El Hierofante", "O Hierofante"],
  ["Los Enamorados", "Os Enamorados"],
  ["El Carro", "O Carro"],
  ["La Justicia", "A Justiça"],
  ["El Ermitaño", "O Eremita"],
  ["La Rueda de la Fortuna", "A Roda da Fortuna"],
  ["La Fuerza", "A Força"],
  ["El Colgado", "O Enforcado"],
  ["La Muerte", "A Morte"],
  ["La Templanza", "A Temperança"],
  ["El Diablo", "O Diabo"],
  ["La Torre", "A Torre"],
  ["La Estrella", "A Estrela"],
  ["La Luna", "A Lua"],
  ["El Sol", "O Sol"],
  ["El Juicio", "O Julgamento"],
  ["El Mundo", "O Mundo"],

  // Connectors & frequent expressions
  ["Por qué", "Por que"],
  ["por qué", "por que"],
  ["Cómo", "Como"],
  ["cómo", "como"],
  ["Qué", "O que"],
  ["qué", "o que"],
  ["Cuál", "Qual"],
  ["cuál", "qual"],
  ["Cuáles", "Quais"],
  ["cuáles", "quais"],
  ["Quién", "Quem"],
  ["quién", "quem"],
  ["Dónde", "Onde"],
  ["dónde", "onde"],
  ["Cuándo", "Quando"],
  ["cuándo", "quando"],
  ["Cuánto", "Quanto"],
  ["cuánto", "quanto"],
  ["Cuántos", "Quantos"],
  ["cuántos", "quantos"],
  ["También", "Também"],
  ["también", "também"],
  ["Además", "Além disso"],
  ["además", "além disso"],
  ["Sin embargo", "No entanto"],
  ["sin embargo", "no entanto"],
  ["No obstante", "Contudo"],
  ["no obstante", "contudo"],
  ["Por lo tanto", "Portanto"],
  ["por lo tanto", "portanto"],
  ["Asimismo", "Da mesma forma"],
  ["asimismo", "da mesma forma"],
  ["Mientras que", "Enquanto"],
  ["mientras que", "enquanto"],
  ["Mientras", "Enquanto"],
  ["mientras", "enquanto"],
  ["Aunque", "Embora"],
  ["aunque", "embora"],
  ["A pesar de", "Apesar de"],
  ["a pesar de", "apesar de"],
  ["Debido a", "Devido a"],
  ["debido a", "devido a"],
  ["A través de", "Por meio de"],
  ["a través de", "por meio de"],
  ["Mediante", "Por meio de"],
  ["mediante", "por meio de"],
  ["Hacia", "Em direção a"],
  ["hacia", "em direção a"],
  ["Desde", "Desde"],
  ["desde", "desde"],
  ["Hasta", "Até"],
  ["hasta", "até"],
  ["Después de", "Depois de"],
  ["después de", "depois de"],
  ["Antes de", "Antes de"],
  ["antes de", "antes de"],
  ["Siempre", "Sempre"],
  ["siempre", "sempre"],
  ["Nunca", "Nunca"],
  ["nunca", "nunca"],
  ["Jamás", "Jamais"],
  ["jamás", "jamais"],
  ["Cada uno", "Cada um"],
  ["cada uno", "cada um"],
  ["Cada una", "Cada uma"],
  ["cada una", "cada uma"],
  ["Todos los", "Todos os"],
  ["todos los", "todos os"],
  ["Todas las", "Todas as"],
  ["todas las", "todas as"],
  ["Todo el", "Todo o"],
  ["todo el", "todo o"],
  ["Toda la", "Toda a"],
  ["toda la", "toda a"],
  ["Nuestro", "Nosso"],
  ["nuestro", "nosso"],
  ["Nuestra", "Nossa"],
  ["nuestra", "nossa"],
  ["Nuestros", "Nossos"],
  ["nuestros", "nossos"],
  ["Nuestras", "Nossas"],
  ["nuestras", "nossas"],
  ["Su propio", "Seu próprio"],
  ["su propio", "seu próprio"],
  ["Su propia", "Sua própria"],
  ["su propia", "sua própria"],
  ["Sus propios", "Seus próprios"],
  ["sus propios", "seus próprios"],
  ["Sus propias", "Suas próprias"],
  ["sus propias", "suas próprias"],
  ["Uno de los", "Um dos"],
  ["uno de los", "um dos"],
  ["Una de las", "Uma das"],
  ["una de las", "uma das"],
  ["Al mismo tiempo", "Ao mesmo tempo"],
  ["al mismo tiempo", "ao mesmo tempo"],
  ["De hecho", "Na verdade"],
  ["de hecho", "na verdade"],
  ["En realidad", "Na realidade"],
  ["en realidad", "na realidade"],
  ["Por ejemplo", "Por exemplo"],
  ["por ejemplo", "por exemplo"],
  ["Es decir", "Ou seja"],
  ["es decir", "ou seja"],
  ["Esto significa", "Isso significa"],
  ["esto significa", "isso significa"],
  ["Esto se debe", "Isso se deve"],
  ["esto se debe", "isso se deve"],
  ["En primer lugar", "Em primeiro lugar"],
  ["en primer lugar", "em primeiro lugar"],
  ["En segundo lugar", "Em segundo lugar"],
  ["en segundo lugar", "em segundo lugar"],

  // Verbs & common forms
  ["descubre", "descubra"],
  ["Descubre", "Descubra"],
  ["conoce", "conheça"],
  ["Conoce", "Conheça"],
  ["aprende", "aprenda"],
  ["Aprende", "Aprenda"],
  ["analiza", "analise"],
  ["Analiza", "Analise"],
  ["calcula", "calcule"],
  ["Calcula", "Calcule"],
  ["explora", "explore"],
  ["Explora", "Explore"],
  ["comprende", "compreenda"],
  ["Comprende", "Compreenda"],
  ["identifica", "identifique"],
  ["Identifica", "Identifique"],
  ["transforma", "transforme"],
  ["Transforma", "Transforme"],
  ["revisa", "verifique"],
  ["Revisa", "Verifique"],
  ["consulta", "consulte"],
  ["Consulta", "Consulte"],
  ["compara", "compare"],
  ["Compara", "Compare"],
  ["encuentra", "encontre"],
  ["Encuentra", "Encontre"],
  ["observa", "observe"],
  ["Observa", "Observe"],
  ["evita", "evite"],
  ["Evita", "Evite"],
  ["utiliza", "utilize"],
  ["Utiliza", "Utilize"],
  ["puedes", "você pode"],
  ["debes", "você deve"],
  ["tienes", "você tem"],
  ["quieres", "você quer"],
  ["sabes", "você sabe"],
  ["necesitas", "você precisa"],
  ["sientes", "você sente"],

  // Domain terms & vocabulary
  ["herramienta", "ferramenta"],
  ["herramientas", "ferramentas"],
  ["crecimiento", "crescimento"],
  ["desarrollo", "desenvolvimento"],
  ["autoconocimiento", "autoconhecimento"],
  ["relaciones", "relacionamentos"],
  ["relación", "relacionamento"],
  ["pareja", "parceiro"],
  ["parejas", "parceiros"],
  ["vínculo", "vínculo"],
  ["vínculos", "vínculos"],
  ["carrera", "carreira"],
  ["profesión", "profissão"],
  ["profesiones", "profissões"],
  ["dinero", "dinheiro"],
  ["finanzas", "finanças"],
  ["financiero", "financeiro"],
  ["financiera", "financeira"],
  ["financieros", "financeiros"],
  ["financieras", "financeiras"],
  ["salud", "saúde"],
  ["cuerpo", "corpo"],
  ["físico", "físico"],
  ["física", "física"],
  ["energía", "energia"],
  ["energías", "energias"],
  ["espiritual", "espiritual"],
  ["espirituales", "espirituais"],
  ["bloqueo", "bloqueio"],
  ["bloqueos", "bloqueios"],
  ["lección", "lição"],
  ["lecciones", "lições"],
  ["patrón", "padrão"],
  ["patrones", "padrões"],
  ["etapa", "etapa"],
  ["etapas", "etapas"],
  ["período", "período"],
  ["períodos", "períodos"],
  ["año", "ano"],
  ["años", "anos"],
  ["vida", "vida"],
  ["vidas", "vidas"],
  ["alma", "alma"],
  ["almas", "almas"],
  ["destino", "destino"],
  ["origen", "origem"],
  ["orígenes", "origens"],
  ["historia", "história"],
  ["método", "método"],
  ["métodos", "métodos"],
  ["sistema", "sistema"],
  ["sistemas", "sistemas"],
  ["guía", "guia"],
  ["guías", "guias"],
  ["paso a paso", "passo a passo"],
  ["Paso a paso", "Passo a passo"],
  ["pregunta", "pergunta"],
  ["preguntas", "perguntas"],
  ["frecuente", "frequente"],
  ["frecuentes", "frequentes"],
  ["respuesta", "resposta"],
  ["respuestas", "respostas"],
  ["consejo", "dica"],
  ["consejos", "dicas"],
  ["ejemplo", "exemplo"],
  ["ejemplos", "exemplos"],
  ["diferencia", "diferença"],
  ["diferencias", "diferenças"],
  ["comparación", "comparação"],
  ["comparaciones", "comparações"],
  ["precisión", "precisão"],
  ["exacto", "exato"],
  ["exacta", "exata"],
  ["exactitud", "exatidão"],
  ["tabla", "tabela"],
  ["tablas", "tabelas"],
  ["gráfico", "gráfico"],
  ["gráficos", "gráficos"],
  ["mapa", "mapa"],
  ["mapas", "mapas"],
  ["carta", "mapa"],
  ["cartas", "cartas"],
  ["cálculo", "cálculo"],
  ["cálculos", "cálculos"],
  ["calculadora", "calculadora"],
  ["calculadoras", "calculadoras"],
  ["número", "número"],
  ["números", "números"],
  ["dígito", "dígito"],
  ["dígitos", "dígitos"],
  ["suma", "soma"],
  ["sumas", "somas"],
  ["reducción", "redução"],
  ["reducciones", "reduções"],
  ["vértice", "vértice"],
  ["vértices", "vértices"],
  ["línea", "linha"],
  ["líneas", "linhas"],
  ["canal", "canal"],
  ["canales", "canais"],
  ["punto", "ponto"],
  ["puntos", "pontos"],
  ["centro", "centro"],
  ["centros", "centros"],
  ["sombra", "sombra"],
  ["sombras", "sombras"],
  ["luz", "luz"],
  ["luces", "luzes"],
  ["positivo", "positivo"],
  ["positiva", "positiva"],
  ["positivos", "positivos"],
  ["positivas", "positivas"],
  ["negativo", "negativo"],
  ["negativa", "negativa"],
  ["negativos", "negativos"],
  ["negativas", "negativas"],
  ["equilibrio", "equilíbrio"],
  ["armonía", "harmonia"],
  ["tensión", "tensão"],
  ["tensiones", "tensões"],
  ["desafío", "desafio"],
  ["desafíos", "desafios"],
  ["obstáculo", "obstáculo"],
  ["obstáculos", "obstáculos"],
  ["oportunidad", "oportunidade"],
  ["oportunidades", "oportunidades"],
  ["propósito", "propósito"],
  ["misión", "missão"],
  ["misiones", "missões"],
  ["vocación", "vocação"],
  ["talento", "talento"],
  ["talentos", "talentos"],
  ["potencial", "potencial"],
  ["potenciales", "potenciais"],
  ["fuerza", "força"],
  ["poder", "poder"],
  ["sabiduría", "sabedoria"],
  ["consciencia", "consciência"],
  ["consciente", "consciente"],
  ["inconsciente", "inconsciente"],
  ["reflexión", "reflexão"],
  ["introspección", "introspecção"],
  ["transformación", "transformação"],
  ["cambio", "mudança"],
  ["cambios", "mudanças"],
  ["evolución", "evolução"],
  ["aprendizaje", "aprendizado"],
  ["experiencia", "experiência"],
  ["experiencias", "experiências"],
  ["creencia", "crença"],
  ["creencias", "crenças"],
  ["emoción", "emoção"],
  ["emociones", "emoções"],
  ["emocional", "emocional"],
  ["emocionales", "emocionais"],
  ["mente", "mente"],
  ["mental", "mental"],
  ["mentales", "mentais"],
  ["psicología", "psicologia"],
  ["psicológico", "psicológico"],
  ["psicológica", "psicológica"],
  ["arquetipo", "arquétipo"],
  ["arquetipos", "arquétipos"],
  ["arquetípico", "arquetípico"],
  ["arquetípica", "arquetípica"],
  ["arquetípicos", "arquetípicos"],
  ["arquetípicas", "arquetípicas"],
  ["simbólico", "simbólico"],
  ["simbólica", "simbólica"],
  ["símbolo", "símbolo"],
  ["símbolos", "símbolos"],
  ["filosofía", "filosofia"],
  ["filosófico", "filosófico"],
  ["ancestral", "ancestral"],
  ["ancestrales", "ancestrais"],
  ["linaje", "linhagem"],
  ["linajes", "linhagens"],
  ["padres", "pais"],
  ["madre", "mãe"],
  ["padre", "pai"],
  ["hijo", "filho"],
  ["hija", "filha"],
  ["hijos", "filhos"],
  ["familia", "família"],
  ["familiar", "familiar"],
  ["familiares", "familiares"],
  ["generación", "geração"],
  ["generaciones", "gerações"],
  ["herencia", "herança"],
  ["libertad", "liberdade"],
  ["voluntad", "vontade"],
  ["elección", "escolha"],
  ["elecciones", "escolhas"],
  ["decisión", "decisão"],
  ["decisiones", "decisões"],
  ["responsabilidad", "responsabilidade"],
  ["claridad", "clareza"],
  ["verdad", "verdade"],
  ["realidad", "realidade"],
  ["ilusión", "ilusão"],
  ["miedo", "medo"],
  ["miedos", "medos"],
  ["ansiedad", "ansiedade"],
  ["paz", "paz"],
  ["serenidad", "serenidade"],
  ["confianza", "confiança"],
  ["autoestima", "autoestima"],
  ["seguridad", "segurança"],
  ["éxito", "sucesso"],
  ["fracaso", "fracasso"],
  ["riqueza", "riqueza"],
  ["abundancia", "abundância"],
  ["escasez", "escassez"],
  ["prosperidad", "prosperidade"],
  ["profesional", "profissional"],
  ["profesionales", "profissionais"],
  ["trabajo", "trabalho"],
  ["empleo", "emprego"],
  ["negocio", "negócio"],
  ["negocios", "negócios"],
  ["empresa", "empresa"],
  ["liderazgo", "liderança"],
  ["comunicación", "comunicação"],
  ["expresión", "expressão"],
  ["creatividad", "criatividade"],
  ["creativo", "criativo"],
  ["creativa", "criativa"],
  ["intuición", "intuição"],
  ["intuitivo", "intuitivo"],
  ["lógica", "lógica"],
  ["racional", "racional"],
  ["práctico", "prático"],
  ["práctica", "prática"],
  ["prácticos", "práticos"],
  ["prácticas", "práticas"],
  ["teoría", "teoria"],
  ["ejercicio", "exercício"],
  ["ejercicios", "exercícios"],
  ["diario", "diário"],
  ["escritura", "escrita"],
  ["análisis", "análise"],
  ["lectura", "leitura"],
  ["lecturas", "leituras"],
  ["interpretación", "interpretação"],
  ["interpretaciones", "interpretações"],
];

function translateText(text) {
  if (typeof text !== "string") return text;
  let res = text;
  for (const [from, to] of exactReplacements) {
    const escaped = from.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    res = res.replace(new RegExp(`\\b${escaped}\\b`, "g"), to);
  }

  // Morphological endings
  res = res.replace(/(\w+)ción\b/g, "$1ção");
  res = res.replace(/(\w+)ciones\b/g, "$1ções");
  res = res.replace(/(\w+)dad\b/g, "$1dade");
  res = res.replace(/(\w+)dades\b/g, "$1dades");
  res = res.replace(/(\w+)mente\b/g, "$1mente");
  res = res.replace(/(\w+)miento\b/g, "$1mento");
  res = res.replace(/(\w+)mientos\b/g, "$1mentos");

  // Grammatical particles
  res = res
    .replace(/\by\b/g, "e")
    .replace(/\bcon\b/g, "com")
    .replace(/\bpero\b/g, "mas")
    .replace(/\bsin\b/g, "sem")
    .replace(/\bsobre\b/g, "sobre")
    .replace(/\bentre\b/g, "entre")
    .replace(/\bhacia\b/g, "em direção a")
    .replace(/\bhasta\b/g, "até")
    .replace(/\bdesde\b/g, "desde")
    .replace(/\btodo\b/g, "todo")
    .replace(/\btoda\b/g, "toda")
    .replace(/\btodos\b/g, "todos")
    .replace(/\btodas\b/g, "todas")
    .replace(/\bmás\b/g, "mais")
    .replace(/\bmenos\b/g, "menos")
    .replace(/\bmuy\b/g, "muito")
    .replace(/\bmucho\b/g, "muito")
    .replace(/\bmucha\b/g, "muita")
    .replace(/\bmuchos\b/g, "muitos")
    .replace(/\bmuchas\b/g, "muitas")
    .replace(/\btambién\b/g, "também")
    .replace(/\btampoco\b/g, "tampouco")
    .replace(/\bsiempre\b/g, "sempre")
    .replace(/\bnunca\b/g, "nunca")
    .replace(/\bjamás\b/g, "jamais")
    .replace(/\bdel\b/g, "do")
    .replace(/\bal\b/g, "ao")
    .replace(/\bde la\b/g, "da")
    .replace(/\bde los\b/g, "dos")
    .replace(/\bde las\b/g, "das")
    .replace(/\ben el\b/g, "no")
    .replace(/\ben la\b/g, "na")
    .replace(/\ben los\b/g, "nos")
    .replace(/\ben las\b/g, "nas")
    .replace(/\bpor el\b/g, "pelo")
    .replace(/\bpor la\b/g, "pela")
    .replace(/\bpor los\b/g, "pelos")
    .replace(/\bpor las\b/g, "pelas")
    .replace(/\bcon el\b/g, "com o")
    .replace(/\bcon la\b/g, "com a")
    .replace(/\bcon los\b/g, "com os")
    .replace(/\bcon las\b/g, "com as")
    .replace(/\bel\b/g, "o")
    .replace(/\bla\b/g, "a")
    .replace(/\blos\b/g, "os")
    .replace(/\blas\b/g, "as")
    .replace(/\bun\b/g, "um")
    .replace(/\buna\b/g, "uma")
    .replace(/\bunos\b/g, "alguns")
    .replace(/\bunas\b/g, "algumas")
    .replace(/\bes\b/g, "é")
    .replace(/\bson\b/g, "são")
    .replace(/\bfue\b/g, "foi")
    .replace(/\beran\b/g, "eram")
    .replace(/\bserá\b/g, "será")
    .replace(/\bserán\b/g, "serão")
    .replace(/\btiene\b/g, "tem")
    .replace(/\btienen\b/g, "têm")
    .replace(/\bhay\b/g, "há")
    .replace(/\bhabía\b/g, "havia")
    .replace(/\bpuede\b/g, "pode")
    .replace(/\bpueden\b/g, "podem")
    .replace(/\bdebe\b/g, "deve")
    .replace(/\bdeben\b/g, "devem");

  // Uppercase variations
  res = res
    .replace(/\bEl\b/g, "O")
    .replace(/\bLa\b/g, "A")
    .replace(/\bLos\b/g, "Os")
    .replace(/\bLas\b/g, "As")
    .replace(/\bUn\b/g, "Um")
    .replace(/\bUna\b/g, "Uma")
    .replace(/\bEs\b/g, "É")
    .replace(/\bSon\b/g, "São")
    .replace(/\bHay\b/g, "Há")
    .replace(/\bPor qué\b/g, "Por que")
    .replace(/\bCómo\b/g, "Como")
    .replace(/\bQué\b/g, "O que");

  res = res.replace(/  +/g, " ").trim();
  return res;
}

function processArticle(article) {
  const slug = article.slug;
  const translated = {
    slug,
    title: translateText(article.title),
    metaTitle: translateText(article.metaTitle).slice(0, 59),
    metaDescription: translateText(article.metaDescription).slice(0, 154),
    excerpt: translateText(article.excerpt),
    category: article.category,
    publishedAt: article.publishedAt,
    updatedAt: "2026-10-10",
    readingTimeMinutes: article.readingTimeMinutes,
    mainKeyword: translateText(article.mainKeyword),
    author: {
      name: "Equipe Editorial da Matriz do Destino",
      role: "Pesquisa Arquetípica",
      bio: "Especialistas na metodologia da Matriz do Destino e ferramentas de autorreflexão consciente.",
    },
    heroImage: {
      src: article.heroImage.src,
      alt: translateText(article.heroImage.alt),
      width: 1600,
      height: 900,
      blurDataURL: `blurMap["${slug}"]`,
    },
    tableOfContents: (article.tableOfContents || []).map((item) => ({
      title: translateText(item.title),
      slug: item.slug,
    })),
    sections: (article.sections || []).map((section) => ({
      heading: translateText(section.heading),
      slug: section.slug,
      paragraphs: (section.paragraphs || []).map(translateText),
      ...(section.callout
        ? {
            callout: {
              title: translateText(section.callout.title),
              text: translateText(section.callout.text),
            },
          }
        : {}),
      ...(section.table
        ? {
            table: {
              headers: section.table.headers.map(translateText),
              rows: section.table.rows.map((row) => row.map(translateText)),
            },
          }
        : {}),
    })),
    faqs: (article.faqs || []).map((faq) => ({
      question: translateText(faq.question),
      answer: translateText(faq.answer),
    })),
    ...(article.balancedShadowBlock
      ? {
          balancedShadowBlock: {
            arcanaNumber: article.balancedShadowBlock.arcanaNumber,
            arcanaName: translateText(article.balancedShadowBlock.arcanaName),
            balanced: translateText(article.balancedShadowBlock.balanced),
            shadow: translateText(article.balancedShadowBlock.shadow),
            advice: translateText(article.balancedShadowBlock.advice),
          },
        }
      : {}),
    relatedSlugs: article.relatedSlugs || [],
    cta: {
      title: translateText(article.cta?.title || "Calcule sua Matriz do Destino"),
      description: translateText(
        article.cta?.description || "Descubra seu mapa arquetípico completo com fórmulas clássicas e transparentes."
      ),
      buttonText: translateText(article.cta?.buttonText || "Calcular Matriz do Destino"),
      buttonLink: (article.cta?.buttonLink || "/es").replace("/es", "/pt-br"),
    },
  };
  return translated;
}

function formatArticleToTs(art) {
  let json = JSON.stringify(art, null, 2);
  // Restore blurDataURL expression
  json = json.replace(new RegExp(`"blurDataURL": "blurMap\\[\\\\"${art.slug}\\\\"\\]"`, "g"), `"blurDataURL": blurMap["${art.slug}"]`);
  return json;
}

for (let b = 2; b <= 6; b++) {
  const raw = fs.readFileSync(path.join(rootDir, `src/content/localized/blog/es/batch-${b}.ts`), "utf-8");
  const code = raw
    .replace(/import .*\n/g, "")
    .replace("const blurMap = blurMapRaw as Record<string, string>;", "")
    .replace(new RegExp(`export const esBatch${b}Articles: BlogPost\\[\\] =`), "return");
  const fn = new Function("blurMap", code);
  const esArticles = fn(blurMap);

  const ptArticles = esArticles.map(processArticle);

  let fileContent = `import { BlogPost } from "@/content/blog/types";
import blurMapRaw from "@/content/blog/blur-map.json";

const blurMap = blurMapRaw as Record<string, string>;

export const ptBrBatch${b}Articles: BlogPost[] = [
`;

  for (let i = 0; i < ptArticles.length; i++) {
    fileContent += `  ${formatArticleToTs(ptArticles[i])}${i < ptArticles.length - 1 ? "," : ""}\n`;
  }
  fileContent += `];\n`;

  const targetPath = path.join(rootDir, `src/content/localized/blog/pt-BR/batch-${b}.ts`);
  fs.writeFileSync(targetPath, fileContent, "utf-8");
  console.log(`Generated pt-BR batch-${b}.ts with ${ptArticles.length} articles`);
}

// Generate index.ts
const indexContent = `import { BlogPost } from "@/content/blog/types";
import { ptBrBatch1Articles } from "./batch-1";
import { ptBrBatch2Articles } from "./batch-2";
import { ptBrBatch3Articles } from "./batch-3";
import { ptBrBatch4Articles } from "./batch-4";
import { ptBrBatch5Articles } from "./batch-5";
import { ptBrBatch6Articles } from "./batch-6";

export const ptBrBlogArticles: BlogPost[] = [
  ...ptBrBatch1Articles,
  ...ptBrBatch2Articles,
  ...ptBrBatch3Articles,
  ...ptBrBatch4Articles,
  ...ptBrBatch5Articles,
  ...ptBrBatch6Articles,
];

export function getPtBrArticleBySlug(slug: string): BlogPost | undefined {
  return ptBrBlogArticles.find((article) => article.slug === slug);
}

export function getAllPtBrArticles(): BlogPost[] {
  return ptBrBlogArticles;
}

export {
  ptBrBatch1Articles,
  ptBrBatch2Articles,
  ptBrBatch3Articles,
  ptBrBatch4Articles,
  ptBrBatch5Articles,
  ptBrBatch6Articles,
};
`;

fs.writeFileSync(path.join(rootDir, "src/content/localized/blog/pt-BR/index.ts"), indexContent, "utf-8");
console.log("Generated pt-BR index.ts");

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
  const proxyContent = `import { getPtBrArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getPtBrArticleBySlug("${slug}");
export default article;
`;
  fs.writeFileSync(path.join(rootDir, `src/content/localized/blog/pt-BR/${slug}.ts`), proxyContent, "utf-8");
}
console.log(`Generated 35 proxy files in pt-BR`);
