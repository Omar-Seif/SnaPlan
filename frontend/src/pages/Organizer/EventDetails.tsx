import Navbar from "../../components/Navbar"
import { Calendar, MapPin, Ticket } from "lucide-react";
import SessionCard from "../../components/SessionCard";


const EventDetailsOrganizer = () => {
    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center min-h-screen">

                <div className="max-w-5xl my-10 mx-5 px-4 pb-8 pt-4 border border-gray-200 rounded-lg shadow-sm">

                    {/* Image Banner */}

                    <div className="w-full h-64 rounded-lg overflow-hidden mb-6">
                        <img
                            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
                            alt="Tech Innovation Summit 2023"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Title */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">Tech Innovation Summit 2023</h1>
                        <span
                            className={`px-2 py-1 text-sm rounded-full mt-4 `}
                        >
                            Accepted
                        </span>
                    </div>

                    {/* Date & Venue */}

                    <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>15/11 - 17/11</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>Grand Convention Center, Dubai</span>
                        </div>
                    </div>

                    {/* Tickets */}

                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 text-orange-600 mb-6">
                            <Ticket size={18} />
                            <span>VIP - Standard</span>
                        </div>
                    </div>


                    {/* Description */}

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Description
                        </h2>
                        <p className="text-gray-600">This is Innovatiion Summit</p>
                    </div>


                    {/* Sessions */}


                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Sessions
                        </h2>

                        <SessionCard />

                    </div>



                    <div className="flex gap-4">
                        <button
                            className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500"
                        >
                            Edit Event
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        >
                            View Registrations
                        </button>
                    </div>
                </div>

            </div>


        </>
    )
}

export default EventDetailsOrganizer
