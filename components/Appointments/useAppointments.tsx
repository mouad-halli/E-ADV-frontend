import { useCallback, useState } from 'react'
import { dateRangeType } from './DateRangePickerModal'
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'
import { externalAppointmentType } from '@/types/appointment'
import { isAppointmentVisited } from '@/services/Api/appointment'
import $external_api from '@/services/Api/ExternalAPI'
import { useFocusEffect } from 'expo-router'
import { getWeekStartAndEnd } from '@/utils/dates'

export interface appointment extends externalAppointmentType {
    isVisited: boolean
}

export interface Filters {
    selectedDateRange: dateRangeType
    selectedLocation: string | undefined
    displayNotVisited: boolean
}

const useAppointments = (
    
) => {
    const [isDatePickerModalVisible, setIsDatePickerModalVisible] = useState(false)
    const [isListSelectorModalVisible, setIsListSelectorModalVisible] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [selectedDateRange, setSelectedDateRange] = useState(getWeekStartAndEnd(new Date()))
    const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined)
    const [displayNotVisited, setDisplayNotVisited] = useState<boolean>(false)
    // const [filters, setFilters] = useState<Filters>({
    //     selectedDateRange: getWeekStartAndEnd(new Date()),
    //     selectedLocation: undefined,
    //     notVisited: false
    // })
    // const [page, setPage] = useState<number>(0)
    const [appointmentsList, setAppointmentsList] = useState<appointment[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const toggleDatePickerModal = () => {
        setIsDatePickerModalVisible(!isDatePickerModalVisible)
    }

    const toggleListSelectorModal = () => {
        setIsListSelectorModalVisible(!isListSelectorModalVisible)
    }
    
    const handleSelectLocation = (location: string) => {
        // setFilters((prevState) => ({...prevState, selectedLocation: location === prevState.selectedLocation ? undefined : location}))
        setSelectedLocation(location)
        setIsListSelectorModalVisible(false)
    }

    const handleSelectedDateRange = (newDateRange: dateRangeType) => {
        // setFilters((prevState) => ({...prevState, selectedDateRange: newDateRange}))
        setSelectedDateRange(newDateRange)
    }

    const handleToggleDisplayNotVisited = () => {
        // setFilters((prevState) => ({...prevState, notVisited: !prevState.notVisited}))
        setDisplayNotVisited(!displayNotVisited)
    }

    const handleEnterPress = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (searchText.trim() !== "") {
            setSearchText("")
        }
    }

    const fetchAppointments = async () => {
        setIsLoading(true)
        const params = {
            startDate: selectedDateRange.startDate,
            endDate: selectedDateRange.endDate,
            location: selectedLocation,
            employeeNumber: 1234,
            // page,
            // limit: itemsPerPage
            key: "82082af0"
        }
        try {
            const appointments: externalAppointmentType[] = (await $external_api.get(`/appointments`, {params})).data
            if (!Array.isArray(appointments))
                return
            const result: appointment[] = []
            await Promise.all(appointments.map(async (appointment) => {
                try {
                    const isVisited = await isAppointmentVisited(appointment.id)
                    result.push({...appointment, isVisited})
                } catch (error: any) {
                    const errResponse = (error?.response?.data) || error?.message
                    console.log(errResponse)
                }
            }))
            setAppointmentsList(result)
            setIsLoading(false)
        } catch (error: any) {
            console.log(error?.response)
            setIsLoading(false)
        }
    }

    const handleApplyFilters = async () => {
        await fetchAppointments()
    }

    useFocusEffect(
        useCallback(() => {
            fetchAppointments()
        }, [])
    )
    
    return {
        searchText,
        setSearchText,
        handleEnterPress,
        toggleListSelectorModal,
        toggleDatePickerModal,
        isListSelectorModalVisible,
        handleSelectLocation,
        isDatePickerModalVisible,
        handleSelectedDateRange,
        handleApplyFilters,
        appointmentsList,
        isLoading,
        handleToggleDisplayNotVisited,
        selectedDateRange,
        selectedLocation,
        displayNotVisited,
    }
}

export default useAppointments