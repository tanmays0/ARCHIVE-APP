import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { SectionHeader } from '../components/ui/SectionHeader';

export interface PolicySection {
  heading: string;
  body: string;
}

export function PolicyScreen({
  eyebrow,
  title,
  subtitle,
  sections,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  sections: PolicySection[];
}) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      {sections.map((section) => (
        <React.Fragment key={section.heading}>
          <Text style={styles.heading}>{section.heading}</Text>
          <Text style={styles.body}>{section.body}</Text>
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  heading: { ...typography.h3, marginTop: spacing.xl, marginBottom: spacing.sm },
  body: { ...typography.body, color: colors.textSecondary },
});
