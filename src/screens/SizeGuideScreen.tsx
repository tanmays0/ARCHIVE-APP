import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { SectionHeader } from '../components/ui/SectionHeader';

const ROWS = [
  { label: 'XS', chest: '86–91', waist: '71–76' },
  { label: 'S', chest: '91–96', waist: '76–81' },
  { label: 'M', chest: '96–102', waist: '81–86' },
  { label: 'L', chest: '102–107', waist: '86–91' },
  { label: 'XL', chest: '107–112', waist: '91–97' },
];

export function SizeGuideScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionHeader
        eyebrow="Fit"
        title="Size guide"
        subtitle="Apparel measurements in centimetres. Footwear uses US sizes as listed on each piece."
      />
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>Size</Text>
          <Text style={[styles.cell, styles.headerCell]}>Chest</Text>
          <Text style={[styles.cell, styles.headerCell]}>Waist</Text>
        </View>
        {ROWS.map((row) => (
          <View key={row.label} style={styles.row}>
            <Text style={styles.cell}>{row.label}</Text>
            <Text style={styles.cell}>{row.chest}</Text>
            <Text style={styles.cell}>{row.waist}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.note}>
        Vintage pieces can vary by brand and era. Prefer the measurements and photos on the product
        page when choosing a size.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  table: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceCard,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  headerRow: { backgroundColor: colors.surfaceSecondary },
  cell: {
    ...typography.bodySmall,
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    textAlign: 'center',
  },
  headerCell: { fontFamily: typography.button.fontFamily, color: colors.ink },
  note: { ...typography.bodySmall, marginTop: spacing.xl },
});
