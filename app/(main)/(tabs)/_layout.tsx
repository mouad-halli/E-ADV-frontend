
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import { Tabs } from "expo-router";
import { AppContextProvider } from '../../../contexts/appContext';

export default function TabsLayout() {
    return (
        <AuthGuard>
            <AppContextProvider>
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
                        title: "Doctors List",
                    }}
                />
                <Tabs.Screen
                    name="products"
                    options={{
                        title: "Products list",
                    }}
                />
            </Tabs>
            </AppContextProvider>
        </AuthGuard>
    )
}