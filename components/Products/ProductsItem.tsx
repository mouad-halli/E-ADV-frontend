import colors from "@/styles/colors"
import { globalStyles } from "@/styles/globalStyles"
import { View, Text, StyleSheet, ImageBackground, Pressable} from "react-native"
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import PlayIcon from '../ui/icons/PlayIcon';
import ReplayIcon from "../ui/icons/ReplayIcon";
import Checkmark from '../ui/icons/Checkmark';
import { useEffect, useState } from "react";
import { externalProductType } from "@/app/(main)/(tabs)/products";
import { useAppContext } from "@/contexts/appContext";
import { router, useRouter } from "expo-router";
import $api from '@/services/Api/API';
import LoadingScreen from "../LoadingScreen";

interface PropTypes {
    product: externalProductType
    // startProductPresentation: (productId: string) => void
}

interface presentedProductDataType {
    latestPresentationDate: string
    feedback: number,
    presentationStatus: "not-presented" | "presented" | "continue"
}

const ProductsItem = ({ product/*, startProductPresentation*/ }: PropTypes) => {

    const { getSelectedDoctor } = useAppContext()

    const [productPresentationData, setProductPresentationData] = useState<presentedProductDataType>()

    const [isLoading, setIsLoading] = useState(false)

    const handlePress = () => {
        router.push({
            pathname: "/(main)/(tabs)/products/[productId]",
            params: { productId: product.id }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const selectedDoctorId = getSelectedDoctor()?.id
                if (!selectedDoctorId) {
                    setIsLoading(false)
                    return
                }
                const data: presentedProductDataType = (await $api.get("productPresentation/summary", { params: { doctorId: (selectedDoctorId), productId: product.id } })).data
                if (data)
                    setProductPresentationData(data)
                setIsLoading(false)
            } catch (error: any) {
                const errResponse = (error && error.response && error.response.data) || (error && error.message)

                console.log(errResponse)
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (isLoading || !productPresentationData)
        return <LoadingScreen />

    return (
        <Pressable
            // onPress={() => startProductPresentation(product.id)}
            onPress={handlePress}
        >
            <ImageBackground 
                source={{ uri: product.imgUrl }} 
                style={{ width: 290, height: 171, position: "relative" }}
            >
                { productPresentationData.presentationStatus === "presented" && <View
                    style={{ height: 50, width: 50, backgroundColor: colors.third, borderBottomRightRadius: "100%", paddingTop: 14, paddingLeft: 10 }}
                >
                    <Checkmark />
                </View>}
                {productPresentationData.presentationStatus === "continue" && <View 
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} 
                    className="absolute inset-0 p-4 justify-center items-center gap-2"
                >
                    <Pressable
                        onPress={handlePress}
                        className="items-center"
                    >
                        <PlayIcon />
                        <Text style={[Styles.textLg, { color: colors.primary }]}>Continue</Text>
                    </Pressable>
                    <View style={{ height: 1.5, width: '80%'}} className=' bg-accent'></View>
                    <Pressable
                        onPress={handlePress}
                        className=" items-center"
                    >
                        <ReplayIcon />
                        <Text style={[Styles.textLg, { color: colors.primary }]}>Replay</Text>
                    </Pressable>
                </View>}
            </ImageBackground>
            <View className="flex-row justify-between">
                <Text
                    style={[Styles.textLg, {maxWidth: 250, flexShrink: 1}]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {product.name}
                </Text>
                {productPresentationData.latestPresentationDate && 
                    <Text style={Styles.text}>le {productPresentationData.latestPresentationDate}</Text>
                }
            </View>
            <StarRatingDisplay
                rating={productPresentationData.feedback}
                color={colors.secondary}
                starSize={12}
                starStyle={{ marginHorizontal: 0 }}
                maxStars={5}
            />
        </Pressable>
    )
}

const Styles = StyleSheet.create({
    textLg: {
        color: colors.black,
        ...globalStyles.robotoBold,
        fontSize: 18,
    },
    text: {
        color: colors.black,
        ...globalStyles.robotoMedium,
        fontSize: 10,
    },
})

export default ProductsItem