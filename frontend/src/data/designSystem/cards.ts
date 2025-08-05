// 🃏 Système de cards PYGMALION - SSOT
export const cardStyles = {
  base: 'bg-white rounded-xl overflow-hidden transition-all',
  
  variants: {
    default: 'border border-gray-100 shadow-sm hover:shadow-md',
    elevated: 'shadow-lg hover:shadow-xl',
    ghost: 'hover:bg-gray-50',
    gradient: 'bg-gradient-to-br',
  },
  
  padding: {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  },
  
  interactive: {
    clickable: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
    static: '',
  },
} as const;

export type CardVariant = keyof typeof cardStyles.variants;
export type CardPadding = keyof typeof cardStyles.padding;