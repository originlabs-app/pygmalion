// 🎨 Palette de couleurs PYGMALION - SSOT
export const colors = {
  primary: {
    blue600: { hex: '#2563EB', name: 'Blue 600', usage: 'Primary Brand' },
    blue700: { hex: '#1D4ED8', name: 'Blue 700', usage: 'Primary Hover' },
    blue50: { hex: '#EFF6FF', name: 'Blue 50', usage: 'Background Light' },
    indigo50: { hex: '#EEF2FF', name: 'Indigo 50', usage: 'Background Alt' },
  },
  secondary: {
    orange500: { hex: '#F97316', name: 'Orange 500', usage: 'Accent' },
    green500: { hex: '#10B981', name: 'Green 500', usage: 'Success' },
    purple500: { hex: '#8B5CF6', name: 'Purple 500', usage: 'Special' },
    yellow400: { hex: '#FEF08A', name: 'Yellow 400', usage: 'Warning Light' },
    red500: { hex: '#EF4444', name: 'Red 500', usage: 'Error' },
  },
  neutral: {
    gray900: { hex: '#111827', name: 'Gray 900', usage: 'Text Primary' },
    gray700: { hex: '#374151', name: 'Gray 700', usage: 'Text Secondary' },
    gray600: { hex: '#4B5563', name: 'Gray 600', usage: 'Text Muted' },
    gray500: { hex: '#6B7280', name: 'Gray 500', usage: 'Text Disabled' },
    gray100: { hex: '#F3F4F6', name: 'Gray 100', usage: 'Border Light' },
    gray50: { hex: '#F9FAFB', name: 'Gray 50', usage: 'Background' },
  },
  gradients: {
    blueIndigo: 'from-blue-600 to-indigo-600',
    purplePink: 'from-purple-600 to-pink-600',
    orangeRed: 'from-orange-500 to-red-500',
    greenBlue: 'from-green-500 to-blue-500',
  },
} as const;

export type ColorKey = keyof typeof colors;
export type PrimaryColor = keyof typeof colors.primary;
export type SecondaryColor = keyof typeof colors.secondary;
export type NeutralColor = keyof typeof colors.neutral;