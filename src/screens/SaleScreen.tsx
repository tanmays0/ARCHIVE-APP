import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing } from '../theme';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/ui/EmptyState';
import { useProducts } from '../hooks/useProducts';
import { useResponsive } from '../hooks/useResponsive';
import type { Product } from '../types';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Sale'>;

export function SaleScreen({ navigation }: Props) {
  const { allProducts } = useProducts();
  const { width, columns, contentPadding } = useResponsive();
  const items = useMemo(
    () =>
      allProducts.filter(
        (p) => typeof p.compareAtPrice === 'number' && p.compareAtPrice > p.price,
      ),
    [allProducts],
  );
  const gap = spacing.md;
  const cardWidth = (width - contentPadding * 2 - gap * (columns - 1)) / columns;

  const openProduct = useCallback(
    (product: Product) => navigation.navigate('ProductDetails', { productId: product.id }),
    [navigation],
  );

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={{ padding: contentPadding, paddingBottom: spacing.huge }}
      data={items}
      key={columns}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? styles.wrap : undefined}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<EmptyState title="No sale pieces" message="Nothing marked down right now." />}
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
