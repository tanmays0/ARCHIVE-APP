import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing } from '../theme';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/ui/EmptyState';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../hooks/useProducts';
import { useResponsive } from '../hooks/useResponsive';
import { goToShop } from '../navigation/nav';
import type { Product } from '../types';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;

export function WishlistScreen({ navigation }: Props) {
  const { ids } = useWishlist();
  const { allProducts } = useProducts();
  const { width, columns, contentPadding } = useResponsive();
  const items = allProducts.filter((p) => ids.includes(p.id));
  const gap = spacing.md;
  const cardWidth = (width - contentPadding * 2 - gap * (columns - 1)) / columns;

  const openProduct = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetails', { productId: product.id });
    },
    [navigation],
  );

  if (items.length === 0) {
    return (
      <EmptyState
        title="No saved pieces"
        message="Tap the heart on a product to save it here."
        actionLabel="Browse Shop"
        onAction={() => goToShop(navigation)}
      />
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={{ padding: contentPadding, paddingBottom: spacing.huge }}
      data={items}
      key={columns}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? styles.wrap : undefined}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard product={item} onPress={openProduct} width={cardWidth} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  wrap: { justifyContent: 'space-between' },
});
