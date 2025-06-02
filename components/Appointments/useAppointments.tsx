import React, { useCallback, useState } from 'react'
import { Filters } from './AppDataTable'
import { dateRangeType } from './DateRangePickerModal'
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'
import { externalAppointmentType } from '@/types/appointment'
import { isAppointmentVisited } from '@/services/Api/appointment'
import $external_api from '@/services/Api/ExternalAPI'
import { useFocusEffect } from 'expo-router'

export interface appointment extends externalAppointmentType {
    isVisited: boolean
}

const useAppointments = (
    
) => {
    const [isDatePickerModalVisible, setIsDatePickerModalVisible] = useState(false)
    const [isListSelectorModalVisible, setIsListSelectorModalVisible] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [filters, setFilters] = useState<Filters>({
        selectedDateRange: { startDate: null, endDate: null }
    })
    // const [selectedDateRange, setSelectedDateRange] = useState<dateRangeType>({ startDate: null, endDate: null })
    const [selectedLocation, setSelectedLocation] = useState<string>()
    const [appointmentDisplayStatus, setAppointmentDisplayStatus] = useState<"visited" | "notVisited">()

    // const [page, setPage] = useState<number>(0)
    const [appointmentsList, setAppointmentsList] = useState<appointment[]>([])
    // const [filteredAppointmentsList, setFilteredAppointmentsList] = useState<appointment[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const toggleDatePickerModal = () => {
        setIsDatePickerModalVisible(!isDatePickerModalVisible)
    }

    const toggleListSelectorModal = () => {
        setIsListSelectorModalVisible(!isListSelectorModalVisible)
    }
    
    const handleSelectLocation = (location: string) => {
        setSelectedLocation(location === selectedLocation ? "" : location)
        setIsListSelectorModalVisible(false)
    }

    const handleSelectedDateRange = (newDateRange: dateRangeType) => {

        // setSelectedDateRange(dateRange)
        setFilters((prevState) => ({...prevState, selectedDateRange: newDateRange}))
    }

    const handleEnterPress = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (searchText.trim() !== "") {
            setSearchText("")
        }
    }

    const fetchAppointments = async () => {
        setIsLoading(true)
        const params = {
            // startDate: dateRange.startDate,
            // endDate: dateRange.endDate,
            // employeeNumber: 1234,
            // page,
            // limit: itemsPerPage
            key: "0aa96d80"
        }
        try {
            // To be removed later
            const key = "0aa96d80"
            const appointments: externalAppointmentType[] = (await $external_api.get(`/appointments`, {params})).data
            // const appointments: externalAppointmentType[] = []
            if (!Array.isArray(appointments))
                return
            const result: appointment[] = []
            await Promise.all(appointments.map(async (appointment) => {
                try {
                    // to be changed later
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
        selectedLocation,
        appointmentDisplayStatus,
        setAppointmentDisplayStatus,
        toggleDatePickerModal,
        filters,
        isListSelectorModalVisible,
        handleSelectLocation,
        isDatePickerModalVisible,
        handleSelectedDateRange,
        handleApplyFilters,
        appointmentsList,
        isLoading,
    }
}

export default useAppointments