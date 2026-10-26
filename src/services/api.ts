import type { FakeStoreProduct } from '../types';
import { safeImageUri } from '../utils/imageUri';

const FAKESTORE_URL = 'https://fakestoreapi.com/products';

export async function fetchFakeStoreProducts(): Promise<FakeStoreProduct[]> {
  const response = await fetch(FAKESTORE_URL);
  if (!response.ok) {
    throw new Error(`API error ${response.status}: could not load partner catalogue.`);
  }
  const data = (await response.json()) as FakeStoreProduct[];
  return data.map((item) => ({
    ...item,
    image: safeImageUri(item.image),
  }));
}
