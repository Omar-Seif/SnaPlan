import React, { useState } from "react";
import { Calendar, MapPin, Ticket as TicketIcon, Upload } from "lucide-react";
import type { Ticket } from "../types/Ticket";

const ticketOptions: Ticket["type"][] = ["Standard", "Premium", "VIP"];

const EventForm = () => {
    const [image, setImage] = useState<string>("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [venue, setVenue] = useState("");
    const [selectedTickets, setSelectedTickets] = useState<Ticket["type"][]>([]);
    const [description, setDescription] = useState("");


    const handleTicketChange = (type: Ticket["type"]) => {
        setSelectedTickets((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        )
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);
            setImage(previewUrl);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            title,
            startDate,
            endDate,
            venue,
            ticket: selectedTickets.map((type, idx) => ({ id: idx + 1, type })),
            description,
            image,
        };
        console.log("Event created:", formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="max-w-none my-10 mx-5 px-4 pb-8 pt-4 border border-gray-200 rounded-lg shadow-sm space-y-8 md:w-[700px] lg:w-[900px]"
            >
                {/* Image Upload */}
                <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative">
                    {image ? (
                        <img
                            src={image}
                            alt="Event preview"
                            className="w-full h-full object-cover"
                        />
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
                        placeholder="Event title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 focus:border-orange-400"
                        required
                    />
                </div>

                {/* Date Range */}
                <div className="flex flex-wrap gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
                            required
                        />
                    </div>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    <input
                        type="text"
                        placeholder="Event location"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
                        required
                    />
                </div>

                {/* Ticket Types */}
                <div>
                    <label className="flex items-center gap-2 text-orange-600 mb-3 font-medium">
                        <TicketIcon size={18} />
                        Ticket Categories
                    </label>
                    <div className="flex gap-4">
                        {ticketOptions.map((type) => (
                            <label key={type} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedTickets.includes(type)}
                                    onChange={() => handleTicketChange(type)}
                                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                                />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <textarea
                        placeholder="Event description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
                    />
                </div>

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
