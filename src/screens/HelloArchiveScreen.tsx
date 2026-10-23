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
      <Text style={styles.eyebrow}>Assignment 1 · Expo Setup</Text>
      <Text style={styles.title}>Hello ARCHIVE</Text>
      <Text style={styles.body}>
        Curated vintage & pre-loved fashion. One of one, verified, and ready for its next chapter.
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
  title: {
    ...typography.hero,
    textAlign: 'center',
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
