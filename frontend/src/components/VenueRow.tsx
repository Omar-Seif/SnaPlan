import { useState } from "react";
import RoomRow from "./RoomRow";
import type { Venue } from "../types/Venue";

type VenueRowProps = {
    venue: Venue
}

const VenueRow = ({ venue }: VenueRowProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = (prev: boolean) => (
        prev = !prev
    )

    return (
        <>
            <tr className="hover:bg-gray-50">
                <td className="p-3">{venue.name}</td>
                <td className="p-3 text-gray-600">{venue.address}</td>
                <td className="p-3 text-gray-600">{venue.location}</td>
                <td className="p-3">{venue.rooms.length}</td>
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
            {isOpen && <RoomRow rooms={venue.rooms} />}
        </>
    )
}

export default VenueRow
