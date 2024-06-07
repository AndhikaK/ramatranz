import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import {
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
} from "@expo-google-fonts/poppins";
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium,
  OpenSans_500Medium_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
import { View } from "react-native";
import { Typography } from "@/components/typography/Typography";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "test/index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "OpenSans-Light": OpenSans_300Light,
    "OpenSans-LightItalic": OpenSans_300Light_Italic,
    "OpenSans-Regular": OpenSans_400Regular,
    "OpenSans-RegularItalic": OpenSans_400Regular_Italic,
    "OpenSans-Medium": OpenSans_500Medium,
    "OpenSans-MediumItalic": OpenSans_500Medium_Italic,
    "OpenSans-Bold": OpenSans_700Bold,
    "OpenSans-BoldItalic": OpenSans_700Bold_Italic,
    "Poppins-Light": Poppins_300Light,
    "Poppins-LightItalic": Poppins_300Light_Italic,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-RegularItalic": Poppins_400Regular_Italic,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-MediumItalic": Poppins_500Medium_Italic,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-BoldItalic": Poppins_700Bold_Italic,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
