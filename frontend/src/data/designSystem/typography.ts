// 📝 Système typographique PYGMALION - SSOT
export const typography = {
  fonts: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    display: 'Inter, system-ui, -apple-system, sans-serif',
  },
  
  headings: {
    h1: 'text-5xl lg:text-6xl font-bold',
    h2: 'text-4xl font-bold',
    h3: 'text-3xl font-bold',
    h4: 'text-2xl font-bold',
    h5: 'text-xl font-semibold',
    h6: 'text-lg font-semibold',
  },
  
  body: {
    large: 'text-lg leading-relaxed',
    base: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
    tiny: 'text-xs leading-normal',
  },
  
  weights: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
} as const;

export type HeadingLevel = keyof typeof typography.headings;
export type BodySize = keyof typeof typography.body;
export type FontWeight = keyof typeof typography.weights;