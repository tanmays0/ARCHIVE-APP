import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { colors, radii, spacing, typography } from '../theme';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { fetchFakeStoreProducts } from '../services/api';
import { formatPrice } from '../utils/format';
import type { FakeStoreProduct } from '../types';
type LoadState =
  | {
      status: 'loading';
    }
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'success';
      items: FakeStoreProduct[];
    };
export function ApiDemoScreen() {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });
  const [refreshing, setRefreshing] = useState(false);
  const fetchProducts = useCallback(async (): Promise<LoadState> => {
    try {
      const data = await fetchFakeStoreProducts();
      return { status: 'success', items: data };
    } catch (e) {
      return {
        status: 'error',
        message: e instanceof Error ? e.message : 'Failed to load API data.',
      };
    }
  }, []);
  useEffect(() => {
    let active = true;
    fetchProducts().then((next) => {
      if (active) setLoadState(next);
    });
    return () => {
      active = false;
    };
  }, [fetchProducts]);
  const onRetry = useCallback(() => {
    setLoadState({ status: 'loading' });
    void fetchProducts().then(setLoadState);
  }, [fetchProducts]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    void fetchProducts()
      .then(setLoadState)
      .finally(() => setRefreshing(false));
  }, [fetchProducts]);
  const renderItem: ListRenderItem<FakeStoreProduct> = useCallback(
    ({ item }) => (
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.thumb} contentFit="contain" />
        <View style={styles.meta}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </View>
      </View>
    ),
    [],
  );
  if (loadState.status === 'loading') {
    return <Loader message="Fetching FakeStore API…" />;
  }
  if (loadState.status === 'error') {
    return (
      <View style={styles.center}>
        <EmptyState title="API request failed" message={loadState.message} />
        <Button title="Retry" onPress={onRetry} style={styles.retry} />
        <Pressable onPress={onRetry}>
          <Text style={styles.hint}>Assignment 8 · loading / error / retry</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={loadState.items}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      initialNumToRender={8}
      windowSize={5}
      ListHeaderComponent={
        <Text style={styles.banner}>
          Assignment 8 demo — FakeStore public API (not ARCHIVE inventory). Pull to refresh.
        </Text>
      }
      ListEmptyComponent={
        <EmptyState title="No API products" message="Try retrying the request." />
      }
    />
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  banner: {
    ...typography.bodySmall,
    color: colors.clay,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  thumb: { width: 64, height: 64 },
  meta: { flex: 1 },
  title: { ...typography.bodySmall, fontFamily: typography.button.fontFamily },
  category: { ...typography.caption, marginTop: spacing.xs },
  price: { ...typography.price, fontSize: 16, marginTop: spacing.xs },
  center: {
    flex: 1,
    backgroundColor: colors.bone,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  retry: { marginTop: spacing.lg },
  hint: { ...typography.caption, textAlign: 'center', marginTop: spacing.lg },
});
