export interface FaqItem {
  question: string;
  answer: string;
}

export const homepageFaqs: FaqItem[] = [
  {
    question: "What is the Destiny Matrix?",
    answer:
      "The Destiny Matrix is a chart generated from your date of birth. It maps your birth numbers onto 22 positions, each linked to one of the tarot's Major Arcana, to describe patterns in your personality, relationships, and life themes.",
  },
  {
    question: "Is the Destiny Matrix the same as Matrix of Destiny?",
    answer:
      "Yes. Both names refer to the same method and the same chart — the difference is just word order, and you'll see both used across different sites and calculators.",
  },
  {
    question: "How do I calculate my Destiny Matrix chart?",
    answer:
      "Add the digits of your full birth date together, then reduce the total to a number between 1 and 22. Repeat this process using different combinations of your day, month, and year to fill in the other positions on the chart. Most people use a calculator rather than doing this by hand, since a full chart has 22 positions to fill.",
  },
  {
    question: "Is this a personality test?",
    answer:
      "No. A personality test scores your answers to questions. A Destiny Matrix is calculated entirely from your birth date, so there's nothing to answer — the chart is the same every time you generate it.",
  },
  {
    question: "How do I read my Destiny Matrix chart?",
    answer:
      "Start with the center position, since it represents your core energy, then look at the love line, money line, and karmic tail. Reading two positions together — for example, your love line and your karmic tail — usually tells you more than reading any single number alone.",
  },
  {
    question: "How does Destiny Matrix compatibility work?",
    answer:
      "Both people's birth dates are calculated separately, then the results are compared position by position. Shared numbers on the love line are usually the first thing worth checking, though a shared number isn't automatically positive and a different number isn't automatically negative.",
  },
  {
    question: "What is the love line in a Destiny Matrix?",
    answer:
      "It's the chart position that reflects relationship patterns — what you're drawn to in a partner and what tends to repeat across different relationships.",
  },
  {
    question: "Can I check compatibility with someone who isn't a partner?",
    answer:
      "Yes. The same calculation works for family members and friends. It compares two charts against each other regardless of the relationship type.",
  },
  {
    question: "What can't the Destiny Matrix tell me?",
    answer:
      "It can't predict specific future events, diagnose health issues, or tell you what decision to make. Treat it as a way to notice patterns, not as a source of instructions or guarantees.",
  },
  {
    question: "Where does the Destiny Matrix method come from?",
    answer:
      "It combines numerology, tarot's Major Arcana, Kabbalah, and the chakra system into a single chart. The modern 22-energy framework was formulated in 2006 (popularized by Natalya Ladini) synthesizing ancient esoteric wisdom into an accessible psychological diagnostic map.",
  },
];
