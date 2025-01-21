import { Link } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
    return (
        <SafeAreaView className=" pt-28 pb-8 px-8 h-full flex ">
            <View className="h-full justify-between">
                <View className="flex-row">
                    <View className=" w-7/12 gap-y-8 pr-36">
                        <Text
                            style={{
                                borderBottomWidth: 5,
                                borderBottomColor: "#a2aee2",
                            }}
                            className="text-blue-900 font-bold self-start"
                        >
                            Platform feature
                        </Text>
                        <Text className="text-blue-950 font-bold text-6xl">Interactive tools for quality and effective online Presentation</Text>
                        <View className="flex-row gap-x-3">
                            <View className="size-20 bg-blue-950">
                            </View>
                            <Text className=" text-blue-950 font-medium text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                        </View>
                        <Link
                            className=" self-center w-[24rem] rounded bg-blue-900 px-10 py-2"
                            href="/(main)/(tabs)/Appointments" asChild
                        >
                            <Pressable>
                                <Text className="text-white text-lg text-center font-semibold">Start your Presentation</Text>
                            </Pressable>
                        </Link>
                    </View>
                    <View className=" w-5/12 bg-blue-900"></View>
                </View>
                <View className="gap-y-6">
                    <Text
                    style={{
                        borderBottomWidth: 5,
                        borderBottomColor: "#a2aee2",
                    }}
                    className="text-lg font-bold text-blue-900 self-start"
                    >
                        Learn more about the benefits of our platform
                    </Text>
                    <Text className="text-blue-900 font-bold text-4xl">why our platform leading in E-Presentation ?</Text>
                    <View className="flex-row justify-between">
                        <View className="w-[27rem] flex-row items-center gap-x-3 bg-[#a2aee2] rounded-3xl p-3">
                            <View className="bg-white rounded-full size-12  justify-center">
                                <Text className="text-2xl font-extrabold text-center text-blue-950">1</Text>
                            </View>
                            <ScrollView  className="gap-y-1">
                                <Text className="text-white font-bold text-lg">Personalized Learning</Text>
                                <Text className="text-white text-sm"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                            </ScrollView >
                        </View>
                        <View className="w-[27rem] flex-row items-center gap-x-3 bg-[#d5daf1] rounded-3xl p-3">
                            <View className="bg-white rounded-full size-12 justify-center">
                                <Text className="text-2xl font-extrabold text-center text-blue-950">2</Text>
                            </View>
                            <ScrollView  className="gap-y-1">
                                <Text className="text-blue-900 font-bold text-lg">Personalized Learning</Text>
                                <Text className="text-blue-900 text-sm"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                            </ScrollView >
                        </View>
                        <View className="w-[27rem] flex-row items-center gap-x-3 bg-[#a2aee2] rounded-3xl p-3">
                            <View className="bg-white rounded-full size-12  justify-center">
                                <Text className="text-2xl font-extrabold text-center text-blue-950">3</Text>
                            </View>
                            <ScrollView  className="gap-y-1">
                                <Text className="text-white font-bold text-lg">Personalized Learning</Text>
                                <Text className="text-white text-sm"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                            </ScrollView >
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
