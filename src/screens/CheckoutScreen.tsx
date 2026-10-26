import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useCart } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';
import { createOrderId, formatPrice } from '../utils/format';
import { validateCheckoutFields } from '../utils/validation';
import { notify } from '../utils/notify';
import type { Order, OrderLine } from '../types';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

const GIFT_WRAP_FEE = 400;

function buildOrder(input: {
  orderId: string;
  subtotal: number;
  giftWrap: boolean;
  total: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  lines: OrderLine[];
}): Order {
  return {
    id: input.orderId,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
    subtotal: input.subtotal,
    giftWrap: input.giftWrap,
    total: input.total,
    shippingName: input.fullName,
    shippingAddress: input.address,
    shippingCity: input.city,
    shippingPostal: input.postalCode,
    email: input.email,
    phone: input.phone,
    lines: input.lines,
  };
}

export function CheckoutScreen({ navigation }: Props) {
  const { subtotal, itemCount, clearCart, getLineProducts } = useCart();
  const { profile, updateProfile } = useProfile();
  const { addOrder } = useOrders();
  const { isAuthenticated, user } = useAuth();
  const placingRef = useRef(false);
  const [fullName, setFullName] = useState(profile.name || user?.name || '');
  const [email, setEmail] = useState(profile.email || user?.email || '');
  const [phone, setPhone] = useState(profile.phone || user?.phone || '');
  const [address, setAddress] = useState(profile.address);
  const [city, setCity] = useState(profile.city);
  const [postalCode, setPostalCode] = useState(profile.postalCode);
  const [giftWrap, setGiftWrap] = useState(false);
  const [saveDetails, setSaveDetails] = useState(true);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      notify('Sign in required', 'Create an account or sign in to place an order. Your cart is saved.');
      navigation.replace('Login', { redirectToCheckout: true });
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (placingRef.current) return;
    if (itemCount === 0) {
      notify('Cart empty', 'Add pieces before checking out.');
      navigation.goBack();
    }
  }, [itemCount, navigation]);

  const giftFee = giftWrap ? GIFT_WRAP_FEE : 0;
  const total = subtotal + giftFee;
  const lines = getLineProducts();

  const onPlaceOrder = () => {
    if (!isAuthenticated) {
      navigation.replace('Login', { redirectToCheckout: true });
      return;
    }
    const next = validateCheckoutFields({
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
    });
    setErrors(next);
    const firstError = Object.values(next).find(Boolean);
    if (firstError) {
      notify('Check shipping details', firstError);
      return;
    }
    if (lines.length === 0) {
      notify('Cart empty', 'Add pieces before checking out.');
      return;
    }

    placingRef.current = true;
    setSubmitting(true);

    if (saveDetails) {
      updateProfile({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
      });
    }

    const orderId = createOrderId();
    const orderLines: OrderLine[] = lines.map((l) => ({
      productId: l.productId,
      name: l.product.name,
      brand: l.product.brand,
      size: l.size,
      quantity: l.quantity,
      unitPrice: l.product.price,
      image: l.product.images[0],
    }));
    const order = buildOrder({
      orderId,
      subtotal,
      giftWrap,
      total,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      lines: orderLines,
    });

    try {
      addOrder(order);
      clearCart();
      navigation.replace('OrderConfirmation', { orderId });
      notify('Order placed', `Order ${orderId} confirmed. Thank you for shopping ARCHIVE.`);
    } catch {
      placingRef.current = false;
      setSubmitting(false);
      notify('Order failed', 'Something went wrong while placing your order. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return <View style={styles.screen} />;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <SectionHeader
        eyebrow="Checkout"
        title="Shipping details"
        subtitle={`${itemCount} item(s) · Subtotal ${formatPrice(subtotal)}`}
      />

      <Input label="Full name" value={fullName} onChangeText={setFullName} error={errors.fullName} />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      <Input
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        error={errors.phone}
      />
      <Input label="Address" value={address} onChangeText={setAddress} error={errors.address} />
      <Input label="City" value={city} onChangeText={setCity} error={errors.city} />
      <Input
        label="PIN code"
        value={postalCode}
        onChangeText={setPostalCode}
        error={errors.postalCode}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Gift wrap (+{formatPrice(GIFT_WRAP_FEE)})</Text>
        <Switch
          value={giftWrap}
          onValueChange={setGiftWrap}
          trackColor={{ true: colors.clay, false: colors.stone }}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Save my details</Text>
        <Switch
          value={saveDetails}
          onValueChange={setSaveDetails}
          trackColor={{ true: colors.clay, false: colors.stone }}
        />
      </View>

      <Text style={styles.summaryTitle}>Order summary</Text>
      {lines.map((l) => (
        <Text key={`${l.productId}-${l.size}`} style={styles.summaryLine}>
          {l.product.name} · {l.size} × {l.quantity} — {formatPrice(l.product.price * l.quantity)}
        </Text>
      ))}
      <Text style={styles.total}>Total {formatPrice(total)}</Text>

      <Button
        title="Place order"
        onPress={onPlaceOrder}
        loading={submitting}
        style={styles.cta}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  switchLabel: { ...typography.body },
  summaryTitle: { ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.sm },
  summaryLine: { ...typography.bodySmall, marginBottom: spacing.xs },
  total: { ...typography.price, marginTop: spacing.md },
  cta: { marginTop: spacing.xl },
});
