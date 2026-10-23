import type { FakeStoreProduct } from '../types';
const FAKESTORE_URL = 'https://fakestoreapi.com/products';
export async function fetchFakeStoreProducts(): Promise<FakeStoreProduct[]> {
  const response = await fetch(FAKESTORE_URL);
  if (!response.ok) {
    throw new Error(`API error ${response.status}: could not load FakeStore products.`);
  }
  const data = (await response.json()) as FakeStoreProduct[];
  return data;
}
