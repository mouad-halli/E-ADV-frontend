import colors from "@/styles/colors"
import { globalStyles } from "@/styles/globalStyles"
import { View, Text, StyleSheet, ImageBackground, Pressable} from "react-native"
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import PlayIcon from '../ui/icons/PlayIcon';
import ReplayIcon from "../ui/icons/ReplayIcon";
import Checkmark from '../ui/icons/Checkmark';
import { router } from "expo-router";
import { presentedProductType } from "@/contexts/presentationProductsContext";

interface PropTypes {
    product: presentedProductType
}

const ProductsItem = ({ product }: PropTypes) => {

    const handlePress = () => {
        router.push({
            pathname: "/(main)/(tabs)/products/[productId]",
            params: { productId: product.id }
        })
    }

    return (
        <Pressable
            onPress={handlePress}
        >
            <ImageBackground 
                source={{ uri: product.imgUrl }} 
                style={{ width: 290, height: 171, position: "relative" }}
            >
                { product.presentationStatus === "presented" && <View
                    style={{ height: 50, width: 50, backgroundColor: colors.third, borderBottomRightRadius: "100%", paddingTop: 14, paddingLeft: 10 }}
                >
                    <Checkmark />
                </View>}
                {(product.presentationStatus === "continue" || product.presentationStatus === "replay") && <View 
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} 
                    className="absolute inset-0 p-4 justify-center items-center gap-2"
                >
                    {product.presentationStatus === "continue" ?
                        <Pressable
                            onPress={handlePress}
                            className="items-center"
                        >
                            <PlayIcon />
                            <Text style={[Styles.textLg, { color: colors.primary }]}>Continue</Text>
                        </Pressable>
                        :
                        <Pressable
                            onPress={handlePress}
                            className=" items-center"
                        >
                            <ReplayIcon />
                            <Text style={[Styles.textLg, { color: colors.primary }]}>Replay</Text>
                        </Pressable>
                    }
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
                {product.latestPresentationDate && 
                    <Text style={Styles.text}>le {product.latestPresentationDate}</Text>
                }
            </View>
            <StarRatingDisplay
                rating={product.feedback}
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