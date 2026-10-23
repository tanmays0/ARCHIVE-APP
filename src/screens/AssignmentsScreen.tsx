/**
 * ARCHIVE Mobile — Assignments demo helper for viva.
 * Lists each assignment with a one-line description and navigation button.
 */
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii, spacing, typography } from '../theme';
import { Button } from '../components/ui/Button';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Assignments'>;

type DemoTarget =
  | { kind: 'stack'; screen: keyof RootStackParamList }
  | { kind: 'tabs' };

interface AssignmentRow {
  id: string;
  title: string;
  blurb: string;
  target: DemoTarget;
}

const ASSIGNMENTS: AssignmentRow[] = [
  {
    id: '1',
    title: 'A1 · Project Setup',
    blurb: 'Expo Hello ARCHIVE boot screen on Android emulator.',
    target: { kind: 'stack', screen: 'HelloArchive' },
  },
  {
    id: '2',
    title: 'A2 · Comparative Study',
    blurb: 'Native vs Hybrid vs React Native for e-commerce.',
    target: { kind: 'stack', screen: 'TechInsights' },
  },
  {
    id: '3',
    title: 'A3 · Props & State',
    blurb: 'ProductCard, QuantityStepper, FilterChip, wishlist heart.',
    target: { kind: 'tabs' },
  },
  {
    id: '4',
    title: 'A4 · Structure & Reuse',
    blurb: 'Folder tree, shared UI kit, cart/wishlist state updates.',
    target: { kind: 'tabs' },
  },
  {
    id: '5',
    title: 'A5 · Customer Profile',
    blurb: 'View, Text, Image, TextInput, Button, Switch, ScrollView.',
    target: { kind: 'tabs' },
  },
  {
    id: '6',
    title: 'A6 · Responsive + Events',
    blurb: 'Checkout/Contact forms with validation Alerts.',
    target: { kind: 'stack', screen: 'Contact' },
  },
  {
    id: '7',
    title: 'A7 · Multi-Screen Nav',
    blurb: 'Stack navigation: Home, About, Contact.',
    target: { kind: 'stack', screen: 'About' },
  },
  {
    id: '8',
    title: 'A8 · Dynamic Data',
    blurb: 'Local JSON FlatList + FakeStore public API demo.',
    target: { kind: 'stack', screen: 'ApiDemo' },
  },
  {
    id: '9',
    title: 'A9 · Storefront',
    blurb: 'Home, About, Authenticity, Catalogue, Contact + Stack.',
    target: { kind: 'stack', screen: 'AuthenticityServices' },
  },
  {
    id: '10',
    title: 'A10 · Full Shopping App',
    blurb: 'Product, Cart, Checkout, Profile — complete flow.',
    target: { kind: 'tabs' },
  },
];

/**
 * Viva helper — jump to the screen that demonstrates each assignment.
 */
export function AssignmentsScreen({ navigation }: Props) {
  const go = (target: DemoTarget) => {
    if (target.kind === 'tabs') {
      navigation.navigate('MainTabs');
      return;
    }
    switch (target.screen) {
      case 'HelloArchive':
        navigation.navigate('HelloArchive');
        break;
      case 'TechInsights':
        navigation.navigate('TechInsights');
        break;
      case 'Contact':
        navigation.navigate('Contact');
        break;
      case 'About':
        navigation.navigate('About');
        break;
      case 'ApiDemo':
        navigation.navigate('ApiDemo');
        break;
      case 'AuthenticityServices':
        navigation.navigate('AuthenticityServices');
        break;
      case 'Assignments':
        navigation.navigate('Assignments');
        break;
      case 'MainTabs':
        navigation.navigate('MainTabs');
        break;
      case 'Checkout':
        navigation.navigate('Checkout');
        break;
      case 'ProductDetails':
      case 'OrderConfirmation':
        navigation.navigate('MainTabs');
        break;
      default: {
        const _exhaustive: never = target.screen;
        return _exhaustive;
      }
    }
  };

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={ASSIGNMENTS}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.intro}>
          Use these shortcuts during the viva to jump straight to each demonstration.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.blurb}>{item.blurb}</Text>
          <Button title="Show demo" onPress={() => go(item.target)} style={styles.btn} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  intro: { ...typography.bodySmall, marginBottom: spacing.xl },
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  title: { ...typography.h3, fontSize: 18 },
  blurb: { ...typography.bodySmall, marginVertical: spacing.sm },
  btn: { alignSelf: 'flex-start' },
});
