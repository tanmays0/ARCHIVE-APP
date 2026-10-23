import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { useResponsive } from '../../hooks/useResponsive';
export interface ProductGridProps {
  children: React.ReactNode;
}
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
