export function formatPrice(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function createOrderId(): string {
  const stamp = Date.now().toString().slice(-6);
  return `AR-${stamp}`;
}

export function formatMemberSince(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}
