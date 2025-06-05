
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import { Tabs } from "expo-router";
import { AppContextProvider } from '../../../contexts/appContext';
import { useTranslation } from "react-i18next";

export default function TabsLayout() {

    const { t } = useTranslation('navbar')

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
                        title: t("tab1"),
                    }}
                />
                <Tabs.Screen
                    name="products"
                    options={{
                        title: t("tab2"),
                    }}
                />
            </Tabs>
            </AppContextProvider>
        </AuthGuard>
    )
}