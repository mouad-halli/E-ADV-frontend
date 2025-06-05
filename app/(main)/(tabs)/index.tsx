import MiniLogo from "@/components/ui/icons/mini-logo";
import { Link } from "expo-router";
import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export default function IndexScreen() {

    const { t } = useTranslation('home')

    return (
        <SafeAreaView className=" pt-28 pb-8 px-8 h-full flex ">
            <View className="h-full justify-between py-4">
                <View className="flex-row">
                    <View className=" w-7/12 gap-y-8">
                        <Text
                            style={{
                                borderBottomWidth: 5,
                                borderBottomColor: "#a2aee2",
                            }}
                            className="text-blue-900 font-bold self-start"
                        >
                            {t("small-title1")}
                        </Text>
                        <Text className="text-blue-950 font-bold text-4xl">{t("header1")}</Text>
                        <View className="flex-row gap-x-6">
                            <View>
                                <MiniLogo />
                            </View>
                            <ScrollView className="pr-6">
                                <Text className=" text-blue-950 font-medium text-lg">{t("paragraph")}</Text>
                            </ScrollView>
                        </View>
                        <Link
                            className=" self-center w-[24rem] rounded bg-blue-900 px-10 py-2"
                            href="/(main)/(tabs)/Appointments" asChild
                        >
                            <Pressable>
                                <Text className="text-white text-lg text-center font-semibold">{t("call-to-action-button-title")}</Text>
                            </Pressable>
                        </Link>
                    </View>
                    <View className=" w-5/12 h-96">
                        <Image
                            source={require("../../../assets/images/Collab-amico-1.png")}
                            style={{ height: "100%", width: "100%" }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View className="gap-y-6">
                    <Text
                    style={{
                        borderBottomWidth: 5,
                        borderBottomColor: "#a2aee2",
                    }}
                    className="text-lg font-bold text-blue-900 self-start"
                    >
                        {t("small-title2")}
                    </Text>
                    <Text className="text-blue-900 font-bold text-4xl">{t("header2")}</Text>
                    <View className="flex-row justify-between">
                        <View className="w-[27rem] flex-row items-center gap-x-3 bg-[#a2aee2] rounded-3xl p-3">
                            <View className="bg-white rounded-full size-12  justify-center">
                                <Text className="text-2xl font-extrabold text-center text-blue-950">1</Text>
                            </View>
                            <ScrollView  className="gap-y-1">
                                <Text className="text-white font-bold text-lg">{t("card1.title")}</Text>
                                <Text className="text-white text-sm">{t("card1.description")}</Text>
                            </ScrollView >
                        </View>
                        <View className="w-[27rem] flex-row items-center gap-x-3 bg-[#d5daf1] rounded-3xl p-3">
                            <View className="bg-white rounded-full size-12 justify-center">
                                <Text className="text-2xl font-extrabold text-center text-blue-950">2</Text>
                            </View>
                            <ScrollView  className="gap-y-1">
                                <Text className="text-blue-900 font-bold text-lg">{t("card2.title")}</Text>
                                <Text className="text-blue-900 text-sm">{t("card2.description")}</Text>
                            </ScrollView >
                        </View>
                        <View className="w-[27rem] flex-row items-center gap-x-3 bg-[#a2aee2] rounded-3xl p-3">
                            <View className="bg-white rounded-full size-12  justify-center">
                                <Text className="text-2xl font-extrabold text-center text-blue-950">3</Text>
                            </View>
                            <ScrollView  className="gap-y-1">
                                <Text className="text-white font-bold text-lg">{t("card3.title")}</Text>
                                <Text className="text-white text-sm">{t("card3.description")}</Text>
                            </ScrollView >
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
