import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { SubmittedEvent } from "../types/Event";
import { getSubmittedEventsMock } from "../services/EventService";
import SubmittedRow from "./SubmittedRow";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubmittedGrid = () => {
  const [submittedEvents, setSubmittedEvents] = useState<SubmittedEvent[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start with true
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmittedEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "https://192.168.201.124:5001/api/Events/submitted"
        );
        setSubmittedEvents(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching submitted events:", err);
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmittedEvents();
  }, []);

  const handleOnViewClick = (id: string | number) => {
    navigate(`/organizer/ViewEventDetails/${id}`);
  };

  const handleOnEditClick = (id: string | number) => {
    navigate(`/organizer/EditEvent/${id}`);
  };

  const handleOnUnsubmit = (id: string | number) => {
    MySwal.fire({
      title: "Unsubmit event",
      text: "Are you sure you want to unsubmit this event? (This action is permanent)",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Unsubmit event",
    }).then((result) => {
      if (result.isConfirmed) {
        // Use the dedicated unsubmit endpoint
        axios
          .post(`https://192.168.201.124:5001/api/Events/${id}/unsubmit`)
          .then((response) => {
            // Remove the event from the local state
            setSubmittedEvents((prevEvents) =>
              prevEvents.filter((event) => event.id !== id)
            );

            MySwal.fire(
              "Unsubmit complete",
              "Successfully unsubmitted event",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error unsubmitting event:", error);

            // Show detailed error message
            const errorMessage =
              error.response?.data?.message ||
              error.response?.data?.errors?.Title?.[0] ||
              "Failed to unsubmit event. Please try again.";

            MySwal.fire("Error", errorMessage, "error");
          });
      }
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle className="animate-spin h-12 w-12 text-orange-500" />
        <span className="ml-3 text-gray-600">Loading events...</span>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">Error Loading Events</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Events Table Section */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden mt-5">
        {/* Table Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Submitted Events List
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                  Event Title
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                  Start Date
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                  End Date
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                  Venue
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                  Status
                </th>
                <th className="ml-3 p-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {submittedEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No submitted events found.
                  </td>
                </tr>
              ) : (
                submittedEvents.map((event, index) => (
                  <SubmittedRow
                    submittedEvent={event}
                    key={event.id || index} // Use event.id if available
                    handleOnViewClick={handleOnViewClick}
                    handleOnEditClick={handleOnEditClick}
                    handleOnUnSubmit={handleOnUnsubmit}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer - Only show if there are events */}
        {submittedEvents.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {submittedEvents.length} of {submittedEvents.length}{" "}
              submitted events
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubmittedGrid;
