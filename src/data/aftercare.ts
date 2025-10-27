// ============================================
// AFTERCARE DATA
// ============================================
// Comprehensive aftercare instructions for Medusa Tattoo München
// Used by: AftercarePage, booking confirmation emails, artist handouts

export interface AftercarePhase {
  id: string;
  phase: string;
  day: string;
  title: {
    de: string;
    en: string;
  };
  description: {
    de: string;
    en: string;
  };
  instructions: string[];
  warnings: string[];
  duration: string;
}

export interface AftercareTip {
  id: string;
  category: 'do' | 'dont';
  icon: string;
  text: {
    de: string;
    en: string;
  };
  critical: boolean;
}

export interface AftercareProduct {
  id: string;
  name: string;
  category: 'cleaning' | 'healing' | 'protection';
  description: {
    de: string;
    en: string;
  };
  recommended: boolean;
  link?: string;
  price?: string;
}

// Healing Timeline (Phases)
export const AFTERCARE_PHASES: AftercarePhase[] = [
  {
    id: 'day-0',
    phase: 'initial',
    day: 'Tag 0',
    title: {
      de: 'Unmittelbar nach dem Tattoo',
      en: 'Immediately After Tattoo',
    },
    description: {
      de: 'Die ersten Stunden sind entscheidend. Ihr Tattoo ist eine offene Wunde und muss entsprechend behandelt werden.',
      en: 'The first hours are crucial. Your tattoo is an open wound and must be treated accordingly.',
    },
    instructions: [
      'Folie für 2-4 Stunden drauf lassen',
      'Nicht berühren oder kratzen',
      'Lockere, saubere Kleidung tragen',
      'Keine sportlichen Aktivitäten',
      'Viel Wasser trinken',
    ],
    warnings: [
      'Folie nicht vorzeitig entfernen',
      'Nicht in der Sonne aufhalten',
      'Kein Alkohol trinken',
    ],
    duration: '0-4 Stunden',
  },
  {
    id: 'day-1-3',
    phase: 'cleaning',
    day: 'Tag 1-3',
    title: {
      de: 'Reinigungsphase',
      en: 'Cleaning Phase',
    },
    description: {
      de: 'Jetzt beginnt die wichtige Reinigungsphase. Regelmäßige, sanfte Pflege ist entscheidend für optimale Heilung.',
      en: 'Now begins the important cleaning phase. Regular, gentle care is crucial for optimal healing.',
    },
    instructions: [
      'Folie vorsichtig entfernen und Tattoo mit lauwarmem Wasser abspülen',
      '3-4x täglich mit pH-neutraler Seife waschen',
      'Mit sauberem Handtuch trocken tupfen (nicht reiben)',
      'Dünne Schicht Heilsalbe auftragen',
      'Keine Folie mehr verwenden (Haut muss atmen)',
      'Lockere, atmungsaktive Kleidung tragen',
    ],
    warnings: [
      'Nicht in der Badewanne baden',
      'Nicht schwimmen gehen',
      'Nicht direkt in die Sonne',
      'Nicht kratzen bei Juckreiz',
    ],
    duration: '1-3 Tage',
  },
  {
    id: 'day-4-7',
    phase: 'healing',
    day: 'Tag 4-7',
    title: {
      de: 'Aktive Heilungsphase',
      en: 'Active Healing Phase',
    },
    description: {
      de: 'Ihr Tattoo beginnt zu schuppen und kann jucken. Das ist völlig normal und zeigt, dass die Heilung fortschreitet.',
      en: 'Your tattoo starts to peel and may itch. This is completely normal and shows that healing is progressing.',
    },
    instructions: [
      'Weiterhin 2-3x täglich waschen',
      'Dünn mit Heilsalbe oder Lotion eincremen',
      'Bei Juckreiz: sanft klopfen statt kratzen',
      'Schuppende Haut nicht abziehen',
      'Viel Feuchtigkeit (trinken & eincremen)',
      'Vermeiden Sie enge Kleidung über dem Tattoo',
    ],
    warnings: [
      'NICHT kratzen oder reiben',
      'Schuppende Haut nicht entfernen',
      'Keine Peelings oder Scrubs',
      'Weiterhin kein Bad/Schwimmen',
    ],
    duration: '4-7 Tage',
  },
  {
    id: 'day-8-14',
    phase: 'stabilization',
    day: 'Tag 8-14',
    title: {
      de: 'Stabilisierungsphase',
      en: 'Stabilization Phase',
    },
    description: {
      de: 'Die oberste Hautschicht ist fast verheilt. Das Tattoo sieht noch etwas matt aus, aber die Farben kommen zurück.',
      en: 'The top layer of skin is almost healed. The tattoo still looks a bit dull, but the colors will return.',
    },
    instructions: [
      'Weiterhin 2x täglich eincremen',
      'Normale, parfümfreie Bodylotion verwenden',
      'Leichte sportliche Aktivitäten möglich',
      'Sonnenschutz (LSF 50+) bei Sonnenexposition',
      'Viel Wasser trinken für Hautgesundheit',
    ],
    warnings: [
      'Noch kein Solarium',
      'Noch keine ausgedehnten Schwimmeinheiten',
      'Vorsicht mit direkter Sonneneinstrahlung',
    ],
    duration: '8-14 Tage',
  },
  {
    id: 'week-3-4',
    phase: 'final',
    day: 'Woche 3-4',
    title: {
      de: 'Finale Heilung',
      en: 'Final Healing',
    },
    description: {
      de: 'Ihr Tattoo ist oberflächlich verheilt, aber die tieferen Hautschichten heilen noch. Farben werden lebendiger.',
      en: 'Your tattoo is superficially healed, but the deeper skin layers are still healing. Colors become more vibrant.',
    },
    instructions: [
      'Weiterhin täglich mit Feuchtigkeit versorgen',
      'IMMER Sonnenschutz verwenden (LSF 50+)',
      'Normale Aktivitäten wieder möglich',
      'Baden und Schwimmen wieder erlaubt',
      'Bei Bedenken: Studio kontaktieren',
    ],
    warnings: [
      'UV-Schutz lebenslang wichtig',
      'Keine aggressiven Chemikalien',
      'Bei Rötung/Schwellung sofort melden',
    ],
    duration: '3-4 Wochen',
  },
  {
    id: 'longterm',
    phase: 'maintenance',
    day: 'Langzeitpflege',
    title: {
      de: 'Langzeitpflege',
      en: 'Long-term Care',
    },
    description: {
      de: 'Vollständige Heilung dauert 3-6 Monate. Richtige Pflege erhält Ihr Tattoo lebendig und schön.',
      en: 'Complete healing takes 3-6 months. Proper care keeps your tattoo vibrant and beautiful.',
    },
    instructions: [
      'Täglich Bodylotion oder Tattoo-Pflegecreme verwenden',
      'Immer Sonnenschutz auftragen (LSF 50+)',
      'Haut hydratisiert halten',
      'Gesunde Ernährung für Hautgesundheit',
      'Touch-up nach 6-12 Monaten bei Bedarf',
    ],
    warnings: [
      'Sonne ist der größte Feind von Tattoos',
      'Ohne UV-Schutz verblassen Farben schnell',
      'Extreme Gewichtsschwankungen können Tattoo verzerren',
    ],
    duration: 'Lebenslang',
  },
];

// Do's and Don'ts
export const AFTERCARE_TIPS: AftercareTip[] = [
  // DO's
  {
    id: 'do-1',
    category: 'do',
    icon: '✓',
    text: {
      de: 'Regelmäßig mit pH-neutraler Seife waschen',
      en: 'Wash regularly with pH-neutral soap',
    },
    critical: true,
  },
  {
    id: 'do-2',
    category: 'do',
    icon: '✓',
    text: {
      de: 'Dünn mit Heilsalbe eincremen (3-4x täglich)',
      en: 'Apply thin layer of healing ointment (3-4x daily)',
    },
    critical: true,
  },
  {
    id: 'do-3',
    category: 'do',
    icon: '✓',
    text: {
      de: 'Haut atmen lassen (lockere Kleidung)',
      en: 'Let skin breathe (loose clothing)',
    },
    critical: true,
  },
  {
    id: 'do-4',
    category: 'do',
    icon: '✓',
    text: {
      de: 'Viel Wasser trinken für Hautgesundheit',
      en: 'Drink lots of water for skin health',
    },
    critical: false,
  },
  {
    id: 'do-5',
    category: 'do',
    icon: '✓',
    text: {
      de: 'Saubere, gewaschene Hände vor Berührung',
      en: 'Clean, washed hands before touching',
    },
    critical: true,
  },
  {
    id: 'do-6',
    category: 'do',
    icon: '✓',
    text: {
      de: 'Sonnenschutz (LSF 50+) nach Heilung',
      en: 'Sun protection (SPF 50+) after healing',
    },
    critical: true,
  },
  {
    id: 'do-7',
    category: 'do',
    icon: '✓',
    text: {
      de: 'Bei Juckreiz sanft klopfen',
      en: 'Gently tap if itchy',
    },
    critical: false,
  },
  {
    id: 'do-8',
    category: 'do',
    icon: '✓',
    text: {
      de: 'Studio bei Problemen kontaktieren',
      en: 'Contact studio if problems arise',
    },
    critical: true,
  },

  // DON'Ts
  {
    id: 'dont-1',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT kratzen oder reiben',
      en: 'DO NOT scratch or rub',
    },
    critical: true,
  },
  {
    id: 'dont-2',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT baden, schwimmen oder Sauna (2 Wochen)',
      en: 'DO NOT bathe, swim, or sauna (2 weeks)',
    },
    critical: true,
  },
  {
    id: 'dont-3',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT direkte Sonneneinstrahlung',
      en: 'DO NOT expose to direct sunlight',
    },
    critical: true,
  },
  {
    id: 'dont-4',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT Folie nach Tag 1 verwenden',
      en: 'DO NOT use plastic wrap after day 1',
    },
    critical: true,
  },
  {
    id: 'dont-5',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT zu viel Creme (Haut muss atmen)',
      en: 'DO NOT over-moisturize (skin needs air)',
    },
    critical: false,
  },
  {
    id: 'dont-6',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT Schorf oder Schuppen abziehen',
      en: 'DO NOT pick scabs or peeling skin',
    },
    critical: true,
  },
  {
    id: 'dont-7',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT Alkohol in ersten 24 Stunden',
      en: 'DO NOT drink alcohol first 24 hours',
    },
    critical: true,
  },
  {
    id: 'dont-8',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT Haustiere auf Tattoo lassen',
      en: 'DO NOT let pets touch tattoo',
    },
    critical: false,
  },
  {
    id: 'dont-9',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT enge/scheuernde Kleidung tragen',
      en: 'DO NOT wear tight/abrasive clothing',
    },
    critical: false,
  },
  {
    id: 'dont-10',
    category: 'dont',
    icon: '✗',
    text: {
      de: 'NICHT Parfüm oder parfümierte Produkte',
      en: 'DO NOT use perfume or fragranced products',
    },
    critical: false,
  },
];

// Recommended Products
export const AFTERCARE_PRODUCTS: AftercareProduct[] = [
  {
    id: 'bepanthen',
    name: 'Bepanthen Wund- und Heilsalbe',
    category: 'healing',
    description: {
      de: 'Die klassische Wahl für Tattoo-Heilung. Fördert natürliche Heilung und hält die Haut geschmeidig.',
      en: 'The classic choice for tattoo healing. Promotes natural healing and keeps skin supple.',
    },
    recommended: true,
    price: '~8-12€',
  },
  {
    id: 'ph-neutral-soap',
    name: 'pH-neutrale Seife',
    category: 'cleaning',
    description: {
      de: 'Sanfte, parfümfreie Seife für die tägliche Reinigung. Sebamed oder ähnliche Marken.',
      en: 'Gentle, fragrance-free soap for daily cleaning. Sebamed or similar brands.',
    },
    recommended: true,
    price: '~3-5€',
  },
  {
    id: 'tattoo-balm',
    name: 'Spezielle Tattoo-Pflegecreme',
    category: 'healing',
    description: {
      de: 'Premium Tattoo-Balsam mit natürlichen Inhaltsstoffen. Fördert Heilung und erhält Farbbrillanz.',
      en: 'Premium tattoo balm with natural ingredients. Promotes healing and maintains color vibrancy.',
    },
    recommended: true,
    price: '~15-25€',
  },
  {
    id: 'sun-protection',
    name: 'Sonnenschutz LSF 50+',
    category: 'protection',
    description: {
      de: 'Hochdosierter Sonnenschutz speziell für Tattoos. Verhindert Verblassen und Hautschäden.',
      en: 'High-SPF sun protection specifically for tattoos. Prevents fading and skin damage.',
    },
    recommended: true,
    price: '~10-20€',
  },
  {
    id: 'body-lotion',
    name: 'Parfümfreie Bodylotion',
    category: 'healing',
    description: {
      de: 'Für die Langzeitpflege nach vollständiger Heilung. Hält die Haut hydratisiert und das Tattoo lebendig.',
      en: 'For long-term care after complete healing. Keeps skin hydrated and tattoo vibrant.',
    },
    recommended: false,
    price: '~5-15€',
  },
];

// Warning Signs
export const WARNING_SIGNS = {
  title: {
    de: 'Warnsignale - Wann zum Arzt?',
    en: 'Warning Signs - When to See a Doctor?',
  },
  description: {
    de: 'Kontaktieren Sie sofort einen Arzt oder unser Studio, wenn Sie diese Symptome bemerken:',
    en: 'Contact a doctor or our studio immediately if you notice these symptoms:',
  },
  signs: [
    {
      de: 'Starke, zunehmende Schmerzen nach 2-3 Tagen',
      en: 'Severe, increasing pain after 2-3 days',
    },
    {
      de: 'Übermäßige Rötung oder Schwellung',
      en: 'Excessive redness or swelling',
    },
    {
      de: 'Fieber oder Schüttelfrost',
      en: 'Fever or chills',
    },
    {
      de: 'Übelriechender Ausfluss oder Eiter',
      en: 'Foul-smelling discharge or pus',
    },
    {
      de: 'Rote Streifen von der Tätowierung weg',
      en: 'Red streaks extending from tattoo',
    },
    {
      de: 'Allergische Reaktion (starker Juckreiz, Ausschlag)',
      en: 'Allergic reaction (severe itching, rash)',
    },
    {
      de: 'Ungewöhnliche Blasenbildung',
      en: 'Unusual blistering',
    },
  ],
};

// Helper functions
export const getDosAndDonts = () => {
  return {
    dos: AFTERCARE_TIPS.filter((tip) => tip.category === 'do'),
    donts: AFTERCARE_TIPS.filter((tip) => tip.category === 'dont'),
  };
};

export const getCriticalTips = () => {
  return AFTERCARE_TIPS.filter((tip) => tip.critical);
};

export const getPhaseByDay = (day: number): AftercarePhase | undefined => {
  if (day === 0) return AFTERCARE_PHASES[0];
  if (day >= 1 && day <= 3) return AFTERCARE_PHASES[1];
  if (day >= 4 && day <= 7) return AFTERCARE_PHASES[2];
  if (day >= 8 && day <= 14) return AFTERCARE_PHASES[3];
  if (day >= 15 && day <= 28) return AFTERCARE_PHASES[4];
  return AFTERCARE_PHASES[5];
};

export const getRecommendedProducts = () => {
  return AFTERCARE_PRODUCTS.filter((product) => product.recommended);
};

export default {
  phases: AFTERCARE_PHASES,
  tips: AFTERCARE_TIPS,
  products: AFTERCARE_PRODUCTS,
  warningsSigns: WARNING_SIGNS,
};
