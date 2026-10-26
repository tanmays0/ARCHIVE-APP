import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, typography } from '../theme';
import type { MainTabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { CatalogueScreen } from '../screens/CatalogueScreen';
import { CartScreen } from '../screens/CartScreen';
import { CustomerProfileScreen } from '../screens/CustomerProfileScreen';
import { useCart } from '../context/CartContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ glyph, focused }: { glyph: string; focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapFocused]}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>{glyph}</Text>
    </View>
  );
}

export function MainTabs() {
  const { itemCount } = useCart();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bone },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontFamily: typography.h3.fontFamily, fontSize: 18 },
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.clay,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.bone,
          borderTopColor: colors.borderSubtle,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: typography.caption.fontFamily,
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'ARCHIVE',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon glyph="⌂" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CatalogueTab"
        component={CatalogueScreen}
        options={{
          title: 'Catalogue',
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => <TabIcon glyph="▣" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarLabel: 'Cart',
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.clay },
          tabBarIcon: ({ focused }) => <TabIcon glyph="◎" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={CustomerProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon glyph="◉" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 28,
  },
  iconWrapFocused: {
    transform: [{ scale: 1.05 }],
  },
  icon: {
    fontSize: 18,
    color: colors.textMuted,
  },
  iconFocused: {
    color: colors.clay,
  },
});
