import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import type { Venue } from "../../types/Venue";
import { DoorClosed, BookUser, MapPin } from "lucide-react";
export default function CreateVenueForm() {
  const [formData, setFormData] = useState<Venue>({
    name: "",
    address: "",
    location: "",
    rooms: [],
  });

  return (
    <>
      <Sidebar />
      <div className="flex items-center justify-center min-h-screen">
        <form
          action=""
          className="max-w-none my-10 mx-5 px-4 pb-8 pt-4 border border-gray-200 rounded-lg shadow-sm space-y-8 md:w-[700px] lg:w-[900px]"
        >
          {/* Name */}
          <div>
            <input
              type="text"
              name="Name"
              placeholder="Venue Name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 "
              required
            />
          </div>
          {/* Address */}
          <div className="flex items-center gap-2">
            <BookUser size={18} />
            <input
              type="text"
              name="Address"
              placeholder="Venue Address"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 "
              required
            />
          </div>
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <input
              type="text"
              name="Location"
              placeholder="Venue Location"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 "
              required
            />
          </div>
          {/* Rooms */}

          <div className="flex items-center gap-2">
            <DoorClosed size={18} />
            <input
              type="number"
              name="noofrooms"
              id=""
              min="1"
              max="100000"
              placeholder="# of rooms"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400
             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </form>
      </div>
    </>
  );
}
