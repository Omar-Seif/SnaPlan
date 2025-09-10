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
    status?: string
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
  id: number | string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: string;
  venue: Venue | string; // <-- allow either an object or just a name
}

