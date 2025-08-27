import { Edit, Trash2 } from "lucide-react"
import type { DraftEvent } from "../types/Event"
import {useNavigate} from "react-router-dom"

type DraftRowProps = {
    draftEvent: DraftEvent
    handleonDeleteClick: (id:string|number)=>void
}

const DraftRow = ({ draftEvent , handleonDeleteClick }: DraftRowProps) => {
    const navigate = useNavigate();
    const handleOnEditClick = () =>{
        navigate(`/organizer/EditEvent/${draftEvent.title}`)
    }
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-3 border-b border-gray-200 text-gray-800">{draftEvent.title}</td>
            <td className="p-3 border-b border-gray-200 text-gray-600">{draftEvent.startDate}</td>
            <td className="p-3 border-b border-gray-200 text-gray-600">{draftEvent.endDate}</td>
            <td className="p-3 border-b border-gray-200 text-gray-600">{draftEvent.venue}</td>
            <td className="p-3 border-b border-gray-200">
                <button className="p-3 py-1.5 text-blue-600 rounded-md text-sm  hover:bg-orange-100 transition-colors" onClick={()=>handleOnEditClick()}>
                    <Edit />
                </button>
                <button className="p-3 py-1.5 text-red-600 rounded-md text-sm  hover:bg-orange-100 transition-colors">
                    <Trash2 onClick={()=>handleonDeleteClick(draftEvent.title)} />
                </button>
            </td>
        </tr>
    )
}

export default DraftRow
