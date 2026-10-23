/**
 * ARCHIVE Mobile — Customer support contact form.
 * [Assignment 6 / 7] TextInput + Button + Alert validation.
 */
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { validateContactFields } from '../utils/validation';

/**
 * Support form: name, email, order number, message.
 */
export function ContactScreen() {
  // [Assignment 6] Controlled TextInput state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const onSubmit = () => {
    const next = validateContactFields({ name, email, message });
    setErrors(next);
    const firstError = Object.values(next).find(Boolean);
    if (firstError) {
      // [Assignment 6] Alert on validation errors
      Alert.alert('Please check the form', firstError);
      return;
    }
    Alert.alert(
      'Message sent',
      `Thanks ${name.trim()} — our care team will reply to ${email.trim()} shortly.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setOrderNumber('');
            setMessage('');
            setErrors({});
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <SectionHeader
        eyebrow="Care"
        title="Contact support"
        subtitle="Write to help@archive.market — we typically reply within one business day."
      />
      <Input label="Name" value={name} onChangeText={setName} error={errors.name} />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      <Input
        label="Order number (optional)"
        value={orderNumber}
        onChangeText={setOrderNumber}
        placeholder="AR-XXXX"
      />
      <Input
        label="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        style={styles.message}
        error={errors.message}
      />
      <Button title="Send message" onPress={onSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  message: { minHeight: 120, textAlignVertical: 'top' },
});
