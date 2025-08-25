import { Edit, Trash2 } from "lucide-react"
import type { DraftEvent } from "../types/Event"


type DraftRowProps = {
    draftEvent: DraftEvent
}

const DraftRow = ({ draftEvent }: DraftRowProps) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-3 border-b border-gray-200 text-gray-800">{draftEvent.title}</td>
            <td className="p-3 border-b border-gray-200 text-gray-600">{draftEvent.startDate}</td>
            <td className="p-3 border-b border-gray-200 text-gray-600">{draftEvent.endDate}</td>
            <td className="p-3 border-b border-gray-200 text-gray-600">{draftEvent.venue}</td>
            <td className="p-3 border-b border-gray-200">
                <button className="p-3 py-1.5 text-blue-600 rounded-md text-sm  hover:bg-orange-100 transition-colors">
                    <Edit />
                </button>
                <button className="p-3 py-1.5 text-red-600 rounded-md text-sm  hover:bg-orange-100 transition-colors">
                    <Trash2 />
                </button>
            </td>
        </tr>
    )
}

export default DraftRow
