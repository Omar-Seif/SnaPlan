import type { Event } from "./Event"

export interface Organizer {
    id?: string | number
    firstName: string
    lastName: string
    email: string
    phone: string
    organization: string
    job: string
    country: string
    events?: Event[]
}