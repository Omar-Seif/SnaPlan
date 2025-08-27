import { Edit, Eye, Trash2 } from "lucide-react";
import type { SubmittedEvent } from "../types/Event";

type SubmittedRowProps = {
  submittedEvent: SubmittedEvent
  handleOnViewClick:(id:string|number)=>void
  handleOnEditClick : (id:string|number)=>void
  handleOnUnSubmit : (id : string|number)=>void
};

const SubmittedRow = ({ submittedEvent ,handleOnViewClick,handleOnEditClick  ,handleOnUnSubmit }: SubmittedRowProps) => {
  const getStatusColor = () => {
    switch (submittedEvent.status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="p-3 border-b border-gray-200 text-gray-800">
        {submittedEvent.title}
      </td>
      <td className="p-3 border-b border-gray-200 text-gray-600">
        {submittedEvent.startDate}
      </td>
      <td className="p-3 border-b border-gray-200 text-gray-600">
        {submittedEvent.endDate}
      </td>
      <td className="p-3 border-b border-gray-200 text-gray-600">
        {submittedEvent.venue}
      </td>
      <td
        className={`inline-flex mt-5 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
      >
        {submittedEvent.status}
      </td>
      <td className="p-3 pl-5 border-b border-gray-200">
        
        <div className="flex gap-3 items-center justify-center">
          <button className="px-3 py-1.5 text-white rounded-md text-sm bg-orange-400  hover:bg-orange-500  transition-colors flex items-center justify-center gap-3  w-full md:w-1/2 hover:cursor-pointer" onClick={()=>handleOnViewClick(submittedEvent.title)}>
            <Eye/>
            View Details
          </button>
          {
            submittedEvent.status === "Active" || submittedEvent.status==="Rejected" ? (
                <button className="px-3 py-1.5 text-white rounded-md text-sm bg-green-400  hover:bg-green-500 transition-colors flex items-center justify-center gap-3  w-full md:w-1/2 hover:cursor-pointer" onClick={()=>handleOnEditClick(submittedEvent.title)}>
                    <Edit/>
                    Edit Details
                </button>
           ) : (
                <button className="px-3 py-1.5 text-white rounded-md text-sm bg-red-400  hover:bg-red-500 transition-colors flex items-center justify-center gap-3 w-full md:w-1/2 hover:cursor-pointer" onClick={()=>handleOnUnSubmit(submittedEvent.title)}>
                    <Trash2/> 
                    Unsubmit
                </button>
           )
          }
        </div>
      </td>
    </tr>
  );
};

export default SubmittedRow;
