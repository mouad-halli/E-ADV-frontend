import { PresentationProductsProvider } from "@/contexts/presentationProductsContext";
import { Stack } from "expo-router";

export default function _layout() {
    return (
        <PresentationProductsProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </PresentationProductsProvider>
    )
}