import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { loadCart, saveCart } from '../services/storage';
import type { CartItem, Product } from '../types';
import { useProducts } from '../hooks/useProducts';
type CartAction =
  | {
      type: 'HYDRATE';
      items: CartItem[];
    }
  | {
      type: 'ADD';
      productId: string;
      size: string;
      quantity?: number;
    }
  | {
      type: 'REMOVE';
      productId: string;
      size: string;
    }
  | {
      type: 'SET_QTY';
      productId: string;
      size: string;
      quantity: number;
    }
  | {
      type: 'CLEAR';
    };
interface CartState {
  items: CartItem[];
  hydrated: boolean;
}
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items, hydrated: true };
    case 'ADD': {
      const qty = action.quantity ?? 1;
      const existing = state.items.find(
        (i) => i.productId === action.productId && i.size === action.size,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.productId && i.size === action.size
              ? { ...i, quantity: i.quantity + qty }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { productId: action.productId, size: action.size, quantity: qty }],
      };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.productId === action.productId && i.size === action.size),
        ),
      };
    case 'SET_QTY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.productId === action.productId && i.size === action.size),
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId && i.size === action.size
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}
interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getLineProducts: () => (CartItem & {
    product: Product;
  })[];
}
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], hydrated: false });
  const { getById, allProducts } = useProducts();
  useEffect(() => {
    loadCart().then((items) => dispatch({ type: 'HYDRATE', items }));
  }, []);
  useEffect(() => {
    if (state.hydrated) {
      void saveCart(state.items);
    }
  }, [state.items, state.hydrated]);
  const addItem = useCallback((productId: string, size: string, quantity?: number) => {
    dispatch({ type: 'ADD', productId, size, quantity });
  }, []);
  const removeItem = useCallback((productId: string, size: string) => {
    dispatch({ type: 'REMOVE', productId, size });
  }, []);
  const setQuantity = useCallback((productId: string, size: string, quantity: number) => {
    dispatch({ type: 'SET_QTY', productId, size, quantity });
  }, []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);
  const getLineProducts = useCallback(() => {
    return state.items
      .map((item) => {
        const product = getById(item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter(Boolean) as (CartItem & {
      product: Product;
    })[];
  }, [state.items, getById]);
  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  );
  const subtotal = useMemo(() => {
    return state.items.reduce((sum, i) => {
      const product = allProducts.find((p) => p.id === i.productId);
      return sum + (product ? product.price * i.quantity : 0);
    }, 0);
  }, [state.items, allProducts]);
  const value = useMemo(
    () => ({
      items: state.items,
      hydrated: state.hydrated,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      getLineProducts,
    }),
    [
      state.items,
      state.hydrated,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      getLineProducts,
    ],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
