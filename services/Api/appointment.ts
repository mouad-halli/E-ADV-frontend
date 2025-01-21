import $api from '@/services/Api/API';

export const getAppointmentByVisiteId = async (visiteId: string) => {
    return (await $api.get(`/appointment/visite/${visiteId}`)).data
}

export const AddAppointment = async (
    contactId: string,
    visiteId: string,
    location: { latitude: number, longitude: number }
) => {
    const body = {
        contactId: String(contactId),
        visiteId: String(visiteId),
        location
    }
    return (await $api.post("/appointment", body)).data;
}

export const isAppointmentVisited = async (visiteId: string) => {
    return (await $api.get(`/appointment/isVisited/${visiteId}`)).data
}