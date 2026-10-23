import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii, spacing, typography } from '../theme';
import { EmptyState } from '../components/ui/EmptyState';
import { useOrders } from '../context/OrdersContext';
import { formatPrice } from '../utils/format';
import { goToShop } from '../navigation/nav';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Orders'>;

export function OrdersScreen({ navigation }: Props) {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        message="When you place an order, it will appear here."
        actionLabel="Shop the Archive"
        onAction={() => goToShop(navigation)}
      />
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
        >
          <View style={styles.row}>
            <Text style={styles.id}>{item.id}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
          <Text style={styles.meta}>
            {new Date(item.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}{' '}
            · {item.lines.length} item(s)
          </Text>
          <Text style={styles.total}>{formatPrice(item.total)}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  id: { ...typography.body, fontFamily: typography.button.fontFamily },
  status: { ...typography.caption, color: colors.olive, textTransform: 'capitalize' },
  meta: { ...typography.bodySmall, marginBottom: spacing.sm },
  total: { ...typography.price, fontSize: 16 },
});
