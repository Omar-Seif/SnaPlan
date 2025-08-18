import { useEffect, useState } from "react";
import EventsCard from "../../components/EventsCard"
import Navbar from "../../components/Navbar"
import { eventsDummy } from '../../data/events'
import { getEvents } from "../../services/EventService";
import type { Event } from '../../types/Event';




const BookedAttendee = () => {

    const [eventList, setEventList] = useState<Event[]>([]);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const events = await getEvents();
                setEventList(events);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : "Failed to load events");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <Navbar />

            <div className="mt-8 pb-6 border-b-4 pl-8">

                <h1 className="text-3xl text-slate-900 font-bold">Booked Events</h1>

            </div>

            <div className="container mx-auto px-4 py-8">

                {/* {error && <div className="error-message">{error}</div>}

                {loading ? <div>Loading</div> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {eventList.map((event, index) => (
                            <EventsCard event={event} key={index} />
                        ))}
                    </div>} */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {eventsDummy.map((event, index) => (
                        <EventsCard event={event} key={index} />
                    ))}
                </div>
            </div>

        </>
    )
}

export default BookedAttendee