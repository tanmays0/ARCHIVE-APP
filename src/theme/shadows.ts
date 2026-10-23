import { Platform, ViewStyle } from 'react-native';
import { colors } from './colors';
type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;
export const shadows: Record<'sm' | 'md' | 'lg', ShadowStyle> = {
  sm: Platform.select({
    ios: {
      shadowColor: colors.ink,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
    },
    android: { elevation: 2 },
    default: { elevation: 2 },
  }) as ShadowStyle,
  md: Platform.select({
    ios: {
      shadowColor: colors.ink,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
    default: { elevation: 4 },
  }) as ShadowStyle,
  lg: Platform.select({
    ios: {
      shadowColor: colors.ink,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
    default: { elevation: 8 },
  }) as ShadowStyle,
};
