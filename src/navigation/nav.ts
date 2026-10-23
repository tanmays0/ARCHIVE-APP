import type { RootStackParamList } from './types';

type NavLike = {
  navigate: (...args: never[]) => void;
};

export function goToShop(
  navigation: { navigate: (name: 'MainTabs', params: object) => void },
  params?: {
    collectionId?: string;
    preset?: 'all' | 'new' | 'sale';
    category?: string;
  },
) {
  navigation.navigate('MainTabs', {
    screen: 'CatalogueTab',
    params: params ?? undefined,
  });
}

export function goToCart(navigation: { navigate: (name: 'MainTabs', params: object) => void }) {
  navigation.navigate('MainTabs', { screen: 'CartTab' });
}

export function goToHome(navigation: { navigate: (name: 'MainTabs', params: object) => void }) {
  navigation.navigate('MainTabs', { screen: 'HomeTab' });
}

export function goToProfile(navigation: {
  navigate: (name: 'MainTabs', params: object) => void;
}) {
  navigation.navigate('MainTabs', { screen: 'ProfileTab' });
}

export type { RootStackParamList, NavLike };
