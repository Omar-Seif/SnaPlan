export interface Event {
    id: string | number
    image: string
    title: string
    dateRange: string
    venue: string
    status: 'Accepted' | 'Pending' | 'Rejected'
    ticket?: 'Standard' | 'VIP'
}