/**
 * ARCHIVE Mobile — Public API fetch for Assignment 8 demonstration.
 * Uses FakeStore API with loading/error handled by the caller.
 */
import type { FakeStoreProduct } from '../types';

const FAKESTORE_URL = 'https://fakestoreapi.com/products';

/**
 * Fetches products from FakeStore API.
 * [Assignment 8] Dynamic data rendering via public API.
 * @throws Error when the network request fails or returns non-OK
 */
export async function fetchFakeStoreProducts(): Promise<FakeStoreProduct[]> {
  const response = await fetch(FAKESTORE_URL);
  if (!response.ok) {
    throw new Error(`API error ${response.status}: could not load FakeStore products.`);
  }
  const data = (await response.json()) as FakeStoreProduct[];
  return data;
}
