import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii, spacing, typography } from '../theme';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation, route }: Props) {
  const { login } = useAuth();
  const { applyAccount } = useProfile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const redirectToCheckout = route.params?.redirectToCheckout === true;

  const onSubmit = async () => {
    setLoading(true);
    const sessionUser = await login(email, password);
    if (!sessionUser) {
      setLoading(false);
      return;
    }
    await applyAccount({
      name: sessionUser.name,
      email: sessionUser.email,
      phone: sessionUser.phone,
      memberSince: sessionUser.createdAt.slice(0, 10),
    });
    setLoading(false);
    if (redirectToCheckout) {
      navigation.replace('Checkout');
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('MainTabs', { screen: 'ProfileTab' });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <SectionHeader
        eyebrow="Account"
        title="Sign in"
        subtitle={
          redirectToCheckout
            ? 'Sign in to place your order. Your cart is saved.'
            : 'Access orders, profile, and checkout.'
        }
      />

      <View style={styles.card}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Button title="Sign in" onPress={onSubmit} loading={loading} style={styles.cta} />
      </View>

      <Pressable
        onPress={() =>
          navigation.navigate('Register', { redirectToCheckout: redirectToCheckout || undefined })
        }
        style={styles.linkWrap}
      >
        <Text style={styles.link}>New here? Create an account</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.lg,
  },
  cta: { marginTop: spacing.sm },
  linkWrap: { marginTop: spacing.xl, alignItems: 'center' },
  link: { ...typography.body, color: colors.clay },
});
