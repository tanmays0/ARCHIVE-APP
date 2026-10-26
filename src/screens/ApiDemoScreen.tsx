import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { colors, radii, spacing, typography } from '../theme';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { fetchFakeStoreProducts } from '../services/api';
import { formatPrice } from '../utils/format';
import { safeImageUri } from '../utils/imageUri';
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
        <Image
          source={{ uri: safeImageUri(item.image) }}
          style={styles.thumb}
          contentFit="contain"
          recyclingKey={`fs-${item.id}`}
        />
        <View style={styles.meta}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>{formatPrice(Math.round(item.price * 83))}</Text>
        </View>
      </View>
    ),
    [],
  );
  if (loadState.status === 'loading') {
    return <Loader message="Loading partner catalogue…" />;
  }
  if (loadState.status === 'error') {
    return (
      <View style={styles.center}>
        <EmptyState title="Couldn’t load feed" message={loadState.message} />
        <Button title="Try again" onPress={onRetry} style={styles.retry} />
        <Pressable onPress={onRetry}>
          <Text style={styles.hint}>Tap to retry</Text>
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
        <View style={styles.bannerCard}>
          <Text style={styles.bannerEyebrow}>Partner feed</Text>
          <Text style={styles.bannerTitle}>Discover more pieces</Text>
          <Text style={styles.banner}>
            A live external catalogue shown alongside ARCHIVE. Pull down to refresh.
          </Text>
        </View>
      }
      ListEmptyComponent={
        <EmptyState title="Nothing here yet" message="Pull to refresh or try again shortly." />
      }
    />
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  bannerCard: {
    backgroundColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  bannerEyebrow: {
    ...typography.caption,
    color: colors.clay,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  bannerTitle: {
    ...typography.h3,
    color: colors.bone,
    marginBottom: spacing.sm,
  },
  banner: {
    ...typography.bodySmall,
    color: colors.neutral200,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: radii.md,
    backgroundColor: colors.neutral100,
  },
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
