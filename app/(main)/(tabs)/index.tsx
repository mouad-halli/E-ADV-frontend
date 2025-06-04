import Logo from "@/components/ui/icons/Logo";
import MiniLogo from "@/components/ui/icons/mini-logo";
import { Link } from "expo-router";
import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
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
                            Fonctionnalité de la plateforme
                        </Text>
                        <Text className="text-blue-950 font-bold text-4xl">Présentez mieux, engagez plus. Des outils interactifs pensés pour les professionnels du secteur pharmaceutique.</Text>
                        <View className="flex-row gap-x-6">
                            <View>
                                <MiniLogo />
                            </View>
                            <ScrollView className="pr-6">
                                <Text className=" text-blue-950 font-medium text-lg">E-ADV transforme vos rendez-vous médicaux en expériences engageantes. Grâce à une interface intuitive et des outils de suivi avancés, vous maîtrisez chaque étape : du choix du produit à l’évaluation post-présentation.</Text>
                            </ScrollView>
                        </View>
                        <Link
                            className=" self-center w-[24rem] rounded bg-blue-900 px-10 py-2"
                            href="/(main)/(tabs)/Appointments" asChild
                        >
                            <Pressable>
                                <Text className="text-white text-lg text-center font-semibold">Lancer une présentation</Text>
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
                        En savoir plus sur les avantages de notre plateforme
                    </Text>
                    <Text className="text-blue-900 font-bold text-4xl">Pourquoi choisir E-ADV ?</Text>
                    <View className="flex-row justify-between">
                        <View className="w-[27rem] flex-row items-center gap-x-3 bg-[#a2aee2] rounded-3xl p-3">
                            <View className="bg-white rounded-full size-12  justify-center">
                                <Text className="text-2xl font-extrabold text-center text-blue-950">1</Text>
                            </View>
                            <ScrollView  className="gap-y-1">
                                <Text className="text-white font-bold text-lg">Présentation intelligente</Text>
                                <Text className="text-white text-sm">Naviguez facilement entre vos slides, adaptez votre discours en direct et gardez l’attention du praticien.</Text>
                            </ScrollView >
                        </View>
                        <View className="w-[27rem] flex-row items-center gap-x-3 bg-[#d5daf1] rounded-3xl p-3">
                            <View className="bg-white rounded-full size-12 justify-center">
                                <Text className="text-2xl font-extrabold text-center text-blue-950">2</Text>
                            </View>
                            <ScrollView  className="gap-y-1">
                                <Text className="text-blue-900 font-bold text-lg">Retours exploitables</Text>
                                <Text className="text-blue-900 text-sm">Recueillez des feedbacks détaillés à chaque étape pour améliorer vos prochaines visites.</Text>
                            </ScrollView >
                        </View>
                        <View className="w-[27rem] flex-row items-center gap-x-3 bg-[#a2aee2] rounded-3xl p-3">
                            <View className="bg-white rounded-full size-12  justify-center">
                                <Text className="text-2xl font-extrabold text-center text-blue-950">3</Text>
                            </View>
                            <ScrollView  className="gap-y-1">
                                <Text className="text-white font-bold text-lg">Gain de temps et de performance</Text>
                                <Text className="text-white text-sm">Conçue pour vous faire gagner du temps, E-ADV automatise et facilite vos reportings. </Text>
                            </ScrollView >
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
