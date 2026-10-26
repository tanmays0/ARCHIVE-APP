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
import { ApiDemoScreen } from '../screens/ApiDemoScreen';
import { WishlistScreen } from '../screens/WishlistScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { OrderDetailScreen } from '../screens/OrderDetailScreen';
import { NewArrivalsScreen } from '../screens/NewArrivalsScreen';
import { SaleScreen } from '../screens/SaleScreen';
import { CollectionScreen } from '../screens/CollectionScreen';
import { FAQScreen } from '../screens/FAQScreen';
import { ShippingPolicyScreen } from '../screens/ShippingPolicyScreen';
import { ReturnsPolicyScreen } from '../screens/ReturnsPolicyScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { TermsOfServiceScreen } from '../screens/TermsOfServiceScreen';
import { ConsignScreen } from '../screens/ConsignScreen';
import { SizeGuideScreen } from '../screens/SizeGuideScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

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
        options={{ title: 'How we build' }}
      />
      <Stack.Screen name="ApiDemo" component={ApiDemoScreen} options={{ title: 'Discover more' }} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ title: 'Wishlist' }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Orders' }} />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: 'Order detail' }}
      />
      <Stack.Screen
        name="NewArrivals"
        component={NewArrivalsScreen}
        options={{ title: 'New arrivals' }}
      />
      <Stack.Screen name="Sale" component={SaleScreen} options={{ title: 'Sale' }} />
      <Stack.Screen
        name="Collection"
        component={CollectionScreen}
        options={{ title: 'Collection' }}
      />
      <Stack.Screen name="FAQ" component={FAQScreen} options={{ title: 'FAQ' }} />
      <Stack.Screen
        name="ShippingPolicy"
        component={ShippingPolicyScreen}
        options={{ title: 'Shipping' }}
      />
      <Stack.Screen
        name="ReturnsPolicy"
        component={ReturnsPolicyScreen}
        options={{ title: 'Returns' }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: 'Privacy' }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{ title: 'Terms' }}
      />
      <Stack.Screen name="Consign" component={ConsignScreen} options={{ title: 'Consign' }} />
      <Stack.Screen name="SizeGuide" component={SizeGuideScreen} options={{ title: 'Size guide' }} />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Sign in' }} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Create account' }}
      />
    </Stack.Navigator>
  );
}
