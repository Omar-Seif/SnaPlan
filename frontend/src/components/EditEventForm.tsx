import { eventsDummy } from "../data/events";
import type { Event } from "../types/Event";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Calendar,
  LoaderCircle,
  MapPin,
  Upload,
  PlusCircle,
  Clock,
} from "lucide-react";
import type { Session } from "../types/Session";
import SessionCard from "./SessionCard";
import { cn } from "../lib/utils";
import type { Venue } from "../types/Venue";

export const EditEventForm = () => {
  const mySwal = withReactContent(Swal);
  const [venues, setVenues] = useState<Venue[]>([]);
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

  // load event by id (title)
  useEffect(() => {
    if (!id) return;
    const ev = eventsDummy.find((e) => e.title === id);
    if (ev) setCurrentEvent(ev);
    else console.error("Cannot find specified event");
  }, [id]);

  // populate venues list (unique by name) from eventsDummy
  useEffect(() => {
    const allVenues = eventsDummy
      .map((e) => e.venue)
      .filter(Boolean) as Venue[];
    const unique = Array.from(
      new Map(allVenues.map((v) => [v.name, v])).values()
    );
    setVenues(unique);
  }, []);

  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
      // keep currentEvent.image in sync with preview
      setCurrentEvent((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "venues") {
      if (value === "Add") {
        navigate("/organizer/CreateVenue");
        return;
      }
      const selectedVenue = venues.find((venue) => venue.name === value);
      if (selectedVenue) {
        setCurrentEvent((prev) => ({
          ...prev,
          venue: selectedVenue,
        }));
      }
    } else {
      setCurrentEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const convertToInputDateFormat = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    const dd = String(day).padStart(2, "0");
    const mm = String(month).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      !image ||
      !currentEvent.title ||
      !currentEvent.startDate ||
      !currentEvent.endDate ||
      !currentEvent.venue ||
      !currentEvent.description
    ) {
      mySwal.fire({
        title: "All fields are required!",
        text: "Please enter data in all the given fields!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Continue entering data...",
      });
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      mySwal
        .fire({
          title: "Event Submitted!",
          text: "Event created and submitted successfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Continue",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/organizer/MyEvents");
          }
        });
    }, 1500);
  };

  const handleDraft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      mySwal
        .fire({
          title: "Event Saved!",
          text: "Event Data has been saved successfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Continue",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/organizer/DraftEvents");
          }
        });
      navigate("/organizer/DraftEvents");
    }, 1000);
  };

  const handleAddSession = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/organizer/ManageSessions");
  };

  return (
    <div className="flex items-center md:ml-48 justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-none my-10 mx-5 px-4 pb-8 pt-4 border border-gray-200 rounded-lg shadow-sm space-y-8 md:w-[700px] lg:w-[900px]"
      >
        {/* Image Upload */}
        <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative">
          {currentEvent.image ? (
            <>
              <img
                src={currentEvent.image}
                alt="Event preview"
                className="w-full h-full object-cover"
              />
              <label className=" p-4 flex flex-col items-center justify-center cursor-pointer text-black hover:underline">
                Change picture
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer text-gray-500">
              <Upload size={32} />
              <span className="mt-2 text-sm">Click to upload event image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        {/* Title */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Event title"
            value={currentEvent.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 focus:border-orange-400"
            required
          />
        </div>

        {/* Date Range */}
        <div className="flex flex-wrap gap-6 text-gray-600 flex-col">
          <span>Specify start and end time of the event (24-hour format)</span>
          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <input
                type="date"
                name="startDate"
                value={currentEvent.startDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <input
                type="date"
                name="endDate"
                value={currentEvent.endDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <input
                type="number"
                name="startTime"
                min={0}
                max={23}
                value={currentEvent.startTime}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <input
                type="number"
                name="endTime"
                min={0}
                max={23}
                value={currentEvent.endTime}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={18} />
          <select
            className="w-160 px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
            name="venues"
            value={currentEvent.venue?.name || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Venue</option>
            {venues.map((venue, index) => (
              <option value={venue.name} key={index}>
                {venue.name} - {venue.location}
              </option>
            ))}
            <option value="Add">Add New Venue</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Event description"
            name="description"
            value={currentEvent.description}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>

        {/* Create Session area */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <button
            type="button"
            className="w-[350px] border border-gray-300 rounded-full px-4 py-4 hover:border-orange-400 flex gap-2 items-center justify-center bg-gray-300 transition transform duration-200 ease-in-out hover:-translate-y-2 hover:shadow-lg"
            onClick={handleAddSession}
          >
            <PlusCircle size={18} />
            <span>Add new session</span>
          </button>

          <div className="w-full mt-4">
            {currentEvent.sessions?.length === 0 ? (
              <h2 className="text-center text-gray-500">
                No sessions have been added...
              </h2>
            ) : (
              currentEvent.sessions?.map((session: Session, index: number) => (
                <SessionCard session={session} key={index} />
              ))
            )}
          </div>
        </div>

        {/* Save as Draft Button */}
        <div>
          <button
            type="button"
            disabled={loading}
            onClick={handleDraft}
            className={cn(
              "h-10 w-full rounded-lg py-2 px-4 font-medium transition duration-300 ease-in-out",
              "inline-flex items-center justify-center gap-2",
              "bg-blue-500 text-white hover:bg-blue-600",
              "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
            )}
          >
            Save Changes
          </button>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "h-10 w-full rounded-lg py-2 px-4 font-medium transition duration-300 ease-in-out",
              "inline-flex items-center justify-center gap-2",
              "bg-orange-500 text-white hover:bg-orange-600",
              "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
            )}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Submit Event Details"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
