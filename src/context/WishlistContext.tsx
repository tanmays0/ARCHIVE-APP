/**
 * ARCHIVE Mobile — Wishlist state via Context + useReducer.
 * [Assignment 3 / 4] useState-driven heart toggles persist via AsyncStorage.
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { loadWishlist, saveWishlist } from '../services/storage';

type WishlistAction =
  | { type: 'HYDRATE'; ids: string[] }
  | { type: 'TOGGLE'; productId: string };

interface WishlistState {
  ids: string[];
  hydrated: boolean;
}

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'HYDRATE':
      return { ids: action.ids, hydrated: true };
    case 'TOGGLE': {
      const has = state.ids.includes(action.productId);
      return {
        ...state,
        ids: has
          ? state.ids.filter((id) => id !== action.productId)
          : [...state.ids, action.productId],
      };
    }
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

interface WishlistContextValue {
  ids: string[];
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

/**
 * Provides wishlist state to the app tree.
 */
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { ids: [], hydrated: false });

  useEffect(() => {
    loadWishlist().then((ids) => dispatch({ type: 'HYDRATE', ids }));
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      void saveWishlist(state.ids);
    }
  }, [state.ids, state.hydrated]);

  const isWishlisted = useCallback(
    (productId: string) => state.ids.includes(productId),
    [state.ids],
  );

  const toggle = useCallback((productId: string) => {
    dispatch({ type: 'TOGGLE', productId });
  }, []);

  const value = useMemo(
    () => ({ ids: state.ids, isWishlisted, toggle }),
    [state.ids, isWishlisted, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

/** Consumes wishlist context. */
export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
