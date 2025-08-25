import { useState } from "react";
import RoomRow from "./RoomRow";



const VenueGrid = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = (prev: boolean) => (
        prev = !prev
    )

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
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Capacity</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* Example row */}
                            <>
                                <tr className="hover:bg-gray-50">
                                    <td className="p-3">Venue A</td>
                                    <td className="p-3 text-gray-600">123 Main St</td>
                                    <td className="p-3 text-gray-600">City Center</td>
                                    <td className="p-3">3</td>
                                    <td className="p-3">500</td>
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsOpen(handleOpen)}
                                                className="px-2 py-1 text-sm rounded border hover:bg-gray-100"
                                            >
                                                {isOpen ? "Hide Rooms" : "View Rooms"}
                                            </button>
                                            <button className="px-2 py-1 text-sm rounded bg-orange-500 text-white hover:bg-orange-600">
                                                Edit Venue
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {isOpen && (
                                    <RoomRow />
                                )}
                            </>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default VenueGrid
