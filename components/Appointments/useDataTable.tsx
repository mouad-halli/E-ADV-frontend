import { useAppContext } from "@/contexts/appContext"
import $external_api from "@/services/Api/ExternalAPI"
import { externalAppointmentType } from "@/types/appointment"
import { useCallback, useEffect, useState } from "react"
import { dateRangeType } from "./DateRangePickerModal"
import { isAppointmentVisited } from "@/services/Api/appointment"
import { useFocusEffect, useRouter } from "expo-router"

interface appointment extends externalAppointmentType {
    isVisited: boolean
}

const useDataTable = (
    dateRange: dateRangeType,
    location: string,
    searchText: string
) => {
    const { handleSetSelectedAppointment } = useAppContext()
    const router = useRouter()

    const itemsPerPage = 10

    const [page, setPage] = useState<number>(0)
    const [appointmentsList, setAppointmentsList] = useState<appointment[]>([])
    const [filteredAppointmentsList, setFilteredAppointmentsList] = useState<appointment[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleRowPres = (appointment: externalAppointmentType) => {
        handleSetSelectedAppointment(appointment)
        router.replace("/(main)/(tabs)/products")
    }

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    useFocusEffect(
        useCallback(() => {
            const fetchDoctors = async () => {
                setIsLoading(true)
                const params = {
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    employeeNumber: 1234,
                    page,
                    limit: itemsPerPage
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
                    setFilteredAppointmentsList(result)
                    setIsLoading(false)
                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
                }
            }
    
            fetchDoctors()
        }, [dateRange])
    )

    useEffect(() => {
        const filteredAppointments = appointmentsList.filter((appointment) => {
            const matchesLocation = appointment.doctor.city.toLowerCase().includes(location.toLowerCase())
            const matchesSearchText = appointment.doctor.name.toLowerCase().startsWith(searchText.toLowerCase())
            return matchesLocation && matchesSearchText
        })
        setFilteredAppointmentsList(filteredAppointments)
    }, [location, searchText])

    return {
        page,
        from : page * itemsPerPage,
        to: Math.min((page + 1) * itemsPerPage, filteredAppointmentsList.length),
        numberOfPages: Math.ceil(filteredAppointmentsList.length / itemsPerPage),
        handlePageChange,
        filteredAppointmentsList,
        handleRowPres,
        isLoading
    }
}

export default useDataTable
