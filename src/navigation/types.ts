/**
 * ARCHIVE Mobile — React Navigation param lists.
 * [Assignment 7] Typed stack + tab routes.
 */

export type MainTabParamList = {
  HomeTab: undefined;
  CatalogueTab: undefined;
  CartTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
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
};
