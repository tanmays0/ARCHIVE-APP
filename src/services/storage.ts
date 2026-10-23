import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CartItem, CustomerProfile } from '../types';
const CART_KEY = '@archive/cart';
const WISHLIST_KEY = '@archive/wishlist';
const PROFILE_KEY = '@archive/profile';
export async function loadCart(): Promise<CartItem[]> {
  try {
    const raw = await AsyncStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}
export async function saveCart(items: CartItem[]): Promise<void> {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
}
export async function loadWishlist(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}
export async function saveWishlist(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
}
export async function loadProfile(): Promise<CustomerProfile | null> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CustomerProfile;
  } catch {
    return null;
  }
}
export async function saveProfile(profile: CustomerProfile): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
