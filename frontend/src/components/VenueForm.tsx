import React, { useState } from "react";
import type { Venue } from "../types/Venue";
import { CaseLower, DoorClosed, BookUser, MapPin } from "lucide-react";
import type { Room } from "../types/Room";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CreateVenueForm() {
  const [formData, setFormData] = useState<Venue>({
    name: "",
    address: "",
    location: "",
    rooms: [],
  });
  const mySwal = withReactContent(Swal);
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoomChange = (
    index: number,
    field: "name" | "capacity",
    value: string | number
  ) => {
    const updatedRooms = [...rooms];
    updatedRooms[index] = { ...updatedRooms[index], [field]: value };
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    setRooms((prev) => [...prev, { id: prev.length, name: "", capacity: 1 }]);
  };

  const removeRoom = (index: number) => {
    setRooms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.address ||
      !formData.location ||
      rooms.length === 0
    ) {
      mySwal.fire({
        title: "All fields are required!",
        text: "Please enter data in all the given fields!",
        icon: "warning",
        confirmButtonText: "Continue entering data...",
      });
      return;
    }

    const payload = {
      ...formData,
      rooms, // include rooms inside payload
    };

    try {
      const res = await fetch("https://192.168.201.124:5001/api/Venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // backend expects JSON
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Venue created successfully:", data);

      mySwal.fire({
        title: "Venue created!",
        text: "Your venue has been successfully created.",
        icon: "success",
      });

      navigate("/Organizer/Venues"); // navigate after success
    } catch (error) {
      console.error("Error creating venue:", error);
      mySwal.fire({
        title: "Error!",
        text: "Something went wrong while creating the venue.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="flex md:ml-48 items-center justify-center min-h-screen">
        <form
          action=""
          onSubmit={handleSubmit}
          className="max-w-none my-10 mx-5 px-4 pb-8 pt-4 border border-gray-200 rounded-lg shadow-sm space-y-8 md:w-[700px] lg:w-[900px]"
        >
          {/* Name */}
          <div className="flex items-center gap-2">
            <CaseLower size={18} />
            <input
              type="text"
              name="name"
              placeholder="Venue Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 "
              required
            />
          </div>
          {/* Address */}
          <div className="flex items-center gap-2">
            <BookUser size={18} />
            <input
              type="text"
              name="address"
              placeholder="Venue Address"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 "
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <input
              type="text"
              name="location"
              placeholder="Venue Location"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 "
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          {/* Rooms - Dynamic Add/Remove */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DoorClosed size={18} />
              <span className="font-semibold">Rooms</span>
            </div>

            {rooms.map((room, index) => (
              <div
                key={room.id}
                className="flex items-center gap-2 p-3 border rounded-lg shadow-sm bg-gray-50"
              >
                <input
                  type="text"
                  placeholder="Room Name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
                  value={room.name}
                  onChange={(e) =>
                    handleRoomChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  min={1}
                  className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
                  value={room.capacity}
                  onChange={(e) =>
                    handleRoomChange(index, "capacity", Number(e.target.value))
                  }
                />
                <button
                  type="button"
                  onClick={() => removeRoom(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addRoom}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              + Add Room
            </button>
          </div>

          {/* buttons */}
          <div>
            <button
              type="submit"
              className={cn(
                "h-10 w-full rounded-lg py-2 px-4 font-medium transition duration-300 ease-in-out",
                "inline-flex items-center justify-center gap-2",
                "bg-orange-500 text-white hover:bg-orange-600",
                "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
              )}
            >
              Create Venue
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
