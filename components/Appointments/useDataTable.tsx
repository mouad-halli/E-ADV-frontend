import { useAppContext } from "@/contexts/appContext"
import { externalAppointmentType } from "@/types/appointment"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import { appointment } from "./useAppointments"
import { isToday } from "@/utils/dates"

const useDataTable = (
    appointmentsList: appointment[],
    searchText: string,
    displayNotVisited: boolean
) => {

    const { handleSetSelectedAppointment } = useAppContext()
    const router = useRouter()
    const itemsPerPage = 9
    const [page, setPage] = useState<number>(0)
    const [filteredAppointmentsList, setFilteredAppointmentsList] = useState<appointment[]>([])

    const handleRowPres = (appointment: externalAppointmentType) => {
        if (!isToday(new Date(appointment.appointmentDate)))
            return
        handleSetSelectedAppointment(appointment)
        router.replace("/(main)/(tabs)/products")
    }

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const handleFilterDataTable = () => {
        return appointmentsList.filter((appointment) => {
            // const matchesLocation = !location || appointment.doctor.city.toLowerCase().includes(location.toLowerCase())
            const matchesSearchText = searchText.length < 3 || appointment.doctor.name.toLowerCase().startsWith(searchText.toLowerCase())
            // const matchesDisplayStatus = appointmentDisplayStatus === "visited" && appointment.isVisited
            //                                 || appointmentDisplayStatus === "notVisited" && !appointment.isVisited
            //                                 || !appointmentDisplayStatus
            const matchesNotVisitedStatus = !displayNotVisited || !appointment.isVisited
            // return matchesLocation && matchesSearchText && matchesDisplayStatus
            return matchesSearchText && matchesNotVisitedStatus
        })
    }

    useEffect(() => {
        setFilteredAppointmentsList(handleFilterDataTable())
        setPage(0)
    }, [searchText, appointmentsList])

    return {
        page,
        from : page * itemsPerPage,
        to: Math.min((page + 1) * itemsPerPage, filteredAppointmentsList.length),
        numberOfPages: Math.ceil(filteredAppointmentsList.length / itemsPerPage),
        handlePageChange,
        filteredAppointmentsList,
        handleRowPres,
    }
}

export default useDataTable
