import type { Session } from "./Session"
import type { Ticket } from "./Ticket"

export interface Event {
    id: string | number
    image: string
    title: string
    startDate: string
    endDate: string
    venue: string
    status: 'Active' | 'Pending' | 'Cancelled'
    description?: string
    ticket?: Ticket[]
    sessions?: Session[]
}
