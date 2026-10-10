import { ArcanaMeaning } from "../../arcana/types";
import { arcanaMeanings } from "../../arcana-meanings";

export const esArcanaMeanings: Record<number, ArcanaMeaning> = {
  1: {
    ...arcanaMeanings[1],
    number: 1,
    name: "El Mago",
    archetype: "El Iniciador y Pionero Creativo",
    keywords: ["Iniciativa", "Manifestación", "Fuerza de Voluntad", "Creatividad", "Liderazgo"],
    essence: "El Arcano 1 encarna la chispa original de la creación. Representa el poder de transformar pensamientos abstractos en realidades tangibles mediante la determinación consciente.",
    pullQuote: "Lo que la mente concibe con claridad y sostiene con pureza de intención, las manos pueden construirlo en la materia.",
    affirmation: "Poseo todos los dones necesarios para iniciar mis proyectos. Canalizo mi voluntad con sabiduría y humildad.",
    personality: {
      portrait: "Persona brillante, enérgica y profundamente innovadora. Posee un don natural para la oratoria, capta ideas complejas con rapidez y no teme adentrarse en territorios desconocidos.",
      comfortZone: "Se recarga creando algo completamente nuevo desde cero: diseñando proyectos, experimentando con ideas originales y teniendo autonomía total sobre su tiempo.",
      shadowTendency: "Orgullo intelectual, dificultad para delegar, impaciencia con los ritmos ajenos y tendencia a abandonar proyectos cuando la novedad inicial desaparece.",
    },
    relationships: {
      dynamics: "Busca una pareja que admire su intelecto pero mantenga su propia independencia mental y emocional.",
      partnerProfile: "Alguien dinámico, comunicativo y estimulante que desafíe sus ideas constructivamente.",
      growthArea: "Aprender a escuchar profundamente sin competir intelectualmente con su pareja.",
    },
    money: {
      careerPath: "Emprendimiento, desarrollo de nuevos productos, comunicación estratégica, tecnología y consultoría.",
      financialMindset: "Mentalidad orientada a generar oportunidades a partir de su talento intelectual y visión propia.",
      potentialBlock: "Dispersarse en demasiadas iniciativas sin consolidar un modelo operativo estructurado.",
    },
    karmic: {
      pastLesson: "Superar el abuso de influencia verbal o la manipulación egocéntrica experimentada en ciclos pasados.",
      evolutionaryPath: "Poner sus brillantes capacidades al servicio del bien común y empoderar a los demás.",
    },
    talents: {
      primaryGift: "Capacidad visionaria para convertir conceptos abstractos en acciones prácticas inmediatas.",
      activation: "Dedicar tiempo a escribir, lanzar prototipos y enseñar a otros sin temor al error.",
    },
  },

  2: {
    ...arcanaMeanings[2],
    number: 2,
    name: "La Sacerdotisa",
    archetype: "La Diplomática Intuitiva y Guardiana del Secreto",
    keywords: ["Intuición", "Diplomacia", "Misterio", "Sensibilidad", "Empatía"],
    essence: "El Arcano 2 representa el oído interno y la sabiduría receptiva. Percibe las corrientes ocultas detrás de las palabras y equilibra los opuestos con serenidad.",
    pullQuote: "En el silencio receptivo reside la respuesta más lúcida a las tormentas de la mente.",
    affirmation: "Confío en mi intuición profunda. Mi calma interior es mi mayor fuente de discernimiento.",
    personality: {
      portrait: "Personalidad serena, perspicaz y magnética. Posee una intuición psicológica extraordinaria y comprende las motivaciones ocultas de las personas.",
      comfortZone: "Ambientes tranquilos, contacto con la naturaleza, momentos de lectura y espacios protegidos de la sobreestimulación social.",
      shadowTendency: "Pasividad defensiva, secretismo, desconfianza hacia los demás y tendencia a acumular resentimientos silenciosos.",
    },
    relationships: {
      dynamics: "Valora la intimidad profunda, el respeto a su espacio a solas y las conexiones de alma a alma.",
      partnerProfile: "Una pareja comprensiva, madura y de palabra firme que respete su ritmo emocional.",
      growthArea: "Expresar directamente lo que siente en lugar de esperar que su pareja adivine sus pensamientos.",
    },
    money: {
      careerPath: "Psicología, mediación diplomática, investigación, salud holística y asesoría confidencial.",
      financialMindset: "Gana mediante el análisis sutil y la anticipación intuitiva de tendencias y comportamientos.",
      potentialBlock: "Miedo a la visibilidad pública o vacilación excesiva al fijar el valor de su trabajo.",
    },
    karmic: {
      pastLesson: "Curar el temor a ser traicionado o juzgado por mostrar sus verdaderos dones intuitivos.",
      evolutionaryPath: "Convertirse en un puente de reconciliación y paz para quienes sufren división.",
    },
    talents: {
      primaryGift: "Lectura psicológica intuitiva y armonización de conflictos humanos complejos.",
      activation: "Practicar la meditación diaria y confiar en sus primeras impresiones perceptivas.",
    },
  },

  3: {
    ...arcanaMeanings[3],
    number: 3,
    name: "La Emperatriz",
    archetype: "La Creadora de Abundancia y Belleza",
    keywords: ["Fertilidad", "Prosperidad", "Afecto", "Estética", "Cuidado"],
    essence: "El Arcano 3 es la fuerza de la vida floreciente. Representa el principio materno universal de nutrición, belleza estética y prosperidad natural.",
    pullQuote: "La abundancia florece con naturalidad cuando cuidamos con amor todo lo que tocamos.",
    affirmation: "Merezco la prosperidad y la belleza en todas las áreas de mi vida. Atraigo la plenitud.",
    personality: {
      portrait: "Persona cálida, magnánima y con un refinado sentido estético. Crea confort y armonía a su alrededor con una elegancia generosa.",
      comfortZone: "Su hogar bellamente decorado, rodearse de belleza artística y compartir cenas con sus seres queridos.",
      shadowTendency: "Control asfixiante sobre los hijos o pareja, consumismo desmedido y fijación en las apariencias.",
    },
    relationships: {
      dynamics: "Entrega un amor nutricio y protector, esperando reciprocidad, generosidad y lealtad incondicional.",
      partnerProfile: "Alguien protector, proveedor o que valore profundamente la familia y la armonía hogareña.",
      growthArea: "Permitir que las personas amadas cometan sus propios errores sin intervenir para rescatarlas.",
    },
    money: {
      careerPath: "Diseño, gastronomía, moda, bienes raíces, administración de marcas de lujo y bienestar.",
      financialMindset: "Comprende el dinero como un flujo natural destinado a multiplicar el bienestar y la calidad de vida.",
      potentialBlock: "Gastos impulsivos motivados por el estatus social o la búsqueda de validación externa.",
    },
    karmic: {
      pastLesson: "Sanar relaciones con figuras maternas y trascender el miedo a la escasez material.",
      evolutionaryPath: "Aprender a nutrir su propio ser antes de entregarse por completo a las necesidades ajenas.",
    },
    talents: {
      primaryGift: "Capacidad innata para embellecer y hacer florecer cualquier proyecto u organización.",
      activation: "Rodearse de plantas, arte y diseñar espacios donde la gente se sienta cuidada y acogida.",
    },
  },

  4: {
    ...arcanaMeanings[4],
    number: 4,
    name: "El Emperador",
    archetype: "El Arquitecto del Orden y la Autoridad",
    keywords: ["Estructura", "Liderazgo", "Responsabilidad", "Disciplina", "Poder"],
    essence: "El Arcano 4 representa la ley, la estabilidad y la creación de sistemas duraderos. Es la energía de la protección firme y la maestría ejecutiva.",
    pullQuote: "La verdadera autoridad no se impone por el miedo, sino por la coherencia del carácter.",
    affirmation: "Construyo mi vida sobre cimientos sólidos. Lidero con justicia, templanza y rectitud.",
    personality: {
      portrait: "Persona pragmática, protectora y dotada de un liderazgo innato. Inspira confianza y seguridad a su equipo gracias a su visión estratégica.",
      comfortZone: "Tener metas claras, procesos definidos, estabilidad financiera predecible y control sobre su entorno.",
      shadowTendency: "Autoritarismo rígido, terquedad, incapacidad para mostrar vulnerabilidad emocional y juicio implacable.",
    },
    relationships: {
      dynamics: "Protege con dedicación a su pareja y familia, pero exige lealtad y respeto a los acuerdos mutuos.",
      partnerProfile: "Alguien maduro, con metas claras y capaz de sostener un diálogo honesto de igual a igual.",
      growthArea: "Aprender a delegar el control y validar las emociones de los demás sin exigir lógica estricta.",
    },
    money: {
      careerPath: "Dirección ejecutiva, derecho corporativo, ingeniería civil, finanzas y gobernanza pública.",
      financialMindset: "Construcción de riqueza a largo plazo mediante activos sólidos y planificación metódica.",
      potentialBlock: "Aversión excesiva a innovar o resistencia a adaptarse a transformaciones del mercado.",
    },
    karmic: {
      pastLesson: "Transformar la tiranía o el abuso de poder en liderazgo benevolente y protector.",
      evolutionaryPath: "Aprender que la flexibilidad es la mayor fortaleza de un líder duradero.",
    },
    talents: {
      primaryGift: "Organización de recursos a gran escala y creación de sistemas estables y escalables.",
      activation: "Establecer rutinas saludables y asumir la responsabilidad de coordinar proyectos de alto impacto.",
    },
  },

  5: {
    ...arcanaMeanings[5],
    number: 5,
    name: "El Sumo Sacerdote",
    archetype: "El Maestro Espiritual y Guardián de la Tradición",
    keywords: ["Enseñanza", "Ética", "Valores", "Sabiduría", "Familia"],
    essence: "El Arcano 5 simboliza la transmisión de la sabiduría ética y las leyes espirituales. Conecta a la persona con sus raíces ancestrales y sus principios morales.",
    pullQuote: "El verdadero maestro comparte el conocimiento para liberar conciencias, no para crear adeptos.",
    affirmation: "Aprendo con humildad y comparto con amor. Mis principios éticos guían cada una de mis acciones.",
    personality: {
      portrait: "Intelectual, respetuoso de las normas y con vocación de mentor. Busca comprender el porqué de las cosas y posee un fuerte sentido de la decencia.",
      comfortZone: "Espacios de estudio académico, círculos familiares armoniosos y entornos de aprendizaje continuo.",
      shadowTendency: "Dogmatismo moralista, criticar a quienes piensan diferente y obsesión por imponer sus propias reglas.",
    },
    relationships: {
      dynamics: "Busca un compromiso formal y tradicional basado en valores compartidos, respeto mutuo y crecimiento espiritual.",
      partnerProfile: "Alguien culto, con principios sólidos y que valore profundamente la unión familiar.",
      growthArea: "Aceptar que no existe una única verdad universal y respetar el camino individual de su pareja.",
    },
    money: {
      careerPath: "Educación superior, asesoría legal, mentoría ejecutiva, filosofía y gestión de patrimonios familiares.",
      financialMindset: "Prioriza la reputación intachable y la honestidad por encima de ganancias rápidas o dudosas.",
      potentialBlock: "Rechazar modelos comerciales modernos por apego ciego a métodos del pasado.",
    },
    karmic: {
      pastLesson: "Superar el fanatismo ideológico o la deslealtad familiar cometida en encarnaciones previas.",
      evolutionaryPath: "Enseñar a través del ejemplo de vida coherente más que mediante sermones verbales.",
    },
    talents: {
      primaryGift: "Habilidad pedagógica para explicar conceptos complejos de forma clara, accesible y edificante.",
      activation: "Escribir manuales, impartir talleres y estudiar las grandes obras de la filosofía moral.",
    },
  },

  6: {
    ...arcanaMeanings[6],
    number: 6,
    name: "Los Enamorados",
    archetype: "El Unificador del Amor y la Elección Consciente",
    keywords: ["Amor", "Elección", "Belleza", "Armonía", "Comunicación"],
    essence: "El Arcano 6 encarna el poder transformador del corazón y la responsabilidad de tomar decisiones alineadas con la verdad interior.",
    pullQuote: "Elegir desde el amor verdadero requiere la valentía de renunciar a las expectativas ajenas.",
    affirmation: "Elijo desde la sabiduría de mi corazón. Atraigo relaciones sanas, recíprocas y luminosas.",
    personality: {
      portrait: "Sociable, carismático y magnético. Posee una gran sensibilidad para conectar a las personas y busca la belleza en cada detalle de la vida.",
      comfortZone: "Estar rodeado de amigos leales, vivir en pareja de manera armoniosa y disfrutar de eventos culturales.",
      shadowTendency: "Indecisión crónica, dependencia de la aprobación externa, superficialidad y miedo al compromiso.",
    },
    relationships: {
      dynamics: "Las relaciones son el espejo central de su evolución. Necesita ternura, comunicación fluida y admiración mutua.",
      partnerProfile: "Una persona afectuosa, estética y comunicativa que valore la complicidad íntima.",
      growthArea: "Aprender a amarse a sí mismo sin exigir que su pareja llene sus vacíos de autoestima.",
    },
    money: {
      careerPath: "Relaciones públicas, mediación de parejas, moda, curaduría de arte, hospitalidad y ventas de alto nivel.",
      financialMindset: "Genera ingresos a través de su capacidad para construir redes de confianza y alianzas estratégicas.",
      potentialBlock: "Mezclar finanzas personales con compromisos emocionales sin delimitar fronteras claras.",
    },
    karmic: {
      pastLesson: "Resolver conflictos de infidelidad, engaño o parálisis decisional en vidas anteriores.",
      evolutionaryPath: "Aprender a tomar decisiones firmes sin depender del aplauso o aprobación de los demás.",
    },
    talents: {
      primaryGift: "Don para crear puentes de confianza interpersonal y armonizar ambientes tensos.",
      activation: "Practicar la escucha empática y organizar eventos que celebren la unión comunitaria.",
    },
  },

  7: {
    ...arcanaMeanings[7],
    number: 7,
    name: "El Carro",
    archetype: "El Líder Victorioso y Enfocado",
    keywords: ["Triunfo", "Determinación", "Enfoque", "Velocidad", "Victoria"],
    essence: "El Arcano 7 representa la victoria obtenida mediante el dominio de las fuerzas opuestas y el enfoque inquebrantable hacia la meta.",
    pullQuote: "Cuando la mente y el corazón viajan en la misma dirección, ningún obstáculo frena el avance.",
    affirmation: "Avanzo hacia mis metas con determinación y paz. Supero los desafíos con disciplina constante.",
    personality: {
      portrait: "Competitivo, dinámico y con una fuerte orientación al logro. No se detiene ante la dificultad y motiva a su equipo con su ejemplo.",
      comfortZone: "Tener un objetivo ambicioso en el horizonte, viajar, conducir y ver progreso medible cada semana.",
      shadowTendency: "Agresividad competitiva, atropellar los sentimientos ajenos para ganar y frustración si los planes se retrasan.",
    },
    relationships: {
      dynamics: "Necesita una pareja que comparta su ambición o respete su ritmo acelerado de crecimiento.",
      partnerProfile: "Alguien seguro de sí mismo, independiente y que no tema acompañarlo en sus grandes metas.",
      growthArea: "Aprender a frenar el ritmo en casa; recordar que el amor no es una carrera por ganar.",
    },
    money: {
      careerPath: "Dirección de proyectos, logística internacional, deportes de alto rendimiento, ventas y tecnología automotriz.",
      financialMindset: "Mentalidad orientada a la expansión continua y a la conquista de nuevos mercados.",
      potentialBlock: "Invertir precipitadamente por impaciencia de obtener resultados instantáneos.",
    },
    karmic: {
      pastLesson: "Sanar derrotas pasadas y la tendencia a aplastar a los demás en la búsqueda de reconocimiento.",
      evolutionaryPath: "Liderar victorias colectivas donde todos los miembros del equipo salgan beneficiados.",
    },
    talents: {
      primaryGift: "Capacidad para movilizar recursos rápidamente y llevar ideas del papel a la meta final.",
      activation: "Fijar metas trimestrales claras y practicar deportes que exijan coordinación y disciplina física.",
    },
  },

  8: {
    ...arcanaMeanings[8],
    number: 8,
    name: "La Justicia",
    archetype: "El Guardián del Equilibrio Kármico",
    keywords: ["Equilibrio", "Causa y Efecto", "Integridad", "Honestidad", "Claridad"],
    essence: "El Arcano 8 representa la ley de causa y efecto. Enseña que cada acción tiene una consecuencia y que la verdad siempre prevalece.",
    pullQuote: "Comprender la causa de lo que vives te libera de la ilusión de considerarte una víctima del destino.",
    affirmation: "Acepto la ley de causa y efecto en mi vida. Actúo con rectitud, honestidad e integridad intachable.",
    personality: {
      portrait: "Persona analítica, justa y amante de la verdad. Posee un fuerte sentido de la equidad y detecta de inmediato la hipocresía.",
      comfortZone: "Ambientes ordenados, contratos transparentes, acuerdos claros y saber que no tiene deudas morales con nadie.",
      shadowTendency: "Juicio implacable, rencor, obsesión por encontrar culpables y victimismo cuando las cosas no salen como esperaba.",
    },
    relationships: {
      dynamics: "Busca una relación basada en la transparencia absoluta, la equidad de responsabilidades y la honestidad mutua.",
      partnerProfile: "Una persona madura, confiable y de palabra intachable que asuma la responsabilidad de sus actos.",
      growthArea: "Aprender a perdonar con misericordia en lugar de exigir castigo o revancha ante los errores ajenos.",
    },
    money: {
      careerPath: "Derecho judicial, auditoría contable, consultoría fiscal, arbitraje y control de calidad.",
      financialMindset: "Cumplimiento estricto de las leyes y orden financiero impecable en cada transacción.",
      potentialBlock: "Pleitos legales prolongados motivados por el orgullo de tener la razón.",
    },
    karmic: {
      pastLesson: "Saldar deudas de injusticia, acusaciones falsas o abuso de privilegios en ciclos pasados.",
      evolutionaryPath: "Comprender que la justicia cósmica no castiga, sino que restablece la armonía perdida.",
    },
    talents: {
      primaryGift: "Capacidad para discernir la verdad objetiva en situaciones complejas y desentrañar causas profundas.",
      activation: "Mantener sus cuentas al día, practicar la meditación de causa-efecto y actuar siempre con ética.",
    },
  },

  9: {
    ...arcanaMeanings[9],
    number: 9,
    name: "El Ermitaño",
    archetype: "El Sabio Solitario y Filósofo Profundo",
    keywords: ["Sabiduría", "Soledad Fructífera", "Introspección", "Prudencia", "Profundidad"],
    essence: "El Arcano 9 representa la búsqueda solitaria de la verdad esencial. Enseña a encender la linterna del autoconocimiento interior.",
    pullQuote: "La verdadera sabiduría nace cuando el ruido del mundo calla y el alma se atreve a escuchar su propia voz.",
    affirmation: "Encuentro paz en mi espacio interior. Mi sabiduría acumulada ilumina mi camino y el de los demás.",
    personality: {
      portrait: "Pensador profundo, reflexivo y reservado. Prefiere la calidad a la cantidad en sus vínculos y posee una vasta cultura o riqueza espiritual.",
      comfortZone: "Su biblioteca, largas caminatas a solas en la naturaleza y momentos dedicados al estudio sin interrupciones.",
      shadowTendency: "Aislamiento antisocial, frialdad emocional, arrogancia intelectual y miedo a abrir su corazón al mundo.",
    },
    relationships: {
      dynamics: "Necesita mucho espacio a solas para pensar y escribir. La pareja debe comprender su necesidad de silencio.",
      partnerProfile: "Alguien respetuoso de su intimidad, intelectualmente estimulante y emocionalmente autónomo.",
      growthArea: "Aprender a compartir sus tesoros interiores y mostrar su vulnerabilidad sin refugiarse en el mutismo.",
    },
    money: {
      careerPath: "Investigación científica, filosofía, literatura, medicina especializada, archivística y consultoría estratégica.",
      financialMindset: "No persigue el dinero por vanidad; valora los recursos en la medida en que garantizan su libertad de pensar.",
      potentialBlock: "Despreciar el mundo material o rechazar cobrar honorarios justos por sus conocimientos.",
    },
    karmic: {
      pastLesson: "Superar el encierro amargo, la misantropía o el desdén hacia la sociedad vivido en el pasado.",
      evolutionaryPath: "Bajar de la torre de marfil y compartir su linterna de sabiduría con quienes buscan guía.",
    },
    talents: {
      primaryGift: "Concentración inquebrantable, investigación analítica profunda y maestría espiritual.",
      activation: "Escribir ensayos, dedicar una hora diaria a la lectura y no aislarse de sus amigos leales.",
    },
  },

  10: {
    ...arcanaMeanings[10],
    number: 10,
    name: "La Rueda de la Fortuna",
    archetype: "El Navegante del Flujo y la Buena Estrella",
    keywords: ["Flujo", "Sincronía", "Oportunidad", "Ciclos", "Confianza"],
    essence: "El Arcano 10 simboliza el fluir con las corrientes cósmicas de la vida. Representa la sincronía afortunada y la apertura al cambio.",
    pullQuote: "La vida conspira a favor de quien suelta la resistencia rígida y aprende a surfear las olas del presente.",
    affirmation: "Confío en el ritmo perfecto de mi vida. Me abro a las oportunidades y recibo con gratitud la abundancia.",
    personality: {
      portrait: "Persona flexible, sociable y llena de optimismo. Atrae la buena suerte cuando no fuerza los acontecimientos y confía en su intuición.",
      comfortZone: "Sentirse libre de ataduras rígidas, viajar, cambiar de ambiente con frecuencia y trabajar en proyectos diversos.",
      shadowTendency: "Pereza pasiva, esperar que el destino resuelva todo sin esfuerzo propio e inestabilidad emocional.",
    },
    relationships: {
      dynamics: "Busca una relación relajada, alegre y sin dramas ni asfixia. Valora la complicidad espontánea.",
      partnerProfile: "Alguien positivo, abierto a viajar y con quien reír y compartir aventuras imprevistas.",
      growthArea: "Desarrollar constancia en los momentos rutinarios de la vida de pareja.",
    },
    money: {
      careerPath: "Inversiones de capital variable, turismo, gestión de eventos, medios digitales y comercio dinámico.",
      financialMindset: "Comprende que el dinero llega fácilmente cuando se encuentra en el flujo adecuado de actividades.",
      potentialBlock: "Juegos de azar, especulación irresponsable o gastar por adelantado confiando en ingresos futuros.",
    },
    karmic: {
      pastLesson: "Aprender a no remar contra la corriente cósmica y no obsesionarse con controlar cada variable.",
      evolutionaryPath: "Desarrollar una confianza inquebrantable en el orden superior de la existencia.",
    },
    talents: {
      primaryGift: "Habilidad para detectar oportunidades en el momento preciso y atraer sincronicidades positivas.",
      activation: "Mantener una actitud de gratitud diaria y no forzar decisiones cuando las puertas están cerradas.",
    },
  },

  11: {
    ...arcanaMeanings[11],
    number: 11,
    name: "La Fuerza",
    archetype: "El Guerrero Apasionado y Vital",
    keywords: ["Vitalidad", "Potencia", "Paciencia", "Resistencia", "Pasión"],
    essence: "El Arcano 11 representa la energía vital pura canalizada a través de la paciencia y el autocontrol amoroso, no de la violencia bruta.",
    pullQuote: "La fuerza más poderosa no es la que aplasta al león con violencia, sino la que lo calma con ternura.",
    affirmation: "Canalizo mi inmensa energía vital hacia fines nobles. Mi paciencia es mi mayor fortaleza.",
    personality: {
      portrait: "Persona enérgica, trabajadora infatigable y con un magnetismo físico imponente. Supera crisis extremas sin rendirse jamás.",
      comfortZone: "Actividad física constante, liderar proyectos desafiantes y sentir que su esfuerzo produce cambios reales.",
      shadowTendency: "Agotamiento por exceso de trabajo, agresividad verbal, juzgar a otros de débiles e incapacidad para descansar.",
    },
    relationships: {
      dynamics: "Vive relaciones apasionadas y profundas. Necesita un vínculo donde la atracción física y el respeto vayan de la mano.",
      partnerProfile: "Alguien seguro de sí mismo, sereno y con suficiente fuerza interior para no dejarse avasallar.",
      growthArea: "Aprender a pedir ayuda y permitirse ser vulnerable sin sentirlo como una derrota personal.",
    },
    money: {
      careerPath: "Deportes profesionales, medicina de urgencias, liderazgo de equipos de rescate, industria pesada y construcción.",
      financialMindset: "Genera ingresos a través de su capacidad de trabajo titánica y resistencia excepcional.",
      potentialBlock: "Burnout severo o descuidar la salud física por perseguir metas materiales sin tregua.",
    },
    karmic: {
      pastLesson: "Sanar episodios de violencia, agresión desmedida o abuso de fuerza corporal en vidas pasadas.",
      evolutionaryPath: "Aprender a domesticar los impulsos destructivos mediante el amor compasivo y la suavidad.",
    },
    talents: {
      primaryGift: "Resistencia física y psicológica extraordinaria capaz de levantar proyectos caídos.",
      activation: "Hacer ejercicio regular, descansar conscientemente y canalizar el estrés a través de la respiración.",
    },
  },

  12: {
    ...arcanaMeanings[12],
    number: 12,
    name: "El Colgado",
    archetype: "El Servidor Compasivo y Nueva Perspectiva",
    keywords: ["Servicio", "Nueva Mirada", "Compasión", "Entrega", "Trascendencia"],
    essence: "El Arcano 12 representa la capacidad de ver el mundo desde un ángulo diferente y el servicio desinteresado guiado por el amor altruista.",
    pullQuote: "Cuando cambias la manera de mirar las cosas, las cosas que miras cambian por completo.",
    affirmation: "Sirvo con alegría sin sacrificar mi dignidad. Miro cada situación desde una perspectiva más elevada.",
    personality: {
      portrait: "Sensible, profundamente altruista y empático. Posee una visión artística y psicológica original y no teme pensar a contracorriente.",
      comfortZone: "Espacios de voluntariado, creación artística, meditación y acompañar a personas en momentos difíciles.",
      shadowTendency: "Complejo de víctima, dificultad extrema para decir 'no', relaciones tóxicas de codependencia y postergación propia.",
    },
    relationships: {
      dynamics: "Tiende a sacrificarse por su pareja hasta agotar su propia energía. Debe aprender a poner límites firmes.",
      partnerProfile: "Alguien equilibrado, agradecido y protector que valore su sensibilidad sin aprovecharse de ella.",
      growthArea: "Aprender que decir 'no' a los abusos ajenos es decirse 'sí' al amor propio.",
    },
    money: {
      careerPath: "Psicología clínica, trabajo social, artes visuales innovadoras, terapias de rehabilitación y fundaciones sin fines de lucro.",
      financialMindset: "El dinero debe tener un propósito humano claro; rechaza enriquecerse a costa del sufrimiento de otros.",
      potentialBlock: "Culpa subconsciente por cobrar dinero o prestar recursos a personas que nunca se los devuelven.",
    },
    karmic: {
      pastLesson: "Trascender el autosacrificio destructivo y la creencia de que sufrir es necesario para ser digno de amor.",
      evolutionaryPath: "Aprender a servir al prójimo desde la plenitud interior y no desde la carencia o la culpa.",
    },
    talents: {
      primaryGift: "Visión no convencional de los problemas humanos y una empatía capaz de sanar heridas profundas.",
      activation: "Practicar artes expresivas, fijar límites claros en las relaciones y cuidar primero su propia salud.",
    },
  },

  13: {
    ...arcanaMeanings[13],
    number: 13,
    name: "La Muerte",
    archetype: "El Transformador Radical y Catalizador de Renacimiento",
    keywords: ["Renacimiento", "Transformación", "Cierre de Ciclos", "Evolución", "Desapego"],
    essence: "El Arcano 13 simboliza el fin de lo obsoleto para abrir paso a una nueva vida. No habla de fatalidad física, sino de metamorfosis psicológica profunda.",
    pullQuote: "Solo cuando nos atrevemos a soltar lo que ya murió, permitimos que la nueva vida nos sorprenda.",
    affirmation: "Suelto el pasado con gratitud. Abrazo los cambios de la vida y renazco con mayor fuerza y sabiduría.",
    personality: {
      portrait: "Persona intensa, valiente y magnética. No tolera la mediocridad ni el estancamiento; transforma radicalmente todo entorno en el que entra.",
      comfortZone: "Comenzar capítulos nuevos, reinventarse profesionalmente y ordenar a fondo desprendiéndose de lo inservible.",
      shadowTendency: "Aferrarse desesperadamente a situaciones podridas por miedo al vacío o provocar rupturas destructivas.",
    },
    relationships: {
      dynamics: "Transforma profundamente a sus parejas. No tolera relaciones tibias; necesita autenticidad o prefiere la soltería.",
      partnerProfile: "Una persona valiente, evolucionada y capaz de acompañar sus grandes procesos de cambio.",
      growthArea: "Aprender a cerrar ciclos con ternura y perdón, sin rencor ni necesidad de revancha.",
    },
    money: {
      careerPath: "Gestión de crisis corporativas, reestructuración empresarial, cirugía médica, psicología de duelo y consultoría de cambio.",
      financialMindset: "Capacidad para levantarse financieramente de cero tras cualquier quiebra o cambio drástico.",
      potentialBlock: "Miedo paralizante a dejar un trabajo seguro pero agotador por temor a la incertidumbre.",
    },
    karmic: {
      pastLesson: "Superar el pánico a la pérdida o la tendencia a destruir relaciones por impulsividad en vidas previas.",
      evolutionaryPath: "Convertirse en un guía sabio que ayude a otros a superar sus crisis vitales con serenidad.",
    },
    talents: {
      primaryGift: "Capacidad para detectar lo que ya no tiene futuro y catalizar reestructuraciones exitosas.",
      activation: "Depurar periódicamente su armario y papeles, y celebrar los cambios como puertas de oportunidad.",
    },
  },

  14: {
    ...arcanaMeanings[14],
    number: 14,
    name: "La Templanza",
    archetype: "El Alquimista del Equilibrio y la Paciencia",
    keywords: ["Armonía", "Moderación", "Paciencia", "Sanación", "Integración"],
    essence: "El Arcano 14 representa el arte de mezclar opuestos hasta crear una síntesis perfecta. Enseña que la curación y la belleza demandan tiempo y suavidad.",
    pullQuote: "La verdadera alquimia de la vida consiste en encontrar la justa medida en cada pensamiento y acción.",
    affirmation: "Vivo en armonía y paz interior. Integro mis contrastes con serenidad y paciencia constante.",
    personality: {
      portrait: "Persona equilibrada, diplomática y con una voz apacible que transmite tranquilidad. Conecta fácilmente con el alma de los demás.",
      comfortZone: "Espacios de silencio, escuchar música suave, crear arte sin prisas y compartir con amigos sinceros.",
      shadowTendency: "Extremismo repentino tras reprimir emociones, adicciones compensatorias y miedo a tomar postura en conflictos.",
    },
    relationships: {
      dynamics: "Busca una relación de amistad profunda, confianza mutua y ritmos sosegados sin tormentas emocionales.",
      partnerProfile: "Alguien bondadoso, paciente y que aprecie los pequeños detalles cotidianos de la vida.",
      growthArea: "Aprender a expresar su desacuerdo a tiempo antes de que la contención acumulada explote.",
    },
    money: {
      careerPath: "Farmacología, diplomacia internacional, nutrición, artes plásticas, mediación y terapias integrativas.",
      financialMindset: "Crecimiento patrimonial constante y moderado mediante el ahorro paciente y la inversión prudente.",
      potentialBlock: "Falta de audacia para aprovechar oportunidades financieras que requieren rapidez de decisión.",
    },
    karmic: {
      pastLesson: "Sanar caídas en vicios, desequilibrios emocionales extremos o impaciencia destructiva en el pasado.",
      evolutionaryPath: "Convertirse en un bálsamo de paz y armonía para familias o comunidades divididas.",
    },
    talents: {
      primaryGift: "Don para sintetizar opiniones contrarias y devolver la calma a situaciones turbulentas.",
      activation: "Practicar técnicas de respiración consciente, cocinar con dedicación y cuidar su hidratación y descanso.",
    },
  },

  15: {
    ...arcanaMeanings[15],
    number: 15,
    name: "El Diablo",
    archetype: "El Maestro de la Sombra y el Poder Magnético",
    keywords: ["Magnetismo", "Sombra", "Poder", "Discernimiento", "Placer"],
    essence: "El Arcano 15 es el espejo de la sombra humana. Enseña a integrar nuestros instintos, ambiciones y pasiones sin caer en la trampa de la dependencia o la manipulación.",
    pullQuote: "Quien conoce su propia sombra sin miedo no puede ser manipulado por las sombras del mundo.",
    affirmation: "Reconozco mis deseos y los dirijo hacia el bien. Soy libre de adicciones y apegos destructivos.",
    personality: {
      portrait: "Persona extraordinariamente carismática, perspicaz y con un detector infalible para las debilidades humanas. Posee un fuerte magnetismo.",
      comfortZone: "Desafíos de alto nivel, entornos de negociación intensa y disfrutar de placeres mundanos de calidad.",
      shadowTendency: "Manipulación psicológica, adicciones tóxicas, obsesión por el control de la pareja y codicia desenfrenada.",
    },
    relationships: {
      dynamics: "Pasión desbordante. El desafío es no caer en dinámicas de celos, dominación o juegos de poder.",
      partnerProfile: "Alguien con una personalidad muy sólida que no se deje intimidar ni manipular emocionalmente.",
      growthArea: "Aprender a amar desde la libertad mutua y no desde la posesión o el miedo a perder el control.",
    },
    money: {
      careerPath: "Altas finanzas, negociación corporativa, derecho penal, psicología de adicciones y marketing de masas.",
      financialMindset: "Gran capacidad para generar grandes sumas de dinero detectando las motivaciones ocultas del mercado.",
      potentialBlock: "Caer en estafas o negocios oscuros por el afán de ganancias exorbitantes e inmediatas.",
    },
    karmic: {
      pastLesson: "Trascender el abuso de poder, la codicia material o la manipulación ejercida en vidas anteriores.",
      evolutionaryPath: "Convertirse en un terapeuta o mentor capaz de guiar a otros a salir de sus adicciones y apegos.",
    },
    talents: {
      primaryGift: "Visión de rayos X para ver las trampas ocultas de la mente humana y un magnetismo financiero único.",
      activation: "Practicar la honestidad radical consigo mismo y no engañar jamás a quienes confían en su palabra.",
    },
  },

  16: {
    ...arcanaMeanings[16],
    number: 16,
    name: "La Torre",
    archetype: "El Libertador Espiritual y Destructor de Ilusiones",
    keywords: ["Despertar", "Liberación", "Verdad", "Resiliencia", "Reconstrucción"],
    essence: "El Arcano 16 representa el rayo de la verdad que derriba las estructuras falsas edificadas sobre el ego, para permitir reconstruir sobre bases auténticas.",
    pullQuote: "Lo que se derrumba por el rayo de la verdad nunca tuvo la fuerza para sostener tu verdadera grandeza.",
    affirmation: "Construyo mi vida sobre bases auténticas y espirituales. Mi verdadera fuerza reside en mi espíritu libre.",
    personality: {
      portrait: "Persona fuerte, despierta y con un coraje a toda prueba. Posee una resiliencia inquebrantable y sabe renacer de las cenizas con mayor sabiduría.",
      comfortZone: "Superar grandes pruebas, romper moldes anticuados y construir proyectos innovadores desde cero.",
      shadowTendency: "Ira destructiva, provocar crisis innecesarias, soberbia y miedo constante a que todo se derrumbe.",
    },
    relationships: {
      dynamics: "Relaciones que transforman radicalmente su escala de valores. Debe evitar derrumbar puentes por orgullo herido.",
      partnerProfile: "Alguien auténtico, desapegado de lo superficial y con gran madurez espiritual.",
      growthArea: "Aprender a reconstruir con paciencia en lugar de arrasar con todo ante la primera dificultad.",
    },
    money: {
      careerPath: "Arquitectura e ingeniería estructural, reconstrucción poscrisis, gestión de riesgos y coaching de transformación.",
      financialMindset: "Comprende que el apego ciego a la seguridad material es una ilusión; invierte en su propia capacidad de reinvención.",
      potentialBlock: "Pérdidas repentinas causadas por edificar sobre fundamentos poco éticos o poco claros.",
    },
    karmic: {
      pastLesson: "Sanar la soberbia del ego y aprender a valorar lo espiritual por encima de las apariencias de poder.",
      evolutionaryPath: "Enseñar a otros a no temer las crisis y a reconstruir sus vidas sobre fundamentos sólidos.",
    },
    talents: {
      primaryGift: "Resiliencia monumental y clarividencia para derribar ilusiones tóxicas y renacer con dignidad.",
      activation: "Practicar el desapego material voluntario y mantener una actitud humilde ante los giros de la vida.",
    },
  },

  17: {
    ...arcanaMeanings[17],
    number: 17,
    name: "La Estrella",
    archetype: "El Faro de Inspiración y Esperanza Creativa",
    keywords: ["Inspiración", "Estrella", "Esperanza", "Talento", "Visión"],
    essence: "El Arcano 17 es la luz de la estrella guía en la noche. Representa la fe en el porvenir, los talentos artísticos innatos y la inspiración que eleva a la humanidad.",
    pullQuote: "Tu autenticidad es tu estrella: brilla con luz propia sin intentar apagar el resplandor de los demás.",
    affirmation: "Confío en mi estrella interior. Comparto mis dones con el mundo con generosidad y alegría.",
    personality: {
      portrait: "Persona carismática, luminosa y profundamente creativa. Inspira esperanza en los demás y destaca con facilidad en cualquier ámbito que elija.",
      comfortZone: "Subir a un escenario, crear arte, compartir sus ideas con el público y rodearse de belleza cósmica.",
      shadowTendency: "Vanidad estéril, arrogancia de diva, soledad por sentirse incomprendido y frustración si no recibe aplausos.",
    },
    relationships: {
      dynamics: "Busca una relación romántica inspiradora donde ambos se admiren y apoyen mutuamente en sus sueños.",
      partnerProfile: "Alguien generoso, que celebre su éxito sin envidias y le ofrezca un refugio de ternura y confianza.",
      growthArea: "Aprender a valorar la vida cotidiana sencilla y no exigir que cada día sea un espectáculo grandioso.",
    },
    money: {
      careerPath: "Artes escénicas, música, diseño gráfico, medios de comunicación, astrología y marcas de prestigio internacional.",
      financialMindset: "Monetiza su talento personal y su imagen pública cuando actúa con autenticidad y excelencia.",
      potentialBlock: "Vivir por encima de sus posibilidades para proyectar una imagen de éxito ante las redes sociales.",
    },
    karmic: {
      pastLesson: "Superar el complejo de superioridad o el miedo al rechazo público vivido en etapas anteriores.",
      evolutionaryPath: "Utilizar su visibilidad y magnetismo para inspirar causas nobles y devolver la fe a los desanimados.",
    },
    talents: {
      primaryGift: "Brillo personal natural, inspiración artística y capacidad para contagiar optimismo a miles de personas.",
      activation: "Crear contenido creativo a diario, perfeccionar su técnica artística y cuidar su paz mental nocturna.",
    },
  },

  18: {
    ...arcanaMeanings[18],
    number: 18,
    name: "La Luna",
    archetype: "El Maestro del Subconsciente y la Imaginación Sagrada",
    keywords: ["Imaginación", "Subconsciente", "Misterio", "Intuición", "Manifestación"],
    essence: "El Arcano 18 representa el océano de la mente subconsciente. Enseña que los pensamientos y miedos son fuerzas creadoras que moldean nuestra realidad.",
    pullQuote: "Lo que temes lo atraes; lo que imaginas con fe y amor lo conviertes en tu realidad tangible.",
    affirmation: "Limpio mis miedos inconscientes. Mi imaginación es un canal puro de creación positiva y amorosa.",
    personality: {
      portrait: "Persona hipersensible, intuitiva y con una imaginación desbordante. Conecta con el mundo de los sueños y las corrientes invisibles de la psique.",
      comfortZone: "Estar cerca del agua (mar, lagos), escribir poesía o ficción, meditar en la noche y practicar rituales de calma.",
      shadowTendency: "Ansiedad irracional, pesadillas, dependencia de adicciones para calmar la mente y manipulación emocional indirecta.",
    },
    relationships: {
      dynamics: "Conexión emocional y psíquica muy profunda. Debe cuidar de no proyectar fantasías o miedos infundados en su pareja.",
      partnerProfile: "Alguien protector, leal y de mente muy clara que actúe como un ancla de tierra en momentos de tormenta.",
      growthArea: "Aprender a distinguir entre una intuición real y un miedo condicionado por su mente subconsciente.",
    },
    money: {
      careerPath: "Psicoanálisis, cinematografía, literatura de misterio, terapias de hipnosis, fotografía y diseño digital.",
      financialMindset: "Materializa abundancia a través de visualizaciones claras y proyectos que toquen la emoción colectiva.",
      potentialBlock: "Miedos paralizantes al fracaso financiero o autosabotajes nacidos de creencias de carencia arraigadas.",
    },
    karmic: {
      pastLesson: "Curar el uso de engaños, magia manipulativa o miedos irracionales acumulados en vidas pasadas.",
      evolutionaryPath: "Convertir los miedos oscuros en arte luminoso y guiar a otros a sanar su mente subconsciente.",
    },
    talents: {
      primaryGift: "Poder de materialización a través de la visualización creativa y comprensión de la psique humana.",
      activation: "Llevar un diario de sueños, filtrar pensamientos negativos y pasar tiempo en silencio junto a la naturaleza.",
    },
  },

  19: {
    ...arcanaMeanings[19],
    number: 19,
    name: "El Sol",
    archetype: "El Líder Radiante de Alegría y Prosperidad",
    keywords: ["Alegría", "Generosidad", "Éxito", "Vitalidad", "Calor Humano"],
    essence: "El Arcano 19 encarna la luz plena del mediodía. Representa el éxito, la generosidad incondicional y la capacidad de calentar el corazón de los demás.",
    pullQuote: "El sol no elige a quién iluminar: brilla con generosidad para todos y en ese acto encuentra su plenitud.",
    affirmation: "Irradio alegría, calor y abundancia. Celebro mis éxitos y comparto mis bendiciones con los demás.",
    personality: {
      portrait: "Persona entusiasta, generosa y con un optimismo contagioso. Atrae a niños, amigos y colaboradores con su calidez sincera.",
      comfortZone: "Pasar tiempo al sol, jugar con niños o mascotas, celebrar fiestas con la familia y liderar proyectos de gran envergadura.",
      shadowTendency: "Quemar a los demás con su ego, arrogancia, exigencia tiránica de admiración e incapacidad para aceptar críticas.",
    },
    relationships: {
      dynamics: "Entrega un amor radiante, generoso y protector. Desea una pareja con quien compartir una familia feliz y llena de risas.",
      partnerProfile: "Alguien alegre, agradecido y afectuoso que valore su corazón noble y comparta su generosidad.",
      growthArea: "Aprender que no siempre tiene que ser el centro de atención; dejar que su pareja brille con luz propia.",
    },
    money: {
      careerPath: "Liderazgo empresarial, entretenimiento infantil, energía solar, relaciones públicas de alto impacto y filantropía.",
      financialMindset: "Mentalidad de prosperidad ilimitada; el dinero se multiplica cuando se comparte con nobleza y generosidad.",
      potentialBlock: "Derroche imprudente por impresionar a los demás o financiar a personas dependientes.",
    },
    karmic: {
      pastLesson: "Superar el egoísmo arrogante o el desprecio hacia los más humildes experimentado en ciclos anteriores.",
      evolutionaryPath: "Convertirse en un líder benefactor que utilice sus recursos para elevar la calidad de vida de muchas familias.",
    },
    talents: {
      primaryGift: "Magnetismo de prosperidad natural, carisma social arrollador y capacidad para contagiar optimismo.",
      activation: "Tomar baños de sol por las mañanas, agradecer cada día y apoyar causas dedicadas a la infancia.",
    },
  },

  20: {
    ...arcanaMeanings[20],
    number: 20,
    name: "El Juicio",
    archetype: "El Sanador del Linaje y Despertar de Conciencia",
    keywords: ["Linaje", "Renovación", "Llamado", "Perdón", "Trascendencia"],
    essence: "El Arcano 20 es la trompeta del renacimiento espiritual. Representa la sanación de los patrones kármicos familiares y la respuesta al llamado superior.",
    pullQuote: "Sanar tu propia herida es el mayor regalo de liberación que puedes entregar a tus ancestros y a tus descendientes.",
    affirmation: "Honro mis raíces familiares y sano los patrones del pasado. Respondo con amor a mi llamado interior.",
    personality: {
      portrait: "Persona madura, conectada con sus raíces y con una clara percepción de su misión de vida. Posee un fuerte sentido de la justicia ancestral.",
      comfortZone: "Reuniones familiares armoniosas, estudiar genealogía, meditar en cementerios o templos y trabajar con tradiciones antiguas.",
      shadowTendency: "Rencor perpetuo contra los padres, repetir las tragedias de los ancestros y juicio despiadado hacia la familia.",
    },
    relationships: {
      dynamics: "Valora la estabilidad, el compromiso a largo plazo y la creación de un hogar fundamentado en el respeto mutuo.",
      partnerProfile: "Alguien con valores familiares claros, comprensivo de sus raíces y comprometido con la sanación mutua.",
      growthArea: "Aprender a perdonar los errores de sus padres para no proyectarlos inconscientemente en su pareja.",
    },
    money: {
      careerPath: "Historia familiar, terapia de constelaciones, derecho sucesorio, antropología y preservación del patrimonio.",
      financialMindset: "Crea riqueza con visión intergeneracional para dejar un legado sólido a sus descendientes.",
      potentialBlock: "Cargar con deudas o culpas financieras heredadas de familiares que le impiden prosperar.",
    },
    karmic: {
      pastLesson: "Sanar traiciones, exclusiones o rechazos cometidos dentro del clan familiar en vidas pasadas.",
      evolutionaryPath: "Convertirse en el eslabón dorado de su árbol genealógico que rompe las maldiciones y bendice a las futuras generaciones.",
    },
    talents: {
      primaryGift: "Capacidad para detectar patrones kármicos hereditarios y sanar traumas emocionales profundos.",
      activation: "Elaborar su árbol genealógico con compasión, orar por sus antepasados y perdonar con el corazón abierto.",
    },
  },

  21: {
    ...arcanaMeanings[21],
    number: 21,
    name: "El Mundo",
    archetype: "El Ciudadano Global y la Conciencia Universal",
    keywords: ["Plenitud", "Globalidad", "Trascendencia", "Paz", "Integración"],
    essence: "El Arcano 21 representa la consumación victoriosa del viaje evolutivo. Es la conciencia cósmica que abraza todas las culturas sin fronteras.",
    pullQuote: "El mundo entero es tu hogar cuando comprendes que la misma chispa divina habita en cada ser vivo.",
    affirmation: "Soy uno con el universo entero. Vivo en paz, libertad y armonía con todas las culturas y seres.",
    personality: {
      portrait: "Persona de mente abierta, pacifista, cosmopolita y tolerante. Aprende idiomas con facilidad y se siente en casa en cualquier rincón del planeta.",
      comfortZone: "Viajar por el mundo, conectarse a través de internet con personas de diferentes países y trabajar en proyectos globales.",
      shadowTendency: "Rechazo a su propio país o raíces, utopismo desconectado de la realidad cotidiana y miedo a arraigarse.",
    },
    relationships: {
      dynamics: "A menudo forma pareja con personas de diferentes culturas, religiones o países. Valora la libertad y la tolerancia mutua.",
      partnerProfile: "Alguien cosmopolita, políglota o con una visión abierta y tolerante de la vida humana.",
      growthArea: "Aprender a cuidar su realidad local y su presente inmediato mientras sueña con causas planetarias.",
    },
    money: {
      careerPath: "Organizaciones no gubernamentales internacionales, diplomacia, comercio exterior, internet global y traducción.",
      financialMindset: "Genera ingresos en múltiples divisas a través de plataformas digitales y redes internacionales.",
      potentialBlock: "Dispersar sus esfuerzos en demasiados proyectos globales sin consolidar una base económica local.",
    },
    karmic: {
      pastLesson: "Superar el racismo, la intolerancia cultural o el nacionalismo excluyente vivido en encarnaciones pasadas.",
      evolutionaryPath: "Ser un embajador de paz y reconciliación intercultural que ayude a derribar prejuicios en el mundo.",
    },
    talents: {
      primaryGift: "Conciencia planetaria amplia, facilidad para los idiomas y visión holística de los problemas globales.",
      activation: "Aprender una nueva lengua, viajar a lugares lejanos y participar en redes internacionales de cooperación.",
    },
  },

  22: {
    ...arcanaMeanings[22],
    number: 22,
    name: "El Loco",
    archetype: "El Espíritu Libre y Maestro de la Espontaneidad",
    keywords: ["Libertad", "Espontaneidad", "Inocencia", "Confianza", "Alegría"],
    essence: "El Arcano 22 encarna la libertad espiritual absoluta. Representa la inocencia del corazón que confía ciegamente en el universo y comienza de nuevo sin apegos.",
    pullQuote: "Quien no tiene nada que ocultar ni nada que defender viaja por el mundo con la ligereza de los ángeles.",
    affirmation: "Soy libre de apegos y miedos al futuro. Camino con fe, alegría y ligereza en cada paso.",
    personality: {
      portrait: "Persona fresca, espontánea, divertida y sin miedo a hacer el ridículo. Vive en el presente y contagia alegría con su humor desinhibido.",
      comfortZone: "Sentirse libre de ataduras rutinarias, improvisar planes sobre la marcha, reírse de sí mismo y viajar ligero de equipaje.",
      shadowTendency: "Irresponsabilidad destructiva, inmadurez crónica, burlarse de los compromisos ajenos y caos vital.",
    },
    relationships: {
      dynamics: "No tolera los celos, la asfixia ni el control rígido. Necesita una pareja que sea su mejor amiga de aventuras.",
      partnerProfile: "Alguien alegre, desapegado, con sentido del humor y que valore la libertad mutua como pilar de la relación.",
      growthArea: "Aprender a cumplir con sus responsabilidades cotidianas sin sentirlas como una cárcel personal.",
    },
    money: {
      careerPath: "Creatividad artística independiente, comedia, viajes de aventura, innovación disruptiva y animación digital.",
      financialMindset: "No se apega al dinero; sabe que siempre habrá recursos disponibles para vivir con alegría.",
      potentialBlock: "Despreocupación extrema por el ahorro o firmar contratos sin leer las cláusulas legales.",
    },
    karmic: {
      pastLesson: "Sanar encierros físicos o emocionales, y aprender a usar la libertad personal sin dañar a quienes confían en él.",
      evolutionaryPath: "Vivir con la inocencia de un niño sabio y recordar a los adultos que la vida es un juego sagrado.",
    },
    talents: {
      primaryGift: "Capacidad para comenzar de cero sin miedo, desapego total y un sentido del humor que desarma cualquier conflicto.",
      activation: "Reír a carcajadas, improvisar actividades creativas y desprenderse de compromisos que ya no resuenan con su alma.",
    },
  },
};
