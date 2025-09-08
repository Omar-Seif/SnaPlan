import type { Session } from "./Session"
import type { Ticket } from "./Ticket"
import type { Venue } from "./Venue"

export interface ViewEvent {
    id?: string | number
    image?: string
    title: string
    startDate: string
    endDate: string
    startTime : string 
    endTime : string
    venue: Venue
    status?: 'Active' | 'Pending' | 'Cancelled'
}

export interface Event extends ViewEvent {
    description?: string
    ticket?: Ticket[]
    sessions?: Session[]
}


export interface DraftEvent {
    id?:string|number
    title: string
    startDate: string
    endDate: string
    venueName: string
}

export interface SubmittedEvent {
    title: string
    startDate: string
    endDate: string
    venue: string
    status: 'Active' | 'Pending' | 'Rejected'
}


