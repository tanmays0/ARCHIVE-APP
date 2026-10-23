import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Order } from '../types';

const ORDERS_KEY = '@archive/orders';

type OrdersAction =
  | { type: 'HYDRATE'; orders: Order[] }
  | { type: 'ADD'; order: Order };

interface OrdersState {
  orders: Order[];
  hydrated: boolean;
}

function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case 'HYDRATE':
      return { orders: action.orders, hydrated: true };
    case 'ADD':
      return { ...state, orders: [action.order, ...state.orders] };
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
  getById: (id: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ordersReducer, { orders: [], hydrated: false });

  useEffect(() => {
    AsyncStorage.getItem(ORDERS_KEY)
      .then((raw) => {
        if (!raw) {
          dispatch({ type: 'HYDRATE', orders: [] });
          return;
        }
        dispatch({ type: 'HYDRATE', orders: JSON.parse(raw) as Order[] });
      })
      .catch(() => dispatch({ type: 'HYDRATE', orders: [] }));
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      void AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(state.orders));
    }
  }, [state.orders, state.hydrated]);

  const addOrder = useCallback((order: Order) => {
    dispatch({ type: 'ADD', order });
  }, []);

  const getById = useCallback(
    (id: string) => state.orders.find((o) => o.id === id),
    [state.orders],
  );

  const value = useMemo(
    () => ({ orders: state.orders, addOrder, getById }),
    [state.orders, addOrder, getById],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
