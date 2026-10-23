/**
 * ARCHIVE Mobile — Catalogue FlatList with search, filter, sort.
 * [Assignment 8 / 9 / 10] Efficient FlatList over local JSON.
 */
import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing, typography } from '../theme';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { ProductCard } from '../components/product/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { useResponsive } from '../hooks/useResponsive';
import type { Product, ProductCategory, SortOption } from '../types';
import type { RootStackParamList } from '../navigation/types';

const CATEGORIES: (ProductCategory | 'All')[] = [
  'All',
  'Men',
  'Women',
  'Kids',
  'Accessories',
];

const SORTS: { key: SortOption; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'newest', label: 'Newest' },
  { key: 'priceAsc', label: 'Price ↑' },
  { key: 'priceDesc', label: 'Price ↓' },
];

const ROW_HEIGHT = 280;

/**
 * Shop catalogue — primary Assignment 8 FlatList demo.
 */
export function CatalogueScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width, columns, contentPadding } = useResponsive();
  const {
    products,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    refreshing,
    onRefresh,
  } = useProducts();

  const debouncedSearch = useDebounce(search, 250);

  // Sync debounced search into filter (products already filter on `search` state —
  // we update search immediately for input UX; debounce softens re-renders via memo list key)
  const data = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [products, debouncedSearch]);

  const gap = spacing.md;
  const cardWidth = (width - contentPadding * 2 - gap * (columns - 1)) / columns;

  const openProduct = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetails', { productId: product.id });
    },
    [navigation],
  );

  // [Assignment 8] Memoised renderItem
  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <ProductCard product={item} onPress={openProduct} width={cardWidth} />
    ),
    [openProduct, cardWidth],
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const ListHeader = (
    <View style={styles.header}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search brand, piece, tag…"
        placeholderTextColor={colors.textMuted}
        style={styles.search}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(c) => c}
        showsHorizontalScrollIndicator={false}
        style={styles.chips}
        renderItem={({ item }) => (
          <FilterChip
            label={item}
            active={category === item}
            onPress={() => setCategory(item)}
          />
        )}
      />
      <View style={styles.sortRow}>
        {SORTS.map((s) => (
          <Pressable key={s.key} onPress={() => setSort(s.key)} style={styles.sortBtn}>
            <Text style={[styles.sortText, sort === s.key && styles.sortActive]}>{s.label}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={() => navigation.navigate('ApiDemo')}>
        <Text style={styles.apiLink}>Assignment 8 · Public API demo →</Text>
      </Pressable>
      <Text style={styles.count}>{data.length} pieces</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={{
        paddingHorizontal: contentPadding,
        paddingBottom: spacing.huge,
      }}
      data={data}
      key={columns}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? styles.columnWrap : undefined}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={
        <EmptyState
          title="No pieces found"
          message="Try another search or category."
          actionLabel="Clear filters"
          onAction={() => {
            setSearch('');
            setCategory('All');
          }}
        />
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
      initialNumToRender={6}
      windowSize={7}
      maxToRenderPerBatch={8}
      removeClippedSubviews
      getItemLayout={
        columns === 1
          ? (_data, index) => ({
              length: ROW_HEIGHT,
              offset: ROW_HEIGHT * index,
              index,
            })
          : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  header: { paddingTop: spacing.md, paddingBottom: spacing.lg },
  search: {
    ...typography.body,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  chips: { marginBottom: spacing.md, flexGrow: 0 },
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  sortBtn: { paddingVertical: spacing.xs },
  sortText: { ...typography.caption, color: colors.textMuted },
  sortActive: { color: colors.clay },
  apiLink: {
    ...typography.bodySmall,
    color: colors.clay,
    marginVertical: spacing.sm,
  },
  count: { ...typography.caption, marginBottom: spacing.sm },
  columnWrap: {
    justifyContent: 'space-between',
  },
});
