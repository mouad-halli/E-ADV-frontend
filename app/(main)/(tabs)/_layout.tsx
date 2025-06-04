
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import { Tabs } from "expo-router";
import { AppContextProvider } from '../../../contexts/appContext';
import { PresentationProductsProvider } from "@/contexts/presentationProductsContext";

export default function TabsLayout() {
    return (
        <AuthGuard>
            <AppContextProvider>
            {/* <PresentationProductsProvider> */}
            <Tabs
                tabBar={props => <Navbar {...props} />}
                screenOptions={{ headerShown: false }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="Appointments"
                    options={{
                        title: "Liste des médecins",
                    }}
                />
                <Tabs.Screen
                    name="products"
                    options={{
                        title: "Liste des produits",
                    }}
                />
            </Tabs>
            {/* </PresentationProductsProvider> */}
            </AppContextProvider>
        </AuthGuard>
    )
}