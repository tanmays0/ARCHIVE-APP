import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing, typography } from '../theme';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/format';
import { safeImageUri } from '../utils/imageUri';
import { notify } from '../utils/notify';
import { goToShop } from '../navigation/nav';
import type { RootStackParamList } from '../navigation/types';

export function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { getLineProducts, setQuantity, removeItem, subtotal, itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const lines = getLineProducts();

  const onCheckout = () => {
    if (!isAuthenticated) {
      notify('Sign in to checkout', 'You can keep items in your cart. Sign in or create an account to place an order.', [
        { text: 'Not now', style: 'cancel' },
        { text: 'Sign in', onPress: () => navigation.navigate('Login', { redirectToCheckout: true }) },
        {
          text: 'Create account',
          onPress: () => navigation.navigate('Register', { redirectToCheckout: true }),
        },
      ]);
      return;
    }
    navigation.navigate('Checkout');
  };

  if (itemCount === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Browse the catalogue for authenticated pieces."
        actionLabel="Shop the Archive"
        onAction={() => goToShop(navigation)}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <FlatList
        data={lines}
        keyExtractor={(item) => `${item.productId}-${item.size}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image
              source={{ uri: safeImageUri(item.product.images[0]) }}
              style={styles.thumb}
              contentFit="cover"
            />
            <View style={styles.meta}>
              <Text style={styles.name} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.size}>Size {item.size}</Text>
              <Text style={styles.price}>{formatPrice(item.product.price)}</Text>
              <QuantityStepper
                value={item.quantity}
                onChange={(q) => setQuantity(item.productId, item.size, q)}
              />
              <Pressable
                onPress={() => {
                  removeItem(item.productId, item.size);
                  notify('Removed from cart', `${item.product.name} was removed.`);
                }}
              >
                <Text style={styles.remove}>Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>{formatPrice(subtotal)}</Text>
        </View>
        {!isAuthenticated ? (
          <Text style={styles.authHint}>Sign in required to place an order — cart stays saved.</Text>
        ) : null}
        <Button title="Checkout" onPress={onCheckout} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  list: { padding: spacing.xl, paddingBottom: spacing.huge },
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  thumb: { width: 88, height: 88, borderRadius: radii.md },
  meta: { flex: 1, gap: spacing.xs },
  name: { ...typography.body, fontFamily: typography.button.fontFamily },
  size: { ...typography.caption, textTransform: 'none' },
  price: { ...typography.price, fontSize: 16 },
  remove: { ...typography.bodySmall, color: colors.error, marginTop: spacing.xs },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    padding: spacing.xl,
    backgroundColor: colors.bone,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  subtotalLabel: { ...typography.body },
  subtotalValue: { ...typography.price },
  authHint: {
    ...typography.caption,
    color: colors.clay,
    marginBottom: spacing.md,
    textTransform: 'none',
    letterSpacing: 0,
  },
});
