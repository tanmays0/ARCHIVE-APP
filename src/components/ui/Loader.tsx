import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
export interface LoaderProps {
  message?: string;
}
export function Loader({ message = 'Loading…' }: LoaderProps) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color={colors.clay} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.bone,
  },
  message: {
    ...typography.bodySmall,
    marginTop: spacing.lg,
  },
});
