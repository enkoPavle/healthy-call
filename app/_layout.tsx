import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider, RegisterProvider, useAuthContext } from "@/context";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import initReactI18next from "@/util/i18n";
import { colors } from "@/constants/colors";

SystemUI.setBackgroundColorAsync(colors.black);
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  const onBeforeLiftHandler = async (store: any) => {
    await initReactI18next(store);
  };

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PersistGate
          persistor={persistor}
          onBeforeLift={async () => await onBeforeLiftHandler(store)}
        >
          <AuthProvider>
            <RegisterProvider>
              <StatusBar style="light" />
              <RootLayoutNav />
            </RegisterProvider>
          </AuthProvider>
        </PersistGate>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

const RootLayoutNav = () => {
  const { isCredentialChecked, user } = useAuthContext();

  useEffect(() => {
    if (isCredentialChecked) {
      SplashScreen.hideAsync();
    }
  }, [isCredentialChecked]);

  if (!isCredentialChecked && !user) return null;

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/auth" />
        <Stack.Screen name="(auth)/intro" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
};
