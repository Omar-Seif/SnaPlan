import { useState } from "react";
import RoomRow from "./RoomRow";
import type { Venue } from "../types/Venue";
import { Divide, Edit, Eye, EyeClosed } from "lucide-react";
import {useNavigate} from "react-router-dom"

type VenueRowProps = {
  venue: Venue;
};

const VenueRow = ({ venue }: VenueRowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleOpen = (prev: boolean) => (prev = !prev);
  const handleonEditClick = (id : number) =>{
        navigate(`/organizer/EditVenue/${id}`)
    }
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
              <div className="flex gap-2">
                {
                    isOpen ? 
                    (
                       <>
                         <EyeClosed/>
                         <span>Hide Rooms</span>
                       </>
                        
                    ):(
                        <>
                            <Eye/>
                            <span>Show Rooms</span>
                        </>
                    )
                }
              </div>
            </button>
            <button
              className="px-2 py-1 text-sm rounded bg-orange-500 text-white hover:bg-orange-600 flex gap-2"
              onClick={() => {
                if (typeof venue.id === "number") {
                  handleonEditClick(venue.id);
                }
              }}
              disabled={typeof venue.id !== "number"}
            >
              <Edit />
              Edit Venue
            </button>
          </div>
        </td>
      </tr>
      {isOpen && <RoomRow rooms={venue.rooms} />}
    </>
  );
};

export default VenueRow;
