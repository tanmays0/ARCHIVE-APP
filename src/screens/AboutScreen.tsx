import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing, typography } from '../theme';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import type { RootStackParamList } from '../navigation/types';
const JOURNEY = [
  {
    year: '2019',
    title: 'Founded',
    body: 'ARCHIVE begins as a small curated rack of authenticated sportswear.',
  },
  {
    year: '2021',
    title: 'First rack expands',
    body: 'Workwear and outerwear join the edit — still one of one.',
  },
  {
    year: '2023',
    title: 'Auth lab',
    body: 'Multi-point inspection process formalised; Authenticated badge launches.',
  },
  {
    year: '2025',
    title: 'Showroom',
    body: 'Editorial catalogue and showroom collection appointments open.',
  },
  {
    year: '2026',
    title: 'Today',
    body: 'Cross-platform ARCHIVE — fewer, better things, kept in circulation.',
  },
];
export function AboutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionHeader
        eyebrow="Our Story"
        title="Independent. Curated. Verified."
        subtitle="ARCHIVE is an independent, curated marketplace for authenticated vintage and pre-loved fashion. We source characterful pieces across sportswear, workwear, and outerwear, then grade, photograph, and list each one individually."
      />

      <View style={styles.block}>
        <Text style={styles.heading}>Mission</Text>
        <Text style={styles.body}>
          Keep exceptional pieces in circulation — inspected, graded honestly, and ready for their
          next chapter.
        </Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.heading}>Vision</Text>
        <Text style={styles.body}>
          A world where buying pre-loved is the default: transparent, trusted, and editorially
          considered.
        </Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.heading}>Sourcing & authentication</Text>
        <Text style={styles.body}>
          Every item passes a multi-point inspection — construction, materials, hardware, labeling,
          and wear — before it is marked Authenticated. If we cannot verify it, we will not list it.
        </Text>
      </View>

      <SectionHeader eyebrow="Timeline" title="Our Journey" />
      {JOURNEY.map((step) => (
        <View key={step.year} style={styles.timelineItem}>
          <Text style={styles.year}>{step.year}</Text>
          <View style={styles.timelineBody}>
            <Text style={styles.timelineTitle}>{step.title}</Text>
            <Text style={styles.body}>{step.body}</Text>
          </View>
        </View>
      ))}

      <Button
        title="Authenticity & Services"
        onPress={() => navigation.navigate('AuthenticityServices')}
        style={styles.btn}
      />
      <Button
        title="Contact Us"
        variant="secondary"
        onPress={() => navigation.navigate('Contact')}
        style={styles.btn}
      />
      <Button title="FAQ" variant="ghost" onPress={() => navigation.navigate('FAQ')} />
      <Button
        title="How we build"
        variant="ghost"
        onPress={() => navigation.navigate('TechInsights')}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  block: { marginBottom: spacing.xl },
  heading: { ...typography.h3, marginBottom: spacing.sm },
  body: { ...typography.body, color: colors.textSecondary },
  timelineItem: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  year: {
    ...typography.caption,
    color: colors.clay,
    width: 48,
  },
  timelineBody: { flex: 1 },
  timelineTitle: {
    ...typography.body,
    fontFamily: typography.button.fontFamily,
    marginBottom: spacing.xs,
  },
  btn: { marginBottom: spacing.md, borderRadius: radii.md },
});
