export interface Event {
    image: string
    title: string
    dateRange: string
    venue: string
    status: 'Accepted' | 'Pending' | 'Rejected'
}