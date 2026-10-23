/**
 * ARCHIVE Mobile — Theme barrel export.
 * All UI must consume tokens from here — no hard-coded colours/sizes in components.
 */
import { colors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';
import { typography, fontFamilies } from './typography';

export { colors } from './colors';
export { spacing } from './spacing';
export { radii } from './radii';
export { shadows } from './shadows';
export { typography, fontFamilies } from './typography';

export const theme = {
  colors,
  spacing,
  radii,
  shadows,
  typography,
  fontFamilies,
} as const;

export type Theme = typeof theme;
