import React, { useState, useEffect } from "react";
import type { Venue } from "../types/Venue";
import { CaseLower, DoorClosed, BookUser, MapPin } from "lucide-react";
import type { Room } from "../types/Room";
import { cn } from "../lib/utils";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

export default function EditVenueForm() {
  const { id } = useParams<{ id?: string }>();
  const mySwal = withReactContent(Swal);
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Venue>({
    name: "",
    address: "",
    location: "",
    rooms: [],
  });

  // Fetch venue details
  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://192.168.201.124:5001/api/Venues/${id}`)
      .then((res) => {
        setFormData(res.data);
        setRooms(res.data.rooms || []);
      })
      .catch((err) => {
        console.error(err);
        mySwal.fire({
          title: "Error",
          text: "Failed to load venue data!",
          icon: "error",
        });
      });
  }, [id]);

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
    setRooms((prev) => [
      ...prev,
      { id: Date.now(), name: "", capacity: 1, venueId: Number(id) },
    ]);
  };

  const removeRoom = (index: number) => {
    setRooms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.location || rooms.length === 0) {
      mySwal.fire({
        title: "All fields are required!",
        text: "Please enter data in all the given fields!",
        icon: "warning",
        confirmButtonText: "Continue entering data...",
      });
      return;
    }

    try {
      const updatedVenue = { ...formData, rooms };
      await axios.put(`https://192.168.201.124:5001/api/Venues/${id}`, updatedVenue, {
        headers: { "Content-Type": "application/json" },
      });

      mySwal
        .fire({
          title: "Venue updated!",
          text: "Your changes have been saved successfully.",
          icon: "success",
          confirmButtonText: "Continue",
        })
        .then(() => {
          navigate("/organizer/Venues");
        });
    } catch (error) {
      console.error(error);
      mySwal.fire({
        title: "Error",
        text: "Failed to update venue!",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex md:ml-48 items-center justify-center min-h-screen">
      <form
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
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 "
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
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 "
            required
          />
        </div>

        {/* Rooms */}
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
                onChange={(e) => handleRoomChange(index, "name", e.target.value)}
              />
              <input
                type="number"
                placeholder="Capacity"
                min={1}
                className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
                value={room.capacity}
                onChange={(e) => handleRoomChange(index, "capacity", Number(e.target.value))}
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

        {/* Submit */}
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
            Submit Changes
          </button>
        </div>
      </form>
    </div>
  );
}
