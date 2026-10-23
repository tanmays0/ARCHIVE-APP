import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { SectionHeader } from '../components/ui/SectionHeader';
const ROWS: {
  aspect: string;
  native: string;
  hybrid: string;
  rn: string;
}[] = [
  {
    aspect: 'Performance',
    native: 'Highest — platform SDKs',
    hybrid: 'WebView-bound',
    rn: 'Near-native via bridge / JSI',
  },
  {
    aspect: 'UI fidelity',
    native: 'Full platform look',
    hybrid: 'Web CSS in shell',
    rn: 'Native widgets + Flexbox',
  },
  {
    aspect: 'Code reuse',
    native: 'Separate iOS/Android',
    hybrid: 'One web codebase',
    rn: 'Shared JS/TS + native modules',
  },
  {
    aspect: 'Time to market',
    native: 'Slowest (two apps)',
    hybrid: 'Fast for content apps',
    rn: 'Fast for product UIs',
  },
  {
    aspect: 'Offline cart',
    native: 'Straightforward',
    hybrid: 'Needs careful caching',
    rn: 'AsyncStorage / SQLite easy',
  },
  {
    aspect: 'Checkout security',
    native: 'Platform keychain / biometrics',
    hybrid: 'Depends on WebView TLS',
    rn: 'Native modules + secure storage',
  },
  {
    aspect: 'Catalogue lists',
    native: 'RecyclerView / UITableView',
    hybrid: 'DOM scroll cost',
    rn: 'FlatList virtualisation',
  },
];
export function TechInsightsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionHeader
        eyebrow="Assignment 2"
        title="Native · Hybrid · React Native"
        subtitle="Which approach fits an authenticated fashion marketplace like ARCHIVE?"
      />

      <Text style={styles.verdict}>
        Verdict for ARCHIVE: React Native (Expo) balances catalogue performance, shared TypeScript,
        offline cart persistence, and time-to-market for a university storefront — without giving up
        native navigation and FlatList virtualisation.
      </Text>

      {ROWS.map((row) => (
        <View key={row.aspect} style={styles.card}>
          <Text style={styles.aspect}>{row.aspect}</Text>
          <Text style={styles.cell}>
            <Text style={styles.bold}>Native: </Text>
            {row.native}
          </Text>
          <Text style={styles.cell}>
            <Text style={styles.bold}>Hybrid: </Text>
            {row.hybrid}
          </Text>
          <Text style={styles.cell}>
            <Text style={styles.bold}>React Native: </Text>
            {row.rn}
          </Text>
        </View>
      ))}

      <Text style={styles.footer}>Full write-up: docs/ASSIGNMENT_2_Comparative_Study.md</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  verdict: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  aspect: { ...typography.h3, marginBottom: spacing.sm, fontSize: 18 },
  cell: { ...typography.bodySmall, marginBottom: spacing.xs },
  bold: { fontFamily: typography.button.fontFamily, color: colors.ink },
  footer: { ...typography.caption, marginTop: spacing.xl },
});
