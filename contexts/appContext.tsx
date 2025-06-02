import { doctorType, externalAppointmentType } from "@/types/appointment"
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react"

type appContextType = {
    selectedAppointment: externalAppointmentType | undefined
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

    const [selectedAppointment, setSelectedAppointment] = useState<externalAppointmentType>()

    const getSelectedAppointmentId = () => selectedAppointment !== undefined ? selectedAppointment.id : ""
    const getSelectedDoctor = () => selectedAppointment?.doctor

    const handleSetSelectedAppointment = (appointment: externalAppointmentType) => {
        setSelectedAppointment({...appointment})
    }

    const handleRemoveSelectedAppointment = () => {
        setSelectedAppointment(undefined)
    }

    const isAppointmentSelected = () => selectedAppointment !== undefined

    const value = useMemo(
        () => ({
            selectedAppointment,
            handleSetSelectedAppointment,
            handleRemoveSelectedAppointment,
            isAppointmentSelected,
            getSelectedAppointmentId,
            getSelectedDoctor
        })
        , [selectedAppointment]
    )

    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}