/**
 * 4-Stage Life Purpose Roadmap - In-Depth Interpretations
 * Based on the Natalia Ladini Destiny Matrix framework.
 */

export interface PurposeStageDetails {
  title: string;
  ageRange: string;
  formulaDescription: string;
  theme: string;
  coreGuidance: string;
  integrationMilestones: string[];
}

export const purposeStagesInfo: Record<"personal" | "social" | "spiritual" | "planetary", PurposeStageDetails> = {
  personal: {
    title: "Personal Purpose (Search for Self)",
    ageRange: "Ages 20 – 40",
    formulaDescription: "Sky Axis (Top B + Bottom D) + Earth Axis (Left A + Right C)",
    theme: "Integrating your inner spiritual core with your worldly, physical identity.",
    coreGuidance:
      "Between the ages of 20 and 40, your soul's primary assignment is self-definition. The Earth line represents your physical body, material survival, and daily persona. The Sky line represents your subtle intuition, spiritual values, and past-life memories. When these two axes meet in harmony, you step into adulthood fully grounded yet spiritually conscious.",
    integrationMilestones: [
      "Achieve financial independence without abandoning your ethical or artistic passions.",
      "Understand your body's vitality rhythms and personal energetic boundaries.",
      "Heal subconscious past-life patterns so they do not dictate your career or love choices.",
      "Arrive at age 40 knowing who you are, what you stand for, and where your strengths lie.",
    ],
  },

  social: {
    title: "Social Purpose (Duty to Clan & Community)",
    ageRange: "Ages 40 – 60",
    formulaDescription: "Paternal Line (F + H) + Maternal Line (G + I)",
    theme: "Fulfilling your societal assignment and harmonizing ancestral bloodlines.",
    coreGuidance:
      "Between ages 40 and 60, focus shifts from 'What can the world give me?' to 'What can I build for the collective?' This stage is calculated from the diagonals of your Earth Square: the male and female ancestral lines. By reconciling with both lineages and serving your broader community, you transform personal success into enduring social contribution.",
    integrationMilestones: [
      "Mentor the younger generation and share accumulated professional and life wisdom.",
      "Resolve lingering grievances with parents, in-laws, and ancestral legacies.",
      "Create platforms, businesses, charities, or institutions that benefit others beyond yourself.",
      "Balance healthy masculine assertiveness with nurturing feminine empathy.",
    ],
  },

  spiritual: {
    title: "Spiritual Purpose (Transcendent Synthesis)",
    ageRange: "Ages 60+",
    formulaDescription: "Personal Purpose + Social Purpose",
    theme: "Soul maturation, contemplation, and transmitting timeless wisdom.",
    coreGuidance:
      "Beyond age 60, worldly ambition gives way to deep spiritual synthesis. Having integrated your personal self (Stage 1) and contributed your gifts to society (Stage 2), your soul receives the spiritual reward: profound inner peace, transcendent insight, and becoming a guiding beacon for others.",
    integrationMilestones: [
      "Release attachment to titles, prestige, and material hoarding.",
      "Live as an authentic elder in your community, offering calm perspective during crises.",
      "Deepen contemplation, prayer, meditation, or artistic philosophical expression.",
      "Face mortality and life transitions with serene trust in eternity.",
    ],
  },

  planetary: {
    title: "Planetary Purpose (Global Soul Impact)",
    ageRange: "Lifelong / Collective",
    formulaDescription: "Social Purpose + Spiritual Purpose",
    theme: "Harmonizing with the evolution of planetary human consciousness.",
    coreGuidance:
      "Your planetary purpose represents the subtlest frequency of your soul's matrix. It describes how your personal vibration interacts with the collective unconscious of humanity. When you live in alignment with this energy, even your silent everyday presence assists the global transition toward greater light and harmony.",
    integrationMilestones: [
      "Think globally and act locally with ecological and humanitarian empathy.",
      "Cultivate tolerance and respect for people of all nations, races, and belief systems.",
      "Radiate peaceful, constructive vibration into your immediate physical surroundings.",
      "Contribute to initiatives that preserve our planet for future generations.",
    ],
  },
};
