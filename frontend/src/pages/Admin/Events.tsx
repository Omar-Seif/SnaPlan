import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Check,
  X,
  Trash2,
  LoaderCircle,
} from "lucide-react";
import SearchAndFilter from "./SearchAndFilter";
import SideBar from "../Admin/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Events() {
  interface Conference {
    id: string;
    name: string;
    status: "upcoming" | "ongoing" | "completed" | "cancelled";
    state: "Accepted" | "Rejected" | "Not Assigned";
    organizerName: string;
    createdDate: string;
    lastUpdated: string;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | Conference["status"]
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    field: keyof Conference;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);

  const entriesPerPage = 15;
  const mySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/Admin/events", {
          headers: { "Content-Type": "application/json" },
        });

        const mapped: Conference[] = response.data.map((event: any) => ({
          id:
            event.id ||
            event._id ||
            `CONF-${Math.random().toString(36).substr(2, 9)}`,
          name: event.title || event.name || "Untitled Event",
          status: mapEventStatus(event.status),
          state: mapEventState(event.status), // Use status instead of separate state field
          organizerName:
            event.organizerName || event.organizer?.name || "Unknown Organizer",
          createdDate: formatDate(event.createdDate),
          lastUpdated: formatDate(
            event.updatedAt || event.last_updated || event.createdDate
          ),
        }));

        setConferences(mapped);
      } catch (err: any) {
        console.error("Failed to fetch conferences:", err);
        mySwal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data?.message || "Failed to fetch events from server",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const mapEventStatus = (apiStatus: string): Conference["status"] => {
    const map: Record<string, Conference["status"]> = {
      draft: "upcoming",
      submitted: "upcoming",
      active: "ongoing",
      ongoing: "ongoing",
      completed: "completed",
      finished: "completed",
      cancelled: "cancelled",
      canceled: "cancelled",
    };
    return map[apiStatus?.toLowerCase()] || "upcoming";
  };

  const mapEventState = (apiStatus: string): Conference["state"] => {
    if (!apiStatus) return "Not Assigned";

    // Map based on the actual status from API
    switch (apiStatus.toLowerCase()) {
      case "draft":
        return "Not Assigned"; // Draft = still being worked on
      case "submitted":
        return "Not Assigned"; // Submitted = waiting for admin review
      case "active":
        return "Accepted"; // Active = approved and running
      case "approved":
      case "accepted":
        return "Accepted";
      case "rejected":
      case "declined":
      case "cancelled":
        return "Rejected";
      default:
        return "Not Assigned";
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "Unknown";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  const getStatusColor = (status: Conference["status"]): string => {
    switch (status) {
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "ongoing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusText = (status: Conference["status"]): string => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "UPCOMING";
      case "ongoing":
        return "ONGOING";
      case "completed":
        return "COMPLETED";
      case "cancelled":
        return "CANCELLED";
      default:
        return "UNKNOWN";
    }
  };

  const getStateEmoji = (state: Conference["state"]): string => {
    switch (state) {
      case "Accepted":
        return "✅";
      case "Rejected":
        return "❌";
      case "Not Assigned":
        return "🔎";
      default:
        return "❓";
    }
  };

  // Editing
  const startEditing = (
    rowId: string,
    field: keyof Conference,
    currentValue: string
  ) => {
    setEditingCell({ rowId, field });
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (!editingCell) return;
    setConferences((prev) =>
      prev.map((conf) =>
        conf.id === editingCell.rowId
          ? { ...conf, [editingCell.field]: editValue, lastUpdated: "Just now" }
          : conf
      )
    );
    setEditingCell(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  // Delete
  const deleteConference = (id: string) => {
    setConferences((prev) => prev.filter((c) => c.id !== id));
    setShowDeleteConfirm(null);
    const remainingCount = conferences.length - 1;
    const newTotalPages = Math.ceil(remainingCount / entriesPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  // Filter + Pagination
  const filteredConferences = conferences.filter((conf) => {
    const q = searchTerm.trim().toLowerCase();

    const matchesSearch =
      q === "" ||
      (conf.name ?? "").toString().toLowerCase().includes(q) ||
      (conf.id ?? "").toString().toLowerCase().includes(q) ||
      (conf.organizerName ?? "").toString().toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" || conf.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredConferences.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentConferences = filteredConferences.slice(startIndex, endIndex);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: "all" | Conference["status"]) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Editable cell renderer
  const renderEditableCell = (
    conference: Conference,
    field: keyof Conference,
    value: string,
    isDropdown = false
  ) => {
    const isEditing =
      editingCell?.rowId === conference.id && editingCell?.field === field;

    if (isEditing) {
      if (isDropdown) {
        if (field === "status") {
          return (
            <div className="flex items-center gap-2">
              <select
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-white text-gray-900 px-2 py-1 rounded text-sm outline-none border border-blue-400"
                autoFocus
              >
                <option value="upcoming">upcoming</option>
                <option value="ongoing">ongoing</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
              </select>
              <button onClick={saveEdit} className="text-green-600">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={cancelEdit} className="text-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        }
        if (field === "state") {
          return (
            <div className="flex items-center gap-2">
              <select
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-white text-gray-900 px-2 py-1 rounded text-sm outline-none border border-blue-400"
                autoFocus
              >
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Not Assigned">Not Assigned</option>
              </select>
              <button onClick={saveEdit} className="text-green-600">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={cancelEdit} className="text-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        }
      }
      return (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-white text-gray-900 px-2 py-1 rounded text-sm border border-blue-400 flex-1"
            autoFocus
          />
          <button onClick={saveEdit} className="text-green-600">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={cancelEdit} className="text-red-500">
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    return (
      <div
        className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded cursor-pointer group"
        onClick={() => startEditing(conference.id, field, value)}
      >
        <span>{value}</span>
        <Edit2 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100" />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 flex items-center justify-center">
          <LoaderCircle className="animate-spin w-12 h-12 text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 p-4 min-w-0">
        <h1 className="text-2xl font-bold text-center mb-2">
          Sna<span className="text-red-600 font-thin">Plan</span> Events
        </h1>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          statusFilter={statusFilter}
          setStatusFilter={handleStatusFilter}
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-6">Event Name</th>
                <th className="text-left py-3 px-6">Organizer</th>
                <th className="text-left py-3 px-6">Status</th>
                <th className="text-left py-3 px-6">State</th>
                <th className="text-left py-3 px-6">Created</th>
                <th className="text-left py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentConferences.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="px-6 py-4 font-medium">
                    {renderEditableCell(c, "name", c.name)}
                  </td>
                  <td className="px-6 py-4">
                    {renderEditableCell(c, "organizerName", c.organizerName)}
                  </td>
                  <td className="px-6 py-4">
                    {editingCell?.rowId === c.id &&
                    editingCell?.field === "status" ? (
                      renderEditableCell(c, "status", c.status, true)
                    ) : (
                      <div
                        className="cursor-pointer group"
                        onClick={() => startEditing(c.id, "status", c.status)}
                      >
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            c.status
                          )}`}
                        >
                          {getStatusText(c.status)}
                        </span>
                        <Edit2 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 inline ml-2" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingCell?.rowId === c.id &&
                    editingCell?.field === "state" ? (
                      renderEditableCell(c, "state", c.state, true)
                    ) : (
                      <span>{getStateEmoji(c.state)}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {renderEditableCell(c, "createdDate", c.createdDate)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setShowDeleteConfirm(c.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {currentConferences.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No conferences found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Delete Event</h3>
              <p className="mb-4">This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteConference(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
