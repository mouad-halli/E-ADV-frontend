import { useAppContext } from "@/contexts/appContext"
import { externalAppointmentType } from "@/types/appointment"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import { appointment } from "./useAppointments"

const useDataTable = (
    appointmentsList: appointment[],
    location: string | undefined,
    searchText: string,
    appointmentDisplayStatus: "visited" | "notVisited" | undefined
) => {
    const { handleSetSelectedAppointment } = useAppContext()
    const router = useRouter()

    const itemsPerPage = 9

    const [page, setPage] = useState<number>(0)
    // const [appointmentsList, setAppointmentsList] = useState<appointment[]>([])
    const [filteredAppointmentsList, setFilteredAppointmentsList] = useState<appointment[]>([])
    // const [isLoading, setIsLoading] = useState(false)

    const handleRowPres = (appointment: externalAppointmentType) => {
        handleSetSelectedAppointment(appointment)
        router.replace("/(main)/(tabs)/products")
    }

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const handleFilterDataTable = () => {
        return appointmentsList.filter((appointment) => {
            const matchesLocation = !location || appointment.doctor.city.toLowerCase().includes(location.toLowerCase())
            const matchesSearchText = appointment.doctor.name.toLowerCase().startsWith(searchText.toLowerCase())
            const matchesDisplayStatus = appointmentDisplayStatus === "visited" && appointment.isVisited
                                            || appointmentDisplayStatus === "notVisited" && !appointment.isVisited
                                            || !appointmentDisplayStatus

            return matchesLocation && matchesSearchText && matchesDisplayStatus
        })
    }

    // const fetchAppointments = async () => {
    //     setIsLoading(true)
    //     const params = {
    //         // startDate: dateRange.startDate,
    //         // endDate: dateRange.endDate,
    //         // employeeNumber: 1234,
    //         // page,
    //         // limit: itemsPerPage
    //         key: "0aa96d80"
    //     }
    //     try {
    //         // To be removed later
    //         const key = "0aa96d80"
    //         const appointments: externalAppointmentType[] = (await $external_api.get(`/appointments`, {params})).data
    //         // const appointments: externalAppointmentType[] = []
    //         if (!Array.isArray(appointments))
    //             return
    //         const result: appointment[] = []
    //         await Promise.all(appointments.map(async (appointment) => {
    //             try {
    //                 // to be changed later
    //                 const isVisited = await isAppointmentVisited(appointment.id)
    //                 result.push({...appointment, isVisited})
    //             } catch (error: any) {
    //                 const errResponse = (error?.response?.data) || error?.message
    //                 console.log(errResponse)
    //             }
    //         }))
    //         setAppointmentsList(result)
    //         setIsLoading(false)
    //     } catch (error: any) {
    //         console.log(error?.response)
    //         setIsLoading(false)
    //     }
    // }

    // const handleApplyFilters = async () => {
    //     await fetchAppointments()
    // }

    // useFocusEffect(
    //     useCallback(() => {
    //         fetchAppointments()
    //     }, [])
    // )

    useEffect(() => {
        setFilteredAppointmentsList(handleFilterDataTable())
        setPage(0)
    }, [location, searchText, appointmentDisplayStatus, appointmentsList])

    return {
        page,
        from : page * itemsPerPage,
        to: Math.min((page + 1) * itemsPerPage, filteredAppointmentsList.length),
        numberOfPages: Math.ceil(filteredAppointmentsList.length / itemsPerPage),
        handlePageChange,
        filteredAppointmentsList,
        handleRowPres,
        // isLoading,
    }
}

export default useDataTable
