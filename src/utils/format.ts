/**
 * ARCHIVE Mobile — Formatting helpers.
 */

/**
 * Formats a USD price for display.
 * @param amount - Numeric price
 * @param currency - ISO currency code (default USD)
 */
export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats an ISO date string for profile display.
 */
export function formatMemberSince(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
