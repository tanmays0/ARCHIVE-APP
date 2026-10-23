import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';
export interface BadgeProps {
  label: string;
  tone?: 'olive' | 'clay' | 'ink' | 'success';
  style?: ViewStyle;
}
export function Badge({ label, tone = 'olive', style }: BadgeProps) {
  return (
    <View style={[styles.base, toneStyles[tone], style]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textInverse,
    fontSize: 10,
  },
});
const toneStyles = StyleSheet.create({
  olive: { backgroundColor: colors.olive },
  clay: { backgroundColor: colors.clay },
  ink: { backgroundColor: colors.ink },
  success: { backgroundColor: colors.success },
});
