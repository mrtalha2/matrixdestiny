/**
 * Rechtliche und institutionelle Seiten lokalisiert auf Deutsch
 * Matrix des Schicksals
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

export const deLegalPages: Record<string, LegalPageContent> = {
  about: {
    slug: "about",
    title: "Über die Matrix des Schicksals",
    metaTitle: "Über uns — Matrix des Schicksals & Methodik",
    metaDescription:
      "Erfahre mehr über die Matrix des Schicksals: Eine unabhängige Bildungsplattform, die das 22-Arkana-System mit mathematischer Klarheit vermittelt.",
    badge: "Bildungsplattform",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Unsere Mission und Haltung",
        paragraphs: [
          "Matrix des Schicksals ist eine unabhängige Plattform zur archetypischen Selbsterkenntnis und philosophischen Reflexion. Unser Ziel ist es, das System der 22 Arkana mit algorithmischer Transparenz, geometrischer Präzision und nüchterner Ernsthaftigkeit zugänglich zu machen – vollkommen frei von esoterischer Effekthascherei.",
          "Wir sind überzeugt, dass tiefgründige Werkzeuge zur Selbstreflexion für jeden frei verfügbar sein sollten. Deshalb bieten wir umfassende Auswertungen ohne irreführende Bezahlschranken und ohne intransparente Datenspeicherung an.",
        ],
      },
      {
        heading: "Methodik und historischer Ursprung",
        paragraphs: [
          "Unsere Berechnungen basieren auf dem 2006 von Natalia Ladini formulierten kanonischen Standard. Das System verknüpft die Reduktion auf die 22 Großen Arkana, die Geometrie des achtzackigen Sterns (Oktagramm) und das klassische Chakren-System.",
          "Im Gegensatz zu vielen Portalen, die willkürliche Abkürzungen wählen, berechnet unser Algorithmus das volle vierstellige Geburtsjahr und folgt der mathematischen Originalformel.",
        ],
      },
      {
        heading: "Ehrliche Grenzen und ethischer Kodex",
        paragraphs: [
          "Wir betonen mit voller Aufrichtigkeit: Die Matrix des Schicksals ist keine empirische Wissenschaft, besitzt keine universitäre Validierung und ersetzt niemals eine ärztliche, psychotherapeutische, juristische oder finanzielle Fachberatung.",
          "Sie dient als archetypischer Spiegel für deine persönliche Introspektion, zur Förderung von Eigenverantwortung und zur bewussten Auseinandersetzung mit eigenen Lebensmustern.",
        ],
      },
    ],
  },

  contact: {
    slug: "contact",
    title: "Kontakt und Feedback",
    metaTitle: "Kontakt — Matrix des Schicksals",
    metaDescription:
      "Kontaktiere das Team der Matrix des Schicksals bei technischen Fragen, redaktionellen Vorschlägen, Datenschutzanliegen oder Kooperationen.",
    badge: "Nutzerbetreuung",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "So erreichst du uns",
        paragraphs: [
          "Hast du Fragen zu einer Berechnung, einen Fehler entdeckt oder möchtest Feedback teilen? Unser Team freut sich über jede qualifizierte Rückmeldung.",
          "Wir bemühen uns, alle Anfragen werktags innerhalb von 24 bis 48 Stunden zu beantworten.",
        ],
        bullets: [
          "Allgemeine Anfragen: support@thematrixofdestiny.com",
          "Redaktionelle Korrekturen: editorial@thematrixofdestiny.com",
          "Datenschutz & DSGVO: privacy@thematrixofdestiny.com",
        ],
      },
      {
        heading: "Häufige Fragen vor der Kontaktaufnahme",
        paragraphs: [
          "Prüfe bitte vorab unsere Hilfeseiten und Blog-Leitfäden. Viele methodische Fragen zu abweichenden Zahlen oder Berechnungsschritten sind dort detailliert dokumentiert.",
        ],
      },
    ],
  },

  "editorial-policy": {
    slug: "editorial-policy",
    title: "Redaktionelle Richtlinien",
    metaTitle: "Redaktionelle Richtlinien — Matrix des Schicksals",
    metaDescription:
      "Erfahre, nach welchen Qualitäts- und Ethikstandards unsere Texte zur Schicksalsmatrix verfasst, geprüft und regelmäßig aktualisiert werden.",
    badge: "Transparenzstandard",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Grundprinzipien unserer Inhalte",
        paragraphs: [
          "Alle Artikel und Erläuterungen auf unserer Plattform folgen dem Grundsatz der intellektuellen Ehrlichkeit und Klarheit. Wir meiden reißerische Versprechen ('Dein Reichtum ist garantiert') und beschreiben stattdessen konstruktive Entwicklungspotenziale sowie typische Schattenfallen.",
          "Unsere Leitfäden entstehen in sorgfältiger redaktioneller Recherche und werden kontinuierlich an moderne psychologische Erkenntnisse der Archetypenforschung angepasst.",
        ],
      },
      {
        heading: "Verzicht auf Täuschung und Pseudowissenschaft",
        paragraphs: [
          "Wir behaupten an keiner Stelle eine naturwissenschaftliche Beweisbarkeit der Schicksalsmatrix. Wir erfinden weder falsche Studien noch erfundene Testimonials.",
          "Jeder Beitrag enthält klare Definitionen, methodische Kontextualisierungen und Antworten auf kritische Fragen.",
        ],
      },
      {
        heading: "Aktualisierung und Korrekturkultur",
        paragraphs: [
          "Werden sachliche Unstimmigkeiten oder Unklarheiten in mathematischen Beispielen gemeldet, korrigieren wir diese unverzüglich mit einem entsprechenden Änderungshinweis.",
        ],
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Haftungsausschluss & Grenzen",
    metaTitle: "Haftungsausschluss — Matrix des Schicksals",
    metaDescription:
      "Wichtige rechtliche Hinweise zur Nutzung der Matrix des Schicksals. Keine Zukunftsvorhersagen, keine medizinische oder finanzielle Beratung.",
    badge: "Rechtlicher Hinweis",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Ausschließlich Bildungs- und Reflexionszweck",
        paragraphs: [
          "Die auf dieser Website bereitgestellten Inhalte, Charts und Deutungen dienen ausschließlich der persönlichen Reflexion, philosophischen Weiterbildung und Selbsterkenntnis.",
          "Keine Aussage auf dieser Plattform stellt eine verbindliche Zukunftsprognose oder ein deterministisches Urteil über dein Schicksal dar. Du bist zu jedem Zeitpunkt der Schöpfer deiner eigenen Entscheidungen.",
        ],
      },
      {
        heading: "Kein Ersatz für professionelle Beratung",
        paragraphs: [
          "Die Informationen ersetzen in keinem Fall eine professionelle medizinische Diagnose, psychotherapeutische Behandlung, Rechtsberatung oder Finanzplanung.",
          "Solltest du dich in einer emotionalen Krise oder gesundheitlichen Notsituation befinden, wende dich bitte umgehend an qualifizierte Fachkräfte oder den ärztlichen Notdienst.",
        ],
      },
      {
        heading: "Haftungsbegrenzung",
        paragraphs: [
          "Die Nutzung der kostenlosen Online-Rechner erfolgt auf eigene Verantwortung. Die Betreiber übernehmen keine Haftung für Handlungen oder Lebensentscheidungen, die auf Basis der symbolischen Deutungen getroffen werden.",
        ],
      },
    ],
  },

  privacy: {
    slug: "privacy",
    title: "Datenschutzerklärung",
    metaTitle: "Datenschutzerklärung — Matrix des Schicksals",
    metaDescription:
      "Erfahre, wie wir deine Daten schützen. Keine Speicherung von Geburtsdaten ohne Einwilligung, DSGVO-konforme Verarbeitung.",
    badge: "DSGVO / GDPR",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Verarbeitung deines Geburtsdatums",
        paragraphs: [
          "Wenn du dein Geburtsdatum in unseren Rechner eingibst, wird die Berechnung clientseitig im Browser durchgeführt oder temporär zur Erzeugung des SVG/PDF-Diagramms verarbeitet. Wir speichern dein Geburtsdatum nicht dauerhaft in Benutzerdatenbanken, es sei denn, du legst ausdrücklich ein Kundenkonto an.",
          "Wir verkaufen deine persönlichen Daten niemals an Dritte.",
        ],
      },
      {
        heading: "Cookies und Werbedienste",
        paragraphs: [
          "Zur Bereitstellung unseres kostenlosen Angebots kooperieren wir mit datenschutzkonformen Werbepartnern (Google AdSense). Diese Partner können pseudonymisierte Cookies verwenden, um nicht-personalisierte oder personalisierte Anzeigen bereitzustellen.",
          "Über unser Cookie-Präferenz-Banner kannst du jederzeit festlegen, welche nicht-essenziellen Cookies du zulässt.",
        ],
      },
      {
        heading: "Deine Rechte nach der DSGVO",
        paragraphs: [
          "Als Nutzer im europäischen Raum hast du das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner personenbezogenen Daten. Wende dich hierzu an privacy@thematrixofdestiny.com.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Nutzungsbedingungen",
    metaTitle: "Nutzungsbedingungen — Matrix des Schicksals",
    metaDescription:
      "Nutzungsbedingungen für die Website Matrix des Schicksals: Kostenlose Nutzung, Urheberrecht, Fair Use und rechtliche Rahmenbedingungen.",
    badge: "Vereinbarung",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Geltungsbereich und Annahme",
        paragraphs: [
          "Durch den Zugriff auf unsere Website und die Nutzung unserer Schicksalsmatrix-Rechner erklärst du dich mit diesen Nutzungsbedingungen einverstanden. Solltest du nicht zustimmen, bitten wir dich, die Dienste nicht zu nutzen.",
        ],
      },
      {
        heading: "Urheberrecht und geistiges Eigentum",
        paragraphs: [
          "Alle redaktionellen Texte, Grafiken, SVG-Generatoren, Code-Strukturen und Designelemente sind urheberrechtlich geschützt. Die private, nicht-kommerzielle Nutzung und Weitergabe deines persönlichen PDF-Reports ist gestattet.",
          "Das automatisierte Auslesen (Scraping), Kopieren ganzer Textbestände oder der gewerbliche Weiterverkauf unserer Algorithmen ohne schriftliche Genehmigung ist untersagt.",
        ],
      },
      {
        heading: "Verfügbarkeit des Dienstes",
        paragraphs: [
          "Wir bemühen uns um eine ständige Erreichbarkeit der Website, übernehmen jedoch keine Garantie für unterbrechungsfreie Verfügbarkeit. Wir behalten uns vor, Funktionen jederzeit zu aktualisieren oder zu modifizieren.",
        ],
      },
    ],
  },
};
