/**
 * ARCHIVE Mobile — Checkout form with validation + Switches.
 * [Assignment 6 / 10] TextInput, Switch, Button, Alert.
 */
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useCart } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';
import { formatPrice } from '../utils/format';
import { validateCheckoutFields } from '../utils/validation';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

/**
 * Shipping form + order summary + place order.
 */
export function CheckoutScreen({ navigation }: Props) {
  const { subtotal, itemCount, clearCart, getLineProducts } = useCart();
  const { profile, updateProfile } = useProfile();

  const [fullName, setFullName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [city, setCity] = useState(profile.city);
  const [postalCode, setPostalCode] = useState(profile.postalCode);
  const [giftWrap, setGiftWrap] = useState(false);
  const [saveDetails, setSaveDetails] = useState(true);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (itemCount === 0) {
      Alert.alert('Cart empty', 'Add pieces before checking out.');
      navigation.goBack();
    }
  }, [itemCount, navigation]);

  const giftFee = giftWrap ? 5 : 0;
  const total = subtotal + giftFee;
  const lines = getLineProducts();

  const onPlaceOrder = () => {
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
      Alert.alert('Check shipping details', firstError);
      return;
    }

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

    const orderId = `AR-${Date.now().toString().slice(-6)}`;
    clearCart();
    // [Assignment 6] Alert on success
    Alert.alert('Order placed', `Your order ${orderId} is confirmed.`, [
      {
        text: 'View confirmation',
        onPress: () => navigation.replace('OrderConfirmation', { orderId }),
      },
    ]);
  };

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
        label="Postal code"
        value={postalCode}
        onChangeText={setPostalCode}
        error={errors.postalCode}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Gift wrap (+$5)</Text>
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

      <Button title="Place order" onPress={onPlaceOrder} style={styles.cta} />
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
