import { useEffect, useState } from "react";
import VenueRow from "./VenueRow";
import type { Venue } from "../types/Venue";
import { getVenuesMock } from "../services/VenueService";
import { LoaderCircle } from "lucide-react";

const VenueGrid = () => {

    const [venues, setVenues] = useState<Venue[]>([])
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                setLoading(true)
                setError(null)
                const venues = await getVenuesMock()
                setVenues(venues)
            } catch (err) {
                console.error(err)
                setError(err instanceof Error ? err.message : "Failed to load events");
            } finally {
                setLoading(false)
            }
        }
        fetchVenues();
    },
        [])

    return (
        <>
            <div className="rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden mt-5">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">Venues</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Venue</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Address</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Location</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Rooms</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* Example row */}

                            {error && <div className="error-message">{error}</div>}

                            {loading ? <LoaderCircle className="animate-spin" color={loading ? "#9CA3AF" : "#fff"} /> :
                                <>
                                    {venues.map((venue, index) => (
                                        <VenueRow venue={venue} key={index} />
                                    ))}
                                </>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default VenueGrid
