/**
 * ARCHIVE Mobile — Debounce hook for catalogue search.
 * [Assignment 3 / 8] Keeps FlatList filtering smooth while typing.
 */
import { useEffect, useState } from 'react';

/**
 * Returns a debounced copy of `value` that updates after `delay` ms.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
