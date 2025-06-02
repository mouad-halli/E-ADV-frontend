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
import { useGlobalSearchParams, useRouter } from "expo-router";
import { getUserProducts } from '@/services/Api/ExternalAPI';
import { AddAppointment, getAppointmentByVisiteId } from "@/services/Api/appointment";
import ActionModal from "@/components/ui/modals/ActionModal";

export interface externalProductType {
    id: string
    name: string
    imgUrl: string
}

export default function IndexScreen() {
    const {
        selectedAppointment,
        handleRemoveSelectedAppointment
    } = useAppContext()

    const { productId } = useGlobalSearchParams()

    const router = useRouter()

    const [products, setProducts] = useState<externalProductType[]>([])
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
                console.log("user location -> ", location);
                

                if (!location)
                    return

                const products = await getUserProducts()
                setProducts(products)

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
    }, [selectedAppointment, productId])

    if (!selectedAppointment)
        return <LoadingScreen />

    return (
        <ImageBackground source={require('@/assets/images/background.png')} style={globalStyles.backGroundimage} >
        <SafeAreaView className=" pt-28 px-8 h-full flex">  
                <View className="flex-1 gap-y-4 py-5">
                    <View style={{ maxWidth: "70%", width: "100%" }} className=" mx-auto bg-accent p-4 rounded-xl">
                    <Text style={[Styles.textLg]}>informations sur le médecin :</Text>
                    <View className="flex-row justify-around">
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>nom</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[Styles.text, { maxWidth: 170}]}>
                                {selectedAppointment.doctor.name}
                            </Text>
                        </View>
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>Spécialité</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[Styles.text, { maxWidth: 170}]}>
                                {selectedAppointment.doctor.speciality}
                            </Text>
                        </View>
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>Contact</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[Styles.text, { maxWidth: 170}]}>
                                {selectedAppointment.doctor.contact}
                            </Text>
                        </View>
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>Ville</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[Styles.text, { maxWidth: 170}]}>
                                {selectedAppointment.doctor.city}
                            </Text>
                        </View>
                        <View className="gap-y-1 my-3">
                            <Text style={[Styles.textLg, { fontSize: 16 }]}>lieu de travail</Text>
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
                {!isLoading ?
                    <ProductsList
                        products={products}
                    />
                    :
                    <LoadingScreen />
                }
                <View className="flex-row justify-center gap-x-2 mt-auto">
                    <AnnulerButton onPress={() => setIsAnnulerModalOpen(!isAnnulerModalOpen)} />
                    <ActionModal
                            isModalOpen={isAnnulerModalOpen}
                            toggleModal={() => setIsAnnulerModalOpen(!isAnnulerModalOpen)}
                            onCancelPress={() => setIsAnnulerModalOpen(false)}
                            onAcceptPress={handleAnnulerButtonClick}
                            cancelBtnText='Attendre'
                            acceptBtnText='Annuler'
                            displayBtnsLogo={false}
                            title='Annuler la Presentation ?'
                            description="Êtes-vous sûr de vouloir annuler cette présentation ? Cette action est irréversible."
                    />
                    <ValiderButton onPress={() => setIsValiderModalOpen(!isValiderModalOpen)} />
                    <ActionModal
                            isModalOpen={isValiderModalOpen}
                            toggleModal={() => setIsValiderModalOpen(!isValiderModalOpen)}
                            onCancelPress={() => setIsValiderModalOpen(false)}
                            onAcceptPress={handleValiderButtonClick}
                            cancelBtnText='Attendre'
                            acceptBtnText='Valider'
                            displayBtnsLogo={false}
                            title='Valider la Presentation ?'
                            description="Êtes-vous sûr de vouloir Valider cette présentation ?"
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