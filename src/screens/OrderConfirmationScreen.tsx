/**
 * ARCHIVE Mobile — Order confirmation after successful checkout.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme';
import { Button } from '../components/ui/Button';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmation'>;

/**
 * Success screen with order ID and return-to-shop CTA.
 */
export function OrderConfirmationScreen({ route, navigation }: Props) {
  const { orderId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Thank you</Text>
      <Text style={styles.title}>Order confirmed</Text>
      <Text style={styles.body}>
        Your authenticated pieces are being prepared. Order reference:
      </Text>
      <Text style={styles.orderId}>{orderId}</Text>
      <Button
        title="Continue shopping"
        onPress={() => navigation.navigate('MainTabs')}
        style={styles.cta}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bone,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  eyebrow: { ...typography.caption, color: colors.clay },
  title: { ...typography.h1, marginVertical: spacing.md },
  body: { ...typography.body, color: colors.textSecondary },
  orderId: {
    ...typography.h2,
    marginTop: spacing.lg,
    color: colors.olive,
  },
  cta: { marginTop: spacing.xxl },
});
