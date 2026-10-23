/**
 * ARCHIVE Mobile — Responsive product grid helper layout.
 * [Assignment 6] Flexbox + percentage widths via useResponsive.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { useResponsive } from '../../hooks/useResponsive';

export interface ProductGridProps {
  children: React.ReactNode;
}

/**
 * Wraps children in a flex-wrap row with responsive gaps.
 */
export function ProductGrid({ children }: ProductGridProps) {
  const { contentPadding } = useResponsive();
  return <View style={[styles.row, { paddingHorizontal: contentPadding }]}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
});
