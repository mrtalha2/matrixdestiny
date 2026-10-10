/**
 * Páginas legais e institucionais localizadas em Português do Brasil (você)
 * Matriz do Destino
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

export const ptBrLegalPages: Record<string, LegalPageContent> = {
  about: {
    slug: "about",
    title: "Sobre a Matriz do Destino",
    metaTitle: "Sobre Nós — Matriz do Destino e Metodologia",
    metaDescription:
      "Conheça a Matriz do Destino: uma plataforma educacional independente que explora o sistema dos 22 Arcanos com rigor algorítmico e transparência ética.",
    badge: "Publicação Educacional",
    lastUpdated: "Outubro de 2026",
    sections: [
      {
        heading: "Nossa Missão e Propósito",
        paragraphs: [
          "A Matriz do Destino é uma plataforma digital independente dedicada à pesquisa e divulgação de análises arquetípicas. Nosso propósito é apresentar o método dos 22 Arcanos com clareza matemática, transparência algorítmica e sobriedade filosófica, sem misticismos sensacionalistas.",
          "Acreditamos que o autoconhecimento reflexivo deve estar ao alcance de todas as pessoas. Por isso, oferecemos cálculos completos de mais de 40 páginas sem cobranças ocultas e sem retenção indevida de dados pessoais.",
        ],
      },
      {
        heading: "Metodologia e Linhagem",
        paragraphs: [
          "Seguimos rigorosamente o método clássico desenvolvido em 2006 por Natalia Ladini no Leste Europeu. O sistema sintetiza a numerologia de redução ao 22, os 22 Arcanos Maiores do tarô e os sete centros energéticos védicos (chakras) sobre uma estrela geométrica de oito pontas (octagrama).",
          "Diferente de calculadoras que arredondam o ano para apenas dois dígitos, nosso algoritmo soma os quatro algarismos do ano solar completo, preservando a coerência canônica do mapa.",
        ],
      },
      {
        heading: "Limites Honestos e Ética",
        paragraphs: [
          "Declaramos abertamente que a Matriz do Destino não é uma ciência exata, não possui validação empírica em laboratório e não substitui consultas médicas, psicológicas, jurídicas ou financeiras.",
          "Trata-se de um mapa simbólico para reflexão pessoal, cultivo da autorresponsabilidade e diálogo sincero consigo mesmo.",
        ],
      },
    ],
  },

  contact: {
    slug: "contact",
    title: "Contato e Suporte",
    metaTitle: "Contato — Matriz do Destino",
    metaDescription:
      "Entre em contato com a equipe da Matriz do Destino para dúvidas técnicas, sugestões editoriais, privacidade ou parcerias.",
    badge: "Atendimento ao Usuário",
    lastUpdated: "Outubro de 2026",
    sections: [
      {
        heading: "Como Falar Conosco",
        paragraphs: [
          "Valorizamos o contato direto e transparente com nossa comunidade. Se você tiver dúvidas sobre o funcionamento da calculadora, encontrar alguma inconsistência ou quiser exercer seus direitos de privacidade, estamos prontos para ajudar.",
          "Envie uma mensagem para o nosso e-mail oficial: contato@matrizdodestino.com. Respondemos a todas as mensagens legítimas em até 48 horas úteis.",
        ],
      },
      {
        heading: "Sugestões Editoriais e Correções",
        paragraphs: [
          "Se você identificar algum erro de tradução ou quiser sugerir tópicos para futuros guias e artigos, envie suas observações para nossa equipe de redação.",
        ],
      },
      {
        heading: "Privacidade e Proteção de Dados (LGPD)",
        paragraphs: [
          "Nossa calculadora opera no navegador do usuário e não salva sua data de nascimento em bancos de dados permanentes. Se você solicitou o envio do gráfico por e-mail e deseja excluir seus registros, atenderemos prontamente sua solicitação.",
        ],
      },
    ],
  },

  "editorial-policy": {
    slug: "editorial-policy",
    title: "Política Editorial e Padrões Éticos",
    metaTitle: "Política Editorial — Matriz do Destino",
    metaDescription:
      "Conheça nossas diretrizes editoriais: sobriedade pedagógica, ausência de alegações pseudocientíficas e respeito absoluto ao leitor.",
    badge: "Padrões Editoriais",
    lastUpdated: "Outubro de 2026",
    sections: [
      {
        heading: "Compromisso com a Honestidade Intelectual",
        paragraphs: [
          "Na Matriz do Destino rejeitamos promessas mágicas, premonições fatalistas e sensacionalismo esotérico. Todo o nosso conteúdo é elaborado com responsabilidade educativa, incentivando o pensamento crítico e a autonomia do leitor.",
          "Nossos artigos mantêm linguagem acessível, explicações conceituais claras desde o primeiro parágrafo e distinção nítida entre arquétipos simbólicos e fatos cientificamente comprovados.",
        ],
      },
      {
        heading: "Critérios de Pesquisa e Redação",
        paragraphs: [
          "Nossa equipe de pesquisadores segue critérios bem definidos: definições diretas sob cada título, exemplos práticos da rotina diária, ausência de frases de preenchimento artificial e respeito às fontes históricas documentadas.",
          "Não inventamos depoimentos falsos e sempre creditamos a autoria contemporânea da metodologia a Natalia Ladini.",
        ],
      },
      {
        heading: "Transparência Publicitária",
        paragraphs: [
          "O acesso a todas as nossas calculadoras e guias é 100% gratuito. Para cobrir os custos de servidores e desenvolvimento, exibimos anúncios contextuais não invasivos devidamente identificados, preservando a independência do nosso conteúdo.",
        ],
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Aviso Legal e Isenção de Responsabilidade",
    metaTitle: "Aviso Legal — Matriz do Destino",
    metaDescription:
      "Isenção de responsabilidade da Matriz do Destino: ferramenta de reflexão e autoconhecimento sem aconselhamento médico, jurídico ou financeiro.",
    badge: "Aviso Legal",
    lastUpdated: "Outubro de 2026",
    sections: [
      {
        heading: "Finalidade Exclusivamente Educacional e Recreativa",
        paragraphs: [
          "As informações, gráficos, cálculos e textos disponibilizados neste site são fornecidos exclusivamente para fins educacionais, culturais, filosóficos e de reflexão pessoal. Não constituem aconselhamento profissional de nenhuma espécie.",
        ],
      },
      {
        heading: "Sem Aconselhamento Médico ou Psicológico",
        paragraphs: [
          "A tabela de chakras e as descrições de saúde são modelos simbólicos de autopercepção emocional. Em hipótese alguma realizam diagnósticos clínicos, prescrevem tratamentos ou substituem a consulta com médicos ou psicólogos devidamente habilitados. Se você tiver sintomas físicos ou sofrimento emocional, procure ajuda profissional de saúde.",
        ],
      },
      {
        heading: "Sem Consultoria Financeira ou de Investimentos",
        paragraphs: [
          "As leituras da linha do dinheiro abordam posturas psicológicas diante do valor e do trabalho. Não representam recomendações financeiras, contábeis ou de investimentos em ativos de qualquer natureza.",
        ],
      },
      {
        heading: "Autorresponsabilidade do Usuário",
        paragraphs: [
          "O usuário é o único responsável por suas decisões e escolhas práticas de vida. Os criadores e mantenedores do site não se responsabilizam por interpretações ou ações decorrentes do uso da plataforma.",
        ],
      },
    ],
  },

  privacy: {
    slug: "privacy",
    title: "Política de Privacidade e Proteção de Dados",
    metaTitle: "Política de Privacidade — Matriz do Destino",
    metaDescription:
      "Política de privacidade da Matriz do Destino. Saiba como processamos os cálculos localmente no seu dispositivo, respeitando a LGPD e sua privacidade.",
    badge: "Privacidade Garantida",
    lastUpdated: "Outubro de 2026",
    sections: [
      {
        heading: "Privacidade por Padrão",
        paragraphs: [
          "Na Matriz do Destino respeitamos profundamente sua privacidade digital. O cálculo do seu octagrama é executado no próprio navegador do seu dispositivo ou em memória temporária, sem armazenamento forçado de datas de nascimento em bancos de dados permanentes.",
          "Não comercializamos, não alugamos e não compartilhamos seus dados pessoais com terceiros para fins de marketing.",
        ],
      },
      {
        heading: "Dados Coletados e Finalidade",
        paragraphs: [
          "Dados fornecidos voluntariamente: Caso você opte por receber seu mapa por e-mail, usamos seu endereço apenas para enviar o relatório solicitado por meio do serviço transacional seguro (Resend), sem uso secundário.",
          "Dados técnicos de navegação: Coletamos registros padrão e anônimos de acesso ao servidor (endereço IP anonimizado e tipo de navegador) para garantir a segurança da infraestrutura contra ataques cibernéticos.",
        ],
      },
      {
        heading: "Cookies e Preferências de Publicidade",
        paragraphs: [
          "Utilizamos cookies essenciais para manter suas preferências de idioma e tema. Com sua permissão prévia, nossos parceiros de anúncios (como o Google AdSense) utilizam cookies para exibir publicidade não intrusiva que mantém o site gratuito.",
          "Você pode aceitar, recusar ou alterar suas preferências de cookies a qualquer momento através do nosso banner de consentimento.",
        ],
      },
      {
        heading: "Seus Direitos (LGPD e RGPD)",
        paragraphs: [
          "De acordo com a Lei Geral de Proteção de Dados (LGPD) e o RGPD europeu, você tem o direito de solicitar acesso, correção ou exclusão de qualquer dado fornecido entrando em contato pelo e-mail privacidade@matrizdodestino.com.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Termos e Condições de Uso",
    metaTitle: "Termos de Uso — Matriz do Destino",
    metaDescription:
      "Termos e condições de uso da Matriz do Destino. Regras de utilização, propriedade intelectual e limitações de responsabilidade.",
    badge: "Acordo Legal",
    lastUpdated: "Outubro de 2026",
    sections: [
      {
        heading: "Aceitação dos Termos",
        paragraphs: [
          "Ao acessar e utilizar este site, você concorda em cumprir estes Termos e Condições, bem como nossa Política de Privacidade e Aviso Legal. Se não concordar com qualquer condição, solicitamos que não utilize nossos serviços.",
        ],
      },
      {
        heading: "Licença de Uso Pessoal e Não Comercial",
        paragraphs: [
          "Concedemos a você uma licença gratuita, não exclusiva e revogável para gerar, visualizar e baixar seus mapas pessoais exclusivamente para uso individual e educacional.",
          "É proibida a raspagem automatizada de dados (scraping), a revenda comercial dos relatórios gerados e a engenharia reversa do código-fonte sem autorização prévia por escrito.",
        ],
      },
      {
        heading: "Propriedade Intelectual",
        paragraphs: [
          "Todos os textos originais, marcas, estilos visuais, elementos de design e códigos de software são de propriedade da Matriz do Destino ou licenciados legitimamente. O simbolismo dos 22 Arcanos Maiores pertence ao domínio público cultural.",
        ],
      },
      {
        heading: "Alterações no Serviço",
        paragraphs: [
          "Reservamo-nos o direito de aprimorar, atualizar ou descontinuar recursos do site a qualquer momento, buscando sempre a melhor experiência técnica para a comunidade.",
        ],
      },
    ],
  },
};

export function getPtBrLegalPage(slug: string): LegalPageContent | undefined {
  return ptBrLegalPages[slug];
}
