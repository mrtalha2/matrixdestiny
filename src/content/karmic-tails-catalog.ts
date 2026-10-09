/**
 * Complete Catalog of all 26 Named Karmic Tails
 * Based on the authentic Natalia Ladini Destiny Matrix lineage.
 * 
 * Every human soul incarnates with one of these 26 foundational subconscious programs
 * located at the base of the personal diamond (Bottom Vertex D, D2, D1).
 */

export interface KarmicTailDefinition {
  id: string;
  name: string;
  signature: string; // "D-D2-D1"
  triad: [number, number, number];
  archetype: string;
  pastLifeStory: string;
  currentLifeTrap: string;
  karmicLesson: string;
  healingRecommendations: string[];
  affirmation: string;
}

export const karmicTailsCatalog: Record<string, KarmicTailDefinition> = {
  "18-6-6": {
    id: "love-magic",
    name: "Love Magic & Emotional Manipulation",
    signature: "18-6-6",
    triad: [18, 6, 6],
    archetype: "The Disillusioned Enchanter",
    pastLifeStory:
      "In a previous incarnation, you attempted to force affection, romantic binding, or control over a partner through esoteric rituals, emotional coercion, or severe psychological manipulation. You couldn't accept rejection or loss, so you sought to bend another soul's free will to satisfy your need for love.",
    currentLifeTrap:
      "A deep, subconscious fear of romantic rejection or abandonment. You may experience illusions, obsessive crushes on emotionally unavailable people, or alternate between desperate pleasing and cold suspicion. You might doubt your physical beauty or attract partners who try to manipulate you.",
    karmicLesson:
      "Learning that unconditional love never coerces or possesses. True love only flourishes where free will is completely respected.",
    healingRecommendations: [
      "Completely renounce all forms of esoteric love spells, psychics, or guilt-based manipulation in relationships.",
      "Cultivate self-worth independent of romantic validation; fall in love with your own presence.",
      "Practice radical emotional honesty: state your desires directly without passive-aggressive testing.",
      "Clear illusions: see partners as complex humans rather than projecting idealized fairy-tale fantasies.",
    ],
    affirmation: "I release the need to control others. I am inherently worthy of genuine, mutual, unconditional love.",
  },

  "21-10-7": {
    id: "warrior-of-faith",
    name: "Warrior of Faith & Crusade",
    signature: "21-10-7",
    triad: [21, 10, 7],
    archetype: "The Zealous Crusader",
    pastLifeStory:
      "In a past life, you fought passionately for an ideology, dogma, or religious crusade, imposing your personal beliefs onto others with force. You may have viewed those of other cultures or faiths as enemies, sacrificing human compassion on the altar of fanatical certainty.",
    currentLifeTrap:
      "Dogmatic rigidity, intolerance of differing viewpoints, or cyclical loss of faith when life doesn't follow your exact plan. You might oscillate between relentless ambition (forcing outcomes) and sudden apathy, feeling that higher powers have abandoned you.",
    karmicLesson:
      "Embracing planetary consciousness: discovering that truth has many expressions and that divine flow cannot be conquered by force.",
    healingRecommendations: [
      "Travel widely, immerse yourself in diverse cultures, and actively learn from philosophical traditions outside your comfort zone.",
      "Replace militant insistence on being right with gentle curiosity and dialogue.",
      "Surrender rigid timelines; learn to ride the cyclical flow of fortune (Energy 10) rather than battering against closed doors.",
      "Channel your leadership into global humanitarian or ecological projects that unite people rather than divide them.",
    ],
    affirmation: "I honor the divine diversity of all souls. Peace begins in my open heart.",
  },

  "18-6-15": {
    id: "dark-mage",
    name: "Dark Mage & Forbidden Power",
    signature: "18-6-15",
    triad: [18, 6, 15],
    archetype: "The Shadow Mystic",
    pastLifeStory:
      "You wielded immense esoteric, hypnotic, or psychological influence in past lives for selfish gain, wealth, or power over others. You possessed access to secret knowledge but crossed ethical boundaries, leaving a debt of energetic exploitation.",
    currentLifeTrap:
      "Temptation toward dark psychology, manipulation, secrecy, or addictive vices. You have intense personal charisma that can easily deceive or seduce others, but using this power selfishly instantly triggers severe karmic blowbacks: financial collapses, depression, or paralyzing fears.",
    karmicLesson:
      "Using esoteric insight and psychological depth strictly for healing, transparency, and the enlightenment of others.",
    healingRecommendations: [
      "Maintain 100% financial and emotional transparency; never engage in shady backroom deals or psychological games.",
      "Purify your subconscious mind: avoid negative occult practices, excessive substances, or toxic environments.",
      "Direct your profound intuitive perception toward deep psychology, therapeutic healing, or creative arts.",
      "When encountering dark urges or fears, shine conscious awareness onto them rather than suppressing or weaponizing them.",
    ],
    affirmation: "I dedicate my power and intuition exclusively to light, truth, and genuine healing.",
  },

  "15-8-11": {
    id: "physical-aggression",
    name: "Physical Aggression & Abuse of Force",
    signature: "15-8-11",
    triad: [15, 8, 11],
    archetype: "The Untamed Gladiator",
    pastLifeStory:
      "In a past life, you possessed immense physical strength, military rank, or judicial power and used it to suppress, intimidate, or inflict bodily harm upon weaker beings. You believed might made right and ignored universal karmic balance.",
    currentLifeTrap:
      "Suppressed rage, intense irritability, sudden outbursts of temper, or hyper-critical intolerance of human weakness. Alternately, you may unconsciously invite aggressive people or physical injuries into your life as a mirrored karmic echo.",
    karmicLesson:
      "Learning that true strength is gentle. Mastering self-control, patience, and using power solely to protect and defend the vulnerable.",
    healingRecommendations: [
      "Engage regularly in grounding, non-violent physical discipline: martial arts kata, swimming, yoga, or weightlifting.",
      "Learn breathwork and pause mechanisms to interrupt anger impulses before speaking or reacting.",
      "Understand the law of cause and effect (Energy 8): every energetic aggression you emit returns multiplied.",
      "Serve as a protector for animals, children, or those unable to defend themselves.",
    ],
    affirmation: "My strength lies in calm self-mastery, patience, and compassionate protection.",
  },

  "9-15-6": {
    id: "world-of-passions",
    name: "World of Passions & Fairy Tales",
    signature: "9-15-6",
    triad: [9, 15, 6],
    archetype: "The Trapped Romantic",
    pastLifeStory:
      "You were torn between deep spiritual yearning (the hermit) and overwhelming sensual temptations, hedonism, or illicit romantic obsession. You may have abandoned sacred vows or betrayed deep trust in pursuit of a forbidden passion.",
    currentLifeTrap:
      "Getting entangled in dramatic love triangles, codependent attachments, or escapist fantasies. You build romantic illusions in your mind and then crash into deep disillusionment when real-life intimacy feels mundane. You may isolate yourself in bitterness when romance disappoints.",
    karmicLesson:
      "Harmonizing soulful spiritual depth with healthy, grounded romantic intimacy without seeking drama or perfection.",
    healingRecommendations: [
      "Distinguish between authentic emotional intimacy and adrenaline-fueled drama or dangerous attraction.",
      "Avoid secret affairs, triangles, or playing with other people's vulnerable feelings.",
      "Channel your rich fantasy life into writing, artistic expression, or creative storytelling.",
      "Dedicate time to spiritual solitude so you don't use relationships to run away from being alone with yourself.",
    ],
    affirmation: "I choose conscious, peaceful love grounded in mutual respect and clear truth.",
  },

  "12-16-4": {
    id: "emperor",
    name: "The Fallen Emperor & Despotism",
    signature: "12-16-4",
    triad: [12, 16, 4],
    archetype: "The Deposed Ruler",
    pastLifeStory:
      "You held massive patriarchal authority, aristocratic status, or imperial rule, but ruled through tyranny, cruelty, and financial subjugation. You neglected the well-being of your subordinates and prioritized pride and control, leading to a cataclysmic fall from power.",
    currentLifeTrap:
      "Controlling, micromanaging tendencies in the family or workplace. Struggles with male authority figures, fear of financial ruin, or sudden structural crises that strip away your control until you learn humility and compassionate leadership.",
    karmicLesson:
      "Transforming tyrannical control into benevolent service. Recognizing that true leadership elevates others rather than ruling over them.",
    healingRecommendations: [
      "Relinquish micromanagement: delegate responsibilities and trust the competence of your team or partner.",
      "Cultivate the servant-leader mindset: ask 'How can I support my people?' rather than 'How can they serve me?'",
      "Heal your relationship with your father and paternal lineage; release inherited paternal grievances.",
      "Stay calm and flexible when material structures collapse; rebuild with spiritual wisdom rather than brute force.",
    ],
    affirmation: "I lead with kindness, humility, and unwavering respect for the dignity of all.",
  },

  "6-5-17": {
    id: "pride",
    name: "Pride & Star Disease",
    signature: "6-5-17",
    triad: [6, 5, 17],
    archetype: "The Arrogant Virtuoso",
    pastLifeStory:
      "You were blessed with extraordinary talent, public renown, or aristocratic privilege, but looked down on ordinary people with contempt. You became intoxicated with your own glory and treated others as inferiors.",
    currentLifeTrap:
      "Extreme sensitivity to criticism, vanity, craving constant public praise, or fear of being ordinary. You may experience periods of unrecognized genius or imposter syndrome, oscillating between superiority complexes and self-doubt.",
    karmicLesson:
      "Recognizing that talent is a divine gift entrusted to you for the service of the world, not an excuse for arrogance.",
    healingRecommendations: [
      "Share your gifts generously without demanding constant applause or validation.",
      "Learn to celebrate the talents and successes of others with genuine warmth and zero jealousy.",
      "Honor sacred traditions and mentors (Energy 5) with humble reverence.",
      "Remember that every soul has equal inherent divine value regardless of worldly fame or recognition.",
    ],
    affirmation: "I shine my light with joy and humility, honoring the divine spark in every human being.",
  },

  "6-8-20": {
    id: "disappointment-of-lineage",
    name: "Disappointment of Lineage & Clan Karma",
    signature: "6-8-20",
    triad: [6, 8, 20],
    archetype: "The Clan's Scapegoat",
    pastLifeStory:
      "You were born into a prominent family or clan but brought shame upon your lineage through scandal, betrayal, or rejection of ancestral duties. Alternatively, your clan condemned or cast you out unjustly.",
    currentLifeTrap:
      "Feeling alienated, misunderstood, or heavily judged by parents and relatives. You may carry an agonizing guilt that you aren't living up to family expectations, or inherit heavy generational trauma and chronic family disputes.",
    karmicLesson:
      "Forgiving your ancestors, clearing multi-generational curses, and establishing healthy personal sovereignty with loving respect.",
    healingRecommendations: [
      "Cease blaming your parents or ancestors for current life difficulties; accept them as your soul's chosen teachers.",
      "Participate in lineage healing practices: genealogy research, ancestral prayer, or honoring departed elders.",
      "Break negative family cycles (addictions, divorce patterns, emotional coldness) in your own generation.",
      "Build your own authentic life path without seeking permission or validation from the clan.",
    ],
    affirmation: "I bless my ancestors with peace and love. I am free to live my authentic destiny.",
  },

  "9-9-18": {
    id: "wizard-hermit",
    name: "Wizard & Secret Wisdom (Hermit Magic)",
    signature: "9-9-18",
    triad: [9, 9, 18],
    archetype: "The Reclusive Alchemist",
    pastLifeStory:
      "You held profound esoteric, medical, or philosophical wisdom but hoarded it in isolation, refusing to share it with society. Out of fear of persecution or elitist superiority, you took sacred knowledge to the grave without helping humanity.",
    currentLifeTrap:
      "Severe self-isolation, chronic fear of opening up to the world, intellectual arrogance, and irrational phobias. You spend years studying, accumulating books and degrees, but hesitate to step out into public view and teach.",
    karmicLesson:
      "Overcoming the fear of exposure and sharing your profound accumulated knowledge generously with the world.",
    healingRecommendations: [
      "Write, speak, teach, and publish your insights; do not allow wisdom to remain locked in private notebooks.",
      "Step out of solitude regularly to connect with warm, like-minded communities.",
      "Transform irrational fears and anxiety through grounding breathwork and contact with nature.",
      "Trust your intuition while maintaining rational, practical common sense in daily affairs.",
    ],
    affirmation: "I step into the world with confidence. My wisdom is a healing light for others.",
  },

  "21-4-10": {
    id: "oppressed-soul",
    name: "Oppressed Soul & Loss of Autonomy",
    signature: "21-4-10",
    triad: [21, 4, 10],
    archetype: "The Bound Captive",
    pastLifeStory:
      "In a previous life, your freedom was violently suppressed: you were imprisoned, enslaved, or forced to submit to tyrannical power. You lost all control over your life choices, movement, and physical body.",
    currentLifeTrap:
      "A deep subconscious panic whenever someone tries to set boundaries or offer guidance. You either become excessively rebellious against all structure, or paradoxically submit to overbearing bosses and controlling partners.",
    karmicLesson:
      "Realizing that true freedom is an internal state of consciousness that nobody can grant or steal from you.",
    healingRecommendations: [
      "Build healthy personal boundaries without hostility; learn to say 'no' calmly and firmly.",
      "Embrace structural discipline (Energy 4) as a vehicle for freedom rather than seeing it as a prison.",
      "Expand your worldview: travel internationally and liberate yourself from provincial limitations.",
      "Trust life's natural flow (Energy 10); avoid paralyzing control freak tendencies.",
    ],
    affirmation: "I am sovereign, whole, and completely free in body, mind, and spirit.",
  },

  "9-12-3": {
    id: "lonely-woman",
    name: "Lonely Woman & Sacrificed Femininity",
    signature: "9-12-3",
    triad: [9, 12, 3],
    archetype: "The Cloistered Matriarch",
    pastLifeStory:
      "As a woman in a past incarnation, you were denied the joy of motherhood, happy marriage, or feminine fulfillment. You may have entered a convent against your will, been abandoned with children, or sacrificed your womanhood for family survival.",
    currentLifeTrap:
      "Subconscious belief that love and family inevitably bring loneliness, sacrifice, and suffering. You may choose emotional isolation, take on the role of an exhausted martyr, or struggle with fertility, hormonal balance, or feminine self-expression.",
    karmicLesson:
      "Reclaiming the joy, beauty, and creative abundance of the sacred feminine without taking on self-sacrificing burdens.",
    healingRecommendations: [
      "Stop playing the victim or martyr; express your needs clearly and allow others to care for you.",
      "Celebrate your physical femininity through beauty rituals, comfortable sensuality, and creative arts.",
      "Heal your maternal line: release resentment toward mother or grandmother figures.",
      "Surround yourself with beauty, flowers, and nurturing spaces.",
    ],
    affirmation: "I welcome love, abundance, and effortless joy into my life. I am safe to receive.",
  },

  "21-7-13": {
    id: "destruction-death-souls",
    name: "Destruction & Death of Many Souls",
    signature: "21-7-13",
    triad: [21, 7, 13],
    archetype: "The Cataclysm Catalyst",
    pastLifeStory:
      "Your past actions contributed to massive destruction, wartime catastrophe, accidents, or the loss of many human lives. You might have invented destructive weaponry, led disastrous campaigns, or prioritized conquest over human life.",
    currentLifeTrap:
      "A constant subconscious dread of sudden catastrophes, death, or disasters. You may face sudden, chaotic disruptions in career or personal life where everything is wiped clean, forcing you to rebuild from ashes.",
    karmicLesson:
      "Channeling your transformative power into constructive, life-saving innovation and peaceful rebirth.",
    healingRecommendations: [
      "Engage in peacemaking, trauma rehabilitation, or environmental restoration efforts.",
      "Practice radical non-violence in thought, word, and deed; cherish every form of life.",
      "Learn to embrace major life transitions (Energy 13) gracefully without gripping onto outlived situations.",
      "Cultivate spiritual calmness: recognize that physical death is not the end of the soul's journey.",
    ],
    affirmation: "I am a builder of life, peace, and renewal. Out of transformation comes greater light.",
  },

  "12-19-7": {
    id: "warrior",
    name: "Warrior & Ruthless Ambition",
    signature: "12-19-7",
    triad: [12, 19, 7],
    archetype: "The Relentless Conqueror",
    pastLifeStory:
      "You were a commander or warrior who pursued glory, victory, and territory at any cost. In your relentless drive to reach the top, you marched over the bodies and feelings of allies and foes alike.",
    currentLifeTrap:
      "Extreme competitiveness, impatience, burnout from constantly waging war with circumstances, or hostility toward peers. You view life as an endless battlefield and find it almost impossible to relax without feeling guilty.",
    karmicLesson:
      "Discovering that true victory is uniting people toward a noble, joyful purpose rather than defeating rivals.",
    healingRecommendations: [
      "Transform competitive rivalry into cooperative teamwork; celebrate your colleagues' achievements.",
      "Schedule deliberate downtime: rest is a vital component of sustainable strength, not a weakness.",
      "Adopt a solar, generous disposition (Energy 19); share resources, knowledge, and credit freely.",
      "Serve the common good: direct your relentless drive toward noble social or environmental causes.",
    ],
    affirmation: "My path is illuminated by peace, cooperation, and generous service to the whole.",
  },

  "3-7-22": {
    id: "prisoner",
    name: "Prisoner & Unfree Soul",
    signature: "3-7-22",
    triad: [3, 7, 22],
    archetype: "The Escaped Inmate",
    pastLifeStory:
      "You spent significant time in physical bondage, prison, or an oppressive institution, often due to reckless, lawless behavior or foolish disregard for boundaries. You blamed external authorities for your own lack of self-discipline.",
    currentLifeTrap:
      "An intense, irrational phobia of confinement, physical sickness, financial debt, or legal entanglements. You might act irresponsibly with commitments or money in an effort to feel 'free', only to land in new constraints.",
    karmicLesson:
      "Realizing that genuine freedom requires maturity, ethical responsibility, and joyful respect for life's rules.",
    healingRecommendations: [
      "Live with impeccable legal and financial ethics: pay taxes, debts, and promises on time.",
      "Cultivate the playful, unburdened wisdom of the Fool (Energy 22) without tipping into reckless folly.",
      "Practice gratitude for your physical body and freedom of movement every single day.",
      "Avoid substance abuse or dependencies that create internal emotional prisons.",
    ],
    affirmation: "True freedom flows from conscious responsibility and an open, joyful heart.",
  },

  "18-3-12": {
    id: "physical-suffering",
    name: "Physical Suffering & Bodily Neglect",
    signature: "18-3-12",
    triad: [18, 3, 12],
    archetype: "The Tormented Healer",
    pastLifeStory:
      "In a previous life, you endured debilitating physical sickness, bodily disability, or abandonment by caregivers. Alternatively, you may have neglected or abandoned a sick dependent or family member when they needed you most.",
    currentLifeTrap:
      "Hypochondria, psychosomatic ailments, fear of illness, or unconsciously using sickness to receive love and attention. You may take on other people's emotional baggage until your physical body breaks down under the weight.",
    karmicLesson:
      "Honoring the physical body as a sacred temple and offering compassionate help to others without taking on their suffering.",
    healingRecommendations: [
      "Establish loving, respectful habits of nutrition, sleep, somatic therapy, and exercise.",
      "Set healthy energetic boundaries: you can empathize with others without absorbing their pain.",
      "Engage in volunteer service assisting the elderly, disabled, or sick with joyful compassion.",
      "Release unconscious victim secondary gains: choose to be loved for your vitality, not your suffering.",
    ],
    affirmation: "My body is a vibrant, sacred temple of health, vitality, and peace.",
  },

  "6-14-8": {
    id: "dictator",
    name: "Dictator & Harsh Judgment",
    signature: "6-14-8",
    triad: [6, 14, 8],
    archetype: "The Inflexible Inquisitor",
    pastLifeStory:
      "You occupied a seat of judgment, moral authority, or political power and condemned others with cold, inflexible severity. You ignored mercy, nuance, and emotional circumstance, believing yourself to be the sole arbiter of justice.",
    currentLifeTrap:
      "Hyper-critical moralizing, perfectionism, seeing the world in rigid black-and-white terms, and harboring intense resentment when life seems 'unfair'. You hold grudges for years and struggle to forgive minor mistakes.",
    karmicLesson:
      "Cultivating soul temperance, moderation, and understanding that universal divine justice is rooted in boundless compassion.",
    healingRecommendations: [
      "Practice unconditional forgiveness: release old grudges and stop mentally trial-judging other people.",
      "Cultivate artistic, musical, or culinary balance (Energy 14) to soften rigid mental dogmas.",
      "Understand that everyone operates from their current level of spiritual evolution.",
      "Respond to perceived unfairness with calm diplomacy rather than righteous fury.",
    ],
    affirmation: "I choose mercy over judgment, harmony over conflict, and love over righteous indignation.",
  },

  "9-18-9": {
    id: "magical-sacrifice",
    name: "Magical Sacrifice & Betrayed Mystic",
    signature: "9-18-9",
    triad: [9, 18, 9],
    archetype: "The Persecuted Oracle",
    pastLifeStory:
      "You were an intuitive healer, herbalist, or esoteric practitioner who was betrayed, persecuted, or sacrificed by the very community you tried to assist. As a consequence, your soul swore never to trust humanity or reveal spiritual abilities again.",
    currentLifeTrap:
      "Paralyzing fear of being seen, profound distrust of people, secretiveness, and burying your natural intuitive or creative gifts. You may suffer from vivid night terrors or an overwhelming sense of cosmic loneliness.",
    karmicLesson:
      "Healing the trauma of past persecution and bravely re-opening your spiritual heart to serve humanity once again.",
    healingRecommendations: [
      "Work consciously through past-life betrayal trauma via regression, meditation, or breathwork.",
      "Gradually reveal your authentic spiritual and intuitive beliefs to trusted, safe friends.",
      "Ground your intuitive insights in practical, tangible, real-world applications.",
      "Release the vow of silence: your gifts are needed in this current era of transformation.",
    ],
    affirmation: "It is safe for me to be seen, safe to speak my truth, and safe to shine my spiritual gifts.",
  },

  "21-10-16": {
    id: "spiritual-priest",
    name: "Spiritual Priest & Dogmatic Fall",
    signature: "21-10-16",
    triad: [21, 10, 16],
    archetype: "The Defrocked Hierophant",
    pastLifeStory:
      "You were an ordained religious leader, priest, or spiritual teacher who betrayed your sacred vows through greed, sexual misconduct, or pride. You used religious guilt to amass personal wealth or prestige.",
    currentLifeTrap:
      "Sudden, catastrophic collapses of material wealth or social status (Energy 16) whenever you drift away from spiritual integrity. Cynicism toward religion, fear of spiritual commitment, or hypocrisy.",
    karmicLesson:
      "Rebuilding authentic spiritual leadership based on genuine inner awakening, humility, and absolute ethical transparency.",
    healingRecommendations: [
      "Maintain flawless ethical standards in money, business, and personal relationships.",
      "View material disruptions not as divine punishment, but as loving cosmic interventions clearing spiritual illusions.",
      "Help people awaken spiritually through your own lived example rather than dogma or preaching.",
      "Practice non-attachment to material prestige or outward titles.",
    ],
    affirmation: "I build my life upon the indestructible foundation of spiritual truth and humility.",
  },

  "15-5-8": {
    id: "betrayal-family-passions",
    name: "Betrayal & Family Passions",
    signature: "15-5-8",
    triad: [15, 5, 8],
    archetype: "The Treacherous Kin",
    pastLifeStory:
      "In a past life, you betrayed family loyalty or broke sacred trust for passion, money, or inheritance. You may have disowned family members, cheated siblings out of property, or led a double life.",
    currentLifeTrap:
      "Obsessive fear of being betrayed by close family or business partners. You might test loyalty constantly, struggle with jealousy, or face complex family disputes over estates, contracts, and money.",
    karmicLesson:
      "Restoring absolute integrity, honoring family commitments, and healing trust through transparent communication.",
    healingRecommendations: [
      "Never participate in dishonest family inheritance schemes or hidden financial manipulation.",
      "Honor lawful agreements and contracts with precision; keep your word under all circumstances.",
      "Build deep, mature trust in partnership by opening your heart without defensive tests.",
      "Act as an ethical peacemaker in family conflicts.",
    ],
    affirmation: "I embody loyalty, truth, and honorable conduct in all my relationships.",
  },

  "18-9-9": {
    id: "hidden-wisdom-wizard",
    name: "Hidden Wisdom & The Recluse",
    signature: "18-9-9",
    triad: [18, 9, 9],
    archetype: "The Silent Sage",
    pastLifeStory:
      "You spent an entire past lifetime deep in occult, philosophical, or spiritual contemplation in total isolation, severing all emotional ties with society. You became so engrossed in the unseen world that you refused ordinary human connection.",
    currentLifeTrap:
      "Chronic social anxiety, detachment from worldly life, emotional numbness, and difficulty translating profound internal realizations into everyday career or relationship success.",
    karmicLesson:
      "Grounding transcendent wisdom into ordinary human warmth, community connection, and everyday service.",
    healingRecommendations: [
      "Balance mental/spiritual study with physical, embodied activities: cooking, gardening, dancing, crafting.",
      "Build warm, reciprocal friendships; share your feelings rather than only discussing abstract ideas.",
      "Demystify your knowledge: teach complex philosophical truths in plain, accessible, compassionate language.",
      "Embrace ordinary human experiences as equally sacred as high mystical states.",
    ],
    affirmation: "I anchor divine wisdom into everyday love, warmth, and joyful human connection.",
  },

  "3-22-19": {
    id: "unborn-child",
    name: "Unborn Child & Interrupted Incarnation",
    signature: "3-22-19",
    triad: [3, 22, 19],
    archetype: "The Gentle Spirit",
    pastLifeStory:
      "Your incarnation was tragically cut short in early childhood, infancy, or the womb, or you rejected the gift of motherhood or terminated life prematurely. The soul carried a grief of unfulfilled potential into this life.",
    currentLifeTrap:
      "Childish irresponsibility, fear of growing up, feeling like an alien visitor on Earth, or persistent fears regarding pregnancy, childbirth, and parenting. You may struggle to commit to long-term adult responsibilities.",
    karmicLesson:
      "Fully anchoring into physical existence, embracing maturity, and sharing joyful, radiant abundance with the new generation.",
    healingRecommendations: [
      "Work through inner child healing: nurture and validate your own feelings with unconditional warmth.",
      "Embrace adult responsibility as a joyful creative playground rather than an oppressive burden.",
      "Support children, creative youth initiatives, or maternity care with solar generosity (Energy 19).",
      "Celebrate birthdays and life milestones with genuine joy and festive enthusiasm.",
    ],
    affirmation: "I celebrate my precious physical life on Earth with radiant joy, maturity, and love.",
  },

  "6-17-11": {
    id: "lost-talent",
    name: "Lost Talent & Unrecognized Genius",
    signature: "6-17-11",
    triad: [6, 17, 11],
    archetype: "The Wasted Prodigy",
    pastLifeStory:
      "You were endowed with an extraordinary creative, athletic, or intellectual gift, but squandered it through laziness, alcohol, self-doubt, or fear of hard work. You gave up on your destiny and died with your music still inside you.",
    currentLifeTrap:
      "Intense fear of failure and fear of success. You start creative projects with enormous passion but abandon them when tedious effort is required. You harbor bitter envy toward colleagues who achieve fame and recognition.",
    karmicLesson:
      "Pairing natural inspiration with consistent daily discipline, courage, and perseverance to manifest your gifts.",
    healingRecommendations: [
      "Commit to consistent daily craft practice: talent without discipline remains an empty promise.",
      "Stop comparing your beginning to someone else's peak; celebrate every small creative milestone.",
      "Cultivate the stamina of the Force (Energy 11): transform nervous energy into focused output.",
      "Share your work publicly despite imperfect conditions; overcome the paralyzing fear of vulnerability.",
    ],
    affirmation: "I commit to developing my gifts with patience, discipline, and joyful dedication.",
  },

  "3-13-10": {
    id: "suicide-hopelessness",
    name: "Suicide & Renunciation of Life",
    signature: "3-13-10",
    triad: [3, 13, 10],
    archetype: "The Resurrected Pilgrim",
    pastLifeStory:
      "In a previous life, you became overwhelmed by despair, financial collapse, or heartbreak and took your own life, breaking your cosmic contract. The soul entered this incarnation with a deep subconscious memory of having quit before the miracle.",
    currentLifeTrap:
      "Periods of sudden, deep existential depression, feeling that life is meaningless, or an urge to escape reality when crises arrive. You may feel like an outsider observing life through a glass wall.",
    karmicLesson:
      "Cherishing life as a priceless gift and learning to ride out temporary storms with unwavering faith in divine timing.",
    healingRecommendations: [
      "Remember that no storm lasts forever; emotional pain is temporary, while the soul is eternal.",
      "Anchor into the flow of good fortune (Energy 10): cultivate trust that the universe is conspiring in your favor.",
      "Help individuals undergoing acute psychological distress, grief, or crisis.",
      "Celebrate small everyday sensory joys: good food, sunlight, music, physical touch.",
    ],
    affirmation: "I choose life, joy, and resilience. Every challenge is a stepping stone to greater light.",
  },

  "6-20-14": {
    id: "soul-sacrificed",
    name: "Soul Sacrificed & Lost Individuality",
    signature: "6-20-14",
    triad: [6, 20, 14],
    archetype: "The Silenced Peacemaker",
    pastLifeStory:
      "You completely surrendered your own soul's desires, talents, and happiness to placate a demanding family, authoritarian clan, or religious group. You lived a borrowed life, suppressing your authentic identity to keep false peace.",
    currentLifeTrap:
      "People-pleasing, inability to voice personal preferences, identity confusion, and chronic guilt whenever you do something exclusively for yourself. You fear that asserting boundaries will destroy your family.",
    karmicLesson:
      "Discovering your unique, authentic identity and serving your clan from sovereignty rather than self-effacing sacrifice.",
    healingRecommendations: [
      "Practice expressing your genuine desires, even when they differ from your family's expectations.",
      "Engage with creative, soul-soothing arts (Energy 14) that connect you with your personal essence.",
      "Heal lineage bonds through respect without allowing family members to dictate your life choices.",
      "Remember that sacrificing your soul serves nobody; true love celebrates individuality.",
    ],
    affirmation: "I honor my unique soul. My authenticity is my greatest gift to the world.",
  },

  "15-20-5": {
    id: "rebel",
    name: "Rebel & Clan Betrayer",
    signature: "15-20-5",
    triad: [15, 20, 5],
    archetype: "The Iconoclast",
    pastLifeStory:
      "You openly rebelled against family traditions, spiritual laws, or sacred moral codes in pursuit of hedonism, rebellion, or criminal adventures. You mocked elders, disrupted sacred customs, and brought grief to your clan.",
    currentLifeTrap:
      "An uncontrollable urge to break rules simply for the thrill of opposition. Chronic conflicts with teachers, bosses, and institutions. Or, flipping to the opposite extreme: becoming an authoritarian, dogmatic moralizer who judges everyone else.",
    karmicLesson:
      "Transforming destructive rebellion into constructive innovation, respecting wisdom traditions while updating outmoded forms.",
    healingRecommendations: [
      "Distinguish between meaningless rebellion and purposeful innovation that genuinely helps society.",
      "Reconcile with parents and elders; respect the sacrifices previous generations made for you.",
      "Study timeless spiritual traditions (Energy 5) with genuine humility.",
      "Channel your non-conformist energy into pioneering ventures that elevate culture and consciousness.",
    ],
    affirmation: "I harmonize wisdom with innovation, honoring the past while building a brighter future.",
  },

  "9-3-21": {
    id: "overseer",
    name: "Overseer & World Renunciation",
    signature: "9-3-21",
    triad: [9, 3, 21],
    archetype: "The Cosmopolitan Warden",
    pastLifeStory:
      "You were tasked with overseeing large populations, territories, or humanitarian programs, but abused your position through indifference or aloof intellectual superiority, looking down on worldly suffering from an ivory tower.",
    currentLifeTrap:
      "Feeling detached from national and local issues, feeling too refined for ordinary tasks, or struggling with maternal energy and material abundance while dreaming of utopian global projects.",
    karmicLesson:
      "Connecting big global vision with humble, compassionate, local service and grounded material stewardship.",
    healingRecommendations: [
      "Engage in hands-on, local community service; touch the ground and connect with real people.",
      "Nurture material abundance and physical comfort (Energy 3) without guilt or disdain.",
      "Use international skills and broad vision (Energy 21) to build bridges between cultures.",
      "Ground philosophical theories in tangible, helpful projects that alleviate immediate suffering.",
    ],
    affirmation: "I bring global vision into grounded, compassionate daily service.",
  },
};

/**
 * Normalizes any triad input to find the matching named karmic tail.
 * Handles different permutations, ordering of D/D2/D1, or canonical signatures.
 */
export function findKarmicTail(
  d: number,
  d2: number,
  d1: number
): KarmicTailDefinition | undefined {
  // Direct match D-D2-D1
  const directKey = `${d}-${d2}-${d1}`;
  if (karmicTailsCatalog[directKey]) {
    return karmicTailsCatalog[directKey];
  }

  // Alternate match D-D1-D2
  const altKey = `${d}-${d1}-${d2}`;
  if (karmicTailsCatalog[altKey]) {
    return karmicTailsCatalog[altKey];
  }

  // Search by sorted set of the 3 numbers
  const inputSorted = [d, d2, d1].sort((a, b) => a - b).join("-");
  for (const item of Object.values(karmicTailsCatalog)) {
    const itemSorted = [...item.triad].sort((a, b) => a - b).join("-");
    if (inputSorted === itemSorted) {
      return item;
    }
  }

  return undefined;
}
