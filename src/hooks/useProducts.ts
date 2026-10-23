import { useCallback, useMemo, useState } from 'react';
import productsJson from '../data/products.json';
import type { Product, ProductCategory, SortOption } from '../types';
const products = productsJson as Product[];
export interface ProductFilters {
  search: string;
  category: ProductCategory | 'All';
  sort: SortOption;
}
export function useProducts(initial?: Partial<ProductFilters>) {
  const [search, setSearch] = useState(initial?.search ?? '');
  const [category, setCategory] = useState<ProductCategory | 'All'>(initial?.category ?? 'All');
  const [sort, setSort] = useState<SortOption>(initial?.sort ?? 'featured');
  const [refreshing, setRefreshing] = useState(false);
  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'All') {
      list = list.filter((p) => p.category === category);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    switch (sort) {
      case 'priceAsc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case 'featured':
      default:
        list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
        break;
    }
    return list;
  }, [search, category, sort]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);
  const getById = useCallback((id: string) => products.find((p) => p.id === id), []);
  const featured = useMemo(() => products.filter((p) => p.isFeatured), []);
  const newArrivals = useMemo(() => products.filter((p) => p.isNew), []);
  return {
    products: filtered,
    allProducts: products,
    featured,
    newArrivals,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    refreshing,
    onRefresh,
    getById,
  };
}
