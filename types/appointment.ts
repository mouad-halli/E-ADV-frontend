import { locationType } from "./location"

export interface doctorType {
    id: string
    name: string,
    speciality: string,
    contact: string,
    city: string,
    workPlace: string
}

export interface externalAppointmentType {
    id: string
    doctor: doctorType
    appointmentDate: string
}

export interface appointmentType {
    id: string
    contactId: string
    visiteId: string
    location: locationType
    createdAt: string
}