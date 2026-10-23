/**
 * ARCHIVE Mobile — Typography tokens (Fraunces display + DM Sans body).
 */
import { TextStyle } from 'react-native';
import { colors } from './colors';

export const fontFamilies = {
  display: 'Fraunces_600SemiBold',
  displayRegular: 'Fraunces_400Regular',
  displayItalic: 'Fraunces_400Regular_Italic',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodyBold: 'DMSans_700Bold',
} as const;

type TypeStyle = TextStyle;

export const typography: Record<string, TypeStyle> = {
  hero: {
    fontFamily: fontFamilies.display,
    fontSize: 40,
    lineHeight: 48,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily: fontFamilies.display,
    fontSize: 32,
    lineHeight: 40,
    color: colors.textPrimary,
  },
  h2: {
    fontFamily: fontFamilies.display,
    fontSize: 24,
    lineHeight: 32,
    color: colors.textPrimary,
  },
  h3: {
    fontFamily: fontFamilies.display,
    fontSize: 20,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  caption: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  price: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.textPrimary,
  },
};
