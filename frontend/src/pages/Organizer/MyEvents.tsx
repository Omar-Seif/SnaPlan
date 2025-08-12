import EventsCard from "../../components/EventsCard"
import Navbar from "../../components/Navbar"


import { events } from '../../data/events'




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