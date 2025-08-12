import type { Session } from "./Session"
import type { Ticket } from "./Ticket"

export interface Event {
    id: string | number
    image: string
    title: string
    dateRange: string
    venue: string
    status: 'Accepted' | 'Pending' | 'Rejected'
    description?: string
    ticket?: Ticket[]
    sessions?: Session[]
}
