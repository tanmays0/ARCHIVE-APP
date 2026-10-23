/**
 * ARCHIVE Mobile — Form validation helpers.
 * [Assignment 6] Used by Checkout and Contact for Alert-driven validation.
 */

/** Basic email shape check. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Returns true when a string has non-whitespace content. */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/** Validates a checkout-style phone (7+ digits after stripping non-digits). */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7;
}

export interface FieldErrors {
  [key: string]: string | undefined;
}

/**
 * Validates required shipping fields for checkout.
 */
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

/**
 * Validates the contact support form.
 */
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
