/**
 * ARCHIVE Mobile — Customer Profile (Assignment 5).
 * View, Text, Image, TextInput, Button, Switch, ScrollView, StyleSheet.
 */
import React, { useState } from 'react';
import {
  Alert,
  Button as RNButton,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing, typography } from '../theme';
import { useProfile } from '../context/ProfileContext';
import { formatMemberSince } from '../utils/format';
import { isValidEmail } from '../utils/validation';
import type { RootStackParamList } from '../navigation/types';

/**
 * Editable customer profile demonstrating core RN components.
 * [Assignment 5] Explicit use of View, Text, Image, TextInput, Button, Switch, ScrollView, StyleSheet.
 */
export function CustomerProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { profile, updateProfile, save } = useProfile();
  const [editing, setEditing] = useState(false);

  const onSave = async () => {
    if (!isValidEmail(profile.email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    await save();
    setEditing(false);
    Alert.alert('Saved', 'Your profile details were updated.');
  };

  return (
    // [Assignment 5] ScrollView
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {/* [Assignment 5] View + Image + Text */}
      <View style={styles.header}>
        <Image source={{ uri: profile.avatarUri }} style={styles.avatar} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.meta}>Member since {formatMemberSince(profile.memberSince)}</Text>
      </View>

      <Text style={styles.section}>Details</Text>
      {/* [Assignment 5] TextInput fields */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={profile.name}
        editable={editing}
        onChangeText={(name) => updateProfile({ name })}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={profile.email}
        editable={editing}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(email) => updateProfile({ email })}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={profile.phone}
        editable={editing}
        keyboardType="phone-pad"
        onChangeText={(phone) => updateProfile({ phone })}
      />
      <Text style={styles.label}>Delivery address</Text>
      <TextInput
        style={styles.input}
        value={profile.address}
        editable={editing}
        onChangeText={(address) => updateProfile({ address })}
      />
      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        value={profile.city}
        editable={editing}
        onChangeText={(city) => updateProfile({ city })}
      />

      <Text style={styles.section}>Preferences</Text>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Order notifications</Text>
        {/* [Assignment 5] Switch */}
        <Switch
          value={profile.orderNotifications}
          onValueChange={(orderNotifications) => updateProfile({ orderNotifications })}
          trackColor={{ true: colors.clay, false: colors.stone }}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Newsletter</Text>
        <Switch
          value={profile.newsletter}
          onValueChange={(newsletter) => updateProfile({ newsletter })}
          trackColor={{ true: colors.clay, false: colors.stone }}
        />
      </View>

      {/* [Assignment 5] Button (React Native core Button) */}
      <View style={styles.btnWrap}>
        {editing ? (
          <RNButton title="Save profile" color={colors.clay} onPress={onSave} />
        ) : (
          <RNButton title="Edit profile" color={colors.ink} onPress={() => setEditing(true)} />
        )}
      </View>
      <View style={styles.btnWrap}>
        <RNButton
          title="Assignments demo helper"
          color={colors.olive}
          onPress={() => navigation.navigate('Assignments')}
        />
      </View>
      <View style={styles.btnWrap}>
        <RNButton
          title="Tech Insights (A2)"
          color={colors.denim}
          onPress={() => navigation.navigate('TechInsights')}
        />
      </View>
      <View style={styles.btnWrap}>
        <RNButton
          title="Contact support"
          color={colors.clay}
          onPress={() => navigation.navigate('Contact')}
        />
      </View>
    </ScrollView>
  );
}

/* [Assignment 5] StyleSheet */
const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: radii.full,
    marginBottom: spacing.md,
    backgroundColor: colors.neutral200,
  },
  name: { ...typography.h2 },
  meta: { ...typography.caption, marginTop: spacing.xs },
  section: { ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.md },
  label: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.xs },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.surfaceCard,
    color: colors.textPrimary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  switchLabel: { ...typography.body },
  btnWrap: { marginBottom: spacing.md },
});
