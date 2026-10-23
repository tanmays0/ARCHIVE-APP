import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  Fraunces_400Regular,
  Fraunces_400Regular_Italic,
  Fraunces_600SemiBold,
} from '@expo-google-fonts/fraunces';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { ProfileProvider } from './src/context/ProfileContext';
import { OrdersProvider } from './src/context/OrdersContext';
import { colors } from './src/theme';
import { Loader } from './src/components/ui/Loader';

SplashScreen.preventAutoHideAsync().catch(() => {});

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bone,
    card: colors.bone,
    text: colors.ink,
    border: colors.borderSubtle,
    primary: colors.clay,
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Fraunces_400Regular,
    Fraunces_400Regular_Italic,
    Fraunces_600SemiBold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  const appReady = fontsLoaded || Boolean(fontError);
  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);
  if (!appReady) {
    return <Loader message="Preparing the Archive…" />;
  }
  return (
    <GestureHandlerRootView style={styles.flex} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <CartProvider>
          <WishlistProvider>
            <ProfileProvider>
              <OrdersProvider>
                <NavigationContainer theme={navTheme}>
                  <View style={styles.flex}>
                    <StatusBar style="dark" />
                    <RootNavigator />
                  </View>
                </NavigationContainer>
              </OrdersProvider>
            </ProfileProvider>
          </WishlistProvider>
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bone },
});
