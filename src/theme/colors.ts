/**
 * ARCHIVE Mobile — Brand colour tokens (from web design system).
 * Source: tanmays0/ARCHIVE css/design-system/tokens.css
 */

export const colors = {
  bone: '#f2eee6',
  ink: '#181510',
  stone: '#c9c0b4',
  clay: '#a9522f',
  olive: '#6b6a54',
  denim: '#4c5b66',

  neutral0: '#f6f2ea',
  neutral50: '#f2eee6',
  neutral100: '#e8e2d6',
  neutral200: '#d7cfc0',
  neutral300: '#c9c0b4',
  neutral400: '#a49a89',
  neutral500: '#7c7565',
  neutral600: '#5c5648',
  neutral700: '#423d33',
  neutral800: '#2a2620',
  neutral900: '#201c16',
  neutral950: '#181510',

  surfacePrimary: '#f2eee6',
  surfaceSecondary: '#eae4d8',
  surfaceInverse: '#181510',
  surfaceCard: '#f6f2ea',

  textPrimary: '#181510',
  textSecondary: '#423d33',
  textMuted: '#7c7565',
  textInverse: '#f2eee6',

  accent: '#a9522f',
  accentHover: '#944726',
  accentActive: '#7f3d20',
  accentOnAccent: '#f6f2ea',

  success: '#4f6b3a',
  successSurface: '#eef1e6',
  error: '#a63a2a',
  errorSurface: '#f7ece8',
  warning: '#b07423',
  warningSurface: '#f6efe1',
  saleSurface: '#f4e9e2',

  border: '#c9c0b4',
  borderSubtle: '#ded7c9',
  borderStrong: '#181510',

  white: '#ffffff',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;
