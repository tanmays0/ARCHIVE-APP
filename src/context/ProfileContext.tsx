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

export const DEFAULT_AVATAR = require('../../assets/profile-avatar.jpg');

const GUEST_PROFILE: CustomerProfile = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  memberSince: new Date().toISOString().slice(0, 10),
  avatarSource: DEFAULT_AVATAR,
  orderNotifications: true,
  newsletter: false,
};

type ProfileAction =
  | { type: 'HYDRATE'; profile: CustomerProfile }
  | { type: 'UPDATE'; patch: Partial<CustomerProfile> };

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
  applyAccount: (account: {
    name: string;
    email: string;
    phone: string;
    memberSince?: string;
  }) => Promise<void>;
  clearForGuest: () => Promise<void>;
  save: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, dispatch] = useReducer(profileReducer, GUEST_PROFILE);

  useEffect(() => {
    loadProfile().then((stored) => {
      if (!stored) return;
      const legacy = stored as CustomerProfile & { avatarUri?: string };
      dispatch({
        type: 'HYDRATE',
        profile: {
          ...GUEST_PROFILE,
          name: legacy.name ?? '',
          email: legacy.email ?? '',
          phone: legacy.phone ?? '',
          address: legacy.address ?? '',
          city: legacy.city ?? '',
          postalCode: legacy.postalCode ?? '',
          memberSince: legacy.memberSince ?? GUEST_PROFILE.memberSince,
          orderNotifications: legacy.orderNotifications ?? true,
          newsletter: legacy.newsletter ?? false,
          avatarSource: DEFAULT_AVATAR,
        },
      });
    });
  }, []);

  const updateProfile = useCallback((patch: Partial<CustomerProfile>) => {
    dispatch({ type: 'UPDATE', patch });
  }, []);

  const applyAccount = useCallback(
    async (account: { name: string; email: string; phone: string; memberSince?: string }) => {
      const stored = await loadProfile();
      const base = stored ?? GUEST_PROFILE;
      const next: CustomerProfile = {
        ...GUEST_PROFILE,
        ...base,
        name: account.name,
        email: account.email,
        phone: account.phone,
        memberSince: account.memberSince ?? base.memberSince ?? GUEST_PROFILE.memberSince,
        avatarSource: DEFAULT_AVATAR,
      };
      dispatch({ type: 'HYDRATE', profile: next });
      await saveProfile(next);
    },
    [],
  );

  const clearForGuest = useCallback(async () => {
    dispatch({ type: 'HYDRATE', profile: GUEST_PROFILE });
    await saveProfile(GUEST_PROFILE);
  }, []);

  const save = useCallback(async () => {
    await saveProfile({ ...profile, avatarSource: DEFAULT_AVATAR });
  }, [profile]);

  const value = useMemo(
    () => ({ profile, updateProfile, applyAccount, clearForGuest, save }),
    [profile, updateProfile, applyAccount, clearForGuest, save],
  );
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
