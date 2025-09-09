import Sidebar from "../../components/Sidebar";
import OrganizerEventDetailCard from "../../components/EventDetailsCard";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock } from "lucide-react"; // Added Clock icon
import SessionCard from "../../components/SessionCard";
import { useParams } from "react-router-dom";
import { eventsDummy } from "../../data/events";
import axios from "axios";
import type { Event } from "../../types/Event";

export const ViewEventDetails = () => {
  const { id } = useParams<{ id?: string }>();
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

  // Date formatting functions
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://192.168.201.124:5001/api/Events/${id}`)
      .then((res) => setCurrentEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]); // Added id to dependency array

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
    <>
      <Sidebar />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 mb-6">
            {/* Date Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span className="font-semibold">Dates:</span>
              </div>
              <div className="ml-6">
                {currentEvent?.startDate && currentEvent?.endDate ? (
                  <div>
                    <div>From: {formatDate(currentEvent.startDate)}</div>
                    <div>To: {formatDate(currentEvent.endDate)}</div>
                  </div>
                ) : (
                  <span>Dates not specified</span>
                )}
              </div>
            </div>

            {/* Time Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span className="font-semibold">Time:</span>
              </div>
              <div className="ml-6">
                {currentEvent?.startTime && currentEvent?.endTime ? (
                  <div>
                    <div>Start: {currentEvent.startTime}</div>
                    <div>End: {currentEvent.endTime}</div>
                  </div>
                ) : (
                  <span>Times not specified</span>
                )}
              </div>
            </div>

            {/* Venue Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="font-semibold">Venue:</span>
              </div>
              <div className="ml-6">
                {currentEvent?.venue?.name ? (
                  <div>
                    <div>{currentEvent.venue.name}</div>
                    {currentEvent.venue.location && (
                      <div className="text-sm text-gray-500">
                        {currentEvent.venue.location}
                      </div>
                    )}
                    {currentEvent.venue.address && (
                      <div className="text-sm text-gray-500">
                        {currentEvent.venue.address}
                      </div>
                    )}
                  </div>
                ) : (
                  <span>Venue not specified</span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-600">
              {currentEvent?.description || "No description provided."}
            </p>
          </div>

          {/* Sessions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Sessions ({currentEvent?.sessions?.length || 0})
            </h2>
            {currentEvent?.sessions && currentEvent.sessions.length > 0 ? (
              currentEvent.sessions.map((session, idx) => (
                <div className="mb-4" key={session.id || idx}>
                  <SessionCard session={session} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No sessions scheduled for this event.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
