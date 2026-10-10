/**
 * Páginas legales e institucionales localizadas en Español (Neutro)
 * Matriz del Destino
 */

export interface LegalPageContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  lastUpdated: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
}

export const esLegalPages: Record<string, LegalPageContent> = {
  about: {
    slug: "about",
    title: "Sobre la Matriz del Destino",
    metaTitle: "Sobre Nosotros — Matriz del Destino y Metodología",
    metaDescription:
      "Conoce la Matriz del Destino: una plataforma educativa independiente que explora el sistema de los 22 Arcanos con rigor algorítmico y transparencia ética.",
    badge: "Publicación Educativa",
    lastUpdated: "Octubre 2026",
    sections: [
      {
        heading: "Nuestra Misión y Propósito",
        paragraphs: [
          "Matriz del Destino es una plataforma digital de divulgación y análisis arquetípico independiente. Nuestro objetivo es presentar el método de los 22 Arcanos con claridad matemática, transparencia algorítmica y sobriedad filosófica, prescindiendo del sensacionalismo místico.",
          "Creemos que el autoconocimiento reflexivo debe ser accesible para todos. Por ello, ofrecemos cálculos completos de más de 40 páginas sin muros de pago engañosos ni retención opaca de datos personales.",
        ],
      },
      {
        heading: "Metodología y Linaje",
        paragraphs: [
          "Nos basamos en el sistema canónico estructurado en 2006 por Natalia Ladini en Europa del Este, integrando la numerología de reducción al 22, los 22 Arcanos Mayores del tarot europeo y el mapa de los siete centros energéticos védicos sobre una estrella geométrica de ocho puntas.",
          "A diferencia de otras herramientas que recortan números o inventan fórmulas arbitrarias, nuestro motor algorítmico respeta la suma completa de cuatro dígitos del año solar y la reducción modular canónica.",
        ],
      },
      {
        heading: "Límites Honestos y Ética",
        paragraphs: [
          "Declaramos con total transparencia que la Matriz del Destino no es una ciencia exacta, no posee verificación empírica de laboratorio y no sustituye la atención médica, psicológica, legal ni financiera profesional.",
          "Es un espejo simbólico para la introspección personal, el cultivo de la responsabilidad individual y el diálogo honesto con uno mismo.",
        ],
      },
    ],
  },

  contact: {
    slug: "contact",
    title: "Contacto y Soporte",
    metaTitle: "Contacto — Matriz del Destino",
    metaDescription:
      "Ponte en contacto con el equipo de Matriz del Destino para dudas técnicas, sugerencias editoriales, derechos de privacidad o colaboraciones.",
    badge: "Atención al Usuario",
    lastUpdated: "Octubre 2026",
    sections: [
      {
        heading: "Cómo Comunicarte con Nosotros",
        paragraphs: [
          "Valoramos la comunicación transparente con nuestra comunidad de lectores y usuarios. Si tienes preguntas técnicas sobre el funcionamiento de la calculadora, encuentras alguna errata en nuestros artículos o deseas solicitar información sobre privacidad, estamos a tu disposición.",
          "Puedes escribirnos directamente a nuestro correo electrónico oficial: contacto@matrizdeldestino.com. Respondemos a todas las consultas legítimas en un plazo habitual de 24 a 48 horas hábiles.",
        ],
      },
      {
        heading: "Consultas Editoriales y Correcciones",
        paragraphs: [
          "Si identificas algún error de traducción, inconsistencia en fórmulas o deseas sugerir un tema para futuros artículos de investigación, nuestro equipo de redacción revisará tu propuesta con sumo interés.",
        ],
      },
      {
        heading: "Privacidad y Derechos ARCO",
        paragraphs: [
          "Nuestra plataforma opera con cálculos locales y no almacena tu fecha de nacimiento en servidores permanentes. Si nos has enviado un correo o solicitaste el envío de tu gráfico en PDF y deseas eliminar tu registro, atenderemos tu petición de inmediato.",
        ],
      },
    ],
  },

  "editorial-policy": {
    slug: "editorial-policy",
    title: "Política Editorial y Estándares Éticos",
    metaTitle: "Política Editorial — Matriz del Destino",
    metaDescription:
      "Conoce nuestros principios editoriales: rigor pedagógico, ausencia de afirmaciones pseudocientíficas, transparencia en cálculos y respeto al lector.",
    badge: "Estándares Periodísticos",
    lastUpdated: "Octubre 2026",
    sections: [
      {
        heading: "Compromiso con la Honestidad Intelectual",
        paragraphs: [
          "En Matriz del Destino rechazamos rotundamente el sensacionalismo esotérico, las promesas de curaciones milagrosas y las predicciones alarmistas. Todo nuestro contenido se redacta bajo un estándar de sobriedad pedagógica y respeto a la autonomía del lector.",
          "Cada artículo es revisado para asegurar un lenguaje accesible (nivel de lectura equivalente a secundaria), definiciones precisas de cada término y distinción nítida entre lo que es un arquetipo metafórico y lo que constituye una realidad demostrada.",
        ],
      },
      {
        heading: "Criterios de Redacción y Revisión",
        paragraphs: [
          "Nuestros redactores y documentalistas aplican pautas estrictas: definición primero bajo cada encabezado, ejemplos prácticos de la vida cotidiana, tablas comparativas y ausencia de frases de relleno artificiales.",
          "No inventamos testimonios ficticios, no atribuimos al método orígenes milenarios falsos y citamos siempre la autoría real contemporánea de Natalia Ladini.",
        ],
      },
      {
        heading: "Transparencia Publicitaria y Fuentes",
        paragraphs: [
          "El acceso a nuestras calculadoras y guías completas es 100% gratuito. Para sostener los costos de infraestructura y desarrollo, mostramos publicidad programática no invasiva identificada claramente como tal, sin comprometer jamás la independencia de nuestros análisis.",
        ],
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Descargo de Responsabilidad Legal y de Salud",
    metaTitle: "Descargo de Responsabilidad — Matriz del Destino",
    metaDescription:
      "Descargo de responsabilidad de Matriz del Destino: herramienta pedagógica y de autorreflexión sin asesoramiento médico, psicológico ni financiero.",
    badge: "Aviso Legal",
    lastUpdated: "Octubre 2026",
    sections: [
      {
        heading: "Finalidad Exclusivamente Educativa y Recreativa",
        paragraphs: [
          "La información, gráficos, cálculos y textos contenidos en este sitio web se ofrecen con fines exclusivamente educativos, pedagógicos, culturales y de entretenimiento reflexivo. No constituyen bajo ninguna circunstancia asesoramiento profesional.",
        ],
      },
      {
        heading: "Ausencia de Asesoramiento Médico y Psicológico",
        paragraphs: [
          "La tabla de chakras y las interpretaciones de salud son mapas de reflexión simbólica y arquetípica. En ningún caso proporcionan diagnósticos clínicos, tratamientos de enfermedades físicas o mentales ni recomendaciones farmacológicas. Si experimentas problemas de salud, consulta de inmediato a médicos o psicólogos colegiados.",
        ],
      },
      {
        heading: "Sin Consejos Financieros ni de Inversión",
        paragraphs: [
          "Los análisis sobre la línea del dinero y la abundancia describen actitudes psicológicas hacia el valor y el trabajo. No constituyen asesoramiento financiero, tributario, contable ni recomendaciones de inversión en ningún mercado o divisa.",
        ],
      },
      {
        heading: "Responsabilidad Individual del Usuario",
        paragraphs: [
          "El usuario asume la responsabilidad plena de sus decisiones personales, familiares y laborales. Los autores y administradores del sitio quedan exentos de cualquier responsabilidad por interpretaciones o acciones derivadas del uso de esta plataforma.",
        ],
      },
    ],
  },

  privacy: {
    slug: "privacy",
    title: "Política de Privacidad y Protección de Datos",
    metaTitle: "Política de Privacidad — Matriz del Destino",
    metaDescription:
      "Política de privacidad de Matriz del Destino. Conoce cómo procesamos los cálculos de forma local en tu navegador sin almacenar datos sensibles sin consentimiento.",
    badge: "Privacidad Garantizada",
    lastUpdated: "Octubre 2026",
    sections: [
      {
        heading: "Principios de Privacidad por Diseño",
        paragraphs: [
          "En Matriz del Destino defendemos tu derecho a la intimidad digital. Por esta razón, el cálculo del octagrama se ejecuta directamente en el navegador de tu dispositivo (cliente) o en memoria volátil sin persistencia obligatoria en bases de datos permanentes.",
          "No vendemos, alquilamos ni comercializamos tu fecha de nacimiento ni tu nombre a terceras empresas bajo ningún concepto.",
        ],
      },
      {
        heading: "Datos que Recopilamos y Finalidad",
        paragraphs: [
          "Datos introducidos voluntariamente: Si decides guardar tu mapa o enviártelo por correo electrónico, procesamos tu dirección exclusivamente para despachar el mensaje transaccional a través de nuestro proveedor de correo seguro (Resend) sin retención secundaria.",
          "Datos de navegación técnica: Recopilamos registros anónimos de servidor (dirección IP anonimizada, tipo de navegador y páginas visitadas) para garantizar la seguridad de la red y prevenir ataques cibernéticos.",
        ],
      },
      {
        heading: "Uso de Cookies y Publicidad",
        paragraphs: [
          "Utilizamos cookies técnicas necesarias para recordar tus preferencias de idioma y consentimiento. Con tu aprobación previa, nuestros socios publicitarios (como Google AdSense) pueden utilizar cookies de medición para mostrar anuncios sostenibles y no intrusivos.",
          "Puedes modificar o revocar tu consentimiento de cookies en cualquier momento desde nuestro banner de preferencias.",
        ],
      },
      {
        heading: "Ejercicio de Tus Derechos",
        paragraphs: [
          "De conformidad con el RGPD y las leyes internacionales de protección de datos, tienes derecho a acceder, rectificar, suprimir u oponerte al tratamiento de cualquier información personal que nos hayas facilitado escribiendo a privacidad@matrizdeldestino.com.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Términos y Condiciones de Uso",
    metaTitle: "Términos de Servicio — Matriz del Destino",
    metaDescription:
      "Términos y condiciones de uso de la plataforma Matriz del Destino. Derechos de autor, uso aceptable, propiedad intelectual y limitaciones de responsabilidad.",
    badge: "Acuerdo Legal",
    lastUpdated: "Octubre 2026",
    sections: [
      {
        heading: "Aceptación de los Términos",
        paragraphs: [
          "Al acceder y utilizar este sitio web, aceptas quedar vinculado por los presentes Términos y Condiciones, así como por nuestra Política de Privacidad y Descargo de Responsabilidad. Si no estás de acuerdo con alguna cláusula, te rogamos abstenerte de usar la plataforma.",
        ],
      },
      {
        heading: "Licencia de Uso Personal y No Comercial",
        paragraphs: [
          "Se concede a los usuarios una licencia gratuita, limitada, revocable y no exclusiva para generar y descargar sus cartas personales con fines estrictamente individuales, educativos y no comerciales.",
          "Queda terminantemente prohibida la extracción automatizada masiva de datos (web scraping), la reventa de informes generados por nuestro motor o la ingeniería inversa de nuestro código fuente sin autorización escrita previa.",
        ],
      },
      {
        heading: "Propiedad Intelectual",
        paragraphs: [
          "Todos los textos originales, guías redactadas, logotipos, estilos visuales, gráficos SVG e implementaciones informáticas son propiedad exclusiva de Matriz del Destino o se utilizan bajo licencia legítima. El simbolismo histórico de los 22 Arcanos Mayores es patrimonio cultural de dominio público.",
        ],
      },
      {
        heading: "Modificaciones del Servicio",
        paragraphs: [
          "Nos reservamos el derecho de actualizar, modificar o discontinuar cualquier funcionalidad de la plataforma en cualquier momento y sin previo aviso, procurando siempre la máxima estabilidad y calidad técnica para nuestros usuarios.",
        ],
      },
    ],
  },
};

export function getEsLegalPage(slug: string): LegalPageContent | undefined {
  return esLegalPages[slug];
}
