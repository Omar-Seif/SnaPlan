// Step1EventDetails.tsx
import React from "react";
import type { Event } from "../types/Event";
import type { Venue } from "../types/Venue";
import { Calendar, Clock, MapPin, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

interface Props {
  formData: Event;
  setFormData: React.Dispatch<React.SetStateAction<Event>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  venues: Venue[];
  nextStep: () => void;
}

const Step1EventDetails: React.FC<Props> = ({
  formData,
  setFormData,
  image,
  setImage,
  venues,
  nextStep,
}) => {
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "venues") {
      if (value === "Add") {
        navigate("/organizer/CreateVenue");
        return;
      }
      const selectedVenue = venues.find((v) => v.name === value);
      if (selectedVenue) setFormData((prev) => ({ ...prev, venue: selectedVenue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <form
      className="max-w-none my-10 mx-5 px-4 pb-8 pt-4 border border-gray-200 rounded-lg shadow-sm space-y-8 md:w-[700px] lg:w-[900px]"
      onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }}
    >
      {/* Image */}
      <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative">
        {image ? (
          <img src={image} alt="Event" className="w-full h-full object-cover" />
        ) : (
          <label className="flex flex-col items-center justify-center cursor-pointer text-gray-500">
            <Upload size={32} />
            <span className="mt-2 text-sm">Click to upload event image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        )}
      </div>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Event title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 focus:border-orange-400"
        required
      />

      {/* Dates & Time */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <input type="number" name="startTime" min="0" max="23" value={formData.startTime} onChange={handleChange} required />
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <input type="number" name="endTime" min="0" max="23" value={formData.endTime} onChange={handleChange} required />
        </div>
      </div>

      {/* Venue */}
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin size={18} />
        <select className="w-160 px-3 py-2 border border-gray-300 rounded-lg" name="venues" value={formData.venue.name} onChange={handleChange} >
          <option value="">Select Venue</option>
          {venues.map((v, i) => (
            <option value={v.name} key={i}>
              {v.name} - {v.location}
            </option>
          ))}
          <option value="Add">Add New Venue</option>
        </select>
      </div>

      {/* Description */}
      <textarea
        placeholder="Event description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={5}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />

      <button type="submit" className={cn("h-10 w-full bg-orange-500 text-white rounded")}>
        Next: Add Sessions
      </button>
    </form>
  );
};

export default Step1EventDetails;
