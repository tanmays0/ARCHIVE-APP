import { Alert, type AlertButton } from 'react-native';

/** Consistent in-app popups for cart, auth, orders, and validation. */
export function notify(
  title: string,
  message?: string,
  buttons: AlertButton[] = [{ text: 'OK' }],
): void {
  Alert.alert(title, message, buttons);
}

export function notifySuccess(title: string, message?: string): void {
  notify(title, message, [{ text: 'OK' }]);
}

export function confirmAction(
  title: string,
  message: string,
  onConfirm: () => void,
  confirmLabel = 'Confirm',
): void {
  notify(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmLabel, onPress: onConfirm },
  ]);
}
