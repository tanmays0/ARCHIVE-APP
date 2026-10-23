import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { loadProfile, saveProfile } from '../services/storage';
import type { CustomerProfile } from '../types';
const DEFAULT_PROFILE: CustomerProfile = {
  name: 'Tanmay Shinde',
  email: 'shinde.tanmay@gmail.com',
  phone: '+91 9876543210',
  address: 'A Town Street',
  city: 'Pune',
  postalCode: '411028',
  memberSince: '2024-03-01',
  avatarUri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  orderNotifications: true,
  newsletter: false,
};
type ProfileAction =
  | {
      type: 'HYDRATE';
      profile: CustomerProfile;
    }
  | {
      type: 'UPDATE';
      patch: Partial<CustomerProfile>;
    };
function profileReducer(state: CustomerProfile, action: ProfileAction): CustomerProfile {
  switch (action.type) {
    case 'HYDRATE':
      return action.profile;
    case 'UPDATE':
      return { ...state, ...action.patch };
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}
interface ProfileContextValue {
  profile: CustomerProfile;
  updateProfile: (patch: Partial<CustomerProfile>) => void;
  save: () => Promise<void>;
}
const ProfileContext = createContext<ProfileContextValue | null>(null);
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, dispatch] = useReducer(profileReducer, DEFAULT_PROFILE);
  useEffect(() => {
    loadProfile().then((stored) => {
      if (stored) dispatch({ type: 'HYDRATE', profile: stored });
    });
  }, []);
  const updateProfile = useCallback((patch: Partial<CustomerProfile>) => {
    dispatch({ type: 'UPDATE', patch });
  }, []);
  const save = useCallback(async () => {
    await saveProfile(profile);
  }, [profile]);
  const value = useMemo(() => ({ profile, updateProfile, save }), [profile, updateProfile, save]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}
export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
