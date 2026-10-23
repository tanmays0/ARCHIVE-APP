import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { colors, radii, shadows, spacing, typography } from '../../theme';
import type { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { PriceTag } from '../ui/PriceTag';
import { useWishlist } from '../../context/WishlistContext';
export interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  width?: number;
}
function ProductCardComponent({ product, onPress, width }: ProductCardProps) {
  const { isWishlisted, toggle } = useWishlist();
  const wished = isWishlisted(product.id);
  return (
    <Pressable
      onPress={() => onPress(product)}
      style={[styles.card, width ? { width } : null, shadows.sm]}
      accessibilityRole="button"
      accessibilityLabel={product.name}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <Pressable
          onPress={() => toggle(product.id)}
          style={styles.heart}
          hitSlop={8}
          accessibilityLabel={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Text style={styles.heartText}>{wished ? '♥' : '♡'}</Text>
        </Pressable>
        {product.authenticated ? (
          <View style={styles.badgeWrap}>
            <Badge label="Authenticated" tone="olive" />
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.condition}>{product.condition}</Text>
        <PriceTag
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          currency={product.currency}
        />
      </View>
    </Pressable>
  );
}
export const ProductCard = memo(ProductCardComponent);
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.neutral100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heart: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: radii.full,
    backgroundColor: colors.bone,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartText: {
    fontSize: 16,
    color: colors.clay,
  },
  badgeWrap: {
    position: 'absolute',
    left: spacing.sm,
    bottom: spacing.sm,
  },
  body: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  brand: {
    ...typography.caption,
    color: colors.textMuted,
  },
  name: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontFamily: typography.button.fontFamily,
  },
  condition: {
    ...typography.caption,
    textTransform: 'none',
    letterSpacing: 0,
    color: colors.olive,
  },
});
