import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii, spacing, typography } from '../theme';
import { Button } from '../components/ui/Button';
import { useOrders } from '../context/OrdersContext';
import { formatPrice } from '../utils/format';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>;

export function OrderDetailScreen({ route, navigation }: Props) {
  const { getById } = useOrders();
  const order = getById(route.params.orderId);

  if (!order) {
    return (
      <View style={styles.missing}>
        <Text style={styles.body}>Order not found.</Text>
        <Button title="Back to orders" onPress={() => navigation.navigate('Orders')} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.id}>{order.id}</Text>
      <Text style={styles.status}>{order.status}</Text>
      <Text style={styles.meta}>
        Placed{' '}
        {new Date(order.createdAt).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>

      <Text style={styles.section}>Items</Text>
      {order.lines.map((line) => (
        <View key={`${line.productId}-${line.size}`} style={styles.line}>
          <Image source={{ uri: line.image }} style={styles.thumb} />
          <View style={styles.lineMeta}>
            <Text style={styles.lineName}>{line.name}</Text>
            <Text style={styles.meta}>
              {line.brand} · Size {line.size} · Qty {line.quantity}
            </Text>
            <Text style={styles.price}>{formatPrice(line.unitPrice * line.quantity)}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.section}>Shipping</Text>
      <Text style={styles.body}>{order.shippingName}</Text>
      <Text style={styles.body}>{order.shippingAddress}</Text>
      <Text style={styles.body}>
        {order.shippingCity} {order.shippingPostal}
      </Text>
      <Text style={styles.body}>{order.email}</Text>
      <Text style={styles.body}>{order.phone}</Text>

      <Text style={styles.section}>Total</Text>
      <Text style={styles.body}>Subtotal {formatPrice(order.subtotal)}</Text>
      {order.giftWrap ? <Text style={styles.body}>Gift wrap ₹400</Text> : null}
      <Text style={styles.total}>{formatPrice(order.total)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  missing: {
    flex: 1,
    backgroundColor: colors.bone,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  id: { ...typography.h2 },
  status: { ...typography.caption, color: colors.olive, marginTop: spacing.xs },
  meta: { ...typography.bodySmall, marginTop: spacing.xs },
  section: { ...typography.h3, marginTop: spacing.xl, marginBottom: spacing.md },
  line: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  thumb: { width: 64, height: 64, borderRadius: radii.md },
  lineMeta: { flex: 1 },
  lineName: { ...typography.body, fontFamily: typography.button.fontFamily },
  body: { ...typography.body, color: colors.textSecondary },
  price: { ...typography.price, fontSize: 15, marginTop: spacing.xs },
  total: { ...typography.price, marginTop: spacing.sm },
});
