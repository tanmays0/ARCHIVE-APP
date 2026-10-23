import React, { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii, spacing, typography } from '../theme';
import { Badge } from '../components/ui/Badge';
import { PriceTag } from '../components/ui/PriceTag';
import { Button } from '../components/ui/Button';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { goToCart } from '../navigation/nav';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export function ProductDetailsScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const { getById } = useProducts();
  const product = getById(productId);
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const { width } = useWindowDimensions();
  const [size, setSize] = useState(product?.sizes[0] ?? '');
  const [qty, setQty] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const wished = product ? isWishlisted(product.id) : false;
  const images = useMemo(() => product?.images ?? [], [product]);
  if (!product) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Piece not found.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  const onAdd = () => {
    if (!size) {
      Alert.alert('Select a size', 'Please choose a size before adding to cart.');
      return;
    }
    addItem(product.id, size, qty);
    Alert.alert('Added to cart', `${product.name} (${size}) × ${qty}`, [
      { text: 'Keep browsing', style: 'cancel' },
      { text: 'View cart', onPress: () => goToCart(navigation) },
    ]);
  };
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setImageIndex(i);
        }}
      >
        {images.map((uri) => (
          <Image
            key={uri}
            source={{ uri }}
            style={{ width, height: width * 0.9 }}
            contentFit="cover"
          />
        ))}
      </ScrollView>
      <Text style={styles.dots}>
        {images.map((_, i) => (i === imageIndex ? '●' : '○')).join(' ')}
      </Text>

      <View style={styles.body}>
        <View style={styles.rowBetween}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Pressable onPress={() => toggle(product.id)} hitSlop={8}>
            <Text style={styles.heart}>{wished ? '♥ Wishlisted' : '♡ Wishlist'}</Text>
          </Pressable>
        </View>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.badges}>
          {product.authenticated ? <Badge label="Authenticated" tone="olive" /> : null}
          <Badge label={product.condition} tone="ink" />
          {product.era ? <Badge label={product.era} tone="clay" /> : null}
        </View>
        <PriceTag
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          currency={product.currency}
        />
        <Text style={styles.description}>{product.description}</Text>
        <Button
          title="Size guide"
          variant="ghost"
          onPress={() => navigation.navigate('SizeGuide')}
        />

        <Text style={styles.label}>Size</Text>
        <View style={styles.sizes}>
          {product.sizes.map((s) => (
            <Pressable
              key={s}
              onPress={() => setSize(s)}
              style={[styles.sizeChip, size === s && styles.sizeActive]}
            >
              <Text style={[styles.sizeText, size === s && styles.sizeTextActive]}>{s}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Quantity</Text>
        <QuantityStepper value={qty} onChange={setQty} />

        <Button title="Add to cart" onPress={onAdd} style={styles.cta} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { paddingBottom: spacing.huge },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bone,
    gap: spacing.lg,
  },
  missingText: { ...typography.body },
  dots: {
    textAlign: 'center',
    color: colors.textMuted,
    marginVertical: spacing.sm,
  },
  body: { paddingHorizontal: spacing.xl, gap: spacing.sm },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: { ...typography.caption },
  heart: { ...typography.bodySmall, color: colors.clay },
  name: { ...typography.h2 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  description: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  label: { ...typography.caption, marginTop: spacing.lg },
  sizes: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  sizeChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceCard,
  },
  sizeActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  sizeText: { ...typography.bodySmall },
  sizeTextActive: { color: colors.textInverse },
  cta: { marginTop: spacing.xl },
});
