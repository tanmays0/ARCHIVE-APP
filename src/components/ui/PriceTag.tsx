/**
 * ARCHIVE Mobile — Price display with optional compare-at.
 * [Assignment 3] Props for price formatting.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { formatPrice } from '../../utils/format';

export interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
}

/**
 * Renders current price and optional strikethrough compare-at.
 */
export function PriceTag({ price, compareAtPrice, currency = 'USD' }: PriceTagProps) {
  const onSale = typeof compareAtPrice === 'number' && compareAtPrice > price;

  return (
    <View style={styles.row}>
      <Text style={styles.price}>{formatPrice(price, currency)}</Text>
      {onSale ? (
        <Text style={styles.compare}>{formatPrice(compareAtPrice, currency)}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  price: {
    ...typography.price,
  },
  compare: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
});
