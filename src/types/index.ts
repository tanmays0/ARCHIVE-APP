export type ConditionGrade = 'Like New' | 'Excellent' | 'Good' | 'Fair';

export type ProductCategory = 'Men' | 'Women' | 'Kids' | 'Accessories';

export type ProductSubcategory = 'shoes' | 'apparel' | 'gear';

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  price: number;
  compareAtPrice?: number;
  currency: 'INR';
  description: string;
  condition: ConditionGrade;
  era?: string;
  authenticated: boolean;
  sizes: string[];
  images: string[];
  collectionIds: string[];
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
}

export interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  memberSince: string;
  /** Local require() id or remote { uri } — always prefer bundled default in ProfileContext */
  avatarSource: number | { uri: string };
  orderNotifications: boolean;
  newsletter: boolean;
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  giftWrap: boolean;
  saveDetails: boolean;
}

export type SortOption = 'featured' | 'priceAsc' | 'priceDesc' | 'newest';

export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface OrderLine {
  productId: string;
  name: string;
  brand: string;
  size: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  subtotal: number;
  giftWrap: boolean;
  total: number;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostal: string;
  email: string;
  phone: string;
  lines: OrderLine[];
}
