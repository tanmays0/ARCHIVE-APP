import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/ui/EmptyState';
import { useProducts } from '../hooks/useProducts';
import { useResponsive } from '../hooks/useResponsive';
import collectionsJson from '../data/collections.json';
import type { Collection, Product } from '../types';
import type { RootStackParamList } from '../navigation/types';

const collections = collectionsJson as Collection[];

type Props = NativeStackScreenProps<RootStackParamList, 'Collection'>;

export function CollectionScreen({ route, navigation }: Props) {
  const { collectionId } = route.params;
  const collection = collections.find((c) => c.id === collectionId);
  const { allProducts } = useProducts();
  const { width, columns, contentPadding } = useResponsive();
  const items = useMemo(
    () => allProducts.filter((p) => p.collectionIds.includes(collectionId)),
    [allProducts, collectionId],
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
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>{collection?.name ?? 'Collection'}</Text>
          {collection?.description ? (
            <Text style={styles.subtitle}>{collection.description}</Text>
          ) : null}
        </View>
      }
      ListEmptyComponent={<EmptyState title="Empty collection" message="No pieces in this edit yet." />}
      renderItem={({ item }) => (
        <ProductCard product={item} onPress={openProduct} width={cardWidth} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  wrap: { justifyContent: 'space-between' },
  header: { marginBottom: spacing.xl },
  title: { ...typography.h2 },
  subtitle: { ...typography.bodySmall, marginTop: spacing.sm },
});
