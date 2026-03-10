// ============================================
// AFTERCARE DATA
// ============================================
// Comprehensive aftercare instructions for Medusa Tattoo München
// Used by: AftercarePage, booking confirmation emails, artist handouts

export interface AftercarePhase {
  id: string;
  phase: string;
  dayKey: string;
  titleKey: string;
  descriptionKey: string;
  instructionKeys: string[];
  warningKeys: string[];
  durationKey: string;
}

export interface AftercareTip {
  id: string;
  category: 'do' | 'dont';
  icon: string;
  textKey: string;
  critical: boolean;
}

export interface AftercareProduct {
  id: string;
  nameKey: string;
  category: 'cleaning' | 'healing' | 'protection';
  descriptionKey: string;
  recommended: boolean;
  link?: string;
  price?: string;
}

export interface AftercareWarningSigns {
  titleKey: string;
  descriptionKey: string;
  signKeys: string[];
}

// Healing Timeline (Phases)
export const AFTERCARE_PHASES: AftercarePhase[] = [
  {
    id: 'day-0',
    phase: 'initial',
    dayKey: 'aftercare.phases.day-0.day',
    titleKey: 'aftercare.phases.day-0.title',
    descriptionKey: 'aftercare.phases.day-0.description',
    durationKey: 'aftercare.phases.day-0.duration',
    instructionKeys: [
      'aftercare.phases.day-0.instructions.keepWrap',
      'aftercare.phases.day-0.instructions.noTouch',
      'aftercare.phases.day-0.instructions.looseClothing',
      'aftercare.phases.day-0.instructions.noSports',
      'aftercare.phases.day-0.instructions.drinkWater',
    ],
    warningKeys: [
      'aftercare.phases.day-0.warnings.dontRemoveWrap',
      'aftercare.phases.day-0.warnings.avoidSun',
      'aftercare.phases.day-0.warnings.noAlcohol',
    ],
  },
  {
    id: 'day-1-3',
    phase: 'cleaning',
    dayKey: 'aftercare.phases.day-1-3.day',
    titleKey: 'aftercare.phases.day-1-3.title',
    descriptionKey: 'aftercare.phases.day-1-3.description',
    durationKey: 'aftercare.phases.day-1-3.duration',
    instructionKeys: [
      'aftercare.phases.day-1-3.instructions.removeWrap',
      'aftercare.phases.day-1-3.instructions.washWithSoap',
      'aftercare.phases.day-1-3.instructions.patDry',
      'aftercare.phases.day-1-3.instructions.applyOintment',
      'aftercare.phases.day-1-3.instructions.noMoreWrap',
      'aftercare.phases.day-1-3.instructions.breathableClothing',
    ],
    warningKeys: [
      'aftercare.phases.day-1-3.warnings.noBath',
      'aftercare.phases.day-1-3.warnings.noSwimming',
      'aftercare.phases.day-1-3.warnings.avoidSun',
      'aftercare.phases.day-1-3.warnings.noScratch',
    ],
  },
  {
    id: 'day-4-7',
    phase: 'healing',
    dayKey: 'aftercare.phases.day-4-7.day',
    titleKey: 'aftercare.phases.day-4-7.title',
    descriptionKey: 'aftercare.phases.day-4-7.description',
    durationKey: 'aftercare.phases.day-4-7.duration',
    instructionKeys: [
      'aftercare.phases.day-4-7.instructions.keepWashing',
      'aftercare.phases.day-4-7.instructions.applyLotion',
      'aftercare.phases.day-4-7.instructions.tapInsteadScratch',
      'aftercare.phases.day-4-7.instructions.dontPeelSkin',
      'aftercare.phases.day-4-7.instructions.keepHydrated',
      'aftercare.phases.day-4-7.instructions.avoidTightClothing',
    ],
    warningKeys: [
      'aftercare.phases.day-4-7.warnings.dontScratch',
      'aftercare.phases.day-4-7.warnings.dontRemoveFlakes',
      'aftercare.phases.day-4-7.warnings.noScrubs',
      'aftercare.phases.day-4-7.warnings.noBathSwimming',
    ],
  },
  {
    id: 'day-8-14',
    phase: 'stabilization',
    dayKey: 'aftercare.phases.day-8-14.day',
    titleKey: 'aftercare.phases.day-8-14.title',
    descriptionKey: 'aftercare.phases.day-8-14.description',
    durationKey: 'aftercare.phases.day-8-14.duration',
    instructionKeys: [
      'aftercare.phases.day-8-14.instructions.moisturizeTwice',
      'aftercare.phases.day-8-14.instructions.useBodyLotion',
      'aftercare.phases.day-8-14.instructions.lightExercise',
      'aftercare.phases.day-8-14.instructions.sunProtection',
      'aftercare.phases.day-8-14.instructions.drinkWater',
    ],
    warningKeys: [
      'aftercare.phases.day-8-14.warnings.noSolarium',
      'aftercare.phases.day-8-14.warnings.noLongSwims',
      'aftercare.phases.day-8-14.warnings.avoidDirectSun',
    ],
  },
  {
    id: 'week-3-4',
    phase: 'final',
    dayKey: 'aftercare.phases.week-3-4.day',
    titleKey: 'aftercare.phases.week-3-4.title',
    descriptionKey: 'aftercare.phases.week-3-4.description',
    durationKey: 'aftercare.phases.week-3-4.duration',
    instructionKeys: [
      'aftercare.phases.week-3-4.instructions.dailyMoisturize',
      'aftercare.phases.week-3-4.instructions.alwaysSunProtection',
      'aftercare.phases.week-3-4.instructions.normalActivities',
      'aftercare.phases.week-3-4.instructions.bathingAllowed',
      'aftercare.phases.week-3-4.instructions.contactStudio',
    ],
    warningKeys: [
      'aftercare.phases.week-3-4.warnings.uvProtectionAlways',
      'aftercare.phases.week-3-4.warnings.noHarshChemicals',
      'aftercare.phases.week-3-4.warnings.reportRedness',
    ],
  },
  {
    id: 'longterm',
    phase: 'maintenance',
    dayKey: 'aftercare.phases.longterm.day',
    titleKey: 'aftercare.phases.longterm.title',
    descriptionKey: 'aftercare.phases.longterm.description',
    durationKey: 'aftercare.phases.longterm.duration',
    instructionKeys: [
      'aftercare.phases.longterm.instructions.dailyLotion',
      'aftercare.phases.longterm.instructions.alwaysSPF',
      'aftercare.phases.longterm.instructions.keepHydrated',
      'aftercare.phases.longterm.instructions.healthyDiet',
      'aftercare.phases.longterm.instructions.touchUp',
    ],
    warningKeys: [
      'aftercare.phases.longterm.warnings.sunBiggestEnemy',
      'aftercare.phases.longterm.warnings.noUvColorsFade',
      'aftercare.phases.longterm.warnings.weightChanges',
    ],
  },
];

// Do's and Don'ts
export const AFTERCARE_TIPS: AftercareTip[] = [
  // DO's
  {
    id: 'do-1',
    category: 'do',
    icon: '✓',
    textKey: 'aftercare.tips.do-1',
    critical: true,
  },
  {
    id: 'do-2',
    category: 'do',
    icon: '✓',
    textKey: 'aftercare.tips.do-2',
    critical: true,
  },
  {
    id: 'do-3',
    category: 'do',
    icon: '✓',
    textKey: 'aftercare.tips.do-3',
    critical: true,
  },
  {
    id: 'do-4',
    category: 'do',
    icon: '✓',
    textKey: 'aftercare.tips.do-4',
    critical: false,
  },
  {
    id: 'do-5',
    category: 'do',
    icon: '✓',
    textKey: 'aftercare.tips.do-5',
    critical: true,
  },
  {
    id: 'do-6',
    category: 'do',
    icon: '✓',
    textKey: 'aftercare.tips.do-6',
    critical: true,
  },
  {
    id: 'do-7',
    category: 'do',
    icon: '✓',
    textKey: 'aftercare.tips.do-7',
    critical: false,
  },
  {
    id: 'do-8',
    category: 'do',
    icon: '✓',
    textKey: 'aftercare.tips.do-8',
    critical: true,
  },

  // DON'Ts
  {
    id: 'dont-1',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-1',
    critical: true,
  },
  {
    id: 'dont-2',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-2',
    critical: true,
  },
  {
    id: 'dont-3',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-3',
    critical: true,
  },
  {
    id: 'dont-4',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-4',
    critical: true,
  },
  {
    id: 'dont-5',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-5',
    critical: false,
  },
  {
    id: 'dont-6',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-6',
    critical: true,
  },
  {
    id: 'dont-7',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-7',
    critical: true,
  },
  {
    id: 'dont-8',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-8',
    critical: false,
  },
  {
    id: 'dont-9',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-9',
    critical: false,
  },
  {
    id: 'dont-10',
    category: 'dont',
    icon: '✗',
    textKey: 'aftercare.tips.dont-10',
    critical: false,
  },
];

// Recommended Products
export const AFTERCARE_PRODUCTS: AftercareProduct[] = [
  {
    id: 'bepanthen',
    nameKey: 'aftercare.products.items.bepanthen.name',
    category: 'healing',
    descriptionKey: 'aftercare.products.items.bepanthen.description',
    recommended: true,
    price: '~8-12€',
  },
  {
    id: 'ph-neutral-soap',
    nameKey: 'aftercare.products.items.ph-neutral-soap.name',
    category: 'cleaning',
    descriptionKey: 'aftercare.products.items.ph-neutral-soap.description',
    recommended: true,
    price: '~3-5€',
  },
  {
    id: 'tattoo-balm',
    nameKey: 'aftercare.products.items.tattoo-balm.name',
    category: 'healing',
    descriptionKey: 'aftercare.products.items.tattoo-balm.description',
    recommended: true,
    price: '~15-25€',
  },
  {
    id: 'sun-protection',
    nameKey: 'aftercare.products.items.sun-protection.name',
    category: 'protection',
    descriptionKey: 'aftercare.products.items.sun-protection.description',
    recommended: true,
    price: '~10-20€',
  },
  {
    id: 'body-lotion',
    nameKey: 'aftercare.products.items.body-lotion.name',
    category: 'healing',
    descriptionKey: 'aftercare.products.items.body-lotion.description',
    recommended: false,
    price: '~5-15€',
  },
];

// Warning Signs
export const WARNING_SIGNS: AftercareWarningSigns = {
  titleKey: 'aftercare.warningSigns.title',
  descriptionKey: 'aftercare.warningSigns.description',
  signKeys: [
    'aftercare.warningSigns.signs.pain',
    'aftercare.warningSigns.signs.redness',
    'aftercare.warningSigns.signs.fever',
    'aftercare.warningSigns.signs.discharge',
    'aftercare.warningSigns.signs.redStreaks',
    'aftercare.warningSigns.signs.allergicReaction',
    'aftercare.warningSigns.signs.blistering',
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
