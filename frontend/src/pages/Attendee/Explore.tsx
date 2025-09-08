import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Event } from "../../types/Event";
import EventsCard from "../../components/EventsCard";
import { Heading1 } from "lucide-react";

const ExploreAttendee = () => {
  const [exploreEvents, setExploreEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios
      .get("https://192.168.201.124:5001/api/Events/explore")
      .then((res) => setExploreEvents(res.data))
      .catch((err) => console.error("Failed to fetch api values", err));
  }, []); // ✅ added dependency array

  return (
    <>
      <Navbar />
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {exploreEvents.length === 0 ? (
          <h1 className="col-span-full text-center text-3xl sm:text-4xl md:text-5xl">
            Oh ooh! no events have yet to be added
          </h1>
        ) : (
          exploreEvents.map((event) => (
            <div key={event.id}>
              <EventsCard event={event} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ExploreAttendee;
