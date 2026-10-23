import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, typography } from '../theme';
import type { MainTabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { CatalogueScreen } from '../screens/CatalogueScreen';
import { CartScreen } from '../screens/CartScreen';
import { CustomerProfileScreen } from '../screens/CustomerProfileScreen';
import { useCart } from '../context/CartContext';
const Tab = createBottomTabNavigator<MainTabParamList>();
function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return <Text style={[styles.icon, focused && styles.iconFocused]}>{label}</Text>;
}
export function MainTabs() {
  const { itemCount } = useCart();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bone },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontFamily: typography.h3.fontFamily, fontSize: 18 },
        tabBarActiveTintColor: colors.clay,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.bone,
          borderTopColor: colors.borderSubtle,
        },
        tabBarLabelStyle: { fontFamily: typography.caption.fontFamily, fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'ARCHIVE',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon label="⌂" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CatalogueTab"
        component={CatalogueScreen}
        options={{
          title: 'Catalogue',
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => <TabIcon label="▣" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarLabel: 'Cart',
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarIcon: ({ focused }) => <TabIcon label="👜" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={CustomerProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon label="◎" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  icon: {
    fontSize: 18,
    color: colors.textMuted,
  },
  iconFocused: {
    color: colors.clay,
  },
});
