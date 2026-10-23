/**
 * ARCHIVE Mobile — Responsive layout helpers.
 * [Assignment 6] Flexbox + useWindowDimensions for small/large Android screens.
 */
import { useWindowDimensions } from 'react-native';

export interface ResponsiveInfo {
  width: number;
  height: number;
  isCompact: boolean;
  isWide: boolean;
  columns: number;
  contentPadding: number;
}

/**
 * Derives column count and padding from window size.
 */
export function useResponsive(): ResponsiveInfo {
  const { width, height } = useWindowDimensions();
  const isCompact = width < 380;
  const isWide = width >= 600;
  const columns = isWide ? 3 : 2;
  const contentPadding = isCompact ? 12 : 16;

  return { width, height, isCompact, isWide, columns, contentPadding };
}
