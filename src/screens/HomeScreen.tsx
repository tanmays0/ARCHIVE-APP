import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, shadows, spacing, typography } from '../theme';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { useProducts } from '../hooks/useProducts';
import collectionsJson from '../data/collections.json';
import type { Collection, Product } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { goToShop } from '../navigation/nav';

const collections = collectionsJson as Collection[];
const HERO_URI = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const { featured, newArrivals } = useProducts();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });
  const heroStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 280], [0, 80], Extrapolation.CLAMP),
      },
      {
        scale: interpolate(scrollY.value, [0, 280], [1, 1.12], Extrapolation.CLAMP),
      },
    ],
    opacity: interpolate(scrollY.value, [0, 220], [1, 0.35], Extrapolation.CLAMP),
  }));
  const openProduct = (product: Product) => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };
  const cardWidth = Math.min(160, width * 0.42);
  return (
    <Animated.ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      onScroll={onScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.brandBlock}>
        <Text style={styles.logo}>ARCHIVE</Text>
        <Text style={styles.tagline}>Vintage, Verified · One of one. Authenticated.</Text>
      </View>

      <View style={styles.heroClip}>
        <Animated.View style={[styles.heroInner, heroStyle]}>
          <Image source={{ uri: HERO_URI }} style={styles.heroImage} contentFit="cover" />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroEyebrow}>The Archive</Text>
            <Text style={styles.heroTitle}>Considered,{'\n'}Not Consumed</Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          eyebrow="The Edit"
          title="Fewer, better things"
          subtitle="ARCHIVE is a curated marketplace for authenticated vintage and pre-loved fashion. Every piece is inspected, graded, and photographed by hand — a single unit with its own history, ready for its next chapter."
        />
        <Button title="Shop the Archive" onPress={() => goToShop(navigation)} style={styles.cta} />
        <Button
          title="How Authentication Works"
          variant="secondary"
          onPress={() => navigation.navigate('AuthenticityServices')}
          style={styles.ctaSecondary}
        />
        <View style={styles.quickRow}>
          <Button
            title="New"
            variant="ghost"
            onPress={() => navigation.navigate('NewArrivals')}
            style={styles.quickBtn}
          />
          <Button
            title="Sale"
            variant="ghost"
            onPress={() => navigation.navigate('Sale')}
            style={styles.quickBtn}
          />
          <Button
            title="Wishlist"
            variant="ghost"
            onPress={() => navigation.navigate('Wishlist')}
            style={styles.quickBtn}
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader eyebrow="The Selection" title="Featured collections" />
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {collections.map((c) => (
            <Pressable
              key={c.id}
              style={[styles.collectionCard, shadows.sm, { width: cardWidth + 40 }]}
              onPress={() => navigation.navigate('Collection', { collectionId: c.id })}
            >
              <Image source={{ uri: c.image }} style={styles.collectionImage} contentFit="cover" />
              <Text style={styles.collectionName}>{c.name}</Text>
            </Pressable>
          ))}
        </Animated.ScrollView>
      </View>

      <View style={styles.trustStrip}>
        <Text style={styles.trustTitle}>Authenticated pieces</Text>
        <Text style={styles.trustBody}>
          Multi-point inspection · Honest grading · Photographed as-is · Single unit
        </Text>
      </View>

      <View style={styles.section}>
        <SectionHeader eyebrow="Just In" title="New arrivals" />
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        >
          {(newArrivals.length ? newArrivals : featured).slice(0, 8).map((p) => (
            <View key={p.id} style={{ width: cardWidth, marginRight: spacing.md }}>
              <ProductCard product={p} onPress={openProduct} width={cardWidth} />
            </View>
          ))}
        </Animated.ScrollView>
        <Button
          title="View all new arrivals"
          variant="secondary"
          onPress={() => navigation.navigate('NewArrivals')}
          style={styles.ctaSecondary}
        />
        <Button title="Browse Catalogue" variant="ghost" onPress={() => goToShop(navigation)} />
        <Button title="About ARCHIVE" variant="ghost" onPress={() => navigation.navigate('About')} />
        <Button title="FAQ" variant="ghost" onPress={() => navigation.navigate('FAQ')} />
        <Button title="Consign with us" variant="ghost" onPress={() => navigation.navigate('Consign')} />
      </View>
    </Animated.ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bone,
  },
  content: {
    paddingBottom: spacing.huge,
  },
  brandBlock: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  logo: {
    ...typography.h1,
    letterSpacing: 4,
  },
  tagline: {
    ...typography.caption,
    marginTop: spacing.xs,
    color: colors.textMuted,
  },
  heroClip: {
    width: '100%',
    height: 320,
    overflow: 'hidden',
    backgroundColor: colors.neutral800,
  },
  heroInner: {
    width: '100%',
    height: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(24,21,16,0.45)',
    justifyContent: 'flex-end',
    padding: spacing.xl,
  },
  heroEyebrow: {
    ...typography.caption,
    color: colors.bone,
  },
  heroTitle: {
    ...typography.hero,
    color: colors.bone,
    fontSize: 36,
    lineHeight: 42,
  },
  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  cta: {
    marginBottom: spacing.md,
  },
  ctaSecondary: {
    marginBottom: spacing.sm,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  quickBtn: {
    minWidth: '28%',
  },
  collectionCard: {
    marginRight: spacing.md,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceCard,
  },
  collectionImage: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  collectionName: {
    ...typography.bodySmall,
    fontFamily: typography.button.fontFamily,
    padding: spacing.md,
  },
  trustStrip: {
    marginTop: spacing.xxl,
    marginHorizontal: spacing.xl,
    backgroundColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.xl,
  },
  trustTitle: {
    ...typography.h3,
    color: colors.bone,
  },
  trustBody: {
    ...typography.bodySmall,
    color: colors.stone,
    marginTop: spacing.sm,
  },
  carousel: {
    paddingRight: spacing.xl,
  },
});
