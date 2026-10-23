export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7;
}
export interface FieldErrors {
  [key: string]: string | undefined;
}
export function validateCheckoutFields(fields: {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!isNonEmpty(fields.fullName)) errors.fullName = 'Full name is required.';
  if (!isNonEmpty(fields.email)) errors.email = 'Email is required.';
  else if (!isValidEmail(fields.email)) errors.email = 'Enter a valid email.';
  if (!isNonEmpty(fields.phone)) errors.phone = 'Phone is required.';
  else if (!isValidPhone(fields.phone)) errors.phone = 'Enter a valid phone number.';
  if (!isNonEmpty(fields.address)) errors.address = 'Address is required.';
  if (!isNonEmpty(fields.city)) errors.city = 'City is required.';
  if (!isNonEmpty(fields.postalCode)) errors.postalCode = 'Postal code is required.';
  return errors;
}
export function validateContactFields(fields: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!isNonEmpty(fields.name)) errors.name = 'Name is required.';
  if (!isNonEmpty(fields.email)) errors.email = 'Email is required.';
  else if (!isValidEmail(fields.email)) errors.email = 'Enter a valid email.';
  if (!isNonEmpty(fields.message)) errors.message = 'Message is required.';
  return errors;
}
