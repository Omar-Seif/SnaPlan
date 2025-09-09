import { Edit, Eye, Trash2 } from "lucide-react";
import type { SubmittedEvent } from "../types/Event";

type SubmittedRowProps = {
  submittedEvent: SubmittedEvent;
  handleOnViewClick: (id: string | number) => void;
  handleOnEditClick: (id: string | number) => void;
  handleOnUnSubmit: (id: string | number) => void;
};

const SubmittedRow = ({
  submittedEvent,
  handleOnViewClick,
  handleOnEditClick,
  handleOnUnSubmit,
}: SubmittedRowProps) => {
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

  // ✅ Safely format dates
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "—";
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return String(date);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Title */}
      <td className="p-3 border-b border-gray-200 text-gray-800">
        {submittedEvent.title || "Untitled Event"}
      </td>

      {/* Start Date */}
      <td className="p-3 border-b border-gray-200 text-gray-600">
        {formatDate(submittedEvent.startDate)}
      </td>

      {/* End Date */}
      <td className="p-3 border-b border-gray-200 text-gray-600">
        {formatDate(submittedEvent.endDate)}
      </td>

      {/* Venue */}
      <td className="p-3 border-b border-gray-200 text-gray-600">
        {typeof submittedEvent.venue === "string"
          ? submittedEvent.venue
          : submittedEvent.venue.name || "—"}
      </td>

      {/* Status */}
      <td className="p-3 border-b border-gray-200">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
        >
          {submittedEvent.status || "Pending"}
        </span>
      </td>

      {/* Actions */}
      <td className="p-3 pl-5 border-b border-gray-200">
        <div className="flex gap-3 items-center justify-center">
          {/* View Button */}
          <button
            className="px-3 py-1.5 text-white rounded-md text-sm bg-orange-400 hover:bg-orange-500 transition-colors flex items-center justify-center gap-3 w-full md:w-1/2 hover:cursor-pointer"
            onClick={() => submittedEvent.id && handleOnViewClick(submittedEvent.id)}
          >
            <Eye />
            View Details
          </button>

          {/* Edit / Unsubmit Buttons */}
          {submittedEvent.status === "Active" ||
          submittedEvent.status === "Rejected" ? (
            <button
              className="px-3 py-1.5 text-white rounded-md text-sm bg-green-400 hover:bg-green-500 transition-colors flex items-center justify-center gap-3 w-full md:w-1/2 hover:cursor-pointer"
              onClick={() =>
                submittedEvent.id && handleOnEditClick(submittedEvent.id)
              }
            >
              <Edit />
              Edit Details
            </button>
          ) : (
            <button
              className="px-3 py-1.5 text-white rounded-md text-sm bg-red-400 hover:bg-red-500 transition-colors flex items-center justify-center gap-3 w-full md:w-1/2 hover:cursor-pointer"
              onClick={() =>
                submittedEvent.id && handleOnUnSubmit(submittedEvent.id)
              }
            >
              <Trash2 />
              Unsubmit
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default SubmittedRow;
