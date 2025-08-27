import { Calendar, MapPin } from "lucide-react";
import SessionCard from "../components/SessionCard";
import { useState, useEffect } from "react";
import { eventsDummy } from "../data/events";
import { useParams } from "react-router-dom";
import type { Event } from "../types/Event";

const OrganizerEventDetailsCard = () => {
  const { id } = useParams<{ id?: string }>();
  console.log(id)
  const [currentEvent, setCurrentEvent] = useState<Event>({
    title: "",
    image: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: { name: "", address: "", location: "", rooms: [] },
    description: "",
    sessions: [],
  });

  useEffect(() => {
    if (!id) return;
    const ev = eventsDummy.find((e) => e.title === id);
    if (ev) setCurrentEvent(ev);
    else console.error("Cannot find specified event");
    
  }, []);
  console.log(currentEvent)
  const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678";

  // Helper to color status badge
  const getStatusColor = () => {
    switch (currentEvent?.status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-5xl my-10 mx-5 px-4 pb-8 pt-4 border border-gray-200 rounded-lg shadow-sm md:w-[700px] lg:w-[900px]">
        {/* Image Banner */}
        <div className="w-full h-64 rounded-lg overflow-hidden mb-6">
          <img
            src={currentEvent?.image ? currentEvent.image : FALLBACK_IMG}
            alt={currentEvent?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {currentEvent?.title}
          </h1>
          <span
            className={`px-2 py-1 text-sm rounded-full mt-4 ${getStatusColor()}`}
          >
            {currentEvent?.status}
          </span>
        </div>

        {/* Date & Venue */}
        <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{`${currentEvent?.startDate} - ${currentEvent?.endDate}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{currentEvent?.venue.name}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-600">{currentEvent?.description}</p>
        </div>

        {/* Sessions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sessions
          </h2>
          {currentEvent?.sessions?.map((session, idx) => (
            <div className="mb-4" key={idx}>
              <SessionCard session={session} />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500">
            Edit Event
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            View Registrations
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizerEventDetailsCard;
