import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { EmptyState } from '../components/ui/EmptyState';
import { useProfile } from '../context/ProfileContext';

const SAMPLE = [
  {
    id: '1',
    title: 'Order update',
    body: 'Your authenticated piece is being prepared for dispatch.',
    time: '2h ago',
  },
  {
    id: '2',
    title: 'New arrivals',
    body: 'Fresh drops in The Air Index and City Uniform.',
    time: '1d ago',
  },
  {
    id: '3',
    title: 'Returns reminder',
    body: 'You have 8 days left on your as-described return window.',
    time: '3d ago',
  },
];

export function NotificationsScreen() {
  const { profile } = useProfile();

  if (!profile.orderNotifications) {
    return (
      <EmptyState
        title="Notifications paused"
        message="Turn on order notifications in Profile to see updates here."
      />
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={SAMPLE}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      )}
    />
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
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  title: { ...typography.body, fontFamily: typography.button.fontFamily },
  time: { ...typography.caption },
  body: { ...typography.bodySmall },
});
