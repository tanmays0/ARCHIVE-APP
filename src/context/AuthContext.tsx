import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidEmail, isNonEmpty } from '../utils/validation';
import { notify } from '../utils/notify';

const ACCOUNTS_KEY = '@archive/accounts';
const SESSION_KEY = '@archive/session';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface StoredAccount extends AuthUser {
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthUser | null>;
  register: (input: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadAccounts(): Promise<StoredAccount[]> {
  try {
    const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredAccount[];
  } catch {
    return [];
  }
}

async function saveAccounts(accounts: StoredAccount[]): Promise<void> {
  await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function toPublicUser(account: StoredAccount): AuthUser {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    phone: account.phone,
    createdAt: account.createdAt,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const sessionEmail = await AsyncStorage.getItem(SESSION_KEY);
        if (!sessionEmail) {
          setHydrated(true);
          return;
        }
        const accounts = await loadAccounts();
        const match = accounts.find(
          (a) => a.email.toLowerCase() === sessionEmail.toLowerCase(),
        );
        setUser(match ? toPublicUser(match) : null);
        if (!match) await AsyncStorage.removeItem(SESSION_KEY);
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed) || !isNonEmpty(password)) {
      notify('Sign in failed', 'Enter a valid email and password.');
      return null;
    }
    const accounts = await loadAccounts();
    const match = accounts.find((a) => a.email.toLowerCase() === trimmed);
    if (!match || match.password !== password) {
      notify('Sign in failed', 'Incorrect email or password.');
      return null;
    }
    await AsyncStorage.setItem(SESSION_KEY, match.email);
    const publicUser = toPublicUser(match);
    setUser(publicUser);
    notify('Welcome back', `Signed in as ${match.name}.`);
    return publicUser;
  }, []);

  const register = useCallback(
    async (input: { name: string; email: string; phone: string; password: string }) => {
      const name = input.name.trim();
      const email = input.email.trim().toLowerCase();
      const phone = input.phone.trim();
      const password = input.password;
      if (!isNonEmpty(name)) {
        notify('Create account', 'Name is required.');
        return null;
      }
      if (!isValidEmail(email)) {
        notify('Create account', 'Enter a valid email.');
        return null;
      }
      if (!isNonEmpty(phone) || phone.replace(/\D/g, '').length < 7) {
        notify('Create account', 'Enter a valid phone number.');
        return null;
      }
      if (password.length < 6) {
        notify('Create account', 'Password must be at least 6 characters.');
        return null;
      }
      const accounts = await loadAccounts();
      if (accounts.some((a) => a.email.toLowerCase() === email)) {
        notify('Create account', 'An account with this email already exists. Please sign in.');
        return null;
      }
      const account: StoredAccount = {
        id: `u-${Date.now()}`,
        name,
        email,
        phone,
        password,
        createdAt: new Date().toISOString(),
      };
      await saveAccounts([...accounts, account]);
      await AsyncStorage.setItem(SESSION_KEY, account.email);
      const publicUser = toPublicUser(account);
      setUser(publicUser);
      notify('Account created', `Welcome to ARCHIVE, ${name}. You are signed in.`);
      return publicUser;
    },
    [],
  );

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
    notify('Signed out', 'You can still browse and add pieces to your cart.');
  }, []);

  const value = useMemo(
    () => ({
      user,
      hydrated,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, hydrated, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
