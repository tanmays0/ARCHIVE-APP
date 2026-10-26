import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, typography } from '../theme';
import { Button } from '../components/ui/Button';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'HelloArchive'>;

export function HelloArchiveScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.eyebrow}>Vintage, Verified</Text>
      <Text style={styles.logo}>ARCHIVE</Text>
      <Text style={styles.title}>One of one.{'\n'}Authenticated.</Text>
      <Text style={styles.body}>
        A curated marketplace for pre-loved fashion — inspected, graded, and ready for its next
        chapter.
      </Text>
      <Button
        title="Enter the Archive"
        onPress={() => navigation.replace('MainTabs')}
        style={styles.cta}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bone,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.clay,
    marginBottom: spacing.md,
  },
  logo: {
    ...typography.h1,
    letterSpacing: 6,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.hero,
    textAlign: 'center',
    fontSize: 34,
    lineHeight: 40,
  },
  body: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: spacing.lg,
    maxWidth: 320,
  },
  cta: {
    marginTop: spacing.xxl,
    minWidth: '70%',
  },
});
