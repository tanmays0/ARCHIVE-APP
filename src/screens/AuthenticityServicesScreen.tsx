/**
 * ARCHIVE Mobile — Authenticity & Services.
 * [Assignment 9 / 10] Craft + Customer promise groups.
 */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { SectionHeader } from '../components/ui/SectionHeader';

const CRAFT = [
  {
    title: 'Authentication',
    body: 'Multi-point inspection of construction, materials, hardware, labeling, and wear.',
  },
  {
    title: 'Condition grading',
    body: 'Honest grades: Like New, Excellent, Good, or Fair — flaws and patina included.',
  },
  {
    title: 'Curation',
    body: 'Editorial selection across sportswear, workwear, and outerwear — fewer, better things.',
  },
  {
    title: 'Restoration',
    body: 'Select pieces receive careful cleaning and minor restoration before listing.',
  },
  {
    title: 'Photography',
    body: 'Real, unretouched photography of the actual item you will receive.',
  },
];

const PROMISE = [
  {
    title: 'Sustainability',
    body: 'Circular by default — resale keeps pieces out of landfill.',
  },
  {
    title: 'Transparent pricing',
    body: 'Clear prices with compare-at when relevant; no opaque markdown games.',
  },
  {
    title: 'Returns',
    body: '14-day as-described guarantee. Authentication tags must stay attached.',
  },
  {
    title: 'Customer care',
    body: 'help@archive.market — human replies within one business day.',
  },
  {
    title: 'Storytelling',
    body: 'Every listing carries era, condition notes, and the piece’s next-chapter narrative.',
  },
];

/**
 * Two service groups: Craft and Customer promise.
 */
export function AuthenticityServicesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionHeader
        eyebrow="Guarantees"
        title="What ARCHIVE stands behind"
        subtitle="If we cannot verify a piece, we will not list it."
      />

      <Text style={styles.groupTitle}>Craft</Text>
      {CRAFT.map((item) => (
        <View key={item.title} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </View>
      ))}

      <Text style={styles.groupTitle}>Customer promise</Text>
      {PROMISE.map((item) => (
        <View key={item.title} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  groupTitle: {
    ...typography.h2,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  cardTitle: {
    ...typography.body,
    fontFamily: typography.button.fontFamily,
    marginBottom: spacing.xs,
  },
  cardBody: { ...typography.bodySmall },
});
