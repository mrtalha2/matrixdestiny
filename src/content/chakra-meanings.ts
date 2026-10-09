/**
 * 7-Chakra Health Matrix - System & Psychosomatic Meanings
 * Based on the authentic Natalia Ladini Health Matrix methodology.
 */

export interface ChakraMeaning {
  key: "Sahasrara" | "Ajna" | "Vishuddha" | "Anahata" | "Manipura" | "Svadhisthana" | "Muladhara";
  order: number;
  sanskrit: string;
  nameEn: string;
  colorName: string;
  colorHex: string;
  organs: string;
  psychosomaticTheme: string;
  imbalanceSigns: string[];
  harmonizationPractices: string[];
}

export const chakraMeanings: Record<string, ChakraMeaning> = {
  Sahasrara: {
    key: "Sahasrara",
    order: 7,
    sanskrit: "Sahasrara (सहस्रार)",
    nameEn: "Crown Chakra",
    colorName: "Violet / Pure White",
    colorHex: "#8B5CF6",
    organs: "Brain, cerebral cortex, central nervous system, pineal gland, cranial bones",
    psychosomaticTheme:
      "Connection to the Divine, spiritual purpose, life vision, and transcendental trust.",
    imbalanceSigns: [
      "Chronic tension headaches or migraines without clear medical origin",
      "Existential emptiness, feeling disconnected from universal purpose",
      "Spiritual cynicism or, conversely, dogmatic escapism avoiding real life",
      "Sleep disorders, insomnia, and difficulty disconnecting racing thoughts",
    ],
    harmonizationPractices: [
      "Daily silence: 10–15 minutes of silent meditation without apps or guided audio",
      "Spending time under open skies, mountain elevations, or starry nights",
      "Reading timeless philosophical or contemplative sacred texts",
      "Practicing humble surrender to life's higher unfolds instead of forcing outcomes",
    ],
  },

  Ajna: {
    key: "Ajna",
    order: 6,
    sanskrit: "Ajna (आज्ञा)",
    nameEn: "Third Eye Chakra",
    colorName: "Royal Indigo",
    colorHex: "#4F46E5",
    organs: "Eyes, optic nerves, ears/hearing, sinuses, pituitary gland, hypothalamus",
    psychosomaticTheme:
      "Intuitive perception, intellectual clarity, discernment, and mental foresight.",
    imbalanceSigns: [
      "Frequent eye strain, deteriorating vision, or recurrent sinus inflammation",
      "Obsessive overthinking, intellectual rigidity, and hyper-critical skepticism",
      "Disconnection from intuitive hunches and gut feelings",
      "Memory fog or dizziness during periods of intense mental overload",
    ],
    harmonizationPractices: [
      "Digital detox: taking deliberate breaks from glowing screens and notifications",
      "Trataka meditation: candle flame gazing to rest and focus eye muscles",
      "Honoring intuitive flashes and journaling symbolic dreams upon waking",
      "Viewing nature landscapes with a soft, panoramic gaze rather than narrow focus",
    ],
  },

  Vishuddha: {
    key: "Vishuddha",
    order: 5,
    sanskrit: "Vishuddha (विशुद्ध)",
    nameEn: "Throat Chakra",
    colorName: "Sky Cerulean",
    colorHex: "#0284C7",
    organs: "Thyroid & parathyroid glands, vocal cords, throat, larynx, cervical spine, shoulders",
    psychosomaticTheme:
      "Authentic self-expression, speaking truth, creative realization, and respectful listening.",
    imbalanceSigns: [
      "Chronic throat clearing, laryngitis, thyroid imbalances, or neck stiffness",
      "Swallowing unexpressed grievances, fears, or opinions to avoid conflict",
      "Tendency to talk excessively or interrupt others without listening",
      "Imposter feelings when required to speak publicly or represent one's work",
    ],
    harmonizationPractices: [
      "Chanting, singing, or vocal toning in the shower or car to vibrate the vocal cords",
      "Practicing radical honesty in private relationships without cruelty or passive-aggression",
      "Writing honest unsent letters to release suppressed grievances, then burning them",
      "Gentle neck rolls and shoulder opening stretches throughout the workday",
    ],
  },

  Anahata: {
    key: "Anahata",
    order: 4,
    sanskrit: "Anahata (अनाहत)",
    nameEn: "Heart Center",
    colorName: "Emerald Green",
    colorHex: "#059669",
    organs: "Heart, cardiovascular system, lungs, pericardium, thymus gland (immune defense)",
    psychosomaticTheme:
      "Unconditional love, empathy, forgiveness, grief processing, and emotional vulnerability.",
    imbalanceSigns: [
      "Chest tightness, shallow breathing, palpitations during emotional distress",
      "Building emotional walls: fear of getting close to anyone out of dread of hurt",
      "Holding on to ancient resentments, bitterness, or feeling like an unappreciated martyr",
      "Weakened immune system or chronic bronchitis following periods of deep grief",
    ],
    harmonizationPractices: [
      "Conscious heart-opening breathwork: prolonged gentle exhalations releasing chest tension",
      "Ho'oponopono or structured forgiveness meditations toward past partners and parents",
      "Walking in green forests, gardening, or hugging living trees",
      "Offering sincere compliments and loving gestures without expecting any return",
    ],
  },

  Manipura: {
    key: "Manipura",
    order: 3,
    sanskrit: "Manipura (मणिपूर)",
    nameEn: "Solar Plexus Chakra",
    colorName: "Solar Amber",
    colorHex: "#D97706",
    organs: "Stomach, liver, gallbladder, pancreas, spleen, digestive tract, metabolism",
    psychosomaticTheme:
      "Personal willpower, boundaries, social confidence, ambition, and healthy digestive fire.",
    imbalanceSigns: [
      "Acid reflux, gastritis, ulcers, or digestive stagnation linked to stress",
      "Control-freak behavior: difficulty delegating or panic when plans change",
      "Financial anxiety and irrational fear of poverty or loss of status",
      "Submissiveness alternating with sudden aggressive domineering outbursts",
    ],
    harmonizationPractices: [
      "Eating warm, nourishing meals in calm surroundings without phone or TV distractions",
      "Setting crisp, respectful personal boundaries: saying 'no' without over-explaining",
      "Sunbathing or sitting near natural fires to stimulate metabolic vitality",
      "Practicing abdominal core strengthening exercises (Pilates, gentle planks)",
    ],
  },

  Svadhisthana: {
    key: "Svadhisthana",
    order: 2,
    sanskrit: "Svadhisthana (स्वाधिष्ठान)",
    nameEn: "Sacral Chakra",
    colorName: "Warm Terracotta / Coral",
    colorHex: "#C25E3E",
    organs: "Reproductive organs, ovaries/testes, kidneys, bladder, pelvic girdle, lumbar spine",
    psychosomaticTheme:
      "Sensuality, healthy sexuality, physical pleasure, emotional flow, and financial receptivity.",
    imbalanceSigns: [
      "Lower back (lumbar) aches, pelvic tension, urinary tract or kidney fatigue",
      "Guilt around enjoying pleasure, good food, intimacy, or material comfort",
      "Addictive emotional dependencies or, conversely, emotional frigidity and numbness",
      "Creative stagnation: feeling uninspired, dull, or mechanically repetitive",
    ],
    harmonizationPractices: [
      "Hydration: drinking ample clean water with pinch of natural mineral salt or lemon",
      "Flowing water practices: warm mineral baths, swimming, ocean therapy",
      "Dancing, hip-opening yoga (pigeon pose), and fluid body movement",
      "Permitting yourself guilt-free daily sensory pleasures (luxurious bath, fine scent, gentle massage)",
    ],
  },

  Muladhara: {
    key: "Muladhara",
    order: 1,
    sanskrit: "Muladhara (मूलाधार)",
    nameEn: "Root Chakra",
    colorName: "Deep Crimson / Earth Red",
    colorHex: "#DC2626",
    organs: "Large intestine/colon, rectum, bones, skeletal system, legs, feet, adrenal glands",
    psychosomaticTheme:
      "Physical survival, bodily safety, grounding, connection to Earth, and foundational vitality.",
    imbalanceSigns: [
      "Chronic ungrounded anxiety, panic sensations, feeling unsafe in the physical world",
      "Cold feet, joint stiffness, knee pain, or chronic constipation",
      "Adrenal exhaustion, chronic fatigue syndrome, waking up tired",
      "Obsessive hoarding of possessions or terror of sudden financial catastrophe",
    ],
    harmonizationPractices: [
      "Earthing: walking barefoot on soil, grass, or sand for 15 minutes daily",
      "Consistent daily routines: regular wake/sleep hours and grounding root vegetable meals",
      "Physical strength training, hiking, and tactile manual crafts (pottery, woodworking)",
      "Creating an organized, secure, clutter-free physical sanctuary in your home",
    ],
  },
};
