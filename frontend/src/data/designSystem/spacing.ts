// 📏 Système d'espacement PYGMALION - SSOT
export const spacing = {
  // Espacement en rem (base 16px)
  values: {
    0: '0',
    0.5: '0.125rem', // 2px
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px
  },
  
  sections: {
    xs: 'py-8',
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24',
  },
  
  containers: {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1600px]',
  },
} as const;

export type SpacingValue = keyof typeof spacing.values;
export type SectionSize = keyof typeof spacing.sections;
export type ContainerSize = keyof typeof spacing.containers;