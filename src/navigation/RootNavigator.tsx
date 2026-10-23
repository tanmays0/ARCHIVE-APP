import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from '../theme';
import type { RootStackParamList } from './types';
import { MainTabs } from './MainTabs';
import { HelloArchiveScreen } from '../screens/HelloArchiveScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderConfirmationScreen } from '../screens/OrderConfirmationScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { AuthenticityServicesScreen } from '../screens/AuthenticityServicesScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { TechInsightsScreen } from '../screens/TechInsightsScreen';
import { AssignmentsScreen } from '../screens/AssignmentsScreen';
import { ApiDemoScreen } from '../screens/ApiDemoScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();
export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HelloArchive"
      screenOptions={{
        headerStyle: { backgroundColor: colors.bone },
        headerTintColor: colors.ink,
        headerTitleStyle: {
          fontFamily: typography.h3.fontFamily,
          fontSize: 18,
        },
        contentStyle: { backgroundColor: colors.bone },
      }}
    >
      <Stack.Screen
        name="HelloArchive"
        component={HelloArchiveScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Piece Details' }}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ title: 'Order Confirmed', headerBackVisible: false }}
      />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About ARCHIVE' }} />
      <Stack.Screen
        name="AuthenticityServices"
        component={AuthenticityServicesScreen}
        options={{ title: 'Authenticity & Services' }}
      />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact' }} />
      <Stack.Screen
        name="TechInsights"
        component={TechInsightsScreen}
        options={{ title: 'Tech Insights' }}
      />
      <Stack.Screen
        name="Assignments"
        component={AssignmentsScreen}
        options={{ title: 'Assignments Demo' }}
      />
      <Stack.Screen name="ApiDemo" component={ApiDemoScreen} options={{ title: 'API Demo (A8)' }} />
    </Stack.Navigator>
  );
}
