import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { isNonEmpty, isValidEmail } from '../utils/validation';

export function ConsignScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [pieces, setPieces] = useState('');

  const onSubmit = () => {
    if (!isNonEmpty(name) || !isNonEmpty(email) || !isNonEmpty(pieces)) {
      Alert.alert('Missing details', 'Please fill name, email, and a short description of your pieces.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Invalid email', 'Enter a valid email so we can reply.');
      return;
    }
    Alert.alert(
      'Enquiry sent',
      'Thanks — our sourcing team will review and reply within a few business days.',
      [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setCity('');
            setPieces('');
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
        eyebrow="Sell with us"
        title="Consign to ARCHIVE"
        subtitle="We selectively accept authenticated sportswear, workwear, and outerwear with character."
      />
      <Input label="Name" value={name} onChangeText={setName} />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input label="City" value={city} onChangeText={setCity} />
      <Input
        label="What are you consigning?"
        value={pieces}
        onChangeText={setPieces}
        multiline
        numberOfLines={4}
        style={styles.area}
        placeholder="Brand, era, condition, quantity…"
      />
      <Button title="Send enquiry" onPress={onSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bone },
  content: { padding: spacing.xl, paddingBottom: spacing.huge },
  area: { minHeight: 120, textAlignVertical: 'top' },
});
