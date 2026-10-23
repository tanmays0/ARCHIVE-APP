import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  HomeTab: undefined;
  CatalogueTab:
    | {
        collectionId?: string;
        preset?: 'all' | 'new' | 'sale';
        category?: string;
      }
    | undefined;
  CartTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  HelloArchive: undefined;
  ProductDetails: { productId: string };
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
  About: undefined;
  AuthenticityServices: undefined;
  Contact: undefined;
  TechInsights: undefined;
  Assignments: undefined;
  ApiDemo: undefined;
  Wishlist: undefined;
  Orders: undefined;
  OrderDetail: { orderId: string };
  NewArrivals: undefined;
  Sale: undefined;
  Collection: { collectionId: string };
  FAQ: undefined;
  ShippingPolicy: undefined;
  ReturnsPolicy: undefined;
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
  Consign: undefined;
  SizeGuide: undefined;
  Notifications: undefined;
};
