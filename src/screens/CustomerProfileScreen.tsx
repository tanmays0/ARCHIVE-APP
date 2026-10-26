import React, { useState } from 'react';
import {
  Button,
  Image,
  Pressable,
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
import { useAuth } from '../context/AuthContext';
import { formatMemberSince } from '../utils/format';
import { isValidEmail } from '../utils/validation';
import { notify } from '../utils/notify';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type NavItem = {
  label: string;
  route: keyof RootStackParamList;
};

const ACCOUNT: NavItem[] = [
  { label: 'Wishlist', route: 'Wishlist' },
  { label: 'Orders', route: 'Orders' },
  { label: 'Notifications', route: 'Notifications' },
];

const SHOP: NavItem[] = [
  { label: 'New arrivals', route: 'NewArrivals' },
  { label: 'Sale', route: 'Sale' },
  { label: 'Size guide', route: 'SizeGuide' },
  { label: 'Consign with us', route: 'Consign' },
  { label: 'Discover more', route: 'ApiDemo' },
];

const HELP: NavItem[] = [
  { label: 'FAQ', route: 'FAQ' },
  { label: 'Shipping', route: 'ShippingPolicy' },
  { label: 'Returns', route: 'ReturnsPolicy' },
  { label: 'Contact support', route: 'Contact' },
  { label: 'Privacy', route: 'PrivacyPolicy' },
  { label: 'Terms', route: 'TermsOfService' },
];

const HOUSE: NavItem[] = [
  { label: 'About ARCHIVE', route: 'About' },
  { label: 'Authenticity & services', route: 'AuthenticityServices' },
  { label: 'How we build', route: 'TechInsights' },
];

export function CustomerProfileScreen() {
  const navigation = useNavigation<Nav>();
  const { profile, updateProfile, save, clearForGuest } = useProfile();
  const { isAuthenticated, user, logout } = useAuth();
  const [editing, setEditing] = useState(false);

  const onSave = async () => {
    if (!isValidEmail(profile.email)) {
      notify('Invalid email', 'Please enter a valid email address.');
      return;
    }
    await save();
    setEditing(false);
    notify('Profile saved', 'Your details were updated.');
  };

  const onLogout = async () => {
    await logout();
    await clearForGuest();
    setEditing(false);
  };

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <View style={styles.group} key={title}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.navCard}>
        {items.map((item, index) => (
          <Pressable
            key={item.route}
            style={[styles.navRow, index < items.length - 1 && styles.navRowBorder]}
            onPress={() => navigation.navigate(item.route as never)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <Text style={styles.navLabel}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  if (!isAuthenticated) {
    return (
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image source={profile.avatarSource} style={styles.avatar} />
          <Text style={styles.name}>Guest</Text>
          <Text style={styles.meta}>Sign in to place orders and sync your profile.</Text>
        </View>

        <View style={styles.guestCard}>
          <Text style={styles.guestBody}>
            You can browse and add pieces to your cart without an account. Checkout requires sign
            in.
          </Text>
          <View style={styles.btnWrap}>
            <Button
              title="Sign in"
              color={colors.clay}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
          <View style={styles.btnWrap}>
            <Button
              title="Create account"
              color={colors.ink}
              onPress={() => navigation.navigate('Register')}
            />
          </View>
        </View>

        {renderNavGroup('Shop', SHOP)}
        {renderNavGroup('Help & legal', HELP)}
        {renderNavGroup('The house', HOUSE)}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image source={profile.avatarSource} style={styles.avatar} />
        <Text style={styles.name}>{profile.name || user?.name}</Text>
        <Text style={styles.meta}>{profile.email || user?.email}</Text>
        <Text style={styles.meta}>Member since {formatMemberSince(profile.memberSince)}</Text>
      </View>

      <Text style={styles.section}>Details</Text>
      <View style={styles.formCard}>
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
        <Text style={styles.label}>PIN code</Text>
        <TextInput
          style={[styles.input, styles.inputLast]}
          value={profile.postalCode}
          editable={editing}
          onChangeText={(postalCode) => updateProfile({ postalCode })}
        />

        <Text style={styles.prefTitle}>Preferences</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Order notifications</Text>
          <Switch
            value={profile.orderNotifications}
            onValueChange={(orderNotifications) => updateProfile({ orderNotifications })}
            trackColor={{ true: colors.clay, false: colors.stone }}
          />
        </View>
        <View style={[styles.switchRow, styles.switchLast]}>
          <Text style={styles.switchLabel}>Newsletter</Text>
          <Switch
            value={profile.newsletter}
            onValueChange={(newsletter) => updateProfile({ newsletter })}
            trackColor={{ true: colors.clay, false: colors.stone }}
          />
        </View>

        <View style={styles.saveBtn}>
          <Button
            title={editing ? 'Save profile' : 'Edit profile'}
            color={editing ? colors.clay : colors.ink}
            onPress={editing ? onSave : () => setEditing(true)}
          />
        </View>
        <View style={styles.saveBtn}>
          <Button title="Sign out" color={colors.error} onPress={onLogout} />
        </View>
      </View>

      {renderNavGroup('Account', ACCOUNT)}
      {renderNavGroup('Shop', SHOP)}
      {renderNavGroup('Help & legal', HELP)}
      {renderNavGroup('The house', HOUSE)}
    </ScrollView>
  );
}

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
  meta: { ...typography.caption, marginTop: spacing.xs, textAlign: 'center' },
  section: { ...typography.h3, marginBottom: spacing.md },
  guestCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  guestBody: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.lg },
  btnWrap: { marginBottom: spacing.md },
  formCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: spacing.xl,
  },
  label: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.xs },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.bone,
    color: colors.textPrimary,
  },
  inputLast: { marginBottom: spacing.md },
  prefTitle: {
    ...typography.bodySmall,
    fontFamily: typography.button.fontFamily,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  switchLast: { marginBottom: spacing.lg },
  switchLabel: { ...typography.body },
  saveBtn: { marginBottom: spacing.md },
  group: { marginBottom: spacing.lg },
  groupTitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  navCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  navRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  navLabel: { ...typography.body, color: colors.textPrimary },
  chevron: {
    fontSize: 22,
    color: colors.textMuted,
    lineHeight: 24,
  },
});
