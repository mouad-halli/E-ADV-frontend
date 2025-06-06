import ProductsList from "@/components/Products/ProductsList";
import colors from "@/styles/colors";
import { globalStyles } from "@/styles/globalStyles";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Alert } from "react-native";
import ValiderButton from '@/components/ui/buttons/ValiderButton';
import AnnulerButton from "@/components/ui/buttons/AnnulerButton";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import LoadingScreen from "@/components/LoadingScreen";
import { useAppContext } from "@/contexts/appContext";
import { useRouter } from "expo-router";
import { AddAppointment, getAppointmentByVisiteId } from "@/services/Api/appointment";
import ActionModal from "@/components/ui/modals/ActionModal";
import { usePresentationProductsContext } from "@/contexts/presentationProductsContext";
import { useTranslation } from "react-i18next";

export default function IndexScreen() {

    const { t } = useTranslation('products')

    const {
        selectedAppointment,
        handleRemoveSelectedAppointment,
    } = useAppContext()

    const { presentedProducts, isLoading: isProductsLoading } = usePresentationProductsContext()

    // const { productId } = useGlobalSearchParams()

    const router = useRouter()

    // const [presentationProducts, setPresentationProducts] = useState<externalProductType[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [isAnnulerModalOpen, setIsAnnulerModalOpen] = useState(false)
    const [isValiderModalOpen, setIsValiderModalOpen] = useState(false)

    const handleValiderButtonClick = () => {
        handleRemoveSelectedAppointment()
        setIsValiderModalOpen(!isValiderModalOpen)
        router.replace("/(main)/(tabs)/Appointments")

    }

    const handleAnnulerButtonClick = () => {
        handleRemoveSelectedAppointment()
        setIsAnnulerModalOpen(!isAnnulerModalOpen)
        router.replace("/(main)/(tabs)/Appointments")
    }

    const handleGetUserLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()
            
            if (status !== 'granted') {
                console.error('Permission to access location was denied')
                Alert.alert("location permission denied")
                return
            }
            return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })

            
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function initialize() {
            if (!selectedAppointment)
                return
            try {
                setIsLoading(true)

                let location = await handleGetUserLocation()

                if (!location)
                    return

                // const products = await getUserProducts()
                // setPresentationProducts(products)

                let appointment = await getAppointmentByVisiteId(selectedAppointment.id)
                if (!appointment)
                    appointment = await AddAppointment(selectedAppointment.doctor.id, selectedAppointment.id, location.coords)

                setIsLoading(false)
            } catch (error: any) {
                const errResponse = (error && error.response && error.response.data) || (error && error.message)

                console.error(errResponse)
                setIsLoading(false)
            }

        }
        if (selectedAppointment)
            initialize()
    }, [selectedAppointment/*, productId*/])

    if (!selectedAppointment)
        return <LoadingScreen />

    return (
        <ImageBackground source={require('@/assets/images/background.png')} style={globalStyles.backGroundimage} >
        <SafeAreaView className=" pt-28 px-8 h-full flex">  
                <View className="flex-1 gap-y-4 py-5">
                    <View style={{ maxWidth: "70%", width: "100%" }} className=" mx-auto bg-accent p-4 rounded-xl">
                    <Text style={[Styles.textLg]}>{t("header")} :</Text>
                    <View className="flex-row justify-around">
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>{t("name")}</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[Styles.text, { maxWidth: 170}]}>
                                {selectedAppointment.doctor.name}
                            </Text>
                        </View>
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>{t("speciality")}</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[Styles.text, { maxWidth: 170}]}>
                                {selectedAppointment.doctor.speciality}
                            </Text>
                        </View>
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>{t("contact")}</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[Styles.text, { maxWidth: 170}]}>
                                {selectedAppointment.doctor.contact}
                            </Text>
                        </View>
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>{t("city")}</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[Styles.text, { maxWidth: 170}]}>
                                {selectedAppointment.doctor.city}
                            </Text>
                        </View>
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>{t("work-place")}</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[Styles.text, { maxWidth: 170}]}>
                                {selectedAppointment.doctor.workPlace}
                            </Text>
                        </View>
                    </View>
                    {/* <View className="flex-row justify-around">
                        {(["name", "speciality", "contact", "city", "workPlace"]).map((field) => (
                            <View key={field} className="gap-y-1 my-3">
                                <Text style={[Styles.textLg, { fontSize: 16 }]}>{field}</Text>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={[Styles.text, { maxWidth: 170}]}>
                                    {selectedAppointment.doctor[field as keyof typeof selectedAppointment.doctor]}
                                </Text>
                            </View>
                        ))}
                    </View> */}
                </View>
                {!isLoading && !isProductsLoading ?
                    <ProductsList
                        products={presentedProducts}
                    />
                    :
                    <LoadingScreen />
                }
                <View className="flex-row justify-center gap-x-2 mt-auto">
                    <AnnulerButton
                        text={t("cancel-button-title")}
                        onPress={() => setIsAnnulerModalOpen(!isAnnulerModalOpen)}
                    />
                    <ActionModal
                            isModalOpen={isAnnulerModalOpen}
                            toggleModal={() => setIsAnnulerModalOpen(!isAnnulerModalOpen)}
                            onCancelPress={() => setIsAnnulerModalOpen(false)}
                            onAcceptPress={handleAnnulerButtonClick}
                            cancelBtnText={t("cancel-modal-accept-button-title")}
                            acceptBtnText={t("cancel-modal-cancel-button-title")}
                            displayBtnsLogo={false}
                            title={t("cancel-modal-title")}
                            description={t("cancel-modal-description")}
                    />
                    <ValiderButton
                        text={t("validate-button-title")}
                        onPress={() => setIsValiderModalOpen(!isValiderModalOpen)}
                    />
                    <ActionModal
                            isModalOpen={isValiderModalOpen}
                            toggleModal={() => setIsValiderModalOpen(!isValiderModalOpen)}
                            onCancelPress={() => setIsValiderModalOpen(false)}
                            onAcceptPress={handleValiderButtonClick}
                            cancelBtnText={t("validate-modal-cancel-button-title")}
                            acceptBtnText={t("validate-modal-accept-button-title")}
                            displayBtnsLogo={false}
                            title={t("validate-modal-title")}
                            description={t("validate-modal-description")}
                    />
                </View>
            </View>
        </SafeAreaView>
        </ImageBackground>
    )
}

const Styles = StyleSheet.create({
    textLg: {
        color: colors.primary,
        ...globalStyles.robotoBold,
        fontSize: 18,
    },
    text: {
        color: colors.black,
        ...globalStyles.robotoMedium,
        fontSize: 14,
    },
})