import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import "../global.css";
import { UserContextProvider } from "@/contexts/userContext";
import { StatusBar } from "react-native";
import { PaperProvider } from 'react-native-paper';
import { useEffect } from "react";
import colors from "@/styles/colors";

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'Roboto-Regular': require('@/assets/fonts/Roboto/Roboto-Regular.ttf'),
        'Roboto-Medium': require('@/assets/fonts/Roboto/Roboto-Medium.ttf'),
        'Roboto-Bold': require('@/assets/fonts/Roboto/Roboto-Bold.ttf'),
    })
    
    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync()
      }
    }, [loaded, error])

    if (!loaded && !error)
        return null

    return (
        <UserContextProvider>
            <PaperProvider>
                <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
                <Stack screenOptions={{ headerShown: false}}>
                    <Stack.Screen name="(main)/(tabs)" />
                    <Stack.Screen name="(auth)" />
                </Stack>
            </PaperProvider>
        </UserContextProvider>
    )
}