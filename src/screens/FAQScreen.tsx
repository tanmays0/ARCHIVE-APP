import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const FAQS = [
  {
    q: 'Are items authentic?',
    a: 'Yes. Every piece passes a multi-point inspection. Items that pass carry an Authenticated badge.',
  },
  {
    q: 'How is condition graded?',
    a: 'Like New, Excellent, Good, or Fair — with honest notes and unretouched photography.',
  },
  {
    q: 'What is your returns policy?',
    a: '14-day as-described guarantee. Authentication tags must stay attached. See Returns for details.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes. Standard delivery typically takes 3–7 business days depending on location.',
  },
  {
    q: 'Can I consign pieces?',
    a: 'We selectively accept characterful sportswear, workwear, and outerwear. Open Consign to enquire.',
  },
];

export function FAQScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionHeader
        eyebrow="Help"
        title="Frequently asked questions"
        subtitle="Quick answers about authenticity, shipping, and returns."
      />
      {FAQS.map((item) => (
        <View key={item.q} style={styles.card}>
          <Text style={styles.q}>{item.q}</Text>
          <Text style={styles.a}>{item.a}</Text>
        </View>
      ))}
      <Button title="Contact support" onPress={() => navigation.navigate('Contact')} />
      <Button
        title="Returns policy"
        variant="secondary"
        onPress={() => navigation.navigate('ReturnsPolicy')}
        style={styles.btn}
      />
    </ScrollView>
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
  q: { ...typography.body, fontFamily: typography.button.fontFamily, marginBottom: spacing.xs },
  a: { ...typography.bodySmall },
  btn: { marginTop: spacing.md },
});
