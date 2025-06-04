// import { externalProductType } from "@/app/(main)/(tabs)/products"
import { doctorType, externalAppointmentType } from "@/types/appointment"
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react"
// import { useUserContext } from "./userContext"
// import { getUserProducts } from "@/services/Api/ExternalAPI"

type appContextType = {
    selectedAppointment: externalAppointmentType | undefined
    // presentationProducts: externalProductType[] | undefined
    handleSetSelectedAppointment: (appointment: externalAppointmentType) => void
    handleRemoveSelectedAppointment: () => void
    isAppointmentSelected: () => boolean
    getSelectedAppointmentId: () => string
    getSelectedDoctor: () => doctorType | undefined
}

const appContext = createContext<appContextType>({} as appContextType)

export const useAppContext = () => useContext(appContext)

type appProviderProps = { children: ReactNode }

export const AppContextProvider: FC<appProviderProps> = ({children}) => {

    // const { user } = useUserContext()
    const [selectedAppointment, setSelectedAppointment] = useState<externalAppointmentType>()
    // const [presentationProducts, setPresentationProducts] = useState<externalProductType[]>()

    const getSelectedAppointmentId = () => selectedAppointment !== undefined ? selectedAppointment.id : ""
    const getSelectedDoctor = () => selectedAppointment?.doctor

    const handleSetSelectedAppointment = (appointment: externalAppointmentType) => {
        setSelectedAppointment({...appointment})
    }

    const handleRemoveSelectedAppointment = () => {
        setSelectedAppointment(undefined)
    }

    const isAppointmentSelected = () => selectedAppointment !== undefined

    // useEffect(() => {
    //     const fetchPresentationProducts = async () => {
    //         const products = await getUserProducts()
    //         setPresentationProducts(products)
    //     }

    //     fetchPresentationProducts()
    // }, [user])

    const value = useMemo(
        () => ({
            selectedAppointment,
            // presentationProducts,
            handleSetSelectedAppointment,
            handleRemoveSelectedAppointment,
            isAppointmentSelected,
            getSelectedAppointmentId,
            getSelectedDoctor
        })
        , [selectedAppointment/*, presentationProducts*/]
    )

    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}