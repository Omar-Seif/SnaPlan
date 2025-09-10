import React, { useState, useContext } from "react";
import type { Event } from "../types/Event";
import type { Session } from "../types/Session";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { AuthContext } from "../Auth/Authentication";

interface Props {
  formData: Event;
  sessions: Session[];
  image: File | null;
  prevStep: () => void;
  id: string | undefined;
}

const Step3ReviewSubmit: React.FC<Props> = ({
  formData,
  sessions,
  image,
  prevStep,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const mySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = new FormData();

      // Append basic event fields (matching CreateEventDto)
      data.append("Title", formData.title);
      data.append("Description", formData.description || "");
      data.append("StartDate", new Date(formData.startDate).toISOString());
      data.append("EndDate", new Date(formData.endDate).toISOString());
      data.append("StartTime", formData.startTime || "");
      data.append("EndTime", formData.endTime || "");
      data.append("OrganizerId", user?.id?.toString() || "");
      data.append("VenueId", formData.venue.id?.toString() || "");
      data.append("Status", "Submitted");

      // Append sessions as JSON string (matching SessionsJson property)
      const sessionsPayload = sessions.map((s) => ({
        Name: s.name,
        Day: s.timeSlot?.day || "",
        StartDate: s.timeSlot?.startDate || "",
        EndDate: s.timeSlot?.endDate || "",
        SpeakerName: s.speaker.name,
        SpeakerBio: s.speaker.bio,
        SpeakerProfile: s.speaker.profile,
      }));

      data.append("SessionsJson", JSON.stringify(sessionsPayload));

      // If creating a new venue, append venue data
      if (!formData.venue.id && formData.venue.name) {
        data.append("NewVenue.Name", formData.venue.name);
        data.append("NewVenue.Address", formData.venue.address);
        data.append("NewVenue.Location", formData.venue.location);

        // Append rooms for new venue
        formData.venue.rooms.forEach((room, index) => {
          data.append(`NewVenue.Rooms[${index}].Name`, room.name);
          data.append(
            `NewVenue.Rooms[${index}].Capacity`,
            room.capacity.toString()
          );
        });
      }

      if (image) {
        data.append("Image", image, image.name);
      }

      // Debug: log all form data entries
      console.log("FormData contents:");
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      await axios.put(`https://192.168.201.124:5001/api/Events/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      mySwal
        .fire({
          title: "🎉 Event Created!",
          text: "Your event has been successfully created.",
          icon: "success",
          confirmButtonText: "Go to My Events",
          confirmButtonColor: "#FF6B35",
        })
        .then(() => navigate("/organizer/Home"));
    } catch (err) {
      console.error("Full error:", err);
      if (axios.isAxiosError(err)) {
        console.error("Server response:", err.response?.data);
        mySwal.fire({
          title: "Error",
          text: `Failed to create event: ${
            err.response?.data?.errors?.Title?.[0] || err.message
          }`,
          icon: "error",
          confirmButtonColor: "#FF6B35",
        });
      } else {
        mySwal.fire({
          title: "Error",
          text: "Failed to create event. Please try again.",
          icon: "error",
          confirmButtonColor: "#FF6B35",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchEventDetails = async (id: string | number) => {
    const res = await axios.get(
      `https://192.168.201.124:5001/api/Events/${id}`
    );
    return res.data;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const data = new FormData();

      // Append basic event fields (matching CreateEventDto)
      data.append("Title", formData.title);
      data.append("Description", formData.description || "");
      data.append("StartDate", new Date(formData.startDate).toISOString());
      data.append("EndDate", new Date(formData.endDate).toISOString());
      data.append("StartTime", formData.startTime || "");
      data.append("EndTime", formData.endTime || "");
      data.append("OrganizerId", user?.id?.toString() || "");
      data.append("VenueId", formData.venue.id?.toString() || "");
      data.append("Status", "Draft");

      // Append sessions as JSON string (matching SessionsJson property)
      const sessionsPayload = sessions.map((s) => ({
        Name: s.name,
        Day: s.timeSlot?.day || "",
        StartDate: s.timeSlot?.startDate || "",
        EndDate: s.timeSlot?.endDate || "",
        SpeakerName: s.speaker.name,
        SpeakerBio: s.speaker.bio,
        SpeakerProfile: s.speaker.profile,
      }));

      data.append("SessionsJson", JSON.stringify(sessionsPayload));

      // If creating a new venue, append venue data
      if (!formData.venue.id && formData.venue.name) {
        data.append("NewVenue.Name", formData.venue.name);
        data.append("NewVenue.Address", formData.venue.address);
        data.append("NewVenue.Location", formData.venue.location);

        // Append rooms for new venue
        formData.venue.rooms.forEach((room, index) => {
          data.append(`NewVenue.Rooms[${index}].Name`, room.name);
          data.append(
            `NewVenue.Rooms[${index}].Capacity`,
            room.capacity.toString()
          );
        });
      }

      if (image) {
        data.append("Image", image, image.name);
      }

      // Debug: log all form data entries
      console.log("FormData contents:");
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      await axios.put(`https://192.168.201.124:5001/api/Events/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      mySwal
        .fire({
          title: "🎉 Event Edited And Saved",
          text: "Your event has been successfully Saved And Editted.",
          icon: "success",
          confirmButtonText: "Go to My Events",
          confirmButtonColor: "#FF6B35",
        })
        .then(() => navigate("/organizer/Home"));
    } catch (err) {
      console.error("Full error:", err);
      if (axios.isAxiosError(err)) {
        console.error("Server response:", err.response?.data);
        mySwal.fire({
          title: "Error",
          text: `Failed to create event: ${
            err.response?.data?.errors?.Title?.[0] || err.message
          }`,
          icon: "error",
          confirmButtonColor: "#FF6B35",
        });
      } else {
        mySwal.fire({
          title: "Error",
          text: "Failed to save event. Please try again.",
          icon: "error",
          confirmButtonColor: "#FF6B35",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    const [hours] = timeString.split(":");
    const hour = parseInt(hours);
    return `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Review Your Event
        </h2>
        <p className="text-gray-600">
          Please review all details before submitting your event
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Event Image */}
        {image && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={URL.createObjectURL(image)}
              alt="Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}

        {/* Event Details */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {formData.title}
            </h3>
            {formData.description && (
              <p className="text-gray-600 leading-relaxed">
                {formData.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date & Time */}
            <div className="flex items-start space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">
                  Date & Time
                </h4>
                <p className="text-gray-600">
                  {formatDate(formData.startDate)} at{" "}
                  {formatTime(formData.startTime)}
                </p>
                <p className="text-gray-600">
                  to {formatDate(formData.endDate)} at{" "}
                  {formatTime(formData.endTime)}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPinIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Venue</h4>
                <p className="text-gray-600">{formData.venue.name}</p>
                <p className="text-gray-600">{formData.venue.location}</p>
              </div>
            </div>
          </div>

          {/* Sessions */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Sessions
            </h3>
            {sessions.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-500">No sessions added to this event</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {session.name}
                        </h4>
                        {session.timeSlot?.day && (
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                              {session.timeSlot.day}
                            </span>
                            <span className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {session.timeSlot.startDate} -{" "}
                              {session.timeSlot.endDate}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <img
                          src={session.speaker.profile}
                          alt={session.speaker.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-600">
                          {session.speaker.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          disabled={loading}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back</span>
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center space-x-2 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Event</span>
          )}
        </button>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Saving..</span>
            </>
          ) : (
            <span>Save Event As Draft</span>
          )}
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-700 mt-4">Creating your event...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3ReviewSubmit;
