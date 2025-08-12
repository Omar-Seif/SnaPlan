import EventsCard from "../../components/EventsCard"
import Navbar from "../../components/Navbar"
import type { Event } from '../../types/Events'

const events: Event[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
        title: "Tech Innovation Summit 2023",
        dateRange: "15/11 - 17/11",
        venue: "Grand Convention Center, Dubai",
        status: "Accepted"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        title: "Digital Marketing Conference",
        dateRange: "22/11 - 23/11",
        venue: "Marriott Hotel, London",
        status: "Pending"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
        title: "AI & Machine Learning Workshop",
        dateRange: "05/12 - 07/12",
        venue: "Innovation Hub, Singapore",
        status: "Rejected"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
        title: "Blockchain Revolution Forum",
        dateRange: "10/12 - 12/12",
        venue: "Convention Center, New York",
        status: "Accepted"
    }
];


const MyEventsOrganizer = () => {
    return (
        <>
            <Navbar />

            <div className="mt-8 pb-6 border-b-4 pl-8">

                <h1 className="text-3xl text-slate-900 font-bold">My Events</h1>

            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {events.map((event, index) => (
                        <EventsCard event={event} key={index} />
                    ))}
                </div>
            </div>

        </>
    )
}

export default MyEventsOrganizer