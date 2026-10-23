/**
 * ARCHIVE Mobile — Quantity stepper (+ / −).
 * [Assignment 3] useState / controlled quantity via props + callbacks.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export interface QuantityStepperProps {
  /** Current quantity (controlled) */
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}

/**
 * Increment / decrement quantity control.
 */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel="Decrease quantity"
        onPress={() => onChange(Math.max(min, value - 1))}
        style={styles.btn}
      >
        <Text style={styles.btnText}>−</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable
        accessibilityLabel="Increase quantity"
        onPress={() => onChange(Math.min(max, value + 1))}
        style={styles.btn}
      >
        <Text style={styles.btnText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    ...typography.h3,
    fontSize: 18,
    lineHeight: 22,
  },
  value: {
    ...typography.body,
    fontFamily: typography.button.fontFamily,
    minWidth: 28,
    textAlign: 'center',
  },
});
