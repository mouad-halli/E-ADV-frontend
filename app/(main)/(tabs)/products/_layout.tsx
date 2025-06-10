import { PresentationProvider } from "@/contexts/presentationContext";
import { PresentationProductsProvider } from "@/contexts/presentationProductsContext";
import { Stack } from "expo-router";

export default function _layout() {
    return (
        <PresentationProductsProvider>
            <PresentationProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </PresentationProvider>
        </PresentationProductsProvider>
    )
}