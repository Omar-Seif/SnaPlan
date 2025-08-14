import type { Session } from "./Session"
import type { Ticket } from "./Ticket"

export interface ViewEvent {
    id?: string | number
    image?: string
    title: string
    startDate: string
    endDate: string
    venueName: string
    status?: 'Active' | 'Pending' | 'Cancelled'
}

export interface Event extends ViewEvent {
    description?: string
    ticket?: Ticket[]
    sessions?: Session[]
}



